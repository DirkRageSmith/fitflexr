#!/usr/bin/env node
/*
 * FitFlexr dataset validator — the scripted gate (smoke-test item 4).
 * Run: node validate.js   (exits 1 on any hard contract violation)
 *
 * HARD (fail): the 10 core fields, unique kebab ids, valid muscle groups,
 * equipment as a non-empty array of valid EQUIPMENT ids, valid difficulty,
 * avoidIf ⊆ CONDITIONS, size + per-group minimums.
 * SOFT (warn only): the recommended metadata (mechanic/pattern/force/focus/
 * category/aliases/unilateral/homeFriendly) — a slip warns but still ships.
 */
"use strict";

const { MUSCLE_GROUPS, EQUIPMENT, CONDITIONS, SPORTS, EXERCISES } = require("./exercises.js");

const EXPECTED_CONDITION_IDS = [
  "lower-back", "knee", "shoulder", "wrist", "neck",
  "hip", "high-impact", "balance", "pregnancy",
];
const DIFFICULTY = ["Beginner", "Intermediate", "Advanced"];
const CORE_FIELDS = ["id", "name", "muscleGroup", "secondaryMuscles", "equipment", "difficulty", "cue", "description", "avoidIf", "icon"];
const MECHANIC = ["Compound", "Isolation"];
const PATTERNS = ["Horizontal Push", "Vertical Push", "Horizontal Pull", "Vertical Pull", "Squat", "Hinge", "Lunge", "Carry", "Rotation", "Core", "Conditioning", "Hip Abduction", "Stretch"];
// Categories that make an exercise a stretch rather than training volume. Must stay in
// sync with STRETCH_CATEGORIES in app.js — the app's two Stack caps depend on it.
const STRETCH_CATEGORIES = ["warmup", "cooldown"];
const FORCES = ["Push", "Pull", "Static", "Explosive"];
const FOCUS = ["strength", "hypertrophy", "endurance", "power", "mobility"];
const CATEGORY = ["strength", "conditioning", "stretch", "mobility", "warmup", "cooldown", "rehab", "carry", "power"];

const groupNames = new Set(MUSCLE_GROUPS.map((g) => g.name));
const equipIds = new Set(EQUIPMENT.map((e) => e.id));
const conditionIds = new Set(CONDITIONS.map((c) => c.id));
const sportIds = new Set((SPORTS || []).map((s) => s.id));

const errors = [];
const warnings = [];

// 1. Conditions contract.
for (const id of EXPECTED_CONDITION_IDS) {
  if (!conditionIds.has(id)) errors.push(`conditions: missing required id "${id}"`);
}
for (const c of CONDITIONS) {
  if (!EXPECTED_CONDITION_IDS.includes(c.id)) errors.push(`conditions: unexpected id "${c.id}"`);
  if (!c.label) errors.push(`conditions: "${c.id}" has no label`);
}
for (const e of EQUIPMENT) {
  if (!e.id || !/^[a-z0-9-]+$/.test(e.id)) errors.push(`equipment: bad id "${e.id}"`);
  if (!e.label) errors.push(`equipment: "${e.id}" has no label`);
}
if (!Array.isArray(SPORTS) || !SPORTS.length) errors.push("sports: SPORTS taxonomy missing or empty");
for (const s of SPORTS || []) {
  if (!s.id || !/^[a-z0-9-]+$/.test(s.id)) errors.push(`sports: bad id "${s.id}"`);
  if (!s.label) errors.push(`sports: "${s.id}" has no label`);
}

// 2. Per-exercise.
const seenIds = new Set();
const seenNames = new Map();
const perGroup = {}; for (const g of groupNames) perGroup[g] = 0;
const perEquip = {}; for (const e of equipIds) perEquip[e] = 0;
const metaCoverage = { mechanic: 0, pattern: 0, force: 0, focus: 0, category: 0, aliases: 0 };
const perSport = {}; for (const s of sportIds) perSport[s] = 0;
let stretchCount = 0;

