# FitFlexr — Product Roadmap & Shared Spec

> **Note:** the app was renamed **SwipeFit → FitFlexr** on 2026-07-23. Older references to
> "SwipeFit" in the prose below refer to this same app; the schema and rules are unchanged.

**Purpose:** one document that keeps two collaborators in sync — the *Claude Code*
sessions that build against the real repo, and the *ChatGPT* sessions Matt uses for
product brainstorming and bulk content. If you are an AI reading this: this file is the
contract. Follow the schema in §5 exactly; don't invent fields or relax the safety
rules in §9.

**Status as of 2026-07-17:** live PWA at <https://dirkragesmith.github.io/fitflexr/>,
170 exercises (Bodyweight + Dumbbell), muscle/gear/condition filters, My Routine, dark
theme, offline service worker. Vanilla HTML/CSS/JS, no build step, no backend,
`localStorage` only. See `CLAUDE.md` for ground rules and the smoke-test checklist.

---

## 1. Product thesis (the thing we protect)

The swipe-first interaction is the moat, **not** the exercise database. Anyone can list
exercises; almost nobody rethinks how a workout is *navigated*. Card-stack + swipe =
zero learning curve. Every decision below is judged against one question: **does it keep
the app feeling like "Tinder meets Duolingo for training," or does it drift toward
spreadsheet-syndrome (Strong/Jefit)?** When in doubt, cut it.

Minimalism is the strength. New capability should hide until it's needed, not add
clutter to the first screen.

---

## 2. The Tier line (read this before planning anything)

Everything in the vision sorts into two tiers by **what it costs the architecture.**

- **Tier 1 — fits what already exists.** Client-side only, works offline, free to host,
  no rewrite. This is ~80% of the vision. **We build this now.**
- **Tier 2 — a real architectural leap.** Needs a backend / accounts / cloud / real LLM
  calls / payments. Breaks the offline-only rule and costs money. **Do not start until
  50–100 real users have validated demand.** The **friends-and-family beta is that gate** —
  Matt's plan is to hand it round once it's F&F-ready and learn from real usage before
  spending on any backend.

If a proposed feature can't be done in the browser with `localStorage`, it's Tier 2 by
definition — park it in §8, don't sneak it into Tier 1.

---

## 3. Where each collaborator adds value (workflow + token economics)

- **ChatGPT** (separate token budget; good at divergent thinking): product ideation,
  prioritization, market/positioning, and **bulk content drafting** — see §6, the
  500-exercise deck. It cannot see this repo, so **do not ask it for technical
  architecture**; its plans come back generic and sometimes suggest things already built.
- **Claude Code** (this repo, sees the real files): code-grounded planning, schema
  design, integration, app logic, UI, and the `validate.js` gate. Turns ChatGPT's
  *ideas* into plans against the actual code, then builds.
- **Rule of thumb:** round-trip *intentions*, not specs. Brainstorm anywhere; let Claude
  write the plan that touches code; hand ChatGPT the high-volume, low-judgment data work.

---

## 4. Current architecture (what a plan must build on)

| File | Holds |
|---|---|
| `index.html` | App shell, four screens, inline theme boot |
| `styles.css` | All styling; theme via `html[data-theme]` |
| `app.js` | State (localStorage, `schemaVersion`), deck engine, swipe (pointer events), routine, settings. Filters live in `state.filters = { groups, equipment, conditions }`. `eligiblePool()` and `matchesFilters()` are where filtering happens. |
| `exercises.js` | `MUSCLE_GROUPS` (11), `EQUIPMENT`, `CONDITIONS` (9), `EXERCISES`. Also `module.exports` for Node. |
| `validate.js` | Scripted contract gate — `node validate.js`. |
| `sw.js` | Service worker; bump `CACHE_VERSION` on any app-file change. |

Key facts a feature plan must respect: filter UIs are **generated** from the data arrays
(never hardcoded); user data references exercises by permanent `id` only; unknown
exercise fields are safely ignored by today's `app.js` (so new metadata is additive).

---

## 5. Schema evolution (the contract GPT and Claude both target)

The dataset grows from 170 → ~500 and gains metadata for goal/time/pattern-based
generation. Two structural changes plus additive fields:

### 5a. `equipment` becomes an array of required items

