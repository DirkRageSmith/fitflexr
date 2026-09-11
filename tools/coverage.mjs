#!/usr/bin/env node
/*
 * tools/coverage.mjs — what the WORLD has that this library does not.
 *
 * Run:  node tools/coverage.mjs            human-readable
 *       node tools/coverage.mjs --json     machine-readable
 *       node tools/coverage.mjs --queue N  the next N named absences, as a work queue
 *
 * WHY THIS EXISTS, AND WHY tools/gaps.mjs COULD NOT DO IT.
 *
 * `gaps.mjs` compares the library TO ITSELF: is any muscle group thin relative
 * to its peers, does any tier lose a movement pattern. That is the right
 * question for "is this library balanced enough to generate good sessions from",
 * and it answers it well. It is structurally incapable of answering a different
 * and equally real question: **is anything missing that exists in the world?**
 *
 * A library holding three yoga poses would report perfectly balanced under
 * gaps.mjs if every group held three. Self-referential measurement cannot see
 * outward. That blind spot had a cost: Bellows' OPERATING.md rule 5 permits
 * delegated exercise-card work but requires it to "cite the gaps.mjs finding or
 * the measured absence it fills" — and with gaps.mjs reporting zero FitFlexr
 * findings and no other measurement existing, there was nothing citable, so a
 * standing instruction to expand the library could not legally be executed. The
 * rule was not too strict. The measurement was too narrow.
 *
 * So this tool measures against EXTERNAL REFERENCES, vendored in tools/refs/,
 * and emits NAMED absences. "Split Clean is not in the library" is a citable
 * measured absence in a way "make more cards" never is.
 *
 * WHY THE REFERENCES ARE VENDORED. Bellows runs unattended with no network and
 * `--strict-mcp-config`. A tool that needs to fetch is a tool Bellows cannot
 * run. Refresh them deliberately with tools/refresh-refs.mjs, never at run time.
 *
 * ON THE LICENSING, WHICH IS NOT THE SAME FOR EVERY REFERENCE:
 *   · free-exercise-db — METADATA ONLY, and only the metadata. The repo declares
 *     Unlicense, but its IMAGE provenance has been asked at least three times
 *     (issues #2, #12, #13) and never answered, and the file naming matches a
 *     commercial database. Names and equipment tags are facts and facts are not
 *     copyrightable; the photographs are a risk this project does not take.
 *     A NAME FROM HERE IS A PROMPT, NEVER A PASTE — write our own card.
 *   · asanas — Wikipedia, CC BY-SA 4.0. Sanskrit names are used as identifiers
 *     to point at a pose. If any Wikipedia PROSE is ever shipped, attribution
 *     becomes mandatory. Descriptions must be written here, not copied.
 *
 * IT READS. It never writes, never calls a model, never touches the network.
 */

import { createRequire } from "node:module";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const require = createRequire(import.meta.url);
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const REFS = join(HERE, "refs");

export const STRETCH_CATEGORIES = new Set(["warmup", "cooldown"]);

/* ── name normalisation ──────────────────────────────────────────────────────
 *
 * The whole tool rests on "does this library already have this exercise", and a
 * naive exact-string check answers that wrong in both directions. Measured on
 * the real data: exact-key matching called 748 of 876 free-exercise-db entries
 * absent, while subset matching called 458 absent. The truth is in between, and
 * the tool must lean toward saying COVERED — a false "missing" wastes a
 * generation pass and, worse, produces a duplicate card that has to be deleted
 * rather than edited. Over-reporting absence is the expensive error here. */

const STOP = new Set([
  "the", "a", "with", "and", "to", "on", "of", "or", "in", "for",
  "version", "variation", "alternate", "alternating", "style", "standard",
]);

/* Words that make it a DIFFERENT exercise rather than a phrasing of the same one.
 *
 * Without this, containment matching swallows real distinctions: "Incline Barbell
 * Bench Press" is a strict superset of "Barbell Bench Press", so every word of the
 * shorter name is present and it matched at 100%. Incline is a different lift.
 *
 * Word-counting alone cannot separate that from "Barbell Bench Press - Medium
 * Grip", which IS the same lift and has exactly the same shape. The difference is
 * semantic, so it takes a curated list: if one name carries any of these and the
 * other does not, they are not the same exercise no matter how much else overlaps.
 * "medium" and "grip" are deliberately absent — a grip width note is a variant,
 * while "close" and "wide" grips are named exercises in their own right. */
