#!/usr/bin/env node
/*
 * tools/pending.mjs — what unattended work is waiting for review.
 *
 * Run:  node tools/pending.mjs            review sheet
 *       node tools/pending.mjs --json     machine-readable
 *
 * WHO THIS IS FOR. Claude, not Matt.
 *
 * Matt, 2026-09-07: "no its yours i'll just ask you to review it whenever i'm
 * actually at computer. you are my programmer, i'm a guy who hadn't owned his
 * own computer in 10 years til 6 months ago." Bellows generates exercise cards
 * twice a day onto `bellows/*` branches; the reviewing is a Claude session's
 * job, started whenever he asks. This tool is what that session opens first.
 *
 * SO IT FRONT-LOADS THE MECHANICAL CHECKS. Review time should go on judgement —
 * is this a real movement, is the how-to right, would a beginner hurt
 * themselves — not on rediscovering that a record duplicates one already
 * shipped. Everything a machine can decide is decided here and flagged, so the
 * reading is spent on what only reading can catch.
 *
 * These checks intentionally MIRROR qwen-tools/adapters/fitflexr-moves.mjs
 * rather than import it: that repo is infrastructure and must not become a
 * dependency of the app repo. The duplication is a known cost. If a check
 * changes there, change it here — and the test pins the behaviour so a drift
 * shows up as a failure rather than as silence.
 *
 * IT READS. It never merges, never deletes a branch, never calls a model.
 * Deciding is the reviewer's job; this only lays the work out.
 */

import { execFileSync } from "node:child_process";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { normalize, isCovered } from "./coverage.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

const git = (...args) => {
  try {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", timeout: 30_000 }).trim();
  } catch { return ""; }
};

/** Branches carrying unattended work that main does not yet have. */
export function pendingBranches() {
  const raw = git("branch", "--list", "bellows/*", "--format=%(refname:short)");
  if (!raw) return [];
  return raw.split("\n").map((b) => b.trim()).filter(Boolean).map((branch) => {
    const ahead = git("rev-list", "--count", `main..${branch}`);
    const subject = git("log", "-1", "--format=%s", branch);
    const when = git("log", "-1", "--format=%ad", "--date=short", branch);
    return { branch, ahead: Number(ahead) || 0, subject, when };
  }).filter((b) => b.ahead > 0);
}

/* Records added by a branch, read from ITS version of exercises.js rather than
 * from the diff. A textual diff of a 17,000-line data file is unreadable and
 * would put the reviewer back in the mechanics. */
export function addedRecords(branch, base = "main") {
  const before = parseAt(base);
  const after = parseAt(branch);
  if (!before || !after) return null;
  return diffRecords(before, after).added;
}

/* PARSE, NEVER EXECUTE — and here that is not pedantry.
 *
 * The obvious way to read a branch's exercises.js is to require() it, or to run
 * it through new Function(). Both EXECUTE the file. Under the 2026-09-07 design
 * these branches are written by BELLOWS, unattended, from local-model output —
 * which is the single input on this machine least deserving of execution, and
 * qwen-tools' trust model forbids exactly this ("Parse, never interpret. Output
 * is JSON.parsed — never eval, never new Function"). A review tool that
 * executes the thing it is reviewing has already lost, because it runs BEFORE
 * anyone has looked.
 *
 * It is also unnecessary. New records arrive as a named block appended before
 * module.exports, which is the documented integration pattern, and the block is
 * emitted by qwen-tools' toJsSource() — JSON.stringify output, so the array
 * literal is already valid JSON. Extract the block textually and JSON.parse it.
 *
 * A block that will not parse is REPORTED, never fallen back to execution. That
 * is a useful signal in its own right: it means the batch was not written in the
 * expected shape and deserves a human's eyes before anything else happens. */
