#!/usr/bin/env node
/*
 * tools/gaps.mjs — what is MISSING from the exercise library, measured against
 * what the app actually does with it.
 *
 * Run:  node tools/gaps.mjs           human-readable
 *       node tools/gaps.mjs --json    machine-readable
 *       node tools/gaps.mjs --brief   generation specifications only
 *
 * WHY THIS EXISTS.
 *
 * Ragesmith's tools/gaps.mjs already measures one axis of this library —
 * Beginner bodyweight-only moves per muscle group — and as of 2026-09-04 it
 * reports NO gap: every group carries 5-12, median 6. That answer is correct
 * and it is not the whole question, because the library does not exist to be
 * counted. It exists to be consumed by `generateSession()` and by the deck,
 * under a specific user's gear, injuries and goal. The question worth asking
 * is not "how many cards are there" but "for which real user configurations
 * does this library run out, flatten, or silently ignore what the user asked
 * for". That is a specification. "Make more cards" is not.
 *
 * THREE CATEGORIES, NEVER MIXED — the separation is the whole design, and it is
 * lifted deliberately from Ragesmith's tool, which earned it:
 *
 *   BLOCKED   a configuration the UI OFFERS but the data cannot serve. The user
 *             picks something legal and gets an empty or truncated deck. These
 *             are defects. Exit 1.
 *   THIN      relative, ranked, no rule broken. Measured against the MEDIAN of
 *             its own peers, never against a constant, because a constant is
 *             wrong the moment the library grows and is its own kind of drift.
 *             Never affects the exit code.
 *   FACTS     context numbers that are neither good nor bad, printed so a human
 *             can argue with them. The weeks-of-variety figure lives here, and
 *             it is the number most likely to talk you OUT of generating.
 *
 * IT READS. It never writes, never calls a model, never touches the network.
 *
 * MIRRORED LOGIC WARNING. app.js is a DOM-bound IIFE and cannot be imported, so
 * ownsGear/passesConditions/isStretch are re-implemented below. They are small
 * and they are pinned by tools/gaps.test.mjs against the real dataset. If the
 * app's filter semantics ever change, this tool goes stale silently — that is
 * exactly the failure mode ADR-028 warns about, so the test asserts the
 * SEMANTICS (superset gear test, avoidIf intersection) and not just the counts.
 */

import { createRequire } from "node:module";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

/* ── constants mirrored from app.js ──────────────────────────────────────── */

/* Gear presets, verbatim from app.js PRESETS. "Bodyweight" is the floor case
 * and "Home" is Matt's own kit; those two carry the product. */
export const PRESETS = [
  { id: "bodyweight", label: "Bodyweight", gear: ["bodyweight"] },
  { id: "home", label: "Home", gear: ["bodyweight", "dumbbell", "bench"] },
  { id: "home-plus", label: "Home+", gear: ["bodyweight", "dumbbell", "bench", "resistance-band", "kettlebell", "pull-up-bar"] },
  { id: "gym", label: "Full gym", gear: null }, // null = everything
];

/* GOAL_CONFIG, verbatim from app.js. Only `focus` and `maxDifficulty` affect
 * which exercises can win a slot, so only those are mirrored. */
export const GOAL_CONFIG = {
  "lose-fat": { focus: ["endurance", "power"] },
  "build-muscle": { focus: ["hypertrophy"] },
  "strength": { focus: ["strength"], preferMechanic: "Compound" },
  "athletic": { focus: ["power"] },
  "general": { focus: ["strength", "hypertrophy"] },
  "mobility": { focus: ["mobility"] },
  "rehab": { focus: ["mobility", "endurance"], maxDifficulty: "Beginner" },
  "beginner": { focus: ["strength"], maxDifficulty: "Beginner" },
};

export const TIME_COUNT = { 15: 3, 30: 4, 45: 4, 60: 5, 90: 6 };
export const WORKOUT_CAP = 10;
export const STRETCH_CATEGORIES = new Set(["warmup", "cooldown"]);

/* A group the deck can be narrowed to must be able to FILL a Stack, because the
 * UI lets you pick exactly one group and then swipe to the cap. Falling short is
 * a dead end the app offered you. */
