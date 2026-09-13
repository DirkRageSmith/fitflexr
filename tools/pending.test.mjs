#!/usr/bin/env node
/*
 * tools/pending.test.mjs — run: node tools/pending.test.mjs
 *
 * WHY THIS FILE EXISTS. The review sheet's first real use (2026-09-12) read
 * "6 branch(es), 63 new record(s), 6 with blocking flags" for six stacked
 * branches holding 18 cards, one of them flagged. Bellows builds each pass's
 * branch on the previous pass's tip, and the sheet diffed every branch against
 * main — so each card was counted once per branch above it, and one flag was
 * reported six times. A reviewer trusting the headline budgets for a 3.5x mass
 * that does not exist, and a pass reading "6 with blocking flags" cannot tell
 * that five of them are the same card.
 *
 * Same discipline as coverage.test.mjs: both directions, literal expectations,
 * the real functions. The only thing injected is the git ancestry relation,
 * because what is under test is what the sheet DOES with ancestry, not git.
 */

import {
  diffRecords, nearestAncestor, stackOrder, reviewRecords, diffDecisions,
  baseFor, parseSource, worktreeReview,
} from "./pending.mjs";

let pass = 0;
const failures = [];
const ok = (name, cond, detail) => { if (cond) { pass++; return; } failures.push(`${name}${detail ? "\n      " + detail : ""}`); };
const eq = (name, a, b) => ok(name, a === b, `expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);
const ids = (list) => list.map((r) => r.id).join(",");

/* A record that passes every house-style check, so only the check under test can
 * fire. Names share one word at most, which the matcher never counts as a
 * duplicate on its own. */
const WORD = { a: "Alpha", b: "Bravo", c: "Charlie", d: "Delta", e: "Echo", z: "Zulu" };
const rec = (id, over = {}) => ({
  id, name: `${WORD[id]} Crunch`, muscleGroup: "Core/Abs", equipment: ["bodyweight"],
  cue: "Brace, then curl up.",
  description: "Lie on your back with your knees bent. Curl your shoulders up a little, then lower them slowly.",
  avoidIf: ["neck"], ...over,
});

/* ── diffRecords: what a branch adds, changes and drops relative to its base ── */

{
  const base = [rec("a"), rec("b"), rec("c")];
  const branch = [rec("a"), rec("b", { cue: "A rewritten cue." }), rec("d"), rec("e")];
  const d = diffRecords(base, branch);
  eq("added: ids the base does not have", ids(d.added), "d,e");
  eq("changed: the same id with different content", ids(d.changed), "b");
  eq("removed: ids the branch dropped", ids(d.removed), "c");
}

{
  const d = diffRecords([rec("a"), rec("b")], [rec("a"), rec("b")]);
  eq("identical lists: nothing added", d.added.length, 0);
  eq("identical lists: nothing changed", d.changed.length, 0);
  eq("identical lists: nothing removed", d.removed.length, 0);
}

{
  const { id, name, muscleGroup, equipment, cue, description, avoidIf } = rec("a");
  const d = diffRecords([rec("a")], [{ avoidIf, description, cue, equipment, muscleGroup, name, id }]);
  eq("the same fields in a different key order are not a change", d.changed.length, 0);
}

/* ── ancestry: which base each branch is reviewed against ─────────────────── */

{
  // main <- A <- B <- C, and X cut straight from main. "p>q": p is an ancestor of q.
  const edges = new Set(["A>B", "A>C", "B>C"]);
  const isAncestor = (p, q) => edges.has(`${p}>${q}`);
  const pending = ["C", "X", "A", "B"];

  eq("the bottom of a stack is reviewed against main", nearestAncestor("A", pending, isAncestor), null);
  eq("a middle branch is reviewed against the branch below it", nearestAncestor("B", pending, isAncestor), "A");
  eq("the top branch is reviewed against its PARENT, not the bottom of the stack",
    nearestAncestor("C", pending, isAncestor), "B");
  eq("a branch cut from main is reviewed against main", nearestAncestor("X", pending, isAncestor), null);

  const order = stackOrder(pending, isAncestor);
  ok("a stack is listed bottom-up",
    order.indexOf("A") < order.indexOf("B") && order.indexOf("B") < order.indexOf("C"), order.join(","));
  eq("every branch is listed exactly once", [...order].sort().join(","), "A,B,C,X");
}

/* ── reviewRecords: flags are computed against the right base ─────────────── */

{
  const base = [rec("a"), rec("b")];
  // b is rewritten in place; z is new but carries a's name.
  const branch = [rec("a"), rec("b", { cue: "A rewritten cue." }), rec("z", { name: "Alpha Crunch" })];
  const out = reviewRecords(base, branch);
  const b = out.records.find((r) => r.id === "b");
  const z = out.records.find((r) => r.id === "z");

  ok("a rewritten record is shown for review, marked changed", !!b && b.changed === true);
  ok("...and is NOT flagged as a duplicate of its own earlier version",
    !!b && !b.flags.some((f) => /duplicates/.test(f.what)), b && JSON.stringify(b.flags));
  ok("a new record named like an existing one IS flagged as a duplicate",
    !!z && z.flags.some((f) => f.level === "block" && /duplicates/.test(f.what)), z && JSON.stringify(z.flags));
  eq("an untouched record is not shown", out.records.some((r) => r.id === "a"), false);
}

{
  /* The break: reporting history as if it were the change. On 2026-09-12, adding one
   * alias to the shipped "Side Plank Pose" showed a BLOCK, because that name has always
   * contained-matched the shipped "Side Plank". True, old, and not the branch's doing. */
  const base = [rec("a", { name: "Delta Crunch" }), rec("b", { name: "Delta Crunch Hold" })];
  const aliasOnly = [rec("a", { name: "Delta Crunch" }), rec("b", { name: "Delta Crunch Hold", aliases: ["Held Delta"] })];
  const b = reviewRecords(base, aliasOnly).records.find((r) => r.id === "b");
  ok("a flag a changed record already had before the branch is not reported again",
    !!b && !b.flags.some((f) => /duplicates/.test(f.what)), b && JSON.stringify(b.flags));

  const newProblem = [rec("a", { name: "Delta Crunch" }), rec("b", { name: "Delta Crunch Hold",
    description: "Lie on a bench with your knees bent. Curl your shoulders up a little, then lower them slowly." })];
  const b2 = reviewRecords(base, newProblem).records.find((r) => r.id === "b");
  ok("...but a problem the branch introduces into a changed record is reported",
    !!b2 && b2.flags.some((f) => /raised surface/.test(f.what)), b2 && JSON.stringify(b2.flags));
}

{
  /* The break: the pre-existing filter swallowing a real collision. Every record's
   * earlier version matches its own name, so if the base were not checked WITHOUT
   * the record's own id, a rename into another card's name would look "pre-existing"
   * and vanish from the sheet. */
  const base = [rec("a", { name: "Delta Crunch" }), rec("b")];
  const renamed = [rec("a", { name: "Delta Crunch" }), rec("b", { name: "Delta Crunch" })];
  const b = reviewRecords(base, renamed).records.find((r) => r.id === "b");
  ok("a changed record renamed into another card's name IS flagged as a duplicate",
    !!b && b.flags.some((f) => f.level === "block" && /duplicates/.test(f.what)), b && JSON.stringify(b.flags));
}

/* ── diffDecisions: queue decisions a branch adds are shown to the reviewer ── */

{
  const before = { entries: [
    { name: "Old Skip", action: "skip", reason: "was already decided" },
    { name: "Reworded", action: "skip", reason: "first reason" },
  ] };
  const after = { entries: [
    { name: "old skip", action: "skip", reason: "was already decided" },
    { name: "Reworded", action: "skip", reason: "second reason" },
    { name: "New Skip", action: "skip", reason: "a pass decided this" },
  ] };
  const d = diffDecisions(before, after);
  eq("a decision the branch adds is shown, and a recased name is not an addition",
    d.added.map((e) => e.name).join(","), "New Skip");
  eq("a decision the branch rewords is shown", d.changed.map((e) => e.name).join(","), "Reworded");
  eq("a base with no decisions file counts as empty", diffDecisions(null, after).added.length, 3);
  eq("a decision the branch deletes is shown",
    diffDecisions(after, before).removed.map((e) => e.name).join(","), "New Skip");
}

/* ── baseFor: where the next pass branches from ──────────────────────────────
 *
 * The break, 2026-09-12/13: after a review merged everything, HANDOFF said "branch
 * from main" for one pass. The next pass carried it forward as a rule against
 * stacking, so two passes cut sibling branches from main. Both appended a block at
 * the same place in exercises.js and queue-decisions.json (a merge conflict in each),
 * both claimed fitflexr-v44, and the second pass's queue did not know the first
 * pass's cards existed. A pass should never have to reason this out. */

{
  const edges = new Set(["A>B", "A>C", "B>C"]);
  const isAncestor = (p, q) => edges.has(`${p}>${q}`);
  const when = { A: 1, B: 2, C: 3, X: 4 };
  const dateOf = (b) => when[b];

  eq("nothing waiting: branch from main", JSON.stringify(baseFor([], isAncestor, dateOf)), '{"base":"main","others":[]}');
  eq("one branch waiting: build on it", baseFor(["A"], isAncestor, dateOf).base, "A");
  eq("a stack: build on its top, never its bottom", baseFor(["A", "C", "B"], isAncestor, dateOf).base, "C");
  eq("...and a stack leaves nothing out", baseFor(["A", "C", "B"], isAncestor, dateOf).others.length, 0);

  const forked = baseFor(["C", "A", "B", "X"], isAncestor, dateOf);
  eq("an existing fork: build on the newest top", forked.base, "X");
  eq("...and name the top left out, so the pass can say so", forked.others.join(","), "C");
}

/* ── parseSource: the same parse for a ref and for the file on disk ─────────── */

{
  const src = 'const EQUIPMENT = [\n  { "id": "bench", "label": "Bench" }\n];\n' +
    `const BATCH_X = ${JSON.stringify([rec("a"), rec("b")], null, 2)};\n` +
    "EXERCISES.push.apply(EXERCISES, BATCH_X);\n";
  eq("records are read from a named block, and taxonomy arrays are not records",
    (parseSource(src) || []).map((r) => r.id).join(","), "a,b");
  eq("the checked-out file's Windows line endings read the same as git's",
    (parseSource(src.replace(/\n/g, "\r\n")) || []).map((r) => r.id).join(","), "a,b");
  ok("a block that is not JSON is reported, never executed",
    (parseSource(src + "const BATCH_BAD = [\n  { id: 'x' }\n];\n") || []).some((r) => r.__unparseable));
  eq("a file with no blocks reads as nothing", parseSource("module.exports = {};\n"), null);
}

/* ── worktreeReview: cards on the sheet before they are committed ─────────────
 *
 * The break, 2026-09-12 evening: a pass ran the sheet before committing, as
 * OPERATING.md said to. The sheet reads committed branches only, so it printed
 * "Nothing pending" over eight uncommitted cards, one of them blocked — and the
 * BLOCK went unreported until the next pass. A check that reports all-clear on work
 * it cannot see is the failure this whole toolchain exists to stop. */

{
  const head = [rec("a")];
  const decisions = { entries: [{ name: "Old Skip", action: "skip", reason: "decided earlier" }] };

  eq("a working tree that matches HEAD adds nothing to the sheet",
    worktreeReview(head, [rec("a")], decisions, decisions), null);

  const chair = rec("b", { description: "Sit on a chair with your knees bent. Lift your heels, then lower them slowly." });
  const w = worktreeReview(head, [rec("a"), chair], decisions, decisions);
  eq("uncommitted cards are reviewed before they are committed", w && w.records.map((r) => r.id).join(","), "b");
  ok("...with the same checks a branch gets",
    !!w && w.records[0].flags.some((f) => /raised surface/.test(f.what)), w && JSON.stringify(w.records[0].flags));

  const skipped = { entries: [...decisions.entries, { name: "New Skip", action: "skip", reason: "a pass decided this" }] };
  const d = worktreeReview(head, head, decisions, skipped);
  eq("an uncommitted queue skip on its own is enough to show the working tree",
    d && d.decisions.added.map((e) => e.name).join(","), "New Skip");
  eq("an unreadable file on disk is not mistaken for a clean one",
    worktreeReview(head, null, decisions, decisions) && "shown", "shown");
}

/* ── report ──────────────────────────────────────────────────────────────── */

if (failures.length) {
  console.error(`\n  ${pass} passed, ${failures.length} FAILED\n`);
  failures.forEach((f) => console.error("  ✗ " + f));
  console.error("");
  process.exit(1);
}
console.log(`\n  pending.mjs: ${pass} tests passed\n`);