function parseAt(ref) {
  const src = git("show", `${ref}:exercises.js`);
  if (!src) return null;
  const out = [];
  // `const NAME = [ ... ];` where NAME is a top-level array of records.
  const re = /^const\s+([A-Z][A-Z0-9_]*)\s*=\s*(\[[\s\S]*?\n\]);\s*$/gm;
  let m;
  while ((m = re.exec(src)) !== null) {
    try {
      const arr = JSON.parse(m[2]);
      /* `id` alone is not enough to identify an exercise: EQUIPMENT, CONDITIONS,
       * SPORTS and STRETCH_TYPES are all top-level arrays of {id,...} in this
       * same file, and picking them up made this read 657 records against a live
       * 615. A record needs the fields an exercise actually has. */
      if (Array.isArray(arr))
        for (const r of arr)
          if (r && typeof r === "object" && r.id && r.muscleGroup && r.description) out.push(r);
    } catch {
      out.push({ id: `__unparseable__${m[1]}`, name: `(block ${m[1]} could not be parsed as JSON)`, __unparseable: true });
    }
  }
  return out.length ? out : null;
}

/* ── the mechanical checks, so review time goes on judgement ─────────────── */

const GEAR_MENTIONS = {
  barbell: /\bbarbell\b|\bez[- ]bar\b/,
  kettlebell: /\bkettlebell\b/,
  dumbbell: /\bdumbbell\b/,
  cable: /\bcable\b|\bpulley\b/,
  machine: /\bmachine\b/,
  "resistance-band": /\bresistance band\b/,
  trx: /\btrx\b|\bsuspension (?:trainer|strap)/,
  "pull-up-bar": /\bpull-?up bar\b|\bchin-?up bar\b/,
  "medicine-ball": /\bmedicine ball\b|\bmed ball\b/,
  "ab-wheel": /\bab wheel\b/,
  "jump-rope": /\bjump rope\b|\bskipping rope\b/,
};

const ELEVATION = /\b(?:bench|chair|box|table|couch|sofa|stair)\b|\bstep-ups?\b|\b(?:onto|on) an? step\b/;