const GROUP_FLOOR = WORKOUT_CAP;

/* Below THIN_RATIO of the median is a thin spot. A median needs peers to mean
 * anything — two groups is not a distribution. */
const THIN_RATIO = 0.6;
const MIN_PEERS = 3;

/* Sessions per week × moves per session, used only for the variety FACT. Three
 * sessions of five is an ordinary beginner week. */
const WEEK_MOVES = 15;

/* ── data access ─────────────────────────────────────────────────────────── */

export function loadLibrary(dir = ROOT) {
  const m = require(join(dir, "exercises.js"));
  return {
    exercises: m.EXERCISES,
    groups: (m.MUSCLE_GROUPS || []).map((g) => g.name).filter(Boolean),
    equipment: (m.EQUIPMENT || []).map((e) => e.id),
    conditions: (m.CONDITIONS || []).map((c) => c.id),
  };
}

export const isStretch = (ex) => STRETCH_CATEGORIES.has(ex.category);

/* Superset test, mirroring app.js ownsGear: an exercise shows only if you own
 * EVERY item it lists. A null gear set means a full gym — own everything. */
export const ownsGear = (ex, gear) =>
  gear === null || (ex.equipment || []).every((e) => gear.has(e));

/* Mirrors app.js passesConditions: any overlap between avoidIf and the user's
 * declared conditions removes the exercise BEFORE they ever see it. */
export const passesConditions = (ex, avoid) =>
  !(ex.avoidIf || []).some((t) => avoid.has(t));

/* ── the analysis ────────────────────────────────────────────────────────── */