for (const ex of EXERCISES) {
  const where = ex.id || ex.name || "(unnamed)";
  for (const f of CORE_FIELDS) if (ex[f] === undefined) errors.push(`${where}: missing required "${f}"`);
  if (seenIds.has(ex.id)) errors.push(`${where}: duplicate id`);
  seenIds.add(ex.id);
  // Unique ids aren't enough: two cards showing the same NAME in one deck just reads
  // as a bug to the user, even though the app can tell them apart.
  if (ex.name) {
    if (seenNames.has(ex.name)) errors.push(`${where}: duplicate name "${ex.name}" (also ${seenNames.get(ex.name)})`);
    else seenNames.set(ex.name, ex.id);
  }
  if (ex.id && !/^[a-z0-9-]+$/.test(ex.id)) errors.push(`${where}: id not kebab-case`);
  if (!groupNames.has(ex.muscleGroup)) errors.push(`${where}: unknown muscleGroup "${ex.muscleGroup}"`);
  else perGroup[ex.muscleGroup]++;
  for (const m of ex.secondaryMuscles || []) if (!groupNames.has(m)) errors.push(`${where}: unknown secondary "${m}"`);
  if (!Array.isArray(ex.equipment) || ex.equipment.length === 0) {
    errors.push(`${where}: equipment must be a non-empty array of EQUIPMENT ids`);
  } else {
    for (const e of ex.equipment) {
      if (!equipIds.has(e)) errors.push(`${where}: unknown equipment id "${e}"`);
      else perEquip[e]++;
    }
  }
  if (!DIFFICULTY.includes(ex.difficulty)) errors.push(`${where}: bad difficulty "${ex.difficulty}"`);
  for (const t of ex.avoidIf || []) if (!conditionIds.has(t)) errors.push(`${where}: avoidIf "${t}" not a condition id`);

  // soft metadata
  if (ex.mechanic !== undefined) { if (!MECHANIC.includes(ex.mechanic)) warnings.push(`${where}: bad mechanic "${ex.mechanic}"`); else metaCoverage.mechanic++; }
  if (ex.pattern !== undefined) { if (!PATTERNS.includes(ex.pattern)) warnings.push(`${where}: pattern "${ex.pattern}" not in list`); else metaCoverage.pattern++; }
  if (ex.force !== undefined) { if (!FORCES.includes(ex.force)) warnings.push(`${where}: bad force "${ex.force}"`); else metaCoverage.force++; }
  if (Array.isArray(ex.focus)) { for (const g of ex.focus) if (!FOCUS.includes(g)) warnings.push(`${where}: bad focus "${g}"`); if (ex.focus.length) metaCoverage.focus++; }
  if (ex.category !== undefined) { if (!CATEGORY.includes(ex.category)) warnings.push(`${where}: bad category "${ex.category}"`); else metaCoverage.category++; }
  if (Array.isArray(ex.aliases) && ex.aliases.length) metaCoverage.aliases++;

  // Stretch contract: sports ids must be real, and a stretch needs a `hold` to
  // prefill (the app parses its leading number as a round count).
  if (ex.sports !== undefined) {
    if (!Array.isArray(ex.sports)) errors.push(`${where}: sports must be an array`);
    else for (const s of ex.sports) {
      if (!sportIds.has(s)) errors.push(`${where}: unknown sport id "${s}"`);
      else perSport[s]++;
    }
  }
  if (STRETCH_CATEGORIES.includes(ex.category)) {
    stretchCount++;
    if (!ex.hold) errors.push(`${where}: stretch has no "hold" prescription`);
    else if (!/^\s*\d+/.test(String(ex.hold))) errors.push(`${where}: hold "${ex.hold}" must start with a number`);
  }
}

// 3. Size + spread.
if (EXERCISES.length < 150 || EXERCISES.length > 800) errors.push(`library size ${EXERCISES.length} outside 150–800`);
for (const [g, n] of Object.entries(perGroup)) if (n < 5) errors.push(`muscle group "${g}" has only ${n} (min 5)`);
for (const [e, n] of Object.entries(perEquip)) if (n === 0) warnings.push(`no exercises use equipment "${e}" yet`);
for (const [s, n] of Object.entries(perSport)) if (n === 0) errors.push(`sport "${s}" has no stretches`);
// A yoga session should be able to fill a real half hour, not three poses.
if ((perSport.yoga || 0) < 25) errors.push(`yoga has only ${perSport.yoga || 0} poses (min 25 for a 30-minute routine)`);

// Report.
const N = EXERCISES.length;
console.log(`FitFlexr dataset: ${N} exercises · ${MUSCLE_GROUPS.length} groups · ${EQUIPMENT.length} equipment · ${CONDITIONS.length} conditions`);
console.log("Per group:   " + Object.entries(perGroup).map(([g, n]) => `${g} ${n}`).join(" · "));
console.log("Per equip:   " + Object.entries(perEquip).map(([e, n]) => `${e} ${n}`).join(" · "));
console.log(`Stretches:   ${stretchCount} (${N - stretchCount} training moves) · ` +
  Object.entries(perSport).map(([s, n]) => `${s} ${n}`).join(" · "));
console.log("Metadata coverage: " + Object.entries(metaCoverage).map(([k, n]) => `${k} ${Math.round(n / N * 100)}%`).join(" · "));
if (warnings.length) {
  console.log(`\nWARNINGS (${warnings.length}, non-blocking):`);
  warnings.slice(0, 25).forEach((w) => console.log("  · " + w));
  if (warnings.length > 25) console.log(`  … and ${warnings.length - 25} more`);
}
if (errors.length) {
  console.error(`\nFAIL — ${errors.length} hard problem(s):`);
  errors.forEach((e) => console.error("  ✗ " + e));
  process.exit(1);
} else {
  console.log("\nOK — all hard contracts hold (ids, equipment arrays, avoidIf, groups).");
}