export function checkRecord(rec, libraryNames) {
  const flags = [];
  const said = `${rec.name} ${rec.cue || ""} ${rec.description || ""}`.toLowerCase();
  const owned = new Set(rec.equipment || []);

  if (isCovered(rec.name, libraryNames))
    flags.push({ level: "block", what: "duplicates an exercise already in the library" });

  for (const [id, re] of Object.entries(GEAR_MENTIONS))
    if (!owned.has(id) && re.test(said))
      flags.push({ level: "block", what: `prose names "${id}" but the record does not list it` });

  if (owned.size === 1 && owned.has("bodyweight") && ELEVATION.test(said))
    flags.push({ level: "block", what: "tagged bodyweight-only but the how-to uses a raised surface" });

  const sentences = (rec.description || "").split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 12);
  if (sentences.length < 2 || sentences.length > 3)
    flags.push({ level: "warn", what: `${sentences.length} sentences; house style is 2-3` });

  if (/\b(?:remember to|be sure to|don't forget|make sure you)\b/i.test(rec.description || ""))
    flags.push({ level: "warn", what: "coaching filler the house style forbids" });

  if ((rec.secondaryMuscles || []).includes(rec.muscleGroup))
    flags.push({ level: "warn", what: "secondaryMuscles repeats its own muscleGroup" });

  if (!rec.avoidIf || !rec.avoidIf.length)
    flags.push({ level: "look", what: "no avoidIf — check that is genuinely safe for everyone" });

  return flags;
}

/* ── stacked branches ────────────────────────────────────────────────────────
 *
 * Bellows builds each pass's branch on top of the previous pass's tip, so the
 * unreviewed work is a STACK, not a set of siblings. The first version of this
 * sheet diffed every branch against main, which counted each card once per
 * branch above it: on 2026-09-12, six stacked branches holding 18 cards read
 * "63 new record(s), 6 with blocking flags" — for one flagged card. So each
 * branch is now reviewed against its nearest pending ancestor and shows only
 * what IT added, changed or dropped.
 */

/** Field-order-insensitive identity, so a re-serialised record is not "changed". */
const canon = (r) => JSON.stringify(Object.keys(r).sort().reduce((o, k) => { o[k] = r[k]; return o; }, {}));

export function diffRecords(before, after) {
  const was = new Map((before || []).map((r) => [r.id, r]));
  const now = new Set((after || []).map((r) => r.id));
  const added = [];
  const changed = [];
  for (const r of after || []) {
    if (!was.has(r.id)) added.push(r);
    else if (canon(was.get(r.id)) !== canon(r)) changed.push(r);
  }
  return { added, changed, removed: (before || []).filter((r) => !now.has(r.id)) };
}

/** The closest pending branch this one was built on, or null when it was cut from
 *  main. `isAncestor(p, q)` is true when p is an ancestor of q. */
export function nearestAncestor(branch, pending, isAncestor) {
  const below = pending.filter((p) => p !== branch && isAncestor(p, branch));
  return below.find((a) => below.every((o) => o === a || isAncestor(o, a))) || null;
}

/** Bottom of each stack first, so the sheet reads in the order the work was done. */
export function stackOrder(pending, isAncestor) {
  const depth = (b) => pending.filter((p) => p !== b && isAncestor(p, b)).length;
  return [...pending].sort((a, b) => depth(a) - depth(b) || a.localeCompare(b));
}

const namesOf = (records) => records.flatMap((e) => [normalize(e.name), ...(e.aliases || []).map(normalize)]);

/* A rewritten record keeps its id, so its own earlier version is in the base and
 * would flag it as a duplicate of itself. Each record is checked against the
 * base WITHOUT its own id.
 *
 * And a changed record reports only what the branch INTRODUCED. Adding one alias
 * to the shipped "Side Plank Pose" (2026-09-12) raised a BLOCK, because that name
 * has always contained-matched "Side Plank": true, old, and not the branch's
 * doing. The self-exclusion above is what keeps this honest — without it every
 * record's earlier version "duplicates" itself, so a rename INTO a real collision
 * would be filtered out as pre-existing. */
export function reviewRecords(before, after) {
  const d = diffRecords(before, after);
  const was = new Map((before || []).map((r) => [r.id, r]));
  const flag = (r) => checkRecord(r, namesOf((before || []).filter((e) => e.id !== r.id)));
  const introduced = (r) => {
    const prior = new Set(flag(was.get(r.id)).map((f) => f.what));
    return flag(r).filter((f) => !prior.has(f.what));
  };
  return {
    records: [
      ...d.added.map((r) => ({ ...r, flags: flag(r) })),
      ...d.changed.map((r) => ({ ...r, changed: true, flags: introduced(r) })),
    ],
    removed: d.removed,
  };
}

/* Queue decisions (tools/queue-decisions.json) a branch adds, rewords or deletes.
 * A pass may record a skip on its branch, and a skip takes an item out of the
 * queue for good, so the reviewer has to see every one. Names match
 * case-insensitively, the same way coverage.mjs matches them. */
export function diffDecisions(before, after) {
  const key = (e) => String(e.name || "").trim().toLowerCase();
  const list = (j) => (j && Array.isArray(j.entries) ? j.entries : []);
  const was = new Map(list(before).map((e) => [key(e), e]));
  const now = new Map(list(after).map((e) => [key(e), e]));
  const added = [];
  const changed = [];
  for (const [k, e] of now) {
    if (!was.has(k)) added.push(e);
    else if (was.get(k).action !== e.action || was.get(k).reason !== e.reason) changed.push(e);
  }
  const removed = [...was].filter(([k]) => !now.has(k)).map(([, e]) => e);
  return { added, changed, removed };
}

/* ── CLI ─────────────────────────────────────────────────────────────────── */

const isAncestor = (a, b) => {
  try {
    execFileSync("git", ["merge-base", "--is-ancestor", a, b], { cwd: ROOT, stdio: "ignore", timeout: 30_000 });
    return true;
  } catch { return false; }
};

/* JSON.parse, never execute — the same rule as parseAt. A missing file is empty, and
 * on a ref from before the file existed that is the normal case, so git's "exists on
 * disk, but not in <ref>" complaint is not echoed into the review sheet. */
function decisionsAt(ref) {
  let src = "";
  try {
    src = execFileSync("git", ["show", `${ref}:tools/queue-decisions.json`],
      { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 30_000 });
  } catch { return null; }
  try { return JSON.parse(src); } catch { return { entries: [], unparseable: true }; }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const found = pendingBranches();
  const names = found.map((b) => b.branch);
  const out = { branches: [] };

  for (const name of stackOrder(names, isAncestor)) {
    const b = found.find((x) => x.branch === name);
    const base = nearestAncestor(name, names, isAncestor) || "main";
    const own = Number(git("rev-list", "--count", `${base}..${name}`)) || 0;
    // parseAt, not loadAt — the latter executed the file and was replaced. This call
    // site survived the rename because nothing exercised it: there were no pending
    // branches on the day it was written, so the CLI path never ran. A review tool that
    // crashes the first time it has something to review is worth one regression test.
    const before = parseAt(base);
    const after = parseAt(name);
    if (!before || !after) { out.branches.push({ ...b, base, own, error: "could not read exercises.js on this branch" }); continue; }
    const { records, removed } = reviewRecords(before, after);
    out.branches.push({
      ...b, base, own,
      records: records.map((r) => ({
        id: r.id, name: r.name, muscleGroup: r.muscleGroup, difficulty: r.difficulty,
        equipment: r.equipment, cue: r.cue, description: r.description,
        avoidIf: r.avoidIf, changed: !!r.changed, flags: r.flags,
      })),
      removed: removed.map((r) => ({ id: r.id, name: r.name })),
      decisions: diffDecisions(decisionsAt(base), decisionsAt(name)),
    });
  }

  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(out, null, 2));
    process.exit(0);
  }

  if (!found.length) {
    console.log("\nNothing pending. No unmerged bellows/* branches.\n");
    process.exit(0);
  }

  const all = out.branches.flatMap((b) => b.records || []);
  const blocked = all.filter((r) => r.flags.some((f) => f.level === "block")).length;
  const dropped = out.branches.reduce((n, b) => n + (b.removed ? b.removed.length : 0), 0);
  const skips = out.branches.reduce((n, b) => n + (b.decisions ? b.decisions.added.filter((e) => e.action === "skip").length : 0), 0);
  console.log(`\nPending review — ${out.branches.length} branch(es), ${all.length} new or changed record(s), ` +
    `${blocked} with blocking flags${dropped ? `, ${dropped} dropped` : ""}${skips ? `, ${skips} new queue skip(s)` : ""}\n`);

  for (const b of out.branches) {
    console.log(`── ${b.branch}  (${b.when}, ${b.own} commit${b.own === 1 ? "" : "s"} on top of ${b.base})`);
    console.log(`   ${b.subject}`);
    if (b.error) { console.log(`   ERROR: ${b.error}\n`); continue; }
    if (!b.records.length) console.log("   no new or changed exercise records");
    for (const r of b.records) {
      const worst = r.flags.some((f) => f.level === "block") ? "✗" : r.flags.some((f) => f.level === "warn") ? "!" : "·";
      console.log(`\n   ${worst} ${r.name}${r.changed ? "  (CHANGED)" : ""}   [${(r.equipment || []).join(", ")}] ${r.muscleGroup} / ${r.difficulty}`);
      console.log(`     cue: ${r.cue}`);
      console.log(`     ${r.description}`);
      console.log(`     avoidIf: ${(r.avoidIf || []).join(", ") || "(none)"}`);
      for (const f of r.flags) console.log(`     ${f.level.toUpperCase()}: ${f.what}`);
    }
    for (const r of b.removed) console.log(`\n   − dropped: ${r.name} (${r.id})`);
    for (const e of b.decisions.added) console.log(`\n   + queue ${e.action}: ${e.name} — ${e.reason}`);
    for (const e of b.decisions.changed) console.log(`\n   ~ queue ${e.action} reworded: ${e.name} — ${e.reason}`);
    for (const e of b.decisions.removed) console.log(`\n   − queue decision deleted: ${e.name}`);
    console.log("");
  }

  console.log("Merge what survives, drop what does not, and say which and why.");
  console.log("Nothing here is merged automatically.\n");
  process.exit(0);
}
