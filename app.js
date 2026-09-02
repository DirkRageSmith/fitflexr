/*
 * FitFlexr app logic. Data (MUSCLE_GROUPS, CONDITIONS, EXERCISES) comes from
 * exercises.js, loaded before this file. No frameworks, no network calls.
 */
"use strict";

(function () {
  // ── Tiny DOM helpers ─────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  // ── Data lookups ─────────────────────────────────────────
  const GROUP_BY_NAME = {};
  MUSCLE_GROUPS.forEach((g) => { GROUP_BY_NAME[g.name] = g; });
  const CONDITION_IDS = new Set(CONDITIONS.map((c) => c.id));
  const CONDITION_BY_ID = {};
  CONDITIONS.forEach((c) => { CONDITION_BY_ID[c.id] = c; });
  const EX_BY_ID = {};
  EXERCISES.forEach((ex) => { EX_BY_ID[ex.id] = ex; });
  const EQUIP_LABEL = {};
  EQUIPMENT.forEach((e) => { EQUIP_LABEL[e.id] = e.label; });
  const ALL_EQUIP_IDS = EQUIPMENT.map((e) => e.id);
  const ALL_SPORT_IDS = (typeof SPORTS !== "undefined" ? SPORTS : []).map((s) => s.id);
  const SPORT_IDS = new Set(ALL_SPORT_IDS);
  const SPORT_LABEL = {};
  (typeof SPORTS !== "undefined" ? SPORTS : []).forEach((s) => { SPORT_LABEL[s.id] = s.label; });

  // What makes an exercise a stretch rather than training volume. Kept in sync with
  // STRETCH_CATEGORIES in validate.js. "mobility" is deliberately NOT here — a few
  // pre-existing strength moves carry it and they are not warm-up material.
  const STRETCH_CATEGORIES = new Set(["warmup", "cooldown"]);
  const isStretch = (ex) => !!ex && STRETCH_CATEGORIES.has(ex.category);
  const isWarmup = (ex) => !!ex && ex.category === "warmup";
  const isCooldown = (ex) => !!ex && ex.category === "cooldown";
  const sportsOf = (ex) => (Array.isArray(ex.sports) ? ex.sports : []);

  // Equipment array of an exercise, defensively coerced to a lowercased array.
  const equipOf = (ex) =>
    Array.isArray(ex.equipment) ? ex.equipment : [String(ex.equipment).toLowerCase()];

  // One-tap gear presets for the setup screen (locations map to equipment bundles).
  const GEAR_PRESETS = [
    { label: "Bodyweight", gear: ["bodyweight"] },
    { label: "Home", gear: ["bodyweight", "dumbbell", "bench"] },
    { label: "Home+", gear: ["bodyweight", "dumbbell", "bench", "resistance-band", "kettlebell", "pull-up-bar"] },
    { label: "Full gym", gear: ALL_EQUIP_IDS.slice() },
  ];

  // Onboarding personalization axes (Phase B). Stored in state.onboarding; Phase C
  // will use them to bias generation. For now they're collected, shown, and editable.
  const GOALS = [
    { id: "lose-fat", label: "Lose fat", icon: "🔥" },
    { id: "build-muscle", label: "Build muscle", icon: "💪" },
    { id: "strength", label: "Get stronger", icon: "🏋️" },
    { id: "athletic", label: "Athletic / power", icon: "⚡" },
    { id: "general", label: "General fitness", icon: "✨" },
    { id: "mobility", label: "Mobility", icon: "🧘" },
    { id: "rehab", label: "Rehab / careful", icon: "🩹" },
    { id: "beginner", label: "Just starting", icon: "🌱" },
  ];
  const GOAL_BY_ID = {};
  GOALS.forEach((g) => { GOAL_BY_ID[g.id] = g; });
  const TIME_OPTIONS = [15, 30, 45, 60, 90]; // minutes

  // Phase C generation: how each goal biases exercise selection, its rep range, and
  // its rest interval. All heuristics, all local.
  //
  // Rest follows current evidence, not the old 60–90s folklore: 2–3 minutes between
  // hard sets builds more strength and size than short rest. Only genuinely
  // metabolic/endurance work stays short.
  const GOAL_CONFIG = {
    "lose-fat":     { focus: ["endurance", "power"], reps: 15, rest: 75 },
    "build-muscle": { focus: ["hypertrophy"], reps: 10, rest: 150 },
    "strength":     { focus: ["strength"], reps: 5, rest: 165, preferMechanic: "Compound" },
    "athletic":     { focus: ["power"], reps: 3, rest: 165 },
    "general":      { focus: ["strength", "hypertrophy"], reps: 12, rest: 120 },
    "mobility":     { focus: ["mobility"], reps: 10, rest: 60 },
    "rehab":        { focus: ["mobility", "endurance"], reps: 12, rest: 90, maxDifficulty: "Beginner" },
    "beginner":     { focus: ["strength"], reps: 10, rest: 120, maxDifficulty: "Beginner" },
  };

  // Short sessions trade rest for density: you can't afford 3-minute breaks in a
  // 15-minute workout, so we cap rest and get more work done instead.
  const SHORT_SESSION_REST = { 15: 60, 30: 90 };

  // Exercise count and sets-per-exercise are both derived from a simple budget:
  //   usable time = minutes × 60 × 0.85   (15% for warm-up + transitions)
  //   one set     = ~45s work + that session's rest
  // e.g. 60 min at 2:30 rest → ~15 sets → 5 exercises × 3 sets.
  const TIME_COUNT = { 15: 3, 30: 4, 45: 4, 60: 5, 90: 6 };
  const TIME_SETS = { 15: 2, 30: 3, 45: 3, 60: 3, 90: 4 };
  const DEFAULT_SETS = 3;

  // A workout is a workout, not a shopping list: once the Stack holds this many
  // exercises the deck stops offering more, so a beginner can't swipe their way
  // into a 30-move session. The cap wins over TIME_COUNT.
  //
  // Two separate budgets. Stretches shouldn't have to fight training moves for a
  // slot — a full yoga cool-down is not "ten exercises' worth of workout" — so they
  // fill their own cap and the deck stops each kind independently.
  const WORKOUT_CAP = 10; // training moves
  const STRETCH_CAP = 10; // warm-up + cool-down stretches

  // Stretches get a short transition, not a working rest — standing around for 2:30
  // between yoga poses would be nonsense.
  const STRETCH_REST = 20;

  // Phase F — "how you're feeling today" modifiers. Deterministic if/then rules over
  // the metadata bias the generated session — no LLM, no network. Ephemeral per session.
  const READINESS = [
    { id: "low-energy", label: "Low energy", icon: "🔋" },
    { id: "sore", label: "Sore / DOMS", icon: "🥵" },
    { id: "short-time", label: "Short on time", icon: "⏱️" },
    { id: "no-gear", label: "No gear", icon: "🎒" },
    { id: "strong", label: "Feeling strong", icon: "💪" },
  ];

  // ── Persistent state (localStorage, schema-versioned) ────
  const STORAGE_KEY = "fitflexr";
  const SCHEMA_VERSION = 7;
  const EQUIPMENT_SET = new Set(ALL_EQUIP_IDS);
  // Sensible starting gear (Matt's home setup); also the fallback when none is stored.
  const DEFAULT_GEAR = ["bodyweight", "dumbbell", "bench"];

  const defaultState = () => ({
    schemaVersion: SCHEMA_VERSION,
    // equipment = the gear you own. An exercise shows only if you own ALL it needs
    // (superset test). Unlike groups, empty here means "nothing shows" — presets fix that.
    // sports = which disciplines' stretches you want offered. Empty means all of
    // them, the same convention as `groups` — nothing selected is not a filter.
    filters: { groups: [], equipment: DEFAULT_GEAR.slice(), conditions: [], sports: [] },
    routine: [], // [{ id, sets, notes }] — references exercises by permanent id only
    theme: "dark",
    // Phase B onboarding profile. completed gates the first-run flow; goal/time are
    // the personalization axes Phase C uses to bias generated sessions.
    onboarding: { completed: false, goal: null, timeAvailable: null },
    // Phase C swipe-to-learn taste profile: attribute weights nudged by every swipe.
    taste: { swipes: 0, weights: {} },
    // Phase E: completed-workout log. [{ date:"YYYY-MM-DD", exercises, sets, groups }]
    history: [],
  });

  function migrate(data) {
    if (!data || typeof data !== "object") return defaultState();
    const out = defaultState();
    const fromVersion = typeof data.schemaVersion === "number" ? data.schemaVersion : 1;
    const filters = data.filters || {};
    out.filters.groups = Array.isArray(filters.groups)
      ? filters.groups.filter((g) => GROUP_BY_NAME[g]) : [];
    // Equipment: lowercase-map old values to the new id taxonomy, keep valid ones.
    let eq = Array.isArray(filters.equipment)
      ? filters.equipment.map((e) => String(e).toLowerCase()).filter((e) => EQUIPMENT_SET.has(e))
      : [];
    // v2→v3 (one-time): old app was Bodyweight/Dumbbell with a bench always assumed, and
    // its default meant "all". Bring those users onto an equivalent explicit gear set.
    if (fromVersion < 3) {
      if (!eq.length) eq = DEFAULT_GEAR.slice();
      else {
        if (!eq.includes("bodyweight")) eq.unshift("bodyweight");
        if (!eq.includes("bench")) eq.push("bench");
      }
    }
    out.filters.equipment = eq.length ? eq : DEFAULT_GEAR.slice();
    out.filters.conditions = Array.isArray(filters.conditions)
      ? filters.conditions.filter((c) => CONDITION_IDS.has(c)) : [];
    // v6→v7: sport-tagged stretches added. Pre-v7 users land with none selected,
    // which means "offer me all of them" — nothing disappears on upgrade.
    out.filters.sports = Array.isArray(filters.sports)
      ? filters.sports.filter((s) => SPORT_IDS.has(s)) : [];
    out.routine = Array.isArray(data.routine)
      ? data.routine
          .filter((r) => r && typeof r.id === "string")
          .map((r) => ({ id: r.id, sets: String(r.sets || ""), notes: String(r.notes || "") }))
      : [];
    out.theme = ["system", "light", "dark"].includes(data.theme) ? data.theme : "dark";
    // v1→v2 (one-time): the app now defaults to a black theme. Flip the old "system"
    // default to dark once. Guarded on version so a later deliberate "System" pick sticks.
    if (fromVersion < 2 && out.theme === "system") out.theme = "dark";
    // v3→v4: onboarding profile added. Carry over any valid saved values; pre-v4 users
    // land with completed=false so the first-run flow runs once.
    const ob = data.onboarding && typeof data.onboarding === "object" ? data.onboarding : {};
    out.onboarding = {
      completed: ob.completed === true,
      goal: GOAL_BY_ID[ob.goal] ? ob.goal : null,
      timeAvailable: TIME_OPTIONS.includes(ob.timeAvailable) ? ob.timeAvailable : null,
    };
    // v4→v5: taste profile added. Carry over a valid weights map + swipe count.
    const t = data.taste && typeof data.taste === "object" ? data.taste : {};
    out.taste = {
      swipes: Number.isFinite(t.swipes) ? t.swipes : 0,
      weights: t.weights && typeof t.weights === "object" ? t.weights : {},
    };
    // v5→v6: workout history added. Carry over well-formed entries.
    out.history = Array.isArray(data.history)
      ? data.history
          .filter((h) => h && typeof h.date === "string")
          .map((h) => ({
            date: h.date,
            exercises: Number(h.exercises) || 0,
            sets: Number(h.sets) || 0,
            groups: Array.isArray(h.groups) ? h.groups.filter((g) => GROUP_BY_NAME[g]) : [],
          }))
      : [];
    return out;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const migrated = migrate(parsed);
      // Persist right away if we bumped the schema, so one-time migrations (e.g. the
      // v1 "system"→dark flip) can't re-run on later loads. Inlined because the shared
      // `state`/saveState aren't defined until after loadState() returns.
      const wasVersion = typeof parsed.schemaVersion === "number" ? parsed.schemaVersion : 1;
      if (wasVersion !== SCHEMA_VERSION) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated)); } catch (_) {}
      }
      return migrated;
    } catch (err) {
      console.warn("FitFlexr: couldn't read saved data, starting fresh.", err);
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("FitFlexr: couldn't save data.", err);
    }
  }

  let saveTimer = null;
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveState, 250);
  }

  const state = loadState();

  // ── Session state (in-memory on purpose: skips reset next visit) ──
  let deck = [];
  let deckIndex = 0;
  let deckBuilt = false;
  let deckMode = "browse"; // "browse" | "generated"
  let sessionSetsDefault = ""; // set/rep scheme prefilled when saving a generated card
  const readiness = new Set(); // Phase F "today I'm feeling…" modifiers (ephemeral)
  const sessionSkipped = new Set();
  let swipeHistory = []; // [{ id, action: "save" | "skip" }]
  let currentScreen = "filters";

  // In-workout mode (Phase D). Ephemeral: a run through the Stack, not persisted.
  let workout = null;      // { items: [{id, sets, notes, doneSets}], index }
  let restTimer = null;
  let restRemaining = 0;
  const REST_DEFAULT = 120; // seconds — fallback when a goal has no rest of its own

  // ── Dataset sanity check (dev aid; validate.js is the scripted gate) ──
  function validateDataset() {
    const problems = [];
    const seen = new Set();
    EXERCISES.forEach((ex) => {
      if (seen.has(ex.id)) problems.push(`duplicate id "${ex.id}"`);
      seen.add(ex.id);
      if (!GROUP_BY_NAME[ex.muscleGroup]) {
        problems.push(`${ex.id}: unknown muscleGroup "${ex.muscleGroup}"`);
      }
      (ex.avoidIf || []).forEach((tag) => {
        if (!CONDITION_IDS.has(tag)) problems.push(`${ex.id}: unknown avoidIf tag "${tag}"`);
      });
    });
    if (problems.length) {
      console.warn("FitFlexr dataset problems:\n" + problems.join("\n"));
    }
    return problems;
  }

  // ── Deck building ────────────────────────────────────────
  function passesConditions(ex) {
    return !ex.avoidIf.some((tag) => state.filters.conditions.includes(tag));
  }

  // Superset test: an exercise shows only if you own every piece of gear it needs.
  function ownsGear(ex) {
    const owned = new Set(state.filters.equipment);
    return equipOf(ex).every((e) => owned.has(e));
  }

  // Which disciplines' stretches you want offered. A stretch with no sports tag is
  // general and always shows; an empty selection means "all of them", the same
  // convention muscle groups already use.
  function passesSports(ex) {
    const tags = sportsOf(ex);
    if (!tags.length) return true;
    const want = state.filters.sports;
    if (!want.length) return true;
    return tags.some((s) => want.includes(s));
  }

  // Today's muscle picks scope the TRAINING moves. A warm-up or cool-down prepares
  // the whole session rather than one muscle, so picking "Chest" shouldn't leave you
  // with no stretches — they're scoped by discipline instead.
  function inScope(ex) {
    if (!ownsGear(ex) || !passesConditions(ex)) return false;
    if (isStretch(ex)) return passesSports(ex);
    const groups = state.filters.groups;
    return groups.length === 0 || groups.includes(ex.muscleGroup);
  }

  function eligiblePool() {
    const inRoutine = new Set(state.routine.map((r) => r.id));
    return EXERCISES.filter(
      (ex) => inScope(ex) && !inRoutine.has(ex.id) && !sessionSkipped.has(ex.id)
    );
  }

  // ── The two Stack budgets ────────────────────────────────
  const routineExercises = () => state.routine.map((r) => EX_BY_ID[r.id]).filter(Boolean);
  const stretchesSaved = () => routineExercises().filter(isStretch).length;
  const trainingSaved = () => routineExercises().filter((ex) => !isStretch(ex)).length;

  // Whether THIS card's budget is spent. The deck stops dealing training moves and
  // stretches independently, so a full stack of exercises doesn't block a cool-down.
  function kindFull(ex) {
    return isStretch(ex) ? stretchesSaved() >= STRETCH_CAP : trainingSaved() >= WORKOUT_CAP;
  }

  // Both budgets spent — there is nothing left to deal at all.
  function workoutFull() {
    return trainingSaved() >= WORKOUT_CAP && stretchesSaved() >= STRETCH_CAP;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ── Swipe-to-learn taste profile ─────────────────────────
  // Every swipe nudges attribute weights; liked attributes float exercises up in
  // future decks. Pure client-side, stored in state.taste. Bias only kicks in once
  // there's enough signal so the first sessions stay pure discovery.
  const TASTE_MIN_SWIPES = 8;

  function tasteKeys(ex) {
    const keys = equipOf(ex).map((e) => "equip:" + e);
    if (ex.pattern) keys.push("pattern:" + ex.pattern);
    keys.push("group:" + ex.muscleGroup);
    if (ex.difficulty) keys.push("diff:" + ex.difficulty);
    if (ex.mechanic) keys.push("mechanic:" + ex.mechanic);
    return keys;
  }

  function recordTaste(ex, action) {
    const w = state.taste.weights;
    const delta = action === "save" ? 1 : -0.4;
    tasteKeys(ex).forEach((k) => { w[k] = (w[k] || 0) + delta; });
    state.taste.swipes = (state.taste.swipes || 0) + 1;
  }

  function tasteScore(ex) {
    const w = state.taste.weights || {};
    return tasteKeys(ex).reduce((s, k) => s + (w[k] || 0), 0);
  }

  // Weighted shuffle: taste score plus jitter, so liked traits lead but variety stays.
  function tasteBiasedOrder(pool) {
    return pool
      .map((ex) => ({ ex, s: tasteScore(ex) + Math.random() * 3 }))
      .sort((a, b) => b.s - a.s)
      .map((o) => o.ex);
  }

  function buildDeck() {
    const pool = eligiblePool();
    const ordered = state.taste.swipes >= TASTE_MIN_SWIPES ? tasteBiasedOrder(pool) : shuffle(pool);
    // Training moves first, stretches behind them. The hook is swiping exercises —
    // a deck that opens on Child's Pose doesn't feel like a workout.
    deck = ordered.filter((ex) => !isStretch(ex)).concat(ordered.filter(isStretch));
    deckIndex = 0;
    swipeHistory = [];
    deckBuilt = true;
    deckMode = "browse";
    sessionSetsDefault = "";
    renderDeck();
  }

  // ── Workout generation (Phase C) ─────────────────────────
  // Deterministic-ish heuristics over the metadata: goal → focus/difficulty bias +
  // set/rep scheme, time → session size, then a muscle-group round-robin for balance.
  function goalScore(ex, cfg) {
    let s = 0;
    const focus = ex.focus || [];
    (cfg.focus || []).forEach((f) => { if (focus.includes(f)) s += 3; });
    if (cfg.preferMechanic && ex.mechanic === cfg.preferMechanic) s += 1.5;
    if (cfg.maxDifficulty === "Beginner") {
      if (ex.difficulty === "Beginner") s += 2;
      else if (ex.difficulty === "Advanced") s -= 3;
    }
    return s;
  }

  // ── Phase F: readiness rules (deterministic, offline) ────
  // The last logged workout's muscle groups — used to steer away from still-sore muscles.
  function lastTrainedGroups() {
    if (!state.history.length) return [];
    return state.history[state.history.length - 1].groups || [];
  }

  function readinessScore(ex) {
    let s = 0;
    // Tired or sore → favour easier moves, avoid the most demanding.
    if (readiness.has("low-energy") || readiness.has("sore")) {
      if (ex.difficulty === "Beginner") s += 2.5;
      else if (ex.difficulty === "Advanced") s -= 4;
    }
    if (readiness.has("strong") && ex.difficulty === "Advanced") s += 1.5;
    // Sore → deprioritise muscles you trained last time (let them recover).
    if (readiness.has("sore")) {
      const recent = lastTrainedGroups();
      if (recent.includes(ex.muscleGroup)) s -= 5;
      if ((ex.secondaryMuscles || []).some((m) => recent.includes(m))) s -= 1.5;
    }
    return s;
  }

  function readinessCount(count) {
    let c = count;
    if (readiness.has("short-time")) c = Math.round(c * 0.6);
    if (readiness.has("low-energy")) c -= 2;
    if (readiness.has("sore")) c -= 1;
    if (readiness.has("strong")) c += 1;
    // Floor of 1: a 15-minute session really is only a couple of moves at real rest.
    return Math.max(1, Math.min(WORKOUT_CAP, c));
  }

  // Today's set/rep scheme: reps come from the goal, sets from the clock, then
  // how you're feeling nudges the set count.
  function currentScheme() {
    const cfg = GOAL_CONFIG[state.onboarding.goal] || {};
    const reps = cfg.reps || 10;
    let sets = TIME_SETS[state.onboarding.timeAvailable] || DEFAULT_SETS;
    if (readiness.has("low-energy")) sets -= 1;
    if (readiness.has("sore")) sets -= 1;
    if (readiness.has("strong")) sets += 1;
    sets = Math.max(1, Math.min(8, sets));
    return sets + " × " + reps;
  }

  // Rest is goal-driven (2–3 min for strength/size, short only for metabolic work),
  // capped shorter on short sessions, then adjusted for how you're feeling.
  function currentRestDefault() {
    const cfg = GOAL_CONFIG[state.onboarding.goal] || {};
    let rest = cfg.rest || REST_DEFAULT;
    const shortCap = SHORT_SESSION_REST[state.onboarding.timeAvailable];
    if (shortCap) rest = Math.min(rest, shortCap);
    if (readiness.has("low-energy")) rest += 30; // more recovery when drained
    if (readiness.has("strong")) rest -= 15;
    return Math.max(30, rest);
  }

  // Human-readable summary of what today's modifiers changed (for the coach-y note).
  function readinessSummary() {
    if (!readiness.size) return "";
    const bits = [];
    if (readiness.has("short-time")) bits.push("shorter session");
    if (readiness.has("low-energy")) bits.push("lighter volume, longer rest");
    if (readiness.has("sore")) bits.push("easing off sore muscles");
    if (readiness.has("no-gear")) bits.push("bodyweight only");
    if (readiness.has("strong")) bits.push("extra work");
    return "Adjusted for today: " + bits.join(" · ") + ".";
  }

  function generateSession() {
    const cfg = GOAL_CONFIG[state.onboarding.goal] || {};
    // Never generate more than the Stack has room for — the cap wins over time.
    // Room among the TRAINING moves only — a Stack full of stretches must not
    // block generating a workout.
    const room = Math.max(0, WORKOUT_CAP - trainingSaved());
    const count = Math.min(readinessCount(TIME_COUNT[state.onboarding.timeAvailable] || 6), room);
    if (count <= 0) return [];
    const inRoutine = new Set(state.routine.map((r) => r.id));
    // Training moves only — stretches are added around the session, not counted as
    // part of it (see generateStretches).
    let pool = EXERCISES.filter(
      (ex) => !isStretch(ex) && ownsGear(ex) && passesConditions(ex) && !inRoutine.has(ex.id)
    );
    // "No gear today" overrides your owned gear → bodyweight-only moves.
    if (readiness.has("no-gear")) {
      const bw = pool.filter((ex) => equipOf(ex).length === 1 && equipOf(ex)[0] === "bodyweight");
      if (bw.length) pool = bw;
    }
    // Honor today's muscle-group picks if any; otherwise build a full-body session.
    const groups = state.filters.groups;
    if (groups.length) pool = pool.filter((ex) => groups.includes(ex.muscleGroup));
    if (!pool.length) return [];

    const scored = pool
      .map((ex) => ({ ex, score: goalScore(ex, cfg) + readinessScore(ex) + tasteScore(ex) * 0.5 + Math.random() * 2 }))
      .sort((a, b) => b.score - a.score);

    // Bucket by muscle group (each bucket already best-first), group order = best rep first.
    const byGroup = {};
    const groupOrder = [];
    scored.forEach(({ ex }) => {
      if (!byGroup[ex.muscleGroup]) { byGroup[ex.muscleGroup] = []; groupOrder.push(ex.muscleGroup); }
      byGroup[ex.muscleGroup].push(ex);
    });

    // Round-robin across groups for balanced pattern/muscle coverage.
    const picked = [];
    let i = 0;
    while (picked.length < count && groupOrder.some((g) => byGroup[g].length)) {
      const g = groupOrder[i % groupOrder.length];
      if (byGroup[g].length) picked.push(byGroup[g].shift());
      i++;
    }
    return picked.slice(0, count);
  }

  // Bookend a generated session with stretches matched to the muscles it actually
  // trains: warm-ups lead, cool-downs close. Sport tags scope which ones are offered.
  function generateStretches(session, kind, count, exclude) {
    if (count <= 0) return [];
    const skip = new Set(state.routine.map((r) => r.id));
    (exclude || []).forEach((ex) => skip.add(ex.id));
    const worked = new Set();
    session.forEach((ex) => {
      worked.add(ex.muscleGroup);
      (ex.secondaryMuscles || []).forEach((m) => worked.add(m));
    });
    const wanted = kind === "warmup" ? isWarmup : isCooldown;
    return EXERCISES
      .filter((ex) => wanted(ex) && ownsGear(ex) && passesConditions(ex) &&
        passesSports(ex) && !skip.has(ex.id))
      .map((ex) => ({
        ex,
        score: (worked.has(ex.muscleGroup) ? 3 : 0) +
          (ex.secondaryMuscles || []).filter((m) => worked.has(m)).length +
          tasteScore(ex) * 0.3 + Math.random() * 2,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map((o) => o.ex);
  }

  function startGeneratedSession() {
    if (trainingSaved() >= WORKOUT_CAP) {
      updateGenerateUI("Your Stack is already a full workout — clear some to generate a new one.");
      return;
    }
    const session = generateSession();
    if (!session.length) {
      updateGenerateUI("No matching moves — add gear or clear an injury filter.");
      return;
    }
    // Two in front, two behind, budget permitting — the shape of an actual session.
    const stretchRoom = Math.max(0, STRETCH_CAP - stretchesSaved());
    const warm = generateStretches(session, "warmup", Math.min(2, stretchRoom));
    const cool = generateStretches(session, "cooldown", Math.min(2, stretchRoom - warm.length), warm);
    deck = warm.concat(session, cool);
    deckIndex = 0;
    swipeHistory = [];
    deckBuilt = true;
    deckMode = "generated";
    sessionSetsDefault = currentScheme();
    renderDeck();
    showScreen("deck");
  }

  const matchesFilters = inScope;

  // Safety: if a condition (or gear/group) is toggled mid-session, purge the now-
  // ineligible cards from the live deck immediately — never rely on the next
  // "Start swiping". Conditions are the safety-critical case; equipment/groups ride along.
  function purgeActiveDeck() {
    if (!deckBuilt) return;
    deck = deck.slice(0, deckIndex).concat(deck.slice(deckIndex).filter(matchesFilters));
    renderDeck();
  }

  // ── Screens ──────────────────────────────────────────────
  function showScreen(name) {
    currentScreen = name;
    $$(".screen").forEach((s) => { s.hidden = s.id !== "screen-" + name; });
    $$(".tab-btn").forEach((b) => b.classList.toggle("tab-active", b.dataset.screen === name));
    // Onboarding and in-workout mode are full-screen: hide the tab bar during them.
    $("#app").classList.toggle("onboarding-active", name === "onboarding");
    $("#app").classList.toggle("workout-active", name === "workout");
    if (name === "deck") renderDeck();
    if (name === "routine") renderRoutine();
    if (name === "progress") renderProgress();
    if (name === "filters") { updateMatchCount(); updateGenerateUI(); }
    window.scrollTo(0, 0);
  }

  // ── Onboarding (Phase B first-run flow) ──────────────────
  const OB_STEPS = ["welcome", "goal", "time", "gear", "injuries"];
  let obIndex = 0;

  function startOnboarding() {
    obIndex = 0;
    showScreen("onboarding");
    renderOnboarding();
  }

  function finishOnboarding() {
    state.onboarding.completed = true;
    saveState();
    updateProfileSummaries();
    renderFilterChips();
    renderGoalChips();
    renderTimeChips();
    showScreen("filters");
  }

  function obStepShell(title, sub) {
    const wrap = el("div", "ob-step");
    wrap.appendChild(el("h1", "ob-title", title));
    if (sub) wrap.appendChild(el("p", "ob-sub", sub));
    return wrap;
  }

  function obWelcome() {
    const wrap = obStepShell("Welcome 👋",
      "Four quick questions and your deck is tuned to you. Change any answer later in Settings.");
    const list = el("ul", "ob-welcome-list");
    [["🎯", "Your goal"], ["⏱️", "How long you train"], ["🏋️", "The gear you have"], ["🛡️", "Anything to protect"]]
      .forEach(([ic, tx]) => {
        const li = el("li");
        li.appendChild(el("span", "ob-welcome-ic", ic));
        li.appendChild(document.createTextNode(tx));
        list.appendChild(li);
      });
    wrap.appendChild(list);
    return wrap;
  }

  function obSingleSelect(grid, btn) {
    grid.querySelectorAll(".ob-option").forEach((b) => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
  }

  function obGoal() {
    const wrap = obStepShell("What's your main goal?", "Pick the one that fits best right now.");
    const grid = el("div", "ob-grid");
    GOALS.forEach((g) => {
      const btn = el("button", "ob-option");
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(state.onboarding.goal === g.id));
      btn.appendChild(el("span", "ob-option-ic", g.icon));
      btn.appendChild(el("span", "ob-option-label", g.label));
      btn.addEventListener("click", () => {
        state.onboarding.goal = g.id;
        saveState();
        obSingleSelect(grid, btn);
      });
      grid.appendChild(btn);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  function obTime() {
    const wrap = obStepShell("How long do you usually train?",
      "This sizes your generated sessions (coming soon).");
    const grid = el("div", "ob-grid ob-grid-time");
    TIME_OPTIONS.forEach((t) => {
      const btn = el("button", "ob-option ob-option-time");
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(state.onboarding.timeAvailable === t));
      btn.appendChild(el("span", "ob-option-big", String(t)));
      btn.appendChild(el("span", "ob-option-label", "min"));
      btn.addEventListener("click", () => {
        state.onboarding.timeAvailable = t;
        saveState();
        obSingleSelect(grid, btn);
      });
      grid.appendChild(btn);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  function obGear() {
    const wrap = obStepShell("What gear do you have?",
      "Tap a preset, or fine-tune below. We only show moves you can actually do.");
    const presetRow = el("div", "preset-row");
    const chipRow = el("div", "chip-row");
    const syncPresets = () => {
      Array.from(presetRow.children).forEach((pb, idx) => {
        const p = GEAR_PRESETS[idx];
        pb.classList.toggle("preset-active",
          p.gear.length === state.filters.equipment.length &&
          p.gear.every((g) => state.filters.equipment.includes(g)));
      });
    };
    GEAR_PRESETS.forEach((preset) => {
      const btn = el("button", "preset-btn", preset.label);
      btn.type = "button";
      btn.addEventListener("click", () => {
        state.filters.equipment = preset.gear.slice();
        saveState();
        renderOnboarding();
      });
      presetRow.appendChild(btn);
    });
    EQUIPMENT.forEach((eq) => {
      const btn = el("button", "chip chip-equip", eq.label);
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(state.filters.equipment.includes(eq.id)));
      btn.addEventListener("click", () => {
        const i = state.filters.equipment.indexOf(eq.id);
        if (i === -1) state.filters.equipment.push(eq.id);
        else state.filters.equipment.splice(i, 1);
        saveState();
        btn.setAttribute("aria-pressed", String(i === -1));
        syncPresets();
      });
      chipRow.appendChild(btn);
    });
    syncPresets();
    wrap.appendChild(presetRow);
    wrap.appendChild(chipRow);
    return wrap;
  }

  function obInjuries() {
    const wrap = obStepShell("Anything to protect?",
      "Toggle any that apply — we keep risky moves out of your deck before you see them. Skip if none.");
    const chipRow = el("div", "chip-row");
    CONDITIONS.forEach((c) => {
      const btn = el("button", "chip chip-cond", c.label);
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(state.filters.conditions.includes(c.id)));
      btn.addEventListener("click", () => {
        const i = state.filters.conditions.indexOf(c.id);
        if (i === -1) state.filters.conditions.push(c.id);
        else state.filters.conditions.splice(i, 1);
        saveState();
        btn.setAttribute("aria-pressed", String(i === -1));
      });
      chipRow.appendChild(btn);
    });
    wrap.appendChild(chipRow);
    return wrap;
  }

  const OB_RENDERERS = { welcome: obWelcome, goal: obGoal, time: obTime, gear: obGear, injuries: obInjuries };

  function renderOnboarding() {
    const step = OB_STEPS[obIndex];
    const body = $("#ob-body");
    body.innerHTML = "";
    $("#ob-progress-bar").style.width = ((obIndex + 1) / OB_STEPS.length) * 100 + "%";
    $("#ob-back").style.visibility = obIndex === 0 ? "hidden" : "visible";
    const last = obIndex === OB_STEPS.length - 1;
    $("#ob-next-label").textContent = step === "welcome" ? "Let's go" : last ? "Finish" : "Next";
    body.appendChild((OB_RENDERERS[step] || obWelcome)());
    window.scrollTo(0, 0);
  }

  function profileParts() {
    const parts = [];
    const g = state.onboarding.goal ? GOAL_BY_ID[state.onboarding.goal] : null;
    if (g) parts.push(g.icon + " " + g.label);
    if (state.onboarding.timeAvailable) parts.push("⏱️ " + state.onboarding.timeAvailable + " min");
    return parts;
  }

  function updateProfileSummaries() {
    const parts = profileParts();
    const sum = $("#profile-summary");
    if (sum) {
      if (parts.length) {
        sum.hidden = false;
        sum.innerHTML = "";
        parts.forEach((p) => sum.appendChild(el("span", "profile-chip", p)));
        sum.appendChild(el("span", "profile-edit", "Edit"));
      } else {
        sum.hidden = true;
      }
    }
    const sp = $("#settings-profile");
    if (sp) sp.textContent = parts.length ? parts.join("   ·   ") : "Not set yet — tap below to personalize your deck.";
    updateGenerateUI();
  }

  // The "Generate my session" button subtitle + the swipe-to-learn status line.
  function updateGenerateUI(message) {
    // Show the actual plan — exercises, scheme, rest — so it's clear before you commit.
    const sub = $("#generate-sub");
    if (sub) {
      const t = state.onboarding.timeAvailable;
      if (t) {
        const n = readinessCount(TIME_COUNT[t] || DEFAULT_SETS);
        const rest = currentRestDefault();
        sub.textContent = n + " moves · " + currentScheme() + " · " + fmtTime(rest) + " rest";
      } else {
        sub.textContent = "pick a time";
      }
    }
    const note = $("#readiness-note");
    if (note) {
      const summary = readinessSummary();
      note.hidden = !summary;
      note.textContent = summary;
    }
    const hint = $("#taste-hint");
    if (!hint) return;
    if (message) { hint.hidden = false; hint.textContent = message; return; }
    const n = state.taste.swipes || 0;
    if (n <= 0) { hint.hidden = true; return; }
    hint.hidden = false;
    hint.textContent = n >= TASTE_MIN_SWIPES
      ? "🧠 Decks are now tuned to your taste · " + n + " swipes"
      : "🧠 Learning your taste · " + n + "/" + TASTE_MIN_SWIPES + " swipes";
  }

  // Gear + injuries live at the bottom of Setup but filter BOTH paths, so a summary
  // sits up top where it can't be missed. Tapping it jumps to the real controls.
  function renderSetupSummary() {
    const gearEl = $("#setup-summary-gear");
    const protEl = $("#setup-summary-protect");
    if (!gearEl || !protEl) return;

    const owned = state.filters.equipment;
    const preset = GEAR_PRESETS.find(
      (p) => p.gear.length === owned.length && p.gear.every((g) => owned.includes(g))
    );
    const gearLabel = preset
      ? preset.label
      : owned.length + (owned.length === 1 ? " item" : " items");
    gearEl.textContent = "🧰 Gear: " + gearLabel;

    const n = state.filters.conditions.length;
    protEl.textContent = n
      ? "🛡️ Protecting: " + state.filters.conditions
          .map((c) => (CONDITION_BY_ID[c] ? CONDITION_BY_ID[c].label : c))
          .join(", ")
      : "🛡️ No injury filters set";
    protEl.classList.toggle("setup-summary-active", n > 0);
  }

  // Goal + time are editable right on Setup (not just inside onboarding), so the
  // generate path exposes every option it actually uses.
  function renderGoalChips() {
    const wrap = $("#goal-chips");
    if (!wrap) return;
    wrap.innerHTML = "";
    GOALS.forEach((g) => {
      const btn = el("button", "chip chip-goal");
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(state.onboarding.goal === g.id));
      btn.appendChild(el("span", "chip-ico", g.icon));
      btn.appendChild(document.createTextNode(g.label));
      btn.addEventListener("click", () => {
        state.onboarding.goal = state.onboarding.goal === g.id ? null : g.id;
        saveState();
        renderGoalChips();
        updateProfileSummaries();
      });
      wrap.appendChild(btn);
    });
  }

  function renderTimeChips() {
    const wrap = $("#time-chips");
    if (!wrap) return;
    wrap.innerHTML = "";
    TIME_OPTIONS.forEach((t) => {
      const btn = el("button", "chip chip-time", t + " min");
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(state.onboarding.timeAvailable === t));
      btn.addEventListener("click", () => {
        state.onboarding.timeAvailable = state.onboarding.timeAvailable === t ? null : t;
        saveState();
        renderTimeChips();
        updateProfileSummaries();
      });
      wrap.appendChild(btn);
    });
  }

  // Phase F: the "Today I'm feeling" toggle chips on Setup.
  function renderReadinessChips() {
    const wrap = $("#readiness-chips");
    if (!wrap) return;
    wrap.innerHTML = "";
    READINESS.forEach((r) => {
      const btn = el("button", "chip chip-readiness");
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(readiness.has(r.id)));
      btn.appendChild(el("span", "chip-ico", r.icon));
      btn.appendChild(document.createTextNode(r.label));
      btn.addEventListener("click", () => {
        if (readiness.has(r.id)) readiness.delete(r.id);
        else readiness.add(r.id);
        btn.setAttribute("aria-pressed", String(readiness.has(r.id)));
        updateGenerateUI();
      });
      wrap.appendChild(btn);
    });
  }

  // ── Filters screen ───────────────────────────────────────
  function renderFilterChips() {
    const gWrap = $("#group-chips");
    gWrap.innerHTML = "";
    MUSCLE_GROUPS.forEach((g) => {
      const btn = el("button", "chip chip-group");
      btn.type = "button";
      btn.style.setProperty("--chip", g.color);
      btn.setAttribute("aria-pressed", String(state.filters.groups.includes(g.name)));
      btn.appendChild(el("span", "chip-dot"));
      btn.appendChild(document.createTextNode(g.name));
      btn.addEventListener("click", () => {
        const i = state.filters.groups.indexOf(g.name);
        if (i === -1) state.filters.groups.push(g.name);
        else state.filters.groups.splice(i, 1);
        saveState();
        btn.setAttribute("aria-pressed", String(i === -1));
        updateMatchCount();
      });
      gWrap.appendChild(btn);
    });

    const pWrap = $("#equipment-presets");
    if (pWrap) {
      pWrap.innerHTML = "";
      GEAR_PRESETS.forEach((preset) => {
        const btn = el("button", "preset-btn", preset.label);
        btn.type = "button";
        const active =
          preset.gear.length === state.filters.equipment.length &&
          preset.gear.every((g) => state.filters.equipment.includes(g));
        btn.classList.toggle("preset-active", active);
        btn.addEventListener("click", () => setEquipment(preset.gear.slice()));
        pWrap.appendChild(btn);
      });
    }

    const eWrap = $("#equipment-chips");
    if (eWrap) {
      eWrap.innerHTML = "";
      EQUIPMENT.forEach((eq) => {
        const btn = el("button", "chip chip-equip", eq.label);
        btn.type = "button";
        btn.setAttribute("aria-pressed", String(state.filters.equipment.includes(eq.id)));
        btn.addEventListener("click", () => {
          const i = state.filters.equipment.indexOf(eq.id);
          if (i === -1) state.filters.equipment.push(eq.id);
          else state.filters.equipment.splice(i, 1);
          saveState();
          btn.setAttribute("aria-pressed", String(i === -1));
          renderPresetStates();
          purgeActiveDeck();
          updateMatchCount();
        });
        eWrap.appendChild(btn);
      });
    }

    const sWrap = $("#sport-chips");
    if (sWrap) {
      sWrap.innerHTML = "";
      (typeof SPORTS !== "undefined" ? SPORTS : []).forEach((sp) => {
        const btn = el("button", "chip chip-sport", sp.label);
        btn.type = "button";
        btn.setAttribute("aria-pressed", String(state.filters.sports.includes(sp.id)));
        btn.addEventListener("click", () => {
          const i = state.filters.sports.indexOf(sp.id);
          if (i === -1) state.filters.sports.push(sp.id);
          else state.filters.sports.splice(i, 1);
          saveState();
          btn.setAttribute("aria-pressed", String(i === -1));
          purgeActiveDeck();
          updateMatchCount();
        });
        sWrap.appendChild(btn);
      });
    }

    const cWrap = $("#condition-chips");
    cWrap.innerHTML = "";
    CONDITIONS.forEach((c) => {
      const btn = el("button", "chip chip-cond", c.label);
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(state.filters.conditions.includes(c.id)));
      btn.addEventListener("click", () => {
        const i = state.filters.conditions.indexOf(c.id);
        if (i === -1) state.filters.conditions.push(c.id);
        else state.filters.conditions.splice(i, 1);
        saveState();
        btn.setAttribute("aria-pressed", String(i === -1));
        purgeActiveDeck();
        updateMatchCount();
      });
      cWrap.appendChild(btn);
    });

    updateMatchCount();
  }

  function updateMatchCount() {
    renderSetupSummary(); // every gear/condition change routes through here
    const n = eligiblePool().length;
    // With a full Stack there's nothing to swipe — say so instead of dealing a dead deck.
    if (workoutFull()) {
      $("#match-count").textContent = "Stack full";
      $("#btn-start").disabled = true;
      return;
    }
    $("#match-count").textContent = n === 1 ? "1 move" : n + " moves";
    $("#btn-start").disabled = n === 0;
  }

  function setAllGroups(all) {
    state.filters.groups = all ? MUSCLE_GROUPS.map((g) => g.name) : [];
    saveState();
    renderFilterChips();
  }

  function setEquipment(list) {
    state.filters.equipment = list;
    saveState();
    renderFilterChips();
    purgeActiveDeck();
    updateMatchCount();
  }

  // Refresh only the preset buttons' active state (after a single-chip toggle).
  function renderPresetStates() {
    const pWrap = $("#equipment-presets");
    if (!pWrap) return;
    Array.from(pWrap.children).forEach((btn, idx) => {
      const preset = GEAR_PRESETS[idx];
      if (!preset) return;
      const active =
        preset.gear.length === state.filters.equipment.length &&
        preset.gear.every((g) => state.filters.equipment.includes(g));
      btn.classList.toggle("preset-active", active);
    });
  }

  // ── Deck screen ──────────────────────────────────────────
  // What's still dealable: everything ahead of the read head whose budget isn't
  // spent. Cards of a full kind are held back rather than burned, so dropping a
  // move from the Stack puts them straight back in play.
  function pendingCards() {
    return deck.slice(deckIndex).filter((ex) => !kindFull(ex));
  }

  function renderDeck(returning) {
    const stage = $("#deck-stage");
    stage.querySelectorAll(".swipe-card:not(.flying)").forEach((c) => c.remove());

    const pending = pendingCards();
    // "Full" means both budgets are spent — a full stack of exercises still leaves
    // room to swipe a cool-down.
    const full = workoutFull() || (pending.length === 0 && deckIndex < deck.length);
    const exhausted = deckIndex >= deck.length;
    $("#deck-nodeck").hidden = deckBuilt;
    $("#deck-full").hidden = !(deckBuilt && !exhausted && full);
    $("#deck-empty").hidden = !(deckBuilt && exhausted);
    if (full) $("#deck-full-text").textContent = stackFullMessage();
    $("#deck-counter").textContent =
      deckBuilt && pending.length > 0 ? `${pending.length} left` : "";
    const eyebrow = $(".deck-top .eyebrow");
    if (eyebrow) eyebrow.textContent = deckMode === "generated" ? "Your session" : "Flexr Deck";
    updateActionButtons();

    if (!deckBuilt || !pending.length) return;

    const visible = pending.slice(0, 3);
    // Theme the whole deck by the top card's muscle-group color, so the
    // deck header reads "red = chest day" at a glance as you swipe.
    const topGroup = GROUP_BY_NAME[visible[0].muscleGroup];
    $("#screen-deck").style.setProperty("--group-color", topGroup ? topGroup.color : "#888");
    for (let depth = visible.length - 1; depth >= 0; depth--) {
      const card = buildCard(visible[depth], depth);
      stage.appendChild(card);
      if (depth === 0) {
        attachSwipeHandlers(card);
        if (returning) card.classList.add("card-return");
      }
    }
  }

  function updateActionButtons() {
    const hasCard = deckBuilt && pendingCards().length > 0;
    $("#btn-save").disabled = !hasCard;
    $("#btn-skip").disabled = !hasCard;
    $("#btn-undo").disabled = swipeHistory.length === 0;
  }

  function groupPill(groupName) {
    const pill = el("span", "group-pill");
    pill.appendChild(el("span", "dot"));
    pill.appendChild(document.createTextNode(groupName));
    return pill;
  }

  function buildCard(ex, depth) {
    const group = GROUP_BY_NAME[ex.muscleGroup] || { color: "#888" };
    const card = el("article", "swipe-card");
    card.dataset.id = ex.id;
    card.style.setProperty("--depth", depth);
    card.style.setProperty("--group-color", group.color);
    // Primary group tints the card; the first secondary muscle (if any) tints the
    // exercise-name text, so a multi-muscle move shows both groups at a glance.
    const secGroup = (ex.secondaryMuscles || [])
      .map((m) => GROUP_BY_NAME[m])
      .find((g) => g && g.name !== ex.muscleGroup);
    if (secGroup) {
      card.style.setProperty("--secondary-color", secGroup.color);
      card.dataset.hasSecondary = "true";
    }

    // Single face — everything lives on the front, no flip. (A back/expanded view
    // may return later when exercise videos exist; until then one face is clearer.)
    const front = el("div", "card-face card-front");
    front.appendChild(el("div", "stamp stamp-save", "SAVE"));
    front.appendChild(el("div", "stamp stamp-skip", "SKIP"));
    const body = el("div", "card-body");
    body.appendChild(groupPill(ex.muscleGroup));
    body.appendChild(el("h2", "card-name", ex.name));
    body.appendChild(el("p", "card-cue", ex.cue));
    body.appendChild(el("p", "card-desc", ex.description));
    if (ex.secondaryMuscles && ex.secondaryMuscles.length) {
      body.appendChild(el("p", "card-meta", "Also works: " + ex.secondaryMuscles.join(", ")));
    }
    if (ex.avoidIf && ex.avoidIf.length) {
      const labels = ex.avoidIf.map((t) => (CONDITION_BY_ID[t] ? CONDITION_BY_ID[t].label : t));
      body.appendChild(el("p", "card-flags", "⚠ Flagged for: " + labels.join(" · ")));
    }
    front.appendChild(body);

    // Tags live outside the scrolling body so gear + difficulty stay visible even
    // on the longest cards (only the text scrolls).
    const tags = el("div", "tag-row");
    equipOf(ex).forEach((e) => tags.appendChild(el("span", "tag", EQUIP_LABEL[e] || e)));
    tags.appendChild(el("span", "tag diff-" + ex.difficulty.toLowerCase(), ex.difficulty));
    front.appendChild(tags);

    card.appendChild(front);
    return card;
  }

  function topCard() {
    const cards = $$("#deck-stage .swipe-card:not(.flying)");
    return cards.length ? cards[cards.length - 1] : null;
  }

  // ── Swiping (pointer events — works for touch and mouse) ──
  // The card owns every gesture on it (touch-action: none all the way down), so a
  // vertical drag has to be scrolled by hand — see .card-body in styles.css for why
  // letting the browser do it breaks swiping outright.
  function attachSwipeHandlers(card) {
    let active = false;
    let moved = false;
    let axis = null; // locked once per drag: "x" = swipe, "y" = scroll the text
    let startX = 0;
    let startY = 0;
    let startScroll = 0;
    let dx = 0;
    let dy = 0;
    const body = card.querySelector(".card-body");
    const saveStamp = card.querySelector(".stamp-save");
    const skipStamp = card.querySelector(".stamp-skip");

    const reset = () => {
      card.style.transform = "";
      saveStamp.style.opacity = "";
      skipStamp.style.opacity = "";
    };

    card.addEventListener("pointerdown", (e) => {
      if (card.classList.contains("flying")) return;
      active = true;
      moved = false;
      axis = null;
      dx = 0;
      dy = 0;
      startX = e.clientX;
      startY = e.clientY;
      startScroll = body ? body.scrollTop : 0;
      card.classList.add("dragging");
      try { card.setPointerCapture(e.pointerId); } catch (_) { /* older browsers */ }
    });

    card.addEventListener("pointermove", (e) => {
      if (!active) return;
      dx = e.clientX - startX;
      dy = e.clientY - startY;
      if (!moved) {
        if (Math.hypot(dx, dy) <= 10) return;
        moved = true;
        // Decide once, on the first real movement, so the gesture can't flip
        // mid-drag. Only a card whose text actually overflows can claim a drag,
        // and only a clearly vertical one — everything else is a swipe.
        const scrollable = body && body.scrollHeight > body.clientHeight + 1;
        axis = scrollable && Math.abs(dy) > Math.abs(dx) ? "y" : "x";
      }
      if (axis === "y") {
        body.scrollTop = startScroll - dy;
        return;
      }
      card.style.transform = `translate(${dx}px, ${dy * 0.3}px) rotate(${dx * 0.055}deg)`;
      const k = Math.min(Math.abs(dx) / 90, 1);
      saveStamp.style.opacity = dx > 0 ? k : 0;
      skipStamp.style.opacity = dx < 0 ? k : 0;
    });

    card.addEventListener("pointerup", () => {
      if (!active) return;
      active = false;
      card.classList.remove("dragging");
      // A tap does nothing (all the info is already on the front), and a drag that
      // was scrolling the text must never also count as a swipe.
      if (!moved || axis === "y") {
        reset();
        return;
      }
      const threshold = Math.min(130, card.offsetWidth * 0.35);
      if (dx > threshold) commitSwipe(card, "save", dy);
      else if (dx < -threshold) commitSwipe(card, "skip", dy);
      else reset();
    });

    card.addEventListener("pointercancel", () => {
      if (!active) return;
      active = false;
      card.classList.remove("dragging");
      reset();
    });
  }

  // Say which budget ran out, so "no more cards" never reads as a bug.
  function stackFullMessage() {
    const t = trainingSaved();
    const s = stretchesSaved();
    if (t >= WORKOUT_CAP && s >= STRETCH_CAP) {
      return "You've saved " + t + " exercises and " + s + " stretches — a full session, warm-up " +
        "to cool-down. Go train it, or drop something from your Stack to swap it out.";
    }
    if (t >= WORKOUT_CAP) {
      return "That's " + t + " exercises — a full workout. Your stretch slots are still open if " +
        "you want a warm-up or cool-down.";
    }
    return "That's " + s + " stretches — plenty to bookend a session. There's still room for " +
      "training moves.";
  }

  // Stretches carry their own prescription; training moves take the generated
  // session's scheme (empty string when you're just browsing).
  const defaultSetsFor = (ex) => (isStretch(ex) ? (ex.hold || "2 × 30s") : sessionSetsDefault);

  // Move the swiped card to the read head, then step past it. Swapping rather than
  // plain-incrementing keeps any card we dealt around (because its budget was full)
  // in the pending pool, and leaves undo as a simple deckIndex--.
  function consumeCard(ex) {
    const i = deck.findIndex((e) => e.id === ex.id);
    if (i < 0) return;
    if (i !== deckIndex) {
      const held = deck[deckIndex];
      deck[deckIndex] = deck[i];
      deck[i] = held;
    }
    deckIndex++;
  }

  function commitSwipe(card, action, lastDy = 0) {
    if (card.classList.contains("flying")) return;
    const ex = EX_BY_ID[card.dataset.id];
    if (!ex) return;

    if (action === "save") addToRoutine(ex.id, defaultSetsFor(ex));
    else sessionSkipped.add(ex.id);
    recordTaste(ex, action);
    saveState();
    swipeHistory.push({ id: ex.id, action });
    consumeCard(ex);

    card.classList.add("flying");
    const dir = action === "save" ? 1 : -1;
    const flyX = dir * (window.innerWidth * 1.1 + 200);
    card.style.transform = `translate(${flyX}px, ${lastDy * 0.3}px) rotate(${dir * 24}deg)`;
    card.style.opacity = "0";
    const stamp = card.querySelector(action === "save" ? ".stamp-save" : ".stamp-skip");
    if (stamp) stamp.style.opacity = "1";
    setTimeout(() => card.remove(), 420);

    renderDeck();
  }

  function undoSwipe() {
    if (!swipeHistory.length) return;
    const last = swipeHistory.pop();
    if (last.action === "save") removeFromRoutine(last.id);
    else sessionSkipped.delete(last.id);
    const ex = EX_BY_ID[last.id];
    if (ex) { // roll back the taste nudge this swipe made
      const w = state.taste.weights;
      const delta = last.action === "save" ? -1 : 0.4;
      tasteKeys(ex).forEach((k) => { w[k] = (w[k] || 0) + delta; });
      state.taste.swipes = Math.max(0, (state.taste.swipes || 0) - 1);
      saveState();
    }
    deckIndex = Math.max(0, deckIndex - 1);
    renderDeck(true);
  }

  // ── Routine ──────────────────────────────────────────────
  function addToRoutine(id, sets) {
    if (state.routine.some((r) => r.id === id)) return;
    state.routine.push({ id, sets: sets || "", notes: "" });
    saveState();
  }

  function removeFromRoutine(id) {
    state.routine = state.routine.filter((r) => r.id !== id);
    saveState();
  }

  function moveInGroup(id, dir) {
    const ex = EX_BY_ID[id];
    if (!ex) return;
    const groupItems = state.routine.filter(
      (r) => EX_BY_ID[r.id] && EX_BY_ID[r.id].muscleGroup === ex.muscleGroup
    );
    const pos = groupItems.findIndex((r) => r.id === id);
    const other = groupItems[pos + dir];
    if (!other) return;
    const i = state.routine.findIndex((r) => r.id === id);
    const j = state.routine.findIndex((r) => r.id === other.id);
    const tmp = state.routine[i];
    state.routine[i] = state.routine[j];
    state.routine[j] = tmp;
    saveState();
    renderRoutine();
  }

  function routineItemEl(entry, groupItems) {
    const ex = EX_BY_ID[entry.id];
    const group = ex ? GROUP_BY_NAME[ex.muscleGroup] : null;
    const item = el("div", "routine-item");
    if (group) item.style.setProperty("--group-color", group.color);

    const top = el("div", "routine-item-top");
    top.appendChild(el("span", "routine-item-icon", ex ? ex.icon : "❓"));
    const name = el("span", "routine-item-name", ex ? ex.name : "(no longer in the library)");
    if (ex) name.appendChild(el("span", "routine-item-equip", equipOf(ex).map((e) => EQUIP_LABEL[e] || e).join(" · ") + " · " + ex.difficulty));
    top.appendChild(name);

    if (ex) {
      const pos = groupItems.findIndex((r) => r.id === entry.id);
      const up = el("button", "icon-btn", "↑");
      up.type = "button";
      up.setAttribute("aria-label", "Move " + ex.name + " up");
      up.disabled = pos === 0;
      up.addEventListener("click", () => moveInGroup(entry.id, -1));
      const down = el("button", "icon-btn", "↓");
      down.type = "button";
      down.setAttribute("aria-label", "Move " + ex.name + " down");
      down.disabled = pos === groupItems.length - 1;
      down.addEventListener("click", () => moveInGroup(entry.id, 1));
      top.appendChild(up);
      top.appendChild(down);
    }

    const remove = el("button", "icon-btn remove", "✕");
    remove.type = "button";
    remove.setAttribute("aria-label", "Remove " + (ex ? ex.name : "exercise") + " from routine");
    remove.addEventListener("click", () => {
      removeFromRoutine(entry.id);
      renderRoutine();
    });
    top.appendChild(remove);
    item.appendChild(top);

    const fields = el("div", "routine-item-fields");
    const sets = el("input", "sets-input");
    sets.placeholder = "3x12";
    sets.maxLength = 20;
    sets.value = entry.sets;
    sets.setAttribute("aria-label", "Sets and reps");
    sets.addEventListener("input", () => { entry.sets = sets.value; scheduleSave(); });
    const notes = el("input", "notes-input");
    notes.placeholder = "Notes — e.g. keep elbows tucked";
    notes.maxLength = 200;
    notes.value = entry.notes;
    notes.setAttribute("aria-label", "Notes");
    notes.addEventListener("input", () => { entry.notes = notes.value; scheduleSave(); });
    fields.appendChild(sets);
    fields.appendChild(notes);
    item.appendChild(fields);

    return item;
  }

  function renderRoutine() {
    const wrap = $("#routine-groups");
    wrap.innerHTML = "";
    const items = state.routine;
    const n = items.length;
    // Two budgets, shown separately — "12 / 10" would look broken otherwise.
    const s = stretchesSaved();
    $("#routine-count").textContent = n
      ? trainingSaved() + " / " + WORKOUT_CAP + (s ? " · " + s + " / " + STRETCH_CAP + " stretch" : "")
      : "";
    $("#routine-empty").hidden = n > 0;
    $("#btn-clear-routine").hidden = n === 0;
    // Only offer "Start workout" when there are exercises the library still knows.
    const doable = items.filter((r) => EX_BY_ID[r.id]).length;
    $("#btn-start-workout").hidden = doable === 0;
    if (!n) return;

    MUSCLE_GROUPS.forEach((g) => {
      const groupItems = items.filter(
        (r) => EX_BY_ID[r.id] && EX_BY_ID[r.id].muscleGroup === g.name
      );
      if (!groupItems.length) return;
      const section = el("section", "routine-group");
      const head = el("h3", "routine-group-head");
      head.style.setProperty("--group-color", g.color);
      head.appendChild(el("span", "dot"));
      head.appendChild(document.createTextNode(g.name + " "));
      head.appendChild(el("span", "group-count", "· " + groupItems.length));
      section.appendChild(head);
      groupItems.forEach((entry) => section.appendChild(routineItemEl(entry, groupItems)));
      wrap.appendChild(section);
    });

    // Entries whose exercise id vanished from a future dataset — still removable.
    const orphans = items.filter((r) => !EX_BY_ID[r.id]);
    if (orphans.length) {
      const section = el("section", "routine-group");
      const head = el("h3", "routine-group-head");
      head.appendChild(el("span", "dot"));
      head.appendChild(document.createTextNode("No longer in the library"));
      section.appendChild(head);
      orphans.forEach((entry) => section.appendChild(routineItemEl(entry, orphans)));
      wrap.appendChild(section);
    }
  }

  // ── In-workout mode (Phase D) ────────────────────────────
  function parseSetCount(s) {
    const m = String(s || "").match(/^\s*(\d+)/);
    const n = m ? parseInt(m[1], 10) : 0;
    return n > 0 && n <= 12 ? n : 3; // default 3 sets when unspecified
  }

  // Warm-ups lead, cool-downs close, training in between — so a stretch saved
  // halfway down your Stack still lands where it belongs in the actual run.
  function workoutOrder(entry) {
    const ex = EX_BY_ID[entry.id];
    if (isWarmup(ex)) return 0;
    if (isCooldown(ex)) return 2;
    return 1;
  }

  function startWorkout() {
    const items = state.routine
      .filter((r) => EX_BY_ID[r.id])
      .map((r, i) => ({ r, i }))
      .sort((a, b) => workoutOrder(a.r) - workoutOrder(b.r) || a.i - b.i)
      .map(({ r }) => ({ id: r.id, sets: r.sets, notes: r.notes, doneSets: 0 }));
    if (!items.length) return;
    workout = { items, index: 0 };
    stopRest();
    showScreen("workout");
    renderWorkout();
  }

  function finishWorkout() {
    stopRest();
    const logged = logWorkout();
    workout = null;
    // Land on Progress when something was logged (the reward), else back to the Stack.
    showScreen(logged ? "progress" : "routine");
  }

  // Log a completed run to history if at least one set was marked done.
  function logWorkout() {
    if (!workout) return false;
    const totalSets = workout.items.reduce((s, i) => s + i.doneSets, 0);
    if (totalSets <= 0) return false;
    const done = workout.items.filter((i) => i.doneSets > 0);
    const groups = [];
    done.forEach((i) => {
      const ex = EX_BY_ID[i.id];
      if (ex && !groups.includes(ex.muscleGroup)) groups.push(ex.muscleGroup);
    });
    state.history.push({ date: dateKey(new Date()), exercises: done.length, sets: totalSets, groups });
    saveState();

    /* The shared ledger (ADR-022). FitFlexr and Hearthsmith are the same
       origin, so this writes to the same localStorage Hearthsmith reads:
       Embers earned here are spent on the room over there, and the character
       sheet starts listing this app as one of the games that made you.

       Deliberately AFTER saveState() and deliberately ignoring the result.
       FitFlexr's own history is the thing the user came for and must land
       first; the shared event is a bonus, and if it fails for any reason the
       workout is still logged. Ragesmith.logWorkout() never throws. */
    if (window.Ragesmith) {
      window.Ragesmith.logWorkout({ exercises: done.length, sets: totalSets, groups: groups });
    }
    return true;
  }

  // A stretch gets a short transition, not a working rest — standing around for
  // 2:30 between yoga poses would be nonsense.
  function restForCurrent() {
    const item = workout && workout.items[workout.index];
    const ex = item && EX_BY_ID[item.id];
    return isStretch(ex) ? STRETCH_REST : currentRestDefault();
  }

  // True only for the final set of the final exercise — the one moment in a run
  // where there's nothing left to rest for. Generalises to any number of sets and
  // any number of exercises; nothing here is per-set-count special-cased.
  function isLastSetOfWorkout(index, doneSets, total) {
    return !!workout && index >= workout.items.length - 1 && doneSets >= total;
  }

  function stopRest() {
    if (restTimer) { clearInterval(restTimer); restTimer = null; }
    restRemaining = 0;
    const r = $("#wo-rest");
    if (r) r.hidden = true;
  }

  function fmtTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m + ":" + String(s).padStart(2, "0");
  }

  function updateRestDisplay() {
    const t = $("#wo-rest-time");
    if (t) t.textContent = fmtTime(Math.max(0, restRemaining));
  }

  // The break covers the how-to, so it has to say what it's a break FOR — otherwise
  // the instructions just look like they went missing.
  function updateRestNext() {
    const node = $("#wo-rest-next");
    if (!node || !workout) return;
    const item = workout.items[workout.index];
    const n = parseSetCount(item.sets);
    if (item.doneSets < n) {
      node.textContent = "Up next: set " + (item.doneSets + 1) + " of " + n;
      return;
    }
    const next = workout.items[workout.index + 1];
    const nextEx = next ? EX_BY_ID[next.id] : null;
    node.textContent = nextEx ? "Up next: " + nextEx.name : "Last one done — tap Finish.";
  }

  function startRest(seconds) {
    stopRest();
    restRemaining = seconds;
    $("#wo-rest").hidden = false;
    updateRestNext();
    updateRestDisplay();
    restTimer = setInterval(() => {
      restRemaining -= 1;
      if (restRemaining <= 0) stopRest();
      else updateRestDisplay();
    }, 1000);
  }

  // Smart substitution: same muscle group, prefer same pattern, gear you own,
  // passes conditions, not already in this workout. Session-only (Stack unchanged).
  function swapCurrent() {
    if (!workout) return;
    const item = workout.items[workout.index];
    const ex = EX_BY_ID[item.id];
    if (!ex) return;
    const used = new Set(workout.items.map((i) => i.id));
    // Like for like by band (warm-up / training / cool-down) rather than by exact
    // category, so a cool-down never swaps to a barbell row but training moves keep
    // the wide pool they had before.
    const candidates = EXERCISES.filter(
      (c) => c.id !== ex.id && !used.has(c.id) &&
        isWarmup(c) === isWarmup(ex) && isCooldown(c) === isCooldown(ex) &&
        c.muscleGroup === ex.muscleGroup && ownsGear(c) && passesConditions(c)
    );
    const samePattern = candidates.filter((c) => c.pattern && c.pattern === ex.pattern);
    const pool = samePattern.length ? samePattern : candidates;
    if (!pool.length) { updateSwapHint("No equivalent move available"); return; }
    const pick = pool[Math.floor(Math.random() * pool.length)];
    workout.items[workout.index] = { id: pick.id, sets: item.sets, notes: "", doneSets: 0 };
    stopRest();
    renderWorkout();
  }

  function updateSwapHint(msg) {
    const el2 = $("#wo-swap");
    if (!el2) return;
    const original = "🔄 Swap";
    el2.textContent = msg;
    el2.disabled = true;
    setTimeout(() => { el2.textContent = original; el2.disabled = false; }, 1400);
  }

  // The last set of an exercise starts a rest like any other, so moving on to the
  // next movement must NOT cancel it — that break is exactly the one you're taking.
  function goToExercise(idx) {
    if (!workout) return;
    if (idx >= workout.items.length) { finishWorkout(); return; }
    workout.index = Math.max(0, Math.min(idx, workout.items.length - 1));
    renderWorkout();
  }

  function renderWorkout() {
    if (!workout) return;
    const item = workout.items[workout.index];
    const ex = EX_BY_ID[item.id];
    if (!ex) { finishWorkout(); return; }
    const total = workout.items.length;
    $("#wo-progress").textContent = "Exercise " + (workout.index + 1) + " / " + total;

    const group = GROUP_BY_NAME[ex.muscleGroup] || { color: "#888" };
    const card = $("#wo-card");
    card.style.setProperty("--group-color", group.color);
    const secGroup = (ex.secondaryMuscles || []).map((m) => GROUP_BY_NAME[m])
      .find((g) => g && g.name !== ex.muscleGroup);
    if (secGroup) { card.style.setProperty("--secondary-color", secGroup.color); card.dataset.hasSecondary = "true"; }
    else { card.removeAttribute("data-has-secondary"); }

    // Only the three bands are re-rendered — #wo-rest lives in .wo-stage and must
    // survive, or an in-flight break would be wiped by any re-render.
    const head = $("#wo-head");
    head.innerHTML = "";
    head.appendChild(groupPill(ex.muscleGroup));
    head.appendChild(el("h2", "wo-name card-name", ex.name));

    // The full how-to, not just the one-line cue — this screen is where you're
    // actually doing the movement, so it needs at least what the swipe card showed.
    const explain = $("#wo-explain");
    explain.innerHTML = "";
    explain.appendChild(el("p", "wo-cue", ex.cue));
    if (ex.description) explain.appendChild(el("p", "wo-desc", ex.description));
    if (ex.secondaryMuscles && ex.secondaryMuscles.length) {
      explain.appendChild(el("p", "wo-meta", "Also works: " + ex.secondaryMuscles.join(", ")));
    }
    if (ex.avoidIf && ex.avoidIf.length) {
      const labels = ex.avoidIf.map((t) => (CONDITION_BY_ID[t] ? CONDITION_BY_ID[t].label : t));
      explain.appendChild(el("p", "wo-flags", "⚠ Flagged for: " + labels.join(" · ")));
    }
    explain.scrollTop = 0;

    const foot = $("#wo-foot");
    foot.innerHTML = "";
    if (item.sets) foot.appendChild(el("p", "wo-target", "Target: " + item.sets));

    const n = parseSetCount(item.sets);
    const setsWrap = el("div", "wo-sets");
    for (let i = 0; i < n; i++) {
      const done = i < item.doneSets;
      const pill = el("button", "wo-set" + (done ? " wo-set-done" : ""));
      pill.type = "button";
      pill.textContent = done ? "✓ Set " + (i + 1) : "Set " + (i + 1);
      pill.addEventListener("click", () => {
        if (i >= item.doneSets) {
          item.doneSets = i + 1;
          // Every completed set earns a rest, including the last set of an exercise —
          // you still need that break before the next movement. (This is what was
          // broken: the old `doneSets < n` test skipped rest on an exercise's final
          // set, so a 3-set exercise only ever timed sets 1 and 2.) The one set that
          // ends the session instead of starting a rest is the last of the last.
          if (isLastSetOfWorkout(workout.index, item.doneSets, n)) stopRest();
          else startRest(restForCurrent());
        } else {
          item.doneSets = i; // tap a completed set to un-check from there
          stopRest();        // redoing a set means that rest no longer applies
        }
        renderWorkout();
      });
      setsWrap.appendChild(pill);
    }
    foot.appendChild(setsWrap);

    const allDone = item.doneSets >= n;
    if (allDone) foot.appendChild(el("p", "wo-alldone", "All sets done — nice. On to the next."));

    $("#wo-prev").disabled = workout.index === 0;
    $("#wo-next").textContent = workout.index === total - 1 ? "Finish ✓" : "Next →";
    $("#screen-workout").style.setProperty("--group-color", group.color);
  }

  // ── Progress & motivation (Phase E) ──────────────────────
  function dateKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function startOfDay(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }

  // Parse a "YYYY-MM-DD" key as a LOCAL date (new Date(str) would treat it as UTC
  // and shift the day across timezones).
  function parseLocalDate(str) {
    const [y, m, d] = String(str).split("-").map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  }

  // Monday 00:00 of the week containing d.
  function mondayOf(d) {
    const x = startOfDay(d);
    const back = (x.getDay() + 6) % 7; // 0 = Monday
    x.setDate(x.getDate() - back);
    return x;
  }

  // Consecutive weeks (ending this week, or last week if this one's empty) with ≥1 workout.
  function weeklyStreak() {
    const weeks = new Set(state.history.map((h) => dateKey(mondayOf(parseLocalDate(h.date)))));
    let cur = mondayOf(new Date());
    if (!weeks.has(dateKey(cur))) {
      cur.setDate(cur.getDate() - 7);
      if (!weeks.has(dateKey(cur))) return 0;
    }
    let streak = 0;
    while (weeks.has(dateKey(cur))) { streak += 1; cur.setDate(cur.getDate() - 7); }
    return streak;
  }

  function daysAgoLabel(dateStr) {
    const diff = Math.round((startOfDay(new Date()) - parseLocalDate(dateStr)) / 86400000);
    if (diff <= 0) return "today";
    if (diff === 1) return "yesterday";
    return diff + " days ago";
  }

  function statCard(value, label) {
    const c = el("div", "stat-card");
    c.appendChild(el("span", "stat-value", String(value)));
    c.appendChild(el("span", "stat-label", label));
    return c;
  }

  // Hand-rolled SVG: workouts per week for the last 8 weeks (no chart library).
  function weeklyChart() {
    const weeks = [];
    let cur = mondayOf(new Date());
    for (let i = 0; i < 8; i++) { weeks.unshift(new Date(cur)); cur.setDate(cur.getDate() - 7); }
    const counts = weeks.map((w) => {
      const key = dateKey(w);
      return state.history.filter((h) => dateKey(mondayOf(parseLocalDate(h.date))) === key).length;
    });
    const max = Math.max(1, ...counts);
    const W = 320, H = 132, padX = 6, padTop = 10, base = H - 22, n = counts.length;
    const slot = (W - padX * 2) / n;
    const bw = slot * 0.56;
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("class", "progress-chart");
    counts.forEach((c, i) => {
      const x = padX + slot * i + (slot - bw) / 2;
      const h = c > 0 ? Math.max(6, (base - padTop) * (c / max)) : 2;
      const y = base - h;
      const rect = document.createElementNS(NS, "rect");
      rect.setAttribute("x", x.toFixed(1));
      rect.setAttribute("y", y.toFixed(1));
      rect.setAttribute("width", bw.toFixed(1));
      rect.setAttribute("height", h.toFixed(1));
      rect.setAttribute("rx", "3");
      rect.setAttribute("class", c > 0 ? "bar bar-on" : "bar bar-off");
      svg.appendChild(rect);
      if (c > 0) {
        const t = document.createElementNS(NS, "text");
        t.setAttribute("x", (x + bw / 2).toFixed(1));
        t.setAttribute("y", (y - 3).toFixed(1));
        t.setAttribute("class", "bar-count");
        t.setAttribute("text-anchor", "middle");
        t.textContent = String(c);
        svg.appendChild(t);
      }
      const lbl = document.createElementNS(NS, "text");
      lbl.setAttribute("x", (x + bw / 2).toFixed(1));
      lbl.setAttribute("y", (H - 6).toFixed(1));
      lbl.setAttribute("class", "bar-label");
      lbl.setAttribute("text-anchor", "middle");
      // week-of label: month/day of that Monday
      lbl.textContent = (weeks[i].getMonth() + 1) + "/" + weeks[i].getDate();
      svg.appendChild(lbl);
    });
    return svg;
  }

  function renderProgress() {
    const empty = state.history.length === 0;
    $("#progress-empty").hidden = !empty;
    const body = $("#progress-body");
    body.innerHTML = "";
    body.hidden = empty;
    if (empty) return;

    const total = state.history.length;
    const streak = weeklyStreak();
    const mon = mondayOf(new Date());
    const thisWeek = state.history.filter((h) => startOfDay(parseLocalDate(h.date)) >= mon).length;
    const lastDate = state.history.map((h) => h.date).sort().slice(-1)[0];

    const stats = el("div", "stat-row");
    stats.appendChild(statCard(streak, streak === 1 ? "week streak" : "week streak"));
    stats.appendChild(statCard(thisWeek, "this week"));
    stats.appendChild(statCard(total, total === 1 ? "workout" : "workouts"));
    body.appendChild(stats);

    body.appendChild(el("p", "progress-last", "Last workout: " + daysAgoLabel(lastDate)));

    const chartCard = el("div", "chart-card");
    chartCard.appendChild(el("span", "eyebrow", "Last 8 weeks"));
    const chartWrap = el("div", "chart-wrap");
    chartWrap.appendChild(weeklyChart());
    chartCard.appendChild(chartWrap);
    body.appendChild(chartCard);

    const histWrap = el("div", "history-list");
    histWrap.appendChild(el("span", "eyebrow", "History"));
    state.history.slice().reverse().slice(0, 20).forEach((h) => {
      const row = el("div", "history-row");
      const primary = h.groups[0] ? GROUP_BY_NAME[h.groups[0]] : null;
      if (primary) row.style.setProperty("--group-color", primary.color);
      row.appendChild(el("span", "history-dot"));
      const meta = el("div", "history-meta");
      const d = parseLocalDate(h.date);
      const dateStr = d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
      meta.appendChild(el("span", "history-date", dateStr));
      const detail = h.groups.length ? h.groups.join(" · ") : "Workout";
      meta.appendChild(el("span", "history-detail", detail));
      row.appendChild(meta);
      row.appendChild(el("span", "history-sets", h.sets + (h.sets === 1 ? " set" : " sets")));
      histWrap.appendChild(row);
    });
    body.appendChild(histWrap);
  }

  // ── Modal (custom confirm — never window.confirm) ────────
  let modalConfirmAction = null;

  function showModal(opts) {
    $("#modal-title").textContent = opts.title;
    $("#modal-text").textContent = opts.text;
    $("#modal-confirm").textContent = opts.confirmLabel || "Confirm";
    modalConfirmAction = opts.onConfirm || null;
    $("#modal").hidden = false;
    $("#modal-cancel").focus();
  }

  function hideModal() {
    $("#modal").hidden = true;
    modalConfirmAction = null;
  }

  // ── Theme ────────────────────────────────────────────────
  function resolvedTheme() {
    if (state.theme === "light" || state.theme === "dark") return state.theme;
    try {
      return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch (_) {
      return "light";
    }
  }

  function applyTheme() {
    const mode = resolvedTheme();
    document.documentElement.dataset.theme = mode;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = mode === "dark" ? "#0a0b0d" : "#f4f5f7";
    $$(".seg-btn").forEach((b) =>
      b.classList.toggle("seg-active", b.dataset.themeChoice === state.theme)
    );
  }

  // ── Export ───────────────────────────────────────────────
  function exportString() {
    const payload = Object.assign(
      { app: "FitFlexr", exportedAt: new Date().toISOString() },
      state
    );
    return JSON.stringify(payload, null, 2);
  }

  function downloadExport() {
    const blob = new Blob([exportString()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fitflexr-backup-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ── Sharing (Phase: hand-it-to-a-friend) ────────────────
  // The app IS the link — no install file, no account. Uses the native share
  // sheet where available (phones), falls back to clipboard, then to prompt().
  const SHARE_URL = "https://dirkragesmith.github.io/fitflexr/";
  const SHARE_TEXT =
    "Try FitFlexr — a free workout app. No download, no signup: just open this link on your " +
    "phone and tap 'Add to Home Screen' to keep it.\n\n" + SHARE_URL;

  function shareStatus(msg) {
    const el2 = $("#share-status");
    if (!el2) return;
    el2.hidden = !msg;
    el2.textContent = msg || "";
  }

  async function shareApp() {
    // 1) Native share sheet — the one-tap path to Messages/Mail/WhatsApp.
    if (navigator.share) {
      try {
        await navigator.share({ title: "FitFlexr", text: SHARE_TEXT, url: SHARE_URL });
        shareStatus("Thanks for spreading the word!");
        return;
      } catch (err) {
        if (err && err.name === "AbortError") return; // user closed the sheet
      }
    }
    // 2) Clipboard — desktop browsers.
    try {
      await navigator.clipboard.writeText(SHARE_TEXT);
      shareStatus("Link copied! Paste it into a text or email.");
      return;
    } catch (_) { /* fall through */ }
    // 3) Last resort so the link is always obtainable.
    window.prompt("Copy this link and send it to a friend:", SHARE_URL);
  }

  // Tester feedback: download the data file + open a prefilled email (no recipient
  // baked in — the tester adds it — so a personal address never sits in public source).
  function shareFeedback() {
    downloadExport();
    const o = state.onboarding;
    const goal = o.goal && GOAL_BY_ID[o.goal] ? GOAL_BY_ID[o.goal].label : "not set";
    const body = [
      "My FitFlexr feedback:",
      "",
      "What I liked:",
      "What was confusing / didn't work:",
      "What I'd change:",
      "",
      "— quick stats —",
      "Goal: " + goal + (o.timeAvailable ? " · " + o.timeAvailable + " min" : ""),
      "Saved exercises: " + state.routine.length,
      "Workouts logged: " + state.history.length,
      "",
      "(My full data file just downloaded — attaching it: tap the paperclip and pick the",
      "fitflexr-backup file.)",
    ].join("\n");
    window.location.href =
      "mailto:?subject=" + encodeURIComponent("FitFlexr feedback") + "&body=" + encodeURIComponent(body);
  }

  // ── Wiring ───────────────────────────────────────────────
  function wireEvents() {
    $$(".tab-btn").forEach((b) => b.addEventListener("click", () => showScreen(b.dataset.screen)));

    // Onboarding wizard nav
    $("#ob-next").addEventListener("click", () => {
      if (obIndex >= OB_STEPS.length - 1) finishOnboarding();
      else { obIndex++; renderOnboarding(); }
    });
    $("#ob-back").addEventListener("click", () => {
      if (obIndex > 0) { obIndex--; renderOnboarding(); }
    });
    $("#ob-skip").addEventListener("click", finishOnboarding);
    $("#btn-redo-onboarding").addEventListener("click", startOnboarding);

    $("#btn-generate").addEventListener("click", startGeneratedSession);

    // Jump from the top summary down to the real gear/injury controls.
    $("#setup-summary").addEventListener("click", () => {
      const card = $(".shared-card");
      card.scrollIntoView({ behavior: "smooth", block: "start" });
      card.classList.add("shared-card-flash");
      setTimeout(() => card.classList.remove("shared-card-flash"), 1200);
    });

    $("#btn-groups-all").addEventListener("click", () => setAllGroups(true));
    $("#btn-groups-none").addEventListener("click", () => setAllGroups(false));
    $("#btn-start").addEventListener("click", () => {
      buildDeck();
      showScreen("deck");
    });

    $("#btn-save").addEventListener("click", () => {
      const card = topCard();
      if (card) commitSwipe(card, "save");
    });
    $("#btn-skip").addEventListener("click", () => {
      const card = topCard();
      if (card) commitSwipe(card, "skip");
    });
    $("#btn-undo").addEventListener("click", undoSwipe);

    $("#btn-nodeck-filters").addEventListener("click", () => showScreen("filters"));
    $("#btn-empty-filters").addEventListener("click", () => showScreen("filters"));
    $("#btn-empty-routine").addEventListener("click", () => showScreen("routine"));
    $("#btn-full-routine").addEventListener("click", () => showScreen("routine"));
    $("#btn-full-undo").addEventListener("click", undoSwipe);
    $("#btn-routine-swipe").addEventListener("click", () => showScreen("deck"));
    $("#btn-progress-stack").addEventListener("click", () => showScreen("routine"));

    // In-workout mode (Phase D)
    $("#btn-start-workout").addEventListener("click", startWorkout);
    $("#wo-exit").addEventListener("click", finishWorkout);
    $("#wo-prev").addEventListener("click", () => goToExercise(workout ? workout.index - 1 : 0));
    $("#wo-next").addEventListener("click", () => goToExercise(workout ? workout.index + 1 : 0));
    $("#wo-swap").addEventListener("click", swapCurrent);
    $("#wo-rest-skip").addEventListener("click", stopRest);
    $("#wo-rest-minus").addEventListener("click", () => {
      restRemaining -= 15;
      if (restRemaining <= 0) stopRest(); else updateRestDisplay();
    });
    $("#wo-rest-plus").addEventListener("click", () => { restRemaining += 15; updateRestDisplay(); });

    $("#btn-clear-routine").addEventListener("click", () =>
      showModal({
        title: "Clear your FitFlex Stack?",
        text: "This removes every saved exercise plus their sets and notes. There's no undo — export from Settings first if you want a backup.",
        confirmLabel: "Clear everything",
        onConfirm: () => {
          state.routine = [];
          saveState();
          renderRoutine();
        },
      })
    );

    $("#modal-cancel").addEventListener("click", hideModal);
    $("#modal-confirm").addEventListener("click", () => {
      const fn = modalConfirmAction;
      hideModal();
      if (fn) fn();
    });
    $("#modal").addEventListener("click", (e) => {
      if (e.target === $("#modal")) hideModal();
    });

    $$(".seg-btn").forEach((b) =>
      b.addEventListener("click", () => {
        state.theme = b.dataset.themeChoice;
        saveState();
        applyTheme();
      })
    );
    try {
      matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (state.theme === "system") applyTheme();
      });
    } catch (_) { /* older Safari */ }

    $("#btn-open-filters").addEventListener("click", () => showScreen("filters"));
    $("#btn-export").addEventListener("click", downloadExport);
    $("#btn-feedback").addEventListener("click", shareFeedback);
    $("#btn-share").addEventListener("click", shareApp);
    $("#btn-install-help").addEventListener("click", () => {
      const help = $("#install-help");
      help.hidden = !help.hidden;
      $("#btn-install-help").textContent = help.hidden
        ? "How do I install it? (show steps)"
        : "Hide the steps";
    });

    // Keyboard support: arrows to swipe, U to undo.
    document.addEventListener("keydown", (e) => {
      if (!$("#modal").hidden) {
        if (e.key === "Escape") hideModal();
        return;
      }
      if (currentScreen !== "deck") return;
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      const card = topCard();
      if (e.key === "ArrowRight" && card) {
        e.preventDefault();
        commitSwipe(card, "save");
      } else if (e.key === "ArrowLeft" && card) {
        e.preventDefault();
        commitSwipe(card, "skip");
      } else if (e.key === "u" || e.key === "U") {
        undoSwipe();
      }
    });

    // Flush any debounced field edits if the tab closes mid-typing.
    window.addEventListener("pagehide", () => {
      if (saveTimer) {
        clearTimeout(saveTimer);
        saveState();
      }
    });
  }

  // ── Service worker (defensive: file:// must never throw) ──
  function registerServiceWorker() {
    try {
      if (!("serviceWorker" in navigator)) return;
      if (location.protocol !== "http:" && location.protocol !== "https:") return;
      navigator.serviceWorker
        .register("./sw.js")
        .catch((err) => console.warn("FitFlexr: service worker registration failed.", err));
    } catch (err) {
      console.warn("FitFlexr: service worker registration skipped.", err);
    }
  }

  // ── Boot ─────────────────────────────────────────────────
  function renderAboutStats() {
    $("#about-stats").textContent =
      EXERCISES.length + " exercises · " + MUSCLE_GROUPS.length +
      " muscle groups · " + CONDITIONS.length + " conditions · all data on-device";
  }

  validateDataset();
  applyTheme();
  renderFilterChips();
  renderGoalChips();
  renderTimeChips();
  renderReadinessChips();
  renderAboutStats();
  renderRoutine();
  updateProfileSummaries();
  wireEvents();
  // First run → onboarding; returning users land on the setup screen.
  if (!state.onboarding.completed) startOnboarding();
  else showScreen("filters");
  registerServiceWorker();

  // Read-only handle for scripted smoke tests (see CLAUDE.md checklist).
  window.FitFlexrDebug = {
    get deckRemaining() { return deck.slice(deckIndex); },
    get sessionSkipped() { return Array.from(sessionSkipped); },
    get state() { return JSON.parse(JSON.stringify(state)); },
    exportString,
    validateDataset,
  };
})();