const DISCRIMINATING = new Set([
  "incline", "decline", "seated", "standing", "kneeling", "lying", "prone", "supine",
  "bentover", "reverse", "close", "wide", "deficit", "elevated", "paused", "tempo",
  "eccentric", "isometric", "assisted", "jump", "plyo", "smith", "single", "double",
  "overhead", "behind", "front", "rear", "side", "split", "walking", "hanging",
]);

const SYNONYMS = new Map(Object.entries({
  one: "single", "1": "single", two: "double", "2": "double",
  bodyweight: "", weighted: "", body: "", only: "", free: "",
  db: "dumbbell", bb: "barbell", kb: "kettlebell", ez: "ezbar",
  up: "", ups: "", down: "", downs: "",
  bent: "bentover", over: "",
  legged: "leg", armed: "arm", sided: "side",
}));

const tok = (s) => (s || "").toLowerCase().match(/[a-z0-9]+/g) || [];

export function normalize(name) {
  const stem = (t) => (t.length > 3 && t.endsWith("s") ? t.slice(0, -1) : t);
  return new Set(
    tok(name)
      .map((t) => (SYNONYMS.has(t) ? SYNONYMS.get(t) : stem(t)))
      .filter((t) => t && !STOP.has(t))
  );
}

/**
 * Is `name` already represented in the library?
 *
 * Containment in EITHER direction counts: "Bench Press" covers "Barbell Bench
 * Press - Medium Grip", and "Single-Arm Dumbbell Row" covers "One Arm Dumbbell
 * Row". Requiring two shared meaningful words stops "Row" matching everything.
 */
export function isCovered(name, librarySets) {
  const a = normalize(name);
  if (!a.size) return true; // unparseable — assume covered rather than queue junk
  for (const b of librarySets) {
    if (!b.size) continue;
    let inter = 0;
    for (const w of a) if (b.has(w)) inter++;
    if (!inter) continue;
    // A discriminating word present on one side and not the other means these are
    // different exercises, however much else they share.
    let divergent = false;
    for (const w of a) if (!b.has(w) && DISCRIMINATING.has(w)) { divergent = true; break; }
    if (!divergent) for (const w of b) if (!a.has(w) && DISCRIMINATING.has(w)) { divergent = true; break; }
    if (divergent) continue;

    if (a.size === 1 && b.size === 1 && inter === 1) return true;
    if (inter >= 2 && (inter / a.size >= 0.8 || inter / b.size >= 0.8)) return true;
  }
  return false;
}

/* ── data ────────────────────────────────────────────────────────────────── */

export function loadLibrary(dir = ROOT) {
  const m = require(join(dir, "exercises.js"));
  return {
    exercises: m.EXERCISES,
    groups: (m.MUSCLE_GROUPS || []).map((g) => g.name),
    equipment: (m.EQUIPMENT || []).map((e) => e.id),
  };
}

export function loadRef(file) {
  const p = join(REFS, file);
  if (!existsSync(p)) return null;
  return JSON.parse(readFileSync(p, "utf8"));
}

/* free-exercise-db equipment strings are not our EQUIPMENT ids. Map the ones
 * that translate; leave the rest unmapped and SAY SO rather than guessing, so a
 * batch is never specified against gear the app does not model. */
const EQUIP_MAP = {
  "body only": ["bodyweight"],
  none: ["bodyweight"],
  dumbbell: ["dumbbell"],
  barbell: ["barbell"],
  kettlebells: ["kettlebell"],
  cable: ["cable"],
  machine: ["machine"],
  bands: ["resistance-band"],
  "medicine ball": ["medicine-ball"],
  "e-z curl bar": ["ez-bar"],
  "exercise ball": null,   // no id — deliberately unmapped
  "foam roll": null,       // recovery kit, not trained gear
  other: null,
};

/* ── analysis ────────────────────────────────────────────────────────────── */