export function analyse(lib) {
  const blocked = [];
  const thin = [];
  const facts = [];

  const moves = lib.exercises.filter((e) => !isStretch(e));
  const stretches = lib.exercises.filter(isStretch);

  /* The group universe comes from MUSCLE_GROUPS, never from the records. Deriving
   * it from the records makes the worst possible gap invisible: a group with zero
   * training moves would simply vanish from the table instead of reporting that it
   * has nothing. Ragesmith's tool learned this the hard way and it applies here
   * with more force, because the muscle-group filter UI is generated from
   * MUSCLE_GROUPS — every one of these is a button a user can press. */
  const GROUPS = lib.groups;

  const tiers = PRESETS.map((p) => ({
    ...p,
    gear: p.gear === null ? null : new Set(p.gear),
    pool: moves.filter((e) => ownsGear(e, p.gear === null ? null : new Set(p.gear))),
  }));

  /* ---- FACT: what the library holds ------------------------------------ */
  facts.push({
    id: "library-size",
    text: `${moves.length} training moves + ${stretches.length} stretches = ${lib.exercises.length} cards`,
  });

  for (const t of tiers) {
    const weeks = (t.pool.length / WEEK_MOVES).toFixed(1);
    facts.push({
      id: "variety",
      tier: t.id,
      count: t.pool.length,
      weeks: Number(weeks),
      text: `${t.label}: ${t.pool.length} moves = ${weeks} weeks of training before any exercise must repeat (3 sessions/week × 5 moves)`,
    });
  }

  /* ---- BLOCKED: a muscle group the UI offers but cannot fill a Stack ---- */
  for (const t of tiers) {
    for (const g of GROUPS) {
      const n = t.pool.filter((e) => e.muscleGroup === g).length;
      if (n < GROUP_FLOOR) {
        blocked.push({
          id: "group-cannot-fill-stack",
          tier: t.id,
          group: g,
          have: n,
          need: GROUP_FLOOR,
          evidence: `${t.label} + "${g}" only: ${n} move${n === 1 ? "" : "s"}, so the deck runs dry ${GROUP_FLOOR - n} short of the ${GROUP_FLOOR}-move Stack cap`,
          spec: { tier: t.id, gear: t.gear ? [...t.gear] : "any", muscleGroup: g, count: GROUP_FLOOR - n },
        });
      }
    }
  }

  /* ---- BLOCKED: a goal whose focus tag nothing in the tier carries ------
   * generateSession scores +3 for a focus match. If a (tier × goal) slice has
   * ZERO matching exercises, the goal is silently inert — the user picks "build
   * muscle", the app says "5 moves · 4 × 10", and the selection is identical to
   * what any other goal would have produced. Nothing errors; it just lies. */
  for (const t of tiers) {
    for (const [goal, cfg] of Object.entries(GOAL_CONFIG)) {
      let elig = t.pool;
      if (cfg.maxDifficulty === "Beginner") elig = elig.filter((e) => e.difficulty !== "Advanced");
      const hits = elig.filter((e) => (cfg.focus || []).some((f) => (e.focus || []).includes(f)));
      const most = Math.max(...Object.values(TIME_COUNT));
      if (hits.length < most) {
        blocked.push({
          id: "goal-focus-starved",
          tier: t.id,
          goal,
          have: hits.length,
          need: most,
          evidence: `${t.label} + goal "${goal}" (focus ${JSON.stringify(cfg.focus)}): only ${hits.length} move${hits.length === 1 ? "" : "s"} carry that focus, but a 90-minute session asks for ${most}`,
          spec: { tier: t.id, gear: t.gear ? [...t.gear] : "any", goal, focus: cfg.focus, count: most - hits.length },
        });
      }
    }
  }

  /* ---- BLOCKED: an injury filter that empties a tier -------------------- */
  for (const t of tiers) {
    for (const c of lib.conditions) {
      const left = t.pool.filter((e) => passesConditions(e, new Set([c])));
      const most = Math.max(...Object.values(TIME_COUNT));
      if (left.length < most) {
        blocked.push({
          id: "condition-empties-tier",
          tier: t.id,
          condition: c,
          have: left.length,
          need: most,
          evidence: `${t.label} + "${c}": only ${left.length} move${left.length === 1 ? "" : "s"} survive the safety filter`,
          spec: { tier: t.id, gear: t.gear ? [...t.gear] : "any", avoidCondition: c, count: most - left.length },
        });
      }
    }
  }

  /* ---- THIN: progression ceiling ---------------------------------------
   * The gap Ragesmith's per-group count cannot see. A group can hold a healthy
   * pile of Beginner moves and still be a dead end, because there is nothing
   * above them: six months in, the user has nowhere to go. Measured as the count
   * of NON-Beginner moves, against the median of its peers in the same tier —
   * so it stays relative and cannot be fooled by the library growing. */
  for (const t of tiers) {
    const above = Object.fromEntries(GROUPS.map((g) => [
      g,
      t.pool.filter((e) => e.muscleGroup === g && e.difficulty !== "Beginner").length,
    ]));
    thin.push(...belowMedian(above, "progression-ceiling",
      (g, n, med) => `${t.label} + ${g}: ${n} move${n === 1 ? "" : "s"} above Beginner, against a median of ${med} across the other groups`,
      (g, n, med) => `${Math.max(1, Math.round(med - n))} Intermediate/Advanced ${g} exercises for ${t.label}. It has ${n}, so a ${t.label} user who outgrows the beginner moves has nowhere to progress in this group.`,
      { tier: t.id, gear: t.gear ? [...t.gear] : "any", muscleGroup: null, difficulty: ["Intermediate", "Advanced"] }));
  }

  /* ---- pattern availability, measured as DECAY against the full library ---
   *
   * The obvious version of this check — count each pattern within a tier and
   * flag the ones below the median — is wrong twice over, and both ways were
   * live in the first draft:
   *
   *   1. Patterns are not peers of equal natural size. "Core" covers 68 moves
   *      and "Carry" covers 6 in the WHOLE library. Ranking Carry against the
   *      median of a set containing Core reports a gap that is really just the
   *      shape of human movement.
   *   2. Some patterns are structurally impossible at a tier. There is no
   *      bodyweight Carry, because a carry is defined by holding a load. A
   *      constant zero is not a thing to go and generate.
   *
   * What a home user actually needs to know is which patterns they LOSE by not
   * having a gym. So measure availability as a ratio of the same pattern's
   * full-library count — self-normalising, immune to pattern size — and rank
   * that ratio against the median ratio for the tier. A pattern that is zero at
   * a tier is reported separately, as a question rather than a finding, because
   * whether it is structural or a genuine hole is a judgement call and the tool
   * should not pretend to make it. */
  const ALL_PATTERNS = [...new Set(moves.map((e) => e.pattern).filter(Boolean))];
  for (const t of tiers) {
    if (t.gear === null) continue; // full gym IS the denominator; decay is 100% by definition
    const avail = {};
    for (const p of ALL_PATTERNS) {
      const total = moves.filter((e) => e.pattern === p).length;
      const here = t.pool.filter((e) => e.pattern === p).length;
      if (!total) continue;
      if (here === 0) {
        facts.push({
          id: "pattern-unreachable",
          tier: t.id,
          pattern: p,
          text: `${t.label}: no "${p}" moves at all (${total} exist with more gear). Structural, or a hole? "Carry" needs a load by definition; "Rotation" does not.`,
        });
        continue;
      }
      avail[p] = Math.round((here / total) * 100);
    }
    thin.push(...belowMedian(avail, "pattern-decay",
      (p, n, med) => `${t.label}: only ${n}% of the library's "${p}" moves are doable, against a median of ${med}% across the other patterns`,
      (p, n, med) => `More "${p}" exercises doable with ${t.label} gear. ${n}% of the library's ${p} moves survive this kit against a median of ${med}%, so it is the pattern this kit loses most.`,
      { tier: t.id, gear: t.gear ? [...t.gear] : "any", pattern: null }));
  }

  blocked.sort((a, b) => a.have - b.have);
  thin.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
  return { blocked, thin, facts };
}