Today it's a single string and a bench is *assumed*. For a real gear filter, an exercise
is doable **iff the user owns every item it requires**. So:

- `equipment: ["dumbbell", "bench"]` — needs both.
- `equipment: ["bodyweight"]` — needs nothing, do it anywhere.
- The gear filter becomes a **superset test**: show an exercise only if the user's
  selected gear ⊇ the exercise's `equipment`. (Claude updates `eligiblePool()`,
  `matchesFilters()`, migration, and the setup UI when the deck lands — schema bumps to v3.)

**Canonical `EQUIPMENT` ids (use these exact strings):**

`bodyweight`, `bench`, `dumbbell`, `barbell`, `ez-bar`, `kettlebell`, `pull-up-bar`,
`resistance-band`, `cable`, `machine`, `trx`, `box`, `medicine-ball`, `ab-wheel`,
`jump-rope`

Notes: a floor/`wall`/`mat` is always available — **don't** gate on those. "Home gym /
hotel / Planet Fitness" are **locations, not equipment** — they become one-tap *presets*
that select an equipment bundle (Phase B), never per-exercise tags. Split today's
over-broad "Bodyweight": true floor moves = `["bodyweight"]`, but pull-ups/chin-ups/
hanging raises = `["pull-up-bar"]`.

**Canonical meanings (decided during the Back batch — resolve stand-ins with these):**
- **`bench` = any sturdy elevated surface** (flat bench, box, step, chair, solid table).
  Covers: press on it, step on it, elevate your feet, dip *between two*, and grip/*row
  under* it. So inverted/table rows and bench/chair dips are `["bench"]` — not a gap.
- **Pull-anchor rule:** overhead bar → `pull-up-bar`; suspension straps → `trx`; a sturdy
  surface → `bench`; improvised (towel on a door) → `bodyweight`. There is no separate
  `low-bar`/`dip-bars`/`rings` id — collapse those into `bench`/`pull-up-bar`/`trx`.

### 5b. Additive metadata (fill for ALL exercises, including the existing 170)

Today's app ignores these; Phases C–F switch them on. They are **recommended, not
hard-required** — `validate.js` only *warns* on a missing/blank metadata field, so a batch
that fumbles one still integrates (only the §5c structural/safety fields fail the build).
Keep them honest and taggable:

- `mechanic`: `"Compound"` | `"Isolation"`
- `pattern`: one of `"Horizontal Push"`, `"Vertical Push"`, `"Horizontal Pull"`,
  `"Vertical Pull"`, `"Squat"`, `"Hinge"`, `"Lunge"`, `"Carry"`, `"Rotation"`,
  `"Core"`, `"Conditioning"`
- `force`: `"Push"` | `"Pull"` | `"Static"` | `"Explosive"`
- `unilateral`: `true` | `false` (one side at a time?)
- `focus`: array, subset of `["strength","hypertrophy","endurance","power","mobility"]`
- `homeFriendly`: `true` | `false` (doable with dumbbells/bench/bodyweight only)
- `aliases`: array of common alternate names, e.g.
  `["DB Incline Press", "Incline DB Press", "Incline Dumbbell Press"]`. Add it now while
  the set is small — search, NL queries ("dumbbell chest press"), voice, and AI
  substitution all need it, and without it we'd write special-case matching code forever.
- `category`: `"strength"` (default) | `"conditioning"` | `"stretch"` | `"mobility"` |
  `"warmup"` | `"cooldown"` | `"rehab"` | `"carry"`. For the ~500 deck this is `"strength"`
  for almost everything and `"conditioning"`/`"carry"` for the Full Body/Cardio group. It
  exists now so the future library (§5d) never needs a schema change.

**Deliberately NOT tagged** (fake precision — keep the data trustworthy): calories,
exact setup time, range-of-motion degrees, "strength curve." If we ever want workout
duration we'll estimate it from set/rep/rest at generation time, not per-exercise guesses.

### 5d. Future: the library grows to ~1,200 via `category` (no schema change)

The ~500 deck is **Exercise DB v1** — all `category: "strength"`/`"conditioning"`. The
schema already supports growing it, as a *later* data phase, into a full training
reference without touching code: ~150 rehab/prehab, ~150 stretches, ~100 mobility drills,
~75 warm-ups, ~75 cooldowns, ~100 carries/conditioning → ~1,100–1,200 total. Still tiny
next to commercial DBs, and it's all just more rows behind the same `category` filter.
Not now — but the field is here so we never have to migrate for it.

### 5c. Unchanged contracts

- `MUSCLE_GROUPS` stays the 11 existing names. `muscleGroup` = one; `secondaryMuscles` =
  array, all from the 11. **Rule:** `muscleGroup` is the *primary training stimulus a user
  thinks of when searching for the exercise*; `secondaryMuscles` captures every other
  meaningful contributor. So pull-ups = `Back` + `["Biceps", ...]`, thrusters =
  `Full Body/Cardio` + `["Quads","Shoulders", ...]`. This keeps the deck predictable.
  (Open app-logic question for Phase B: whether a muscle filter optionally *also* surfaces
  exercises that hit it as a secondary — a UI toggle, not a schema change.)
  **Forearms/grip is deliberately NOT a group yet** — adding it now would create an empty
  group (fails the ≥5 check) and a dead filter chip. Don't use `"Forearms"` as a muscle
  tag; map grip-heavy moves' secondary to `"Biceps"` or omit. Add a Forearms group later,
  together with a grip/forearm exercise section, so it launches populated.
- `CONDITIONS` stays the 9 existing ids (`lower-back`, `knee`, `shoulder`, `wrist`,
  `neck`, `hip`, `high-impact`, `balance`, `pregnancy`). `avoidIf` = array of these.
- `difficulty` ∈ `Beginner` | `Intermediate` | `Advanced`.
- `id`: permanent, unique, kebab-case `^[a-z0-9-]+$`.

---

## 6. ⭐ DELEGATED TASK — the ~500-exercise deck (for ChatGPT)

### 6.1 Production pipeline (batches, not one blob)

Don't generate 500 in one shot — it won't fit reliably and one fix later is painful.
Build it like a data project:

1. **Constitution** — the taxonomy is fixed in §5 (11 groups, 15 equipment ids, 12
   patterns, 5 focuses, 9 injury tags, difficulty + naming + de-dup rules). Nothing gets
   generated until those enums are the shared reference.
2. **Pilot — Chest FIRST (done 2026-07-17).** Proved the schema; do not re-run.
3. **A group at a time, split into validator-sized sub-batches by equipment family.** A
   full group (~36–58) exceeds one ChatGPT response, so split it — e.g. Back = Part 1
   bodyweight/pull-up-bar, Part 2 dumbbell/barbell/kettlebell, Part 3 cable/machine/band/TRX.
   Each part is a **standalone, concatenatable JS array**. Benefits: fits the response
   limit, and a validator flag only means regenerating one section, not the whole group.
   **Critical with sub-batching: ids must be globally unique across every part AND every
   already-integrated group** — the biggest risk when parts are generated in separate
   responses. Prefix-by-equipment naming (e.g. `cable-seated-row` vs `dumbbell-bent-row`)
   makes collisions unlikely; ChatGPT should still self-check each part's ids against the
   prior parts.
4. **Per-part + cross-part QA** (ChatGPT before handoff, Claude's `validate.js` after):
   duplicate ids, same move under two names, injury tags, patterns, equipment/`homeFriendly`
   combos, metadata, difficulty + equipment spread (§6.2 rule).
5. **Integration** (Claude) — §6.3. Claude validates each part on arrival, accumulates a
   group's parts, then swaps the whole group in and deploys once it's complete.

Copy the brief in §6.2 into ChatGPT. Run it per equipment-family sub-batch.

> **Brief for ChatGPT.** Generate one muscle-group batch of the SwipeFit exercise library
> as a JavaScript array of objects, ready to paste into `exercises.js`. **Do Chest first
> as a pilot; wait for the go-ahead before the other groups.** Every object must have
> **exactly these keys** and obey every rule. Output only the array; no prose between
> objects.
>
> **Object shape.** The first 10 keys are REQUIRED (a missing/invalid one fails the
> build). The rest are RECOMMENDED — fill them, but a slip only produces a validator
> warning, not a failure:
> ```js
> {
>   // ── REQUIRED (hard-validated) ──
>   id: "db-incline-bench-press",         // permanent, unique, kebab-case ^[a-z0-9-]+$
>   name: "Incline Dumbbell Bench Press",
>   muscleGroup: "Chest",                 // exactly one of the 11 groups (primary stimulus)
>   secondaryMuscles: ["Shoulders", "Triceps"], // subset of the 11 groups (may be [])
>   equipment: ["dumbbell", "bench"],     // array of EQUIPMENT ids; ["bodyweight"] if none
>   difficulty: "Intermediate",           // Beginner | Intermediate | Advanced
>   cue: "Set the bench to 30°; press up and slightly back over your collarbones.", // 1 line
>   description: "Two sentences: setup/execution, then the most common mistake.",
>   avoidIf: ["shoulder"],                // subset of the 9 condition ids (may be [])
>   icon: "🏋️",                           // one emoji
>   // ── RECOMMENDED (soft-validated: warn only) ──
>   mechanic: "Compound",                 // Compound | Isolation
>   pattern: "Horizontal Push",           // one of the 12 patterns in §5b
>   force: "Push",                        // Push | Pull | Static | Explosive
>   unilateral: false,
>   focus: ["strength", "hypertrophy"],   // subset of the 5 focuses in §5b
>   homeFriendly: false,                  // true iff doable with only dumbbell/bench/bodyweight
>   aliases: ["Incline DB Press", "Incline Dumbbell Press"], // common alternate names
>   category: "strength"                  // strength (default) | conditioning | carry | ...
> }
> ```
>
> **The 11 muscle groups:** Chest, Back, Shoulders, Biceps, Triceps, Core/Abs, Glutes,
> Quads, Hamstrings, Calves, Full Body/Cardio.
>
> **The EQUIPMENT ids:** bodyweight, bench, dumbbell, barbell, ez-bar, kettlebell,
> pull-up-bar, resistance-band, cable, machine, trx, box, medicine-ball, ab-wheel,
> jump-rope. (Never use a location like "gym"/"hotel" as equipment.)
>
> **Equipment = the gating items needed *beyond your own body*.** Bodyweight-only moves =
> `["bodyweight"]`. Moves needing gear list ONLY the gear (e.g. `["cable"]`,
> `["dumbbell","bench"]`) — do **not** add `"bodyweight"` to those. The app treats
> bodyweight as always-owned and shows an exercise only if the user owns every listed item.
>
> **The 9 condition ids (avoidIf may only use these):** lower-back, knee, shoulder,
> wrist, neck, hip, high-impact, balance, pregnancy.
>
> **avoidIf tagging = the app's safety feature. Be conservative — over-tag.** Examples:
> crunches/sit-ups → `lower-back`, `neck`, `pregnancy`; deadlifts/RDLs/good-mornings/
> swings → `lower-back`; overhead presses → `shoulder`, `neck`; floor push-ups &
> plank-hand work → `wrist`; jump squats/burpees/box jumps → `knee`, `high-impact`;
> single-leg/standing-balance moves → `balance`; deep loaded squats/lunges → `knee`
> (+`hip` if deep hip flexion). Planks are generally safe (no tags).
>
> **Coverage — aim ~500, roughly this spread (never fewer than the number shown):**
>
> | Group | Target | Group | Target |
> |---|---|---|---|
> | Chest | 48 | Glutes | 48 |
> | Back | 58 | Quads | 52 |
> | Shoulders | 52 | Hamstrings | 36 |
> | Biceps | 36 | Calves | 26 |
> | Triceps | 36 | Full Body/Cardio | 48 |
> | Core/Abs | 58 | | |
>
> **Cover the full equipment range — do NOT skew to bench/barbell (the pilot's mistake:
> 15 exercises that used only barbell/bench/dumbbell + 1 bodyweight).** Every group must
> hand a *usable deck to each kind of user*: a solid **bodyweight-only** subset (so a no-gear
> friend gets a full deck), a **resistance-band** subset, and — wherever the movement
> genuinely exists — **cable, machine, TRX, kettlebell** variants alongside dumbbell/barbell.
> Rough rule: **no single equipment type more than ~40% of a batch, and ≥15% bodyweight-only.**
> All three difficulties. Include real variations: grips, angles, tempos, unilateral versions.
> Keep `cue` to one line and `description` to ~two sentences. **Do not invent calories, setup time, ROM degrees, or "strength curve" —
> those keys are intentionally absent.** Produce **one muscle group per response** (Chest
> first as the pilot). Ids must be unique within the batch **and** globally across batches;
> before finishing a batch, self-check for duplicate ids and for the same movement appearing
> under two names.

### 6.3 Handback → integration (Claude does this)

1. Drop GPT's arrays into `exercises.js`; extend `EQUIPMENT` to the §5a list; add
   `aliases`/`category` and the other metadata to the exports.
2. Update `validate.js`: **hard-fail** on the §5c core (ids unique + kebab-case,
   `equipment` an array of valid ids, group/condition/difficulty enums, all required keys
   present); **warn-only** on missing/invalid metadata (§5b) and print coverage (per-group,
   per-equipment, per-category, metadata completeness). Raise the size bound to ~400–600;
   keep the ≥5-per-group and avoidIf-∈-conditions checks. **Data doesn't ship until the
   hard checks are green.**
3. Migrate the filter to the superset test (§5a); bump `schemaVersion` → 3 with a
   migration; rebuild the gear filter UI from the new `EQUIPMENT` (+ location presets in
   Phase B). **Clean swap:** the ~500 replaces the current 170 wholesale — Matt is starting
   fresh, so no routine reconciliation is needed. (The "No longer in the library" fallback
   still exists as a safety net for future F&F users across any later data change.)
4. Bump `sw.js` `CACHE_VERSION`; run the full smoke-test checklist; deploy
   (`git push origin main main:gh-pages`).

---

## 7. Tier 1 roadmap (sequenced — build in this order)

**Friends-and-family-ready target:** realistically that's Phases **A–C** done — a real
library, first-run onboarding that works for someone who isn't Matt, and generated
sessions. **D–F** (in-workout mode, progress, rule-based adjustments) are polish that can
land *during* the beta as feedback comes in.

**Phase A — Data & schema. — ✅ COMPLETE (2026-07-23).** All 11 groups produced by ChatGPT,
integrated and deployed: **506 exercises, 100% metadata coverage, all 15 equipment types
populated, zero duplicate ids.** Live at the URL above. Enum additions during the build:
patterns gained `Hip Abduction`; categories gained `power`. **Phases B (onboarding), C (generation
+ swipe-to-learn), and D (in-workout mode) now also done (2026-07-23) — see below.** F&F-ready
target (A–C) met. Next up: **Phase E (progress & motivation)** — polish that can land during the beta.

Final per-group counts: Chest 46 · Back 57 · Shoulders 51 · Biceps 35 · Triceps 33 ·
Core/Abs 68 · Glutes 49 · Quads 52 · Hamstrings 36 · Calves 26 · Full Body/Cardio 53 = **506**.
Built group-by-group from ChatGPT batches (equipment-family sub-batches), each validated with
`scratchpad/check-part.js` and integrated with a `scratchpad/build-<group>.js` script that
protects finalized groups and de-dupes. Core/Abs was curated down from a large duplicate-heavy
dump. Every batch swap bumped `sw.js` `CACHE_VERSION` (now v13).

**Phase B — Onboarding & personalization axes. — ✅ COMPLETE (2026-07-23).**
First-run wizard (`#screen-onboarding`, JS-rendered steps): Welcome → Goal → Time → Gear →
Injuries, with a progress bar and Back/Next/Skip. Shipped, `schemaVersion` → 4, sw cache v16.
- **Goal** (8 options: lose fat / build muscle / strength / athletic / general / mobility /
  rehab / beginner) and **Time** (15/30/45/60/90 min) stored in `state.onboarding = {completed,
  goal, timeAvailable}`. **Collected & stored now; the biasing of `focus`/difficulty and session
  sizing happens in Phase C** — B just captures the axes.
- **Equipment** step reuses the existing presets + gear multiselect (writes `state.filters.equipment`).
- **Injuries** step reuses the existing conditions chips (writes `state.filters.conditions`).
- Gated on `onboarding.completed` (first run shows it; returning users skip). Editable anytime:
  a profile summary pill on Setup and a "Edit goal, time, gear & injuries" button in Settings both
  re-launch the wizard. Tab bar hidden during the flow.

**Phase C — Workout generation + swipe-to-learn. — ✅ COMPLETE (2026-07-23).** schemaVersion → 5,
sw cache v17.
- **Generation:** a "⚡ Generate my session" CTA on Setup builds a session from goal + time + gear +
  injuries. `GOAL_CONFIG` maps each goal → `focus`/difficulty bias + a set/rep scheme; `TIME_COUNT`
  maps 15/30/45/60/90 min → 3/5/7/9/12 exercises. `generateSession()` scores the eligible pool
  (goal-fit + taste + jitter) and round-robins across muscle groups for a balanced full-body deck
  (honors today's group picks if any). Presented as a swipeable deck (`deckMode="generated"`,
  eyebrow "Your session"); swiping right saves with the goal's set/rep scheme prefilled.
- **Swipe-to-learn:** `state.taste = { swipes, weights }`. Every save (+1) / skip (−0.4) nudges
  attribute weights (equip / pattern / group / difficulty / mechanic); `tasteScore()` biases future
  deck ordering once `swipes ≥ 8` (before that: pure shuffle discovery). Undo rolls the nudge back.
  A "🧠 Learning your taste · N/8" indicator shows under the Generate CTA.
- **Deferred to a later pass (not blocking F&F):** the richer taste UI (explicit "like incline
  bench / no squats" prompts) and tuning the ~30-swipe convergence target; current model is the
  lightweight version. Next: **Phase D (in-workout mode)** — see below.

**Phase D — In-workout mode. — ✅ COMPLETE (2026-07-23).** sw cache v18; no schema change
(the workout run is ephemeral, not persisted).
- A green **"▶ Start workout"** CTA on the Stack steps through its exercises one card at a time
  (`#screen-workout`, `startWorkout()`/`renderWorkout()`; tab bar hidden like onboarding).
- **Set tracking:** per-exercise set pills (count parsed from the saved set/rep scheme, default 3);
  tap to mark done / tap a done one to un-check.
- **Rest timer:** marking a set (not the last) auto-starts a 90s countdown with −15s / Skip / +15s.
- **Smart substitution:** a **🔄 Swap** button replaces the current move with an equivalent — same
  muscle group, prefers same `pattern`, gear you own, passes injury filters, not already in the run.
  Session-only (the saved Stack is untouched).
- Prev / Next navigation with a Finish on the last card; Exit returns to the Stack.
- **Deferred:** logging the completed run (that's Phase E history). Next: **Phase E (progress &
  motivation)**.

**Phase E — Progress & motivation. — ✅ COMPLETE (2026-07-23).** schemaVersion → 6, sw cache v22.
- Finishing (or exiting) an in-workout run **logs it** to `state.history = [{date, exercises, sets,
  groups}]` when ≥1 set was marked done; you land on **Progress** afterward (the reward).
- New **Progress tab** (`#screen-progress`): stat cards (**week streak** / this week / total
  workouts), "last workout N days ago", a **hand-rolled SVG bar chart** of workouts-per-week over
  the last 8 weeks (no chart library), and a **history list** with per-muscle-group colored dots.
- Dates stored as local `YYYY-MM-DD` and parsed back as local (`parseLocalDate`) to avoid UTC
  day-shift. Empty state until the first workout is logged.
- **Deferred to a later pass:** **PRs** and **progressive-overload suggestions** — those need
  per-set *weight* logging (a meatier add to in-workout mode), so they're not in this cut. A
  calendar view was also skipped in favor of the weekly chart + list. Next: **Phase F (rule-based
  adjustments)**.

**Phase F — Rule-based "smart" adjustments (the honest kind of AI). — ✅ COMPLETE (2026-07-24).**
sw cache v23; no schema change (modifiers are ephemeral). A **"Today I'm feeling"** chip row on
Setup (`READINESS`: low-energy / sore / short-time / no-gear / strong) deterministically biases
**Generate my session** — no LLM, no network:
- **short-time** → ~60% fewer exercises; **low-energy** → −2 exercises, +30s rest, favor easier
  (Beginner) moves; **sore** → −1 exercise, favor easier, and **steer away from the muscle groups
  in your last logged workout** (recovery-aware, uses Phase E history); **strong** → +1 exercise/
  set, slight bias to Advanced; **no-gear** → bodyweight-only regardless of owned gear.
- Set/rep scheme trimmed/raised (`adjustScheme`), rest default shifted (`currentRestDefault`), and a
  coach-y amber note summarizes what changed (`readinessSummary`). All verified in-browser.
This is the last core Tier 1 phase.

**Phase G — Card clarity pass (content quality). — ✅ COMPLETE (2026-07-24).** All 506 `cue` +
`description` fields rewritten (by Claude, not GPT this time) to the format below: a one-line cue and
a 2–3 sentence how-to a total beginner can follow (setup → step-by-step → the common mistake), with
jargon spelled out. Applied group-by-group via `scratchpad/clarify-<group>.js` scripts (a small lib
patches only those two fields by exact-string match, so ids/metadata are untouched); `validate.js`
green, sw cache v27. No `steps:[]` schema field was needed — the prose format read cleanly. The plan/
brief below is kept for reference in case of future content passes.
Matt hit an exercise he couldn't perform from the card text alone. Goal: every card's `cue` +
`description` should let a **beginner do the move from reading only** — no assumed jargon, no
ambiguity. This is a **ChatGPT bulk-content job** (per §3/§6 division of labor): GPT regenerates
descriptions per muscle-group batch against the brief below; Claude validates (`validate.js`) and
swaps each group in, bumping `sw.js` `CACHE_VERSION`. Optional schema add: a `steps: [..]` array
(additive, warn-only) rendered as a numbered how-to on the card back — decide during the pilot.
Pilot first on the specific exercise Matt names, then roll the format across all 11 groups.
**Pilot DONE (2026-07-24): `dumbbell-high-pull` rewritten** to the target format (clear setup →
step-by-step → the one mistake) — use it as the reference example for the GPT batches.

> **Brief for ChatGPT (Phase G clarity pass).** For each exercise in this muscle-group batch, keep
> every existing field and id EXACTLY, but rewrite only `cue` and `description` for clarity:
> - `cue`: one short imperative line — the single most important thing to get right.
> - `description`: 2–3 short sentences a total beginner can follow: (1) starting position / setup,
>   (2) the movement step-by-step (what moves, direction, tempo, where it should be felt),
>   (3) the most common mistake to avoid. Plain language; define or avoid jargon (e.g. "hinge at the
>   hips" → "push your hips back like closing a car door with your butt"). No brand names, no
>   equipment the exercise doesn't use, no invented metrics. Output the full array, unchanged except
>   those two fields.

Every phase above holds the offline/no-backend/no-CDN rules and ends with the
smoke-test + a `CACHE_VERSION` bump.

---

## 8. Tier 2 — parked until validated (backend required)

Only after real usage proves demand:
- Accounts + **cloud sync** (the first real backend; also the bridge for the iOS
  separate-storage problem noted in `CLAUDE.md`).
- Wearable / health-app integration.
- **Freemium** (free: limited workouts + history + basic plans; ~$4.99–7.99/mo:
  unlimited programs, adaptive plans, advanced analytics, sync). Sell *reduced friction*,
  not workout plans (those are free everywhere) — friction is the hard-to-copy moat.
- A **genuine LLM coach** ("you've benched 185 for 3 weeks — try 190"). Purpose-built,
  not a chat box. Needs server-side inference or a paid API → Tier 2 cost.
- **Publishing path:** modest Google Play registration; keep hosting cheap (static)
  until accounts/sync/AI actually require a backend.
- **Naming/branding note:** RESOLVED 2026-07-23 — renamed to **FitFlexr** (the original
  `swipefit.app` is an existing Brazilian fitness swipe app). A distinct public domain is
  still TBD if this ever goes public; the in-app name and GitHub repo are now `fitflexr`.

---

## 9. Guardrails that never change

- Plain HTML/CSS/JS. No frameworks, no build step, no backend, no external network calls,
  no CDN. Everything vendored locally. (Tier 2 is the only thing that may revisit this,
  and only after §2's validation bar.)
- All user data in `localStorage` under `schemaVersion`; migrate, never clobber. User data
  references exercises by permanent `id`.
- `avoidIf` ∈ the 9 condition ids; `equipment` ∈ EQUIPMENT; every filter UI generated from
  its data array. `node validate.js` is the gate — nothing ships red.
- No HTML5 drag-and-drop (mobile-first, touch). Bump `sw.js` `CACHE_VERSION` on any
  app-file change. Keep the file tree small and flat (zippable onto any static host).
- Protect the swipe-first feel (§1). Features hide until needed.