export function analyse(lib) {
  const librarySets = [];
  for (const e of lib.exercises) {
    librarySets.push(normalize(e.name));
    for (const a of e.aliases || []) librarySets.push(normalize(a));
  }

  const moves = lib.exercises.filter((e) => !STRETCH_CATEGORIES.has(e.category));
  const stretches = lib.exercises.filter((e) => STRETCH_CATEGORIES.has(e.category));

  const report = { library: { total: lib.exercises.length, moves: moves.length, stretches: stretches.length }, refs: [], missing: [], notes: [] };

  /* ---- reference 1: free-exercise-db (metadata only) ------------------- */
  const fedb = loadRef("free-exercise-db.json");
  if (!fedb) {
    report.notes.push("free-exercise-db.json not vendored — run tools/refresh-refs.mjs");
  } else {
    const absent = fedb.entries.filter((e) => !isCovered(e.n, librarySets));
    report.refs.push({
      id: "free-exercise-db",
      license: fedb.license,
      total: fedb.entries.length,
      covered: fedb.entries.length - absent.length,
      absent: absent.length,
    });
    for (const e of absent) {
      const mapped = Object.prototype.hasOwnProperty.call(EQUIP_MAP, e.eq) ? EQUIP_MAP[e.eq] : undefined;
      report.missing.push({
        ref: "free-exercise-db",
        name: e.n,
        refEquipment: e.eq,
        equipment: mapped === undefined ? null : mapped,
        equipmentResolved: mapped !== undefined && mapped !== null,
        category: e.c,
        level: e.l,
        refMuscles: e.m,
      });
    }
    /* This count is DELIBERATELY not reported here. Before the policy runs, the
     * unresolved-equipment number is a pre-policy figure, and the policy remaps
     * and excludes a large share of it — an earlier version printed "175
     * unresolved" underneath a table showing 66 of them already remapped. A note
     * describing a state that a later step has already changed is the exact
     * failure this repo keeps hitting, so the note is emitted in applyPolicy(),
     * after the decisions are final. */
  }

  /* ---- reference 2: wger — REMOVED 2026-09-08, by Matt: "no straight up no"
   *
   * wger was vendored for one day because its per-record descriptions turn card
   * generation from RECALL into REWRITE, which measurably stopped the model
   * fabricating exercise mechanics. It is gone because every record is CC-BY-SA
   * with a named author, a rewrite of one is a derivative, and Matt does not
   * want that obligation on this library. That is a licensing decision, not a
   * technical one, and it is his to make.
   *
   * DO NOT RE-ADD IT without asking. The accuracy argument for it is real and
   * will look compelling again to whoever reads the measurement next; the answer
   * was still no. The grounding problem it solved is now solved by writing the
   * descriptions here instead — original text, no obligation.
   */

  /* ---- reference 3: asanas (Wikipedia) --------------------------------- */
  const asanas = loadRef("asanas.json");
  if (!asanas) {
    report.notes.push("asanas.json not vendored — run tools/refresh-refs.mjs");
  } else {
    /* HONEST LIMITATION, STATED RATHER THAN PAPERED OVER.
     * The library names poses in English ("Downward-Facing Dog"); the reference
     * names them in Sanskrit ("Adho Mukha Shvanasana"), and only 13 of 88 rows
     * carry an English name. There is no way to match those two strings without
     * a Sanskrit->English map, and inventing one here would produce confident
     * nonsense. So every asana whose English name is unknown is reported as
     * UNRESOLVED — a thing a human or a model must name before it can be
     * measured — and never as "missing", which would be a claim this tool
     * cannot support. */
    const resolved = [];
    const unresolved = [];
    for (const a of asanas.entries) {
      const candidates = [a.english, a.sanskrit].filter(Boolean);
      const known = a.english ? isCovered(a.english, librarySets) : null;
      const sanskritKnown = isCovered(a.sanskritClean || a.sanskrit, librarySets);
      if (known === true || sanskritKnown) { resolved.push({ ...a, covered: true }); continue; }
      if (a.english) resolved.push({ ...a, covered: false });
      else unresolved.push(a);
    }
    const absent = resolved.filter((r) => !r.covered);
    report.refs.push({
      id: "asanas",
      license: asanas.license,
      total: asanas.entries.length,
      covered: resolved.filter((r) => r.covered).length,
      absent: absent.length,
      unresolved: unresolved.length,
    });
    for (const a of absent)
      report.missing.push({
        /* cardName, not english. The raw English cell yields names like
         * "Accomplished" and "Bound angle", which would ship as card titles.
         * cardName is house style — "Corpse Pose (Savasana)" — matching the 56
         * yoga poses already in the library. */
        ref: "asanas", name: a.cardName || a.english, sanskrit: a.sanskritClean || a.sanskrit,
        equipment: ["bodyweight"], equipmentResolved: true,
        category: "cooldown", poseType: a.type || null,
      });
    if (unresolved.length)
      report.notes.push(
        `${unresolved.length} of ${asanas.entries.length} asanas carry no English name in the ` +
        `reference, so coverage CANNOT be determined for them and they are excluded from the ` +
        `missing count. Resolving Sanskrit -> English is the cheapest next step on the yoga lane: ` +
        `it converts ${unresolved.length} unknowns into a yes/no.`
      );
  }

  // Stable order so a queue is reproducible across passes: by reference, then name.
  report.missing.sort((a, b) => (a.ref === b.ref ? String(a.name).localeCompare(String(b.name)) : a.ref.localeCompare(b.ref)));

  applyPolicy(report);
  return report;
}