/* Flag entries below THIN_RATIO of the median. Returns [] when there are too few
 * peers for a median to mean anything. `specBase` is stamped onto each result
 * with the subject filled in, so a thin spot IS a generation specification. */
function belowMedian(counts, id, evidence, brief, specBase) {
  const keys = Object.keys(counts);
  if (keys.length < MIN_PEERS) return [];
  const med = median(keys.map((k) => counts[k]));
  if (med <= 0) return [];
  return keys
    .filter((k) => counts[k] < med * THIN_RATIO)
    .sort((a, b) => counts[a] - counts[b])
    .map((k) => {
      const spec = { ...(specBase || {}), count: Math.max(1, Math.round(med - counts[k])) };
      for (const f of ["muscleGroup", "pattern"]) if (f in spec && spec[f] === null) spec[f] = k;
      return {
        id, kind: "thin", subject: k, rank: counts[k], median: med,
        /* Surfaced at the top level, not left buried in `spec`. The tier is half
         * the identity of a thin spot — "Back has no ladder" means nothing until
         * you know it is the bodyweight tier — and a --json consumer that has to
         * reach into spec to group by it will eventually forget to. */
        tier: spec.tier,
        evidence: evidence(k, counts[k], med),
        brief: brief(k, counts[k], med),
        spec,
      };
    });
}

function median(ns) {
  const s = [...ns].sort((a, b) => a - b);
  if (!s.length) return 0;
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/* ── CLI ─────────────────────────────────────────────────────────────────── */

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const argv = process.argv.slice(2);
  const lib = loadLibrary();
  const out = analyse(lib);

  if (argv.includes("--json")) {
    console.log(JSON.stringify(out, null, 2));
  } else if (argv.includes("--brief")) {
    const specs = [...out.blocked, ...out.thin].map((x) => x.spec).filter(Boolean);
    console.log(JSON.stringify(specs, null, 2));
  } else {
    console.log("\nFitFlexr content gaps\n");
    console.log("FACTS");
    out.facts.forEach((f) => console.log("  " + f.text));

    console.log(`\nBLOCKED — the UI offers this and the data cannot serve it (${out.blocked.length})`);
    if (!out.blocked.length) console.log("  none");
    out.blocked.forEach((b) => console.log(`  [${b.id}] ${b.evidence}`));

    console.log(`\nTHIN SPOTS — ranked candidates, no rule broken (${out.thin.length})`);
    if (!out.thin.length) console.log("  none");
    out.thin.forEach((t) => console.log(`  [${t.id}] ${t.evidence}`));
    console.log("");
  }
  process.exit(out.blocked.length ? 1 : 0);
}
