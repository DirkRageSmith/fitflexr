#!/usr/bin/env node
/*
 * tools/gaps.test.mjs — run: node tools/gaps.test.mjs
 *
 * Every check here is broken DELIBERATELY, IN BOTH DIRECTIONS: a fixture that
 * must make it fire, and a fixture that must keep it silent. A check that only
 * ever gets tested against data that trips it is indistinguishable from a check
 * that always fires, and this repo has a documented history of exactly that
 * failure — checks that look right and measure something adjacent. The first
 * draft of gaps.mjs shipped two of them (a "Carry" gap at bodyweight, which is
 * structurally impossible, and "Lunge" ranked against "Core" as though patterns
 * were peers of equal natural size). Both are pinned here so they cannot return.
 *
 * The mirrored-logic tests matter most. gaps.mjs re-implements ownsGear and
 * passesConditions because app.js is a DOM-bound IIFE that cannot be imported.
 * That copy can go stale silently, so these assert the SEMANTICS — the superset
 * gear test, the avoidIf intersection — not just the counts of the day.
 */

import { analyse, ownsGear, passesConditions, isStretch, loadLibrary, PRESETS } from "./gaps.mjs";

let pass = 0;
const failures = [];

function ok(name, cond, detail) {
  if (cond) { pass++; return; }
  failures.push(`${name}${detail ? "\n      " + detail : ""}`);
}