/* ── inclusion policy ────────────────────────────────────────────────────────
 *
 * The policy is DATA, applied here, rather than prose in a document. A ruling
 * that lives only in a markdown file is a ruling nothing enforces — this repo's
 * own history is a list of documents that confidently described a state nothing
 * checked.
 *
 * Rules are applied IN ORDER, first match wins, so a specific rule placed above
 * a general one beats it. Four actions:
 *   include  keep it in the queue
 *   exclude  drop it, and record which rule dropped it
 *   remap    keep it, overriding the equipment the reference could not resolve
 *   review   keep it visible but NEVER put it in an unattended queue
 */
export function applyPolicy(report, policy = loadPolicy()) {
  report.policy = policy
    ? { status: policy.status, version: policy.version, rules: policy.rules.length,
        unconfirmed: policy.rules.filter((r) => !r.confirmed).length }
    : null;
  report.excluded = [];

  if (!policy) {
    report.notes.push("no tools/inclusion-policy.json — every absence is treated as includable");
    for (const m of report.missing) m.decision = "include";
    return report;
  }

  const tally = {};
  const kept = [];
  for (const m of report.missing) {
    const rule = policy.rules.find((r) => matchesRule(m, r.match));
    const action = rule ? rule.action : (policy.defaultAction || "include");
    tally[rule ? rule.id : "(default)"] = (tally[rule ? rule.id : "(default)"] || 0) + 1;
    m.decision = action;
    m.rule = rule ? rule.id : null;
    if (action === "exclude") { report.excluded.push(m); continue; }
    if (action === "remap" && rule.remapEquipment) {
      m.equipment = rule.remapEquipment;
      m.equipmentResolved = true;
    }
    kept.push(m);
  }
  report.missing = kept;
  report.policyTally = tally;

  // Computed AFTER the policy, so it describes what is actually left rather than
  // what was true before the remaps and exclusions ran.
  const stillUnresolved = kept.filter((m) => !m.equipmentResolved);
  if (stillUnresolved.length) {
    const buckets = {};
    for (const m of stillUnresolved) buckets[m.refEquipment ?? "null"] = (buckets[m.refEquipment ?? "null"] || 0) + 1;
    report.notes.push(
      `${stillUnresolved.length} kept entries still have no equipment this app models ` +
      `(${Object.entries(buckets).map(([k, v]) => `${k}: ${v}`).join(", ")}). They are held out of ` +
      `the queue and must be re-gear'd by a human, never guessed.`
    );
  }

  /* A DRAFT POLICY MUST NOT RUN UNATTENDED. It still filters here so you can see
   * what it would do, but --queue refuses while status is not "adopted". An
   * unread draft silently deciding the shape of the library is precisely the
   * failure mode this project keeps rediscovering. */
  if (policy.status !== "adopted")
    report.notes.push(
      `inclusion policy is "${policy.status}", not "adopted" — ${report.policy.unconfirmed} of ` +
      `${policy.rules.length} rules are unconfirmed. Its effect is shown above, but --queue is ` +
      `refused until you set status to "adopted" in tools/inclusion-policy.json.`
    );
  return report;
}

