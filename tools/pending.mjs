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
export function addedRecords(branch) {
  const before = parseAt("main");
  const after = parseAt(branch);
  if (!before || !after) return null;
  const had = new Set(before.map((e) => e.id));
  return after.filter((e) => !had.has(e.id));
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

/* ── CLI ─────────────────────────────────────────────────────────────────── */

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const branches = pendingBranches();
  const out = { branches: [] };

  for (const b of branches) {
    const recs = addedRecords(b.branch);
    if (recs === null) { out.branches.push({ ...b, error: "could not read exercises.js on this branch" }); continue; }
    // parseAt, not loadAt — the latter executed the file and was replaced. This call
    // site survived the rename because nothing exercised it: there were no pending
    // branches on the day it was written, so the CLI path never ran. A review tool that
    // crashes the first time it has something to review is worth one regression test.
    const baseline = (parseAt("main") || []).flatMap((e) => [normalize(e.name), ...(e.aliases || []).map(normalize)]);
    out.branches.push({
      ...b,
      records: recs.map((r) => ({
        id: r.id, name: r.name, muscleGroup: r.muscleGroup, difficulty: r.difficulty,
        equipment: r.equipment, cue: r.cue, description: r.description,
        avoidIf: r.avoidIf, flags: checkRecord(r, baseline),
      })),
    });
  }

  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(out, null, 2));
    process.exit(0);
  }

  if (!branches.length) {
    console.log("\nNothing pending. No unmerged bellows/* branches.\n");
    process.exit(0);
  }

  const total = out.branches.reduce((n, b) => n + (b.records ? b.records.length : 0), 0);
  const blocked = out.branches.flatMap((b) => b.records || []).filter((r) => r.flags.some((f) => f.level === "block")).length;
  console.log(`\nPending review — ${out.branches.length} branch(es), ${total} new record(s), ${blocked} with blocking flags\n`);

  for (const b of out.branches) {
    console.log(`── ${b.branch}  (${b.when}, ${b.ahead} commit${b.ahead === 1 ? "" : "s"})`);
    console.log(`   ${b.subject}`);
    if (b.error) { console.log(`   ERROR: ${b.error}\n`); continue; }
    if (!b.records.length) { console.log("   no new exercise records\n"); continue; }
    for (const r of b.records) {
      const worst = r.flags.some((f) => f.level === "block") ? "✗" : r.flags.some((f) => f.level === "warn") ? "!" : "·";
      console.log(`\n   ${worst} ${r.name}   [${(r.equipment || []).join(", ")}] ${r.muscleGroup} / ${r.difficulty}`);
      console.log(`     cue: ${r.cue}`);
      console.log(`     ${r.description}`);
      console.log(`     avoidIf: ${(r.avoidIf || []).join(", ") || "(none)"}`);
      for (const f of r.flags) console.log(`     ${f.level.toUpperCase()}: ${f.what}`);
    }
    console.log("");
  }

  console.log("Merge what survives, drop what does not, and say which and why.");
  console.log("Nothing here is merged automatically.\n");
  process.exit(0);
}