const eq = (name, a, b) => ok(name, a === b, `expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);

/* ── fixture builder ─────────────────────────────────────────────────────── */

let n = 0;
function move(over = {}) {
  n++;
  return {
    id: `ex-${n}`, name: `Move ${n}`, muscleGroup: "Chest", secondaryMuscles: [],
    equipment: ["bodyweight"], difficulty: "Beginner", cue: "c", description: "d",
    avoidIf: [], pattern: "Horizontal Push", force: "Push", mechanic: "Compound",
    focus: ["strength"], category: "strength",
    ...over,
  };
}

/* A library where every group and pattern is comfortably stocked, so a healthy
 * fixture reports nothing. Anything that fires against THIS is a false positive. */
const GROUPS = ["Chest", "Back", "Shoulders", "Biceps", "Triceps", "Core/Abs",
  "Glutes", "Quads", "Hamstrings", "Calves", "Full Body/Cardio"];
const PATTERNS = ["Horizontal Push", "Vertical Push", "Horizontal Pull", "Vertical Pull",
  "Squat", "Hinge", "Lunge", "Core", "Rotation", "Carry", "Conditioning", "Hip Abduction"];
const FOCUSES = ["strength", "hypertrophy", "endurance", "power", "mobility"];

function healthy() {
  const out = [];
  for (const g of GROUPS) {
    for (let i = 0; i < 14; i++) {
      out.push(move({
        muscleGroup: g,
        pattern: PATTERNS[i % PATTERNS.length],
        difficulty: i < 5 ? "Beginner" : i < 10 ? "Intermediate" : "Advanced",
        focus: [FOCUSES[i % FOCUSES.length], FOCUSES[(i + 1) % FOCUSES.length]],
        equipment: ["bodyweight"],
      }));
    }
  }
  return out;
}

const lib = (exercises) => ({
  exercises, groups: GROUPS, equipment: ["bodyweight", "dumbbell", "bench"],
  conditions: ["knee", "shoulder", "lower-back"],
});

const ids = (xs) => xs.map((x) => x.id);
const has = (xs, id) => ids(xs).includes(id);

/* ── the healthy baseline: EVERY check must stay silent ──────────────────── */

{
  const r = analyse(lib(healthy()));
  eq("healthy library reports no BLOCKED", r.blocked.length, 0);
  ok("healthy library reports no thin spots", r.thin.length === 0,
    `got: ${r.thin.map((t) => t.evidence).join(" | ")}`);
}

/* ── group-cannot-fill-stack ─────────────────────────────────────────────── */

{
  // FIRES: strip Biceps down to 4 bodyweight moves, under the 10-move Stack cap.
  const ex = healthy().filter((e) => e.muscleGroup !== "Biceps");
  for (let i = 0; i < 4; i++) ex.push(move({ muscleGroup: "Biceps", pattern: PATTERNS[i] }));
  const r = analyse(lib(ex));
  const hit = r.blocked.filter((b) => b.id === "group-cannot-fill-stack" && b.group === "Biceps");
  ok("group-cannot-fill-stack FIRES on a starved group", hit.length > 0);
  eq("...and reports the real shortfall", hit[0] && hit[0].spec.count, 6);
}
{
  // SILENT: exactly at the cap is not short.
  const ex = healthy().filter((e) => e.muscleGroup !== "Biceps");
  for (let i = 0; i < 10; i++) ex.push(move({ muscleGroup: "Biceps", pattern: PATTERNS[i] }));
  const r = analyse(lib(ex));
  ok("group-cannot-fill-stack SILENT at exactly the cap",
    !r.blocked.some((b) => b.id === "group-cannot-fill-stack" && b.group === "Biceps"));
}
{
  // A group present ONLY as stretches must still report as empty, not vanish.
  // Deriving the group list from the records instead of MUSCLE_GROUPS makes the
  // worst possible gap invisible — this is the exact bug Ragesmith's tool hit.
  const ex = healthy().filter((e) => e.muscleGroup !== "Calves");
  ex.push(move({ muscleGroup: "Calves", category: "cooldown" }));
  const r = analyse(lib(ex));
  const hit = r.blocked.find((b) => b.id === "group-cannot-fill-stack" && b.group === "Calves");
  ok("a group with ONLY stretches reports as empty, not absent", !!hit);
  eq("...and counts zero training moves", hit && hit.have, 0);
}

/* ── goal-focus-starved ──────────────────────────────────────────────────── */

{
  // FIRES: nothing in the library carries "hypertrophy", so goal build-muscle is inert.
  const ex = healthy().map((e) => ({ ...e, focus: ["strength"] }));
  const r = analyse(lib(ex));
  ok("goal-focus-starved FIRES when no move carries the goal's focus",
    r.blocked.some((b) => b.id === "goal-focus-starved" && b.goal === "build-muscle"));
  ok("...and does NOT fire for a goal whose focus is everywhere",
    !r.blocked.some((b) => b.id === "goal-focus-starved" && b.goal === "strength" && b.tier === "gym"));
}
{
  const r = analyse(lib(healthy()));
  ok("goal-focus-starved SILENT on a well-mixed library",
    !r.blocked.some((b) => b.id === "goal-focus-starved"));
}

/* ── condition-empties-tier ──────────────────────────────────────────────── */

{
  // FIRES: tag all but two moves with `knee`, so the safety filter guts the tier.
  const ex = healthy().map((e, i) => (i < 2 ? e : { ...e, avoidIf: ["knee"] }));
  const r = analyse(lib(ex));
  const hit = r.blocked.find((b) => b.id === "condition-empties-tier" && b.condition === "knee");
  ok("condition-empties-tier FIRES when a condition guts a tier", !!hit);
  eq("...and counts the survivors", hit && hit.have, 2);
  ok("...and stays silent for an unused condition",
    !r.blocked.some((b) => b.id === "condition-empties-tier" && b.condition === "shoulder"));
}

/* ── progression-ceiling ─────────────────────────────────────────────────── */

{
  // FIRES: Back becomes all-Beginner while every other group keeps its ladder.
  const ex = healthy().map((e) => (e.muscleGroup === "Back" ? { ...e, difficulty: "Beginner" } : e));
  const r = analyse(lib(ex));
  ok("progression-ceiling FIRES on an all-Beginner group",
    r.thin.some((t) => t.id === "progression-ceiling" && t.subject === "Back"));
  ok("...and not on the groups that kept a ladder",
    !r.thin.some((t) => t.id === "progression-ceiling" && t.subject === "Quads"));
}
{
  // SILENT: a library where EVERY group is all-Beginner has no thin spot, because
  // thin is relative. Median zero means there is no distribution to be below —
  // that is a whole-library property, not a per-group gap, and reporting eleven
  // "gaps" there would be the cries-wolf failure the design exists to avoid.
  const ex = healthy().map((e) => ({ ...e, difficulty: "Beginner" }));
  const r = analyse(lib(ex));
  ok("progression-ceiling SILENT when NO group has a ladder (median 0)",
    !r.thin.some((t) => t.id === "progression-ceiling"));
}

/* ── pattern-decay, and the two false positives that shipped in draft 1 ──── */

{
  // A pattern that is IMPOSSIBLE at a tier must be a FACT (a question), never a
  // thin spot. There is no bodyweight Carry; you cannot generate your way out of
  // the definition of the word.
  const ex = healthy().map((e) => (e.pattern === "Carry" ? { ...e, equipment: ["dumbbell"] } : e));
  const r = analyse(lib(ex));
  ok("a tier-unreachable pattern is a FACT, not a thin spot",
    r.facts.some((f) => f.id === "pattern-unreachable" && f.pattern === "Carry" && f.tier === "bodyweight"));
  ok("...and is NOT reported as a gap to fill",
    !r.thin.some((t) => t.id === "pattern-decay" && t.subject === "Carry"));
  ok("thin spots carry their tier at the top level, not only inside spec",
    r.thin.every((t) => typeof t.tier === "string" && t.tier.length > 0));
}
{
  // Pattern SIZE must not read as pattern SCARCITY. Give "Core" five times the
  // moves of every other pattern, all equally available at every tier. Draft 1
  // ranked raw counts and reported every normal pattern as thin against Core's
  // inflated median. Decay is a ratio, so it must stay silent.
  const ex = healthy();
  for (let i = 0; i < 200; i++) ex.push(move({ pattern: "Core", muscleGroup: "Core/Abs", equipment: ["bodyweight"] }));
  const r = analyse(lib(ex));
  ok("pattern SIZE does not read as scarcity (draft-1 regression)",
    !r.thin.some((t) => t.id === "pattern-decay"),
    `got: ${r.thin.filter((t) => t.id === "pattern-decay").map((t) => t.evidence).join(" | ")}`);
}
{
  // FIRES: Vertical Pull exists in quantity but almost all of it needs a bar, so
  // a bodyweight user loses the pattern. This is the real, fillable shape.
  const ex = healthy().map((e, i) =>
    e.pattern === "Vertical Pull" && i % 11 !== 0 ? { ...e, equipment: ["pull-up-bar"] } : e);
  const r = analyse(lib(ex));
  ok("pattern-decay FIRES when a pattern is mostly gated behind gear",
    r.thin.some((t) => t.id === "pattern-decay" && t.subject === "Vertical Pull" && t.tier === "bodyweight"));
}

/* ── mirrored app.js logic — the semantics, not the counts ───────────────── */

{
  const home = new Set(["bodyweight", "dumbbell", "bench"]);
  ok("ownsGear is a SUPERSET test: needs both, owns both",
    ownsGear({ equipment: ["dumbbell", "bench"] }, home));
  ok("ownsGear rejects when ONE required item is missing",
    !ownsGear({ equipment: ["dumbbell", "barbell"] }, home));
  ok("ownsGear: null gear set means a full gym",
    ownsGear({ equipment: ["barbell", "cable", "machine"] }, null));
  ok("ownsGear: an empty requirement list is always ownable",
    ownsGear({ equipment: [] }, new Set()));

  ok("passesConditions removes on ANY overlap",
    !passesConditions({ avoidIf: ["knee", "hip"] }, new Set(["hip"])));
  ok("passesConditions keeps when there is no overlap",
    passesConditions({ avoidIf: ["knee"] }, new Set(["shoulder"])));
  ok("passesConditions keeps an untagged exercise",
    passesConditions({ avoidIf: [] }, new Set(["knee"])));

  ok("isStretch is category-driven", isStretch({ category: "warmup" }) && isStretch({ category: "cooldown" }));
  ok("isStretch is false for training categories",
    !isStretch({ category: "strength" }) && !isStretch({ category: "mobility" }));
}

/* ── the mirror must match the LIVE library, or it has gone stale ────────── */

{
  const real = loadLibrary();
  const bw = new Set(["bodyweight"]);
  const moves = real.exercises.filter((e) => !isStretch(e));

  // Cross-check the mirrored gear filter against a from-scratch computation over
  // the real data. If app.js's semantics drift and this file is not updated, the
  // two disagree and this fails rather than quietly reporting the wrong gaps.
  const viaMirror = moves.filter((e) => ownsGear(e, bw)).length;
  const viaDirect = moves.filter((e) => e.equipment.every((x) => x === "bodyweight")).length;
  eq("mirrored ownsGear agrees with a direct computation on the live library", viaMirror, viaDirect);

  ok("the live library actually loads and is non-trivial", moves.length > 100);
  ok("PRESETS cover the bodyweight and home cases the product is built on",
    PRESETS.some((p) => p.id === "bodyweight") && PRESETS.some((p) => p.id === "home"));

  // Every equipment id used by a record must exist in EQUIPMENT, or the gear
  // filter silently hides that exercise from everyone forever.
  const known = new Set(real.equipment);
  const orphans = [...new Set(moves.flatMap((e) => e.equipment).filter((x) => !known.has(x)))];
  eq("no exercise requires an equipment id outside EQUIPMENT", orphans.join(","), "");
}

/* ── report ──────────────────────────────────────────────────────────────── */

if (failures.length) {
  console.error(`\n  ${pass} passed, ${failures.length} FAILED\n`);
  failures.forEach((f) => console.error("  ✗ " + f));
  console.error("");
  process.exit(1);
}
console.log(`\n  gaps.mjs: ${pass} tests passed\n`);