function matchesRule(item, match) {
  if (!match) return false;
  /* Rules may be scoped to one reference, and for the equipment rules they MUST
   * be. `refEquipment: null` means different things in different references: on
   * free-exercise-db it is a floor stretch needing nothing, on wger it means the
   * gear was simply never recorded. Left unscoped, the remap rule tagged 91
   * wger entries of unknown gear as bodyweight-only — the same mislabelling
   * already found in the shipped data. */
  if (match.ref && item.ref !== match.ref) return false;
  if (Object.prototype.hasOwnProperty.call(match, "refEquipment")) {
    // `null` in the policy means the reference genuinely had no equipment, which
    // is different from the key being absent — so compare explicitly.
    if ((item.refEquipment ?? null) !== match.refEquipment) return false;
  }
  if (match.category && item.category !== match.category) return false;
  if (match.namePattern && !new RegExp(match.namePattern, "i").test(item.name || "")) return false;
  return true;
}

export function loadPolicy() {
  const p = join(HERE, "inclusion-policy.json");
  if (!existsSync(p)) return null;
  const raw = JSON.parse(readFileSync(p, "utf8"));
  if (!Array.isArray(raw.rules)) throw new Error("inclusion-policy.json has no rules array");
  return raw;
}

/* ── history: making "better every day" a number, not a claim ────────────────
 *
 * A pass that says "I did work" and a pass that says "nothing to do" look the
 * same in a log a week later. This repo's whole documented failure mode is a
 * confident sentence nobody checked, so progress on the library is recorded as
 * a measurement with a date on it, and the delta between runs is printed.
 *
 * It ratchets in one direction on purpose: if a day's passes add nothing, the
 * delta is 0 and that zero is visible in HANDOFF.md rather than absorbed into
 * prose. An unchanged number is the honest report of an idle day.
 */

const HISTORY = join(HERE, "coverage-history.json");

/** Local calendar date (not UTC): a 19:00 Pacific pass is still "today" here,
 *  where `toISOString().slice(0, 10)` would already read as tomorrow. */
