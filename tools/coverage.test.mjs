#!/usr/bin/env node
/*
 * tools/coverage.test.mjs — run: node tools/coverage.test.mjs
 *
 * Same discipline as gaps.test.mjs: every behaviour is exercised in BOTH
 * directions. The matcher is tested on names it must call covered AND names it
 * must call absent, and the policy engine on rules that must fire AND rules that
 * must not.
 *
 * Two things here are load-bearing beyond ordinary correctness:
 *
 *   1. isCovered() decides whether a card gets written. A false "absent" costs a
 *      duplicate card that must be DELETED rather than edited, which is worse
 *      than a missed one — so the bias is toward "covered" and that bias is
 *      pinned by tests, not left to drift.
 *   2. The draft-policy refusal is a safety property. If --queue ever starts
 *      emitting against an unadopted policy, hundreds of exercises get filtered
 *      by rules nobody agreed to, unattended, twice a day.
 */

import { normalize, isCovered, applyPolicy, loadPolicy, loadLibrary, analyse, snapshot, previousDay, describeDelta } from "./coverage.mjs";

let pass = 0;
const failures = [];
const ok = (name, cond, detail) => { if (cond) { pass++; return; } failures.push(`${name}${detail ? "\n      " + detail : ""}`); };
const eq = (name, a, b) => ok(name, a === b, `expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);

/* ── the matcher, both directions ────────────────────────────────────────── */

const LIB = [
  "Barbell Bench Press", "Single-Arm Dumbbell Row", "Downward-Facing Dog",
  "Standing Calf Raise", "Pike Push-Up", "Goblet Squat", "Plank Pose",
].map(normalize);

// MUST be called covered — these are the same exercise wearing a different name.
for (const [name, why] of [
  ["Barbell Bench Press", "identical"],
  ["Barbell Bench Press - Medium Grip", "reference adds a grip qualifier"],
  ["One Arm Dumbbell Row", "one/single synonym"],
  ["Bench Press, Barbell", "word order"],
  ["Dumbbell Rows, Single Arm", "order + plural"],
  ["Goblet Squats", "plural"],
])
  ok(`covered: ${name} (${why})`, isCovered(name, LIB));

// MUST be called absent — genuinely different exercises that share words.
for (const [name, why] of [
  ["Split Clean", "nothing like it"],
  ["Incline Barbell Bench Press", "incline is a different lift"],
  ["Seated Calf Raise", "seated vs standing"],
  ["Handstand Push-Up", "shares 'push-up' only"],
  ["Bulgarian Split Squat", "shares 'squat' only"],
])
  ok(`absent: ${name} (${why})`, !isCovered(name, LIB));

// A single shared word must never be enough, or "Row" matches every row.
ok("one shared word is not a match", !isCovered("Cable Row", [normalize("Barbell Row Machine Thing")]));
ok("empty/unparseable names are treated as covered, never queued", isCovered("!!!", LIB));

/* ── the policy engine, both directions ──────────────────────────────────── */

const POLICY = {
  status: "adopted", version: 99, defaultAction: "include",
  rules: [
    { id: "smr", action: "exclude", match: { namePattern: "-SMR$" }, confirmed: true },
    { id: "stretch-null", action: "remap", remapEquipment: ["bodyweight"], match: { refEquipment: null, category: "stretching" }, confirmed: true },
    { id: "any-null", action: "remap", remapEquipment: ["bodyweight"], match: { refEquipment: null }, confirmed: true },
    { id: "other", action: "review", match: { refEquipment: "other" }, confirmed: true },
  ],
};

const item = (o) => ({ ref: "t", name: "X", refEquipment: "dumbbell", equipment: ["dumbbell"], equipmentResolved: true, category: "strength", ...o });

function run(items, policy = POLICY) {
  const r = { missing: [...items], notes: [] };
  applyPolicy(r, policy);
  return r;
}

{
  const r = run([
    item({ name: "Calves-SMR" }),
    item({ name: "Standing Toe Touches", refEquipment: null, equipment: null, equipmentResolved: false, category: "stretching" }),
    item({ name: "Carioca Quick Step", refEquipment: null, equipment: null, equipmentResolved: false, category: "plyometrics" }),
    item({ name: "Sled Drag", refEquipment: "other", equipment: null, equipmentResolved: false }),
    item({ name: "Goblet Squat" }),
  ]);

  eq("exclude drops the item", r.excluded.length, 1);
  eq("...and it was the SMR one", r.excluded[0].name, "Calves-SMR");
  eq("four items survive", r.missing.length, 4);

  const stretch = r.missing.find((m) => m.name === "Standing Toe Touches");
  eq("remap fires on the specific rule first", stretch.rule, "stretch-null");
  ok("remap sets equipment", JSON.stringify(stretch.equipment) === '["bodyweight"]');
  eq("remap marks it resolved", stretch.equipmentResolved, true);

  // FIRST MATCH WINS. `stretch-null` is above `any-null` and is more specific;
  // the plyometric item must fall through to the general rule, not the first.
  const plyo = r.missing.find((m) => m.name === "Carioca Quick Step");
  eq("a non-stretch null falls through to the general rule", plyo.rule, "any-null");
  eq("...and is still remapped", plyo.equipmentResolved, true);

  const other = r.missing.find((m) => m.name === "Sled Drag");
  eq("review keeps the item", other.decision, "review");
  eq("...but never resolves its gear", other.equipmentResolved, false);

  const plain = r.missing.find((m) => m.name === "Goblet Squat");
  eq("an unmatched item takes the default action", plain.decision, "include");
  eq("...and records no rule", plain.rule, null);
}

{
  // A rule matching nothing must be silent, not fire on everything.
  const r = run([item({ name: "Goblet Squat" })], {
    ...POLICY, rules: [{ id: "never", action: "exclude", match: { namePattern: "zzzz" }, confirmed: true }],
  });
  eq("a non-matching rule excludes nothing", r.excluded.length, 0);
  eq("...and the item survives", r.missing.length, 1);
}

{
  // `refEquipment: null` in a rule must mean "the reference had none", and must
  // NOT match an item that simply has some other value.
  const r = run([item({ name: "Y", refEquipment: "dumbbell" })], {
    ...POLICY, rules: [{ id: "nulls", action: "exclude", match: { refEquipment: null }, confirmed: true }],
  });
  eq("a null-equipment rule does not match a non-null item", r.excluded.length, 0);
}

{
  // No policy at all must be permissive, not silently drop everything.
  const r = run([item({ name: "A" }), item({ name: "B" })], null);
  eq("with no policy, nothing is excluded", r.excluded.length, 0);
  eq("...and everything is includable", r.missing.filter((m) => m.decision === "include").length, 2);
}

{
  // The draft gate. This is the safety property.
  const r = run([item({ name: "A" })], { ...POLICY, status: "draft" });
  ok("a draft policy still reports its effect", r.policy.status === "draft");
  ok("...and says so loudly in the notes",
    r.notes.some((n) => /not "adopted"/.test(n) && /refused/.test(n)));
  const adopted = run([item({ name: "A" })], POLICY);
  ok("an adopted policy adds no refusal note",
    !adopted.notes.some((n) => /refused/.test(n)));
}

/* ── against the live library and the real shipped policy ────────────────── */

{
  const r = analyse(loadLibrary());

  ok("the live library loads", r.library.total > 500);
  ok("at least one reference is vendored", r.refs.length >= 1);
  ok("every kept absence carries a decision", r.missing.every((m) => typeof m.decision === "string"));
  ok("no excluded item leaks into the kept list",
    !r.missing.some((m) => m.decision === "exclude"));
  ok("every remapped item is marked resolved",
    r.missing.filter((m) => m.decision === "remap").every((m) => m.equipmentResolved));

  // The unresolved note must describe the POST-policy state. An earlier version
  // reported the pre-policy figure (175) directly under a table showing 66 of
  // them already remapped.
  const note = r.notes.find((n) => /still have no equipment/.test(n));
  const actuallyUnresolved = r.missing.filter((m) => !m.equipmentResolved).length;
  if (note) {
    const claimed = Number((note.match(/^(\d+)/) || [])[1]);
    eq("the unresolved note counts what is actually left, post-policy", claimed, actuallyUnresolved);
  } else {
    eq("no note means nothing is unresolved", actuallyUnresolved, 0);
  }

  // The shipped policy must be a draft until Matt adopts it.
  const shipped = loadPolicy();
  ok("a real policy file is shipped", !!shipped);
  ok("every shipped rule carries a reason and a recommendation",
    shipped.rules.every((x) => x.reason && x.recommendation));
  ok("every shipped rule has a valid action",
    shipped.rules.every((x) => ["include", "exclude", "remap", "review"].includes(x.action)));
  ok("every remap rule actually supplies equipment",
    shipped.rules.filter((x) => x.action === "remap").every((x) => Array.isArray(x.remapEquipment) && x.remapEquipment.length));
  /* This assertion used to be "the shipped policy is NOT adopted". That was the
   * right guard while the rulings were an unreviewed draft, and it became wrong
   * the moment Matt said to adopt them — a test that pins a decision rather than
   * an invariant fails the day the decision legitimately changes.
   *
   * The durable invariant is that adoption is never SILENT: anything running
   * unattended must name who authorised it, so a policy cannot drift into force
   * because someone flipped a string. */
  ok("status is one of the two known values", ["draft", "adopted"].includes(shipped.status));
  ok("an adopted policy must record who adopted it",
    shipped.status !== "adopted" || (typeof shipped.adoptedBy === "string" && shipped.adoptedBy.length > 20),
    `adoptedBy: ${JSON.stringify(shipped.adoptedBy)}`);
  ok("a draft policy must NOT claim an adopter",
    shipped.status !== "draft" || !shipped.adoptedBy);

  /* The two judgement-heavy buckets stay OUT of the unattended queue. If a later
   * edit flips either to include, hundreds of half-specified entries reach the
   * generator, so the intent is pinned here rather than left to a comment. */
  for (const id of ["neck-and-plate-work", "other-equipment-remainder"]) {
    const rule = shipped.rules.find((x) => x.id === id);
    ok(`${id} is still held for review, not auto-included`, rule && rule.action === "review");
  }
}

/* ── the daily ratchet ───────────────────────────────────────────────────── */

{
  const snap = (date, over = {}) => ({ date, libraryTotal: 615, covered: 300, absent: 500, ready: 400, ...over });

  // THE SAME-DAY TRAP. Bellows runs twice a day, so both passes write the same
  // date. Comparing against "the last entry" would compare this morning to this
  // evening and report zero every time — a ratchet that always reads zero is
  // worse than none, because it looks like a working measurement.
  const hist = [snap("2026-09-05"), snap("2026-09-06", { covered: 310 }), snap("2026-09-07", { covered: 320 })];
  const today = snap("2026-09-07", { covered: 325 });
  const prev = previousDay(hist, today);
  eq("previousDay skips entries from the same date", prev.date, "2026-09-06");
  ok("...and the delta is measured against yesterday",
    /covered \+15/.test(describeDelta(today, prev)),
    describeDelta(today, prev));

  eq("no history at all yields no baseline", previousDay([], today), null);
  ok("a missing baseline says so rather than printing a fake zero",
    /baseline/.test(describeDelta(today, null)));

  // An idle day must read ZERO, visibly, not be absorbed into prose.
  const flat = describeDelta(snap("2026-09-07"), snap("2026-09-06"));
  ok("an idle day reports 0, not silence", /covered 0/.test(flat) && /ready 0/.test(flat), flat);

  // Going backwards must be reported as negative, not clamped.
  const worse = describeDelta(snap("2026-09-07", { ready: 380 }), snap("2026-09-06"));
  ok("a regression is reported as negative", /ready -20/.test(worse), worse);

  // snapshot() must agree with what the human report calls "ready", or the
  // ratchet measures a different thing from the one on screen.
  const r = analyse(loadLibrary());
  const s = snapshot(r, "2026-01-01");
  const readyOnScreen = r.missing.filter((m) => m.equipmentResolved && m.name && m.decision !== "review").length;
  eq("snapshot.ready matches the report's own ready count", s.ready, readyOnScreen);
  eq("snapshot carries the date it was given", s.date, "2026-01-01");
  ok("snapshot records each reference separately", Object.keys(s.refs).length === r.refs.length);
}

/* ── report ──────────────────────────────────────────────────────────────── */

if (failures.length) {
  console.error(`\n  ${pass} passed, ${failures.length} FAILED\n`);
  failures.forEach((f) => console.error("  ✗ " + f));
  console.error("");
  process.exit(1);
}
console.log(`\n  coverage.mjs: ${pass} tests passed\n`);