function localDate(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function snapshot(report, today = localDate()) {
  return {
    date: today,
    libraryTotal: report.library.total,
    libraryMoves: report.library.moves,
    covered: report.refs.reduce((n, r) => n + r.covered, 0),
    absent: report.refs.reduce((n, r) => n + r.absent, 0),
    ready: report.missing.filter((m) => m.equipmentResolved && m.name && m.decision !== "review").length,
    refs: Object.fromEntries(report.refs.map((r) => [r.id, { covered: r.covered, absent: r.absent }])),
  };
}

export function readHistory() {
  if (!existsSync(HISTORY)) return [];
  try {
    const j = JSON.parse(readFileSync(HISTORY, "utf8"));
    return Array.isArray(j.entries) ? j.entries : [];
  } catch { return []; }
}

/** Latest entry for a DIFFERENT day than `snap` — the right baseline for a
 *  daily delta, since two passes land on the same date and comparing against
 *  this morning's own entry would always read zero. */
export function previousDay(entries, snap) {
  for (let i = entries.length - 1; i >= 0; i--) if (entries[i].date !== snap.date) return entries[i];
  return null;
}

export function describeDelta(snap, prev) {
  if (!prev) return "no earlier measurement — this is the baseline";
  const d = (a, b) => { const n = a - b; return n === 0 ? "0" : (n > 0 ? `+${n}` : `${n}`); };
  return [
    `since ${prev.date}:`,
    `library ${d(snap.libraryTotal, prev.libraryTotal)}`,
    `covered ${d(snap.covered, prev.covered)}`,
    `absent ${d(snap.absent, prev.absent)}`,
    `ready ${d(snap.ready, prev.ready)}`,
  ].join("  ");
}

/* ── CLI ─────────────────────────────────────────────────────────────────── */

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const argv = process.argv.slice(2);
  const r = analyse(loadLibrary());

  const qi = argv.indexOf("--queue");

  if (argv.includes("--record") || argv.includes("--delta")) {
    const snap = snapshot(r);
    const entries = readHistory();
    const prev = previousDay(entries, snap);
    if (argv.includes("--record")) {
      // One entry per DAY, last write wins. Two passes a day would otherwise
      // make the file grow faster than the thing it measures.
      const kept = entries.filter((e) => e.date !== snap.date);
      kept.push(snap);
      writeFileSync(HISTORY, JSON.stringify({
        $comment: "Written by tools/coverage.mjs --record. One entry per day, last write wins. This is the daily ratchet: an unchanged number is the honest report of an idle day.",
        entries: kept,
      }, null, 2) + "\n", "utf8");
    }
    console.log(`coverage ${snap.date}: library ${snap.libraryTotal} · covered ${snap.covered} · absent ${snap.absent} · ready ${snap.ready}`);
    console.log(describeDelta(snap, prev));
    process.exit(0);
  }

  if (argv.includes("--json")) {
    console.log(JSON.stringify(r, null, 2));
  } else if (qi !== -1) {
    if (!r.policy || r.policy.status !== "adopted") {
      console.error(
        `\nrefusing to emit a queue: tools/inclusion-policy.json is ` +
        `"${r.policy ? r.policy.status : "missing"}", not "adopted".\n\n` +
        `  Read it, edit the rulings you disagree with, then set "status": "adopted".\n` +
        `  Run \`node tools/coverage.mjs\` to see exactly what it would keep and drop.\n\n` +
        `  Nothing runs unattended against rules nobody has agreed to.\n`
      );
      process.exit(2);
    }
    const n = Number(argv[qi + 1]) || 12;
    // A queue is only useful if every item is actionable, so gear-unresolved and
    // review-flagged entries are held back rather than handed over half-specified.
    //
    // GROUNDED ENTRIES GO FIRST. An entry carrying sourceText turns the job into
    // a rewrite; a name-only entry asks the model to recall, and it fabricates
    // when it recalls (measured: two of three name-only targets came back
    // describing the wrong movement while passing every check). Handing out the
    // safe work first is not a preference, it is the difference between a batch
    // a reviewer can trust and one they have to fact-check line by line.
    const q = r.missing
      .filter((m) => m.equipmentResolved && m.name && m.decision !== "review")
      .sort((a, b) => (b.sourceText ? 1 : 0) - (a.sourceText ? 1 : 0))
      .slice(0, n);
    console.log(JSON.stringify(q, null, 2));
  } else {
    console.log("\nFitFlexr coverage against external references\n");
    console.log(`LIBRARY  ${r.library.total} cards — ${r.library.moves} training moves, ${r.library.stretches} stretches\n`);
    console.log("REFERENCES");
    for (const ref of r.refs) {
      const extra = ref.unresolved ? `, ${ref.unresolved} unresolved` : "";
      console.log(`  ${ref.id.padEnd(20)} ${ref.covered}/${ref.total} covered · ${ref.absent} ABSENT${extra}`);
      console.log(`  ${" ".repeat(20)} ${ref.license}`);
    }
    if (r.policy) {
      console.log(`\nINCLUSION POLICY  v${r.policy.version} · status "${r.policy.status}" · ` +
        `${r.policy.rules} rules, ${r.policy.unconfirmed} unconfirmed`);
      for (const [id, n] of Object.entries(r.policyTally || {}).sort((a, b) => b[1] - a[1]))
        console.log(`  ${id.padEnd(34)} ${n}`);
      console.log(`  ${"→ excluded".padEnd(34)} ${r.excluded.length}`);
    }

    const review = r.missing.filter((m) => m.decision === "review");
    const actionable = r.missing.filter((m) => m.equipmentResolved && m.name && m.decision !== "review");
    console.log(`\nNAMED ABSENCES  ${r.missing.length} kept · ${actionable.length} ready to write · ` +
      `${review.length} held for your review · ${r.excluded.length} excluded\n`);
    const byCat = {};
    for (const m of actionable) byCat[m.category] = (byCat[m.category] || 0) + 1;
    for (const [c, n] of Object.entries(byCat).sort((a, b) => b[1] - a[1]))
      console.log(`  ${String(c).padEnd(24)} ${n}`);
    console.log("\n  first 8 of the queue:");
    for (const m of actionable.slice(0, 8))
      console.log(`    ${String(m.name).padEnd(40)} [${(m.equipment || []).join(", ") || "?"}]`);
    if (r.notes.length) {
      console.log("\nNOTES");
      for (const n of r.notes) console.log("  · " + n);
    }
    console.log("");
  }
  // Absence is never a failure — this is a work queue, not a defect report.
  process.exit(0);
}
