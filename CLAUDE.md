# FitFlexr

A personal, offline-first PWA for swiping through exercises (right = save to your
FitFlex Stack, left = skip). The core safety feature: "conditions to avoid" filters remove
risky exercises from the Flexr Deck before the user ever sees them. (Formerly "SwipeFit";
renamed 2026-07-23 — the localStorage key is now `fitflexr`.)

## Ground rules (don't relitigate these in any session)

- Plain HTML/CSS/JS, no frameworks, no build step, no backend, no login, no external network calls.
- All user data lives in `localStorage` on-device, under a `schemaVersion` key (now **7**). User data references exercises only by their permanent `id`. State also holds `onboarding = { completed, goal, timeAvailable }` (Phase B), `taste = { swipes, weights }` (Phase C swipe-to-learn), `history = [{ date, exercises, sets, groups }]` (Phase E completed-workout log), and `filters.sports` (v7 — which stretch disciplines to offer; empty = all).
- Exercise data, the conditions list, and the `EQUIPMENT` taxonomy live in `exercises.js`, separate from app logic in `app.js`. See `ROADMAP.md` for the full schema + the product plan.
- **`equipment` is an ARRAY of `EQUIPMENT` ids** (gating gear needed beyond your body; bodyweight-only = `["bodyweight"]`). `EQUIPMENT` is `[{id,label}]`, 15 types. The gear filter is a **superset test**: an exercise shows only if you own every item it lists. Chest is the fully-produced group; the other 10 are placeholders (dumbbell/bodyweight, arrays) until each is regenerated per ROADMAP §7 Phase A.
- Every `avoidIf` tag must match a condition id; every `equipment` id must be in `EQUIPMENT`. The muscle/gear/condition filter UIs are all generated from their arrays, never hardcoded.
- Default theme is **dark** (near-black, white type, blue = save / red = skip). Light theme still exists via the Settings toggle.
- Every feature must keep working fully offline once installed. Anything added must be vendored locally, never pulled from a CDN.
- No HTML5 drag-and-drop API — this app is mobile-first and it doesn't work on touch.
- **Nothing inside `.swipe-card` may have `touch-action: auto`.** The touch-action walk stops at the nearest scrolling ancestor, so a scroll container inside the card shadows the card's own `touch-action: none`, the browser claims the drag for a native scroll, and swiping dies completely on touch devices (it still works with a mouse, which is how this shipped unnoticed in `80df8c5`). `attachSwipeHandlers` scrolls the card body itself on a vertical drag instead.
- **Stretches are not a parallel system.** Warm-ups and cool-downs live in `EXERCISES` with the same schema; `category: "warmup" | "cooldown"` is the only thing that marks them (`STRETCH_CATEGORIES` in both `app.js` and `validate.js` — keep them in sync). They hold their own Stack budget (`STRETCH_CAP`, separate from `WORKOUT_CAP`), are excluded from `generateSession()`, and bookend the run in `startWorkout()`. Stretch-only fields: `sports` (ids from the `SPORTS` taxonomy; empty/absent = general) and `hold` (the prefilled prescription — must start with a number, since `parseSetCount` reads the leading digit as a round count).
- Bump the cache version string in `sw.js` in ANY session that changes app files, or installed users never receive updates.
- Keep the file count small and flat — always zippable onto a static host.
- Run the smoke-test checklist below at the end of every session.

## File layout

| File | Purpose |
|---|---|
| `index.html` | App shell, all four screens, inline theme bootstrap |
| `styles.css` | All styling (light/dark via `html[data-theme]`) |
| `app.js` | All logic (state, deck, swipe, routine, settings) |
| `exercises.js` | `MUSCLE_GROUPS`, `EQUIPMENT`, `CONDITIONS`, `SPORTS`, `EXERCISES` data — plus the `STRETCHES` block appended onto `EXERCISES` (also `module.exports` for Node) |
| `sw.js` | Service worker — bump `CACHE_VERSION` on any change |
| `manifest.json` | PWA manifest |
| `validate.js` | Dataset integrity check — run `node validate.js` |
| `ledger.js` | **VERBATIM COPY** of Hearthsmith's shared ledger — do not edit here (see below) |
| `ragesmith.js` | Adapter: writes one shared-ledger event per completed workout (ADR-022) |
| `currencies.json` | **VERBATIM COPY** of the Ragesmith currency registry |
| `ROADMAP.md` | Product roadmap + shared spec (Claude ↔ ChatGPT). Tier 1/2 plan, the schema contract, and the delegated 500-exercise deck brief. |
| `icon-192.png` / `icon-512.png` | App icons (volt/ink dumbbell) |

## The shared Ragesmith ledger (ADR-022) — read before touching ledger.js

FitFlexr is the **second writer** to the Ragesmith shared ledger, as of 2026-09-02. A
completed workout writes one event to `localStorage["ragesmith.ledger.v1"]`, which
Hearthsmith reads. **Embers earned here are spent on the room in Hearthsmith**, and its
character sheet lists `fitflexr` under "where this came from".

**This works because both apps ship to `dirkragesmith.github.io`** — same origin, therefore
one `localStorage`, already, with no server and no account. Nothing connects them; they
were always in the same room and only one was speaking. Note this means **the integration
cannot be tested across two local ports** — different ports are different origins. Serve
both under one root to see it work.

**`ledger.js` and `currencies.json` are byte-identical copies of Hearthsmith's.**
Never edit them here. Ragesmith's `node tools/doctor.mjs` has a `vendored ledger` check
that FAILS if they drift, because two versions of the schema means two characters. To
update: copy from `C:\Projects\ragesmith\hearthsmith\` and run that doctor.

**The adapter must never break a workout.** `Ragesmith.logWorkout()` swallows every error
and returns null; `logWorkout()` in `app.js` calls it *after* `saveState()` and ignores the
result. FitFlexr's own history is what the user came for and lands first.

**What it grants is fixed and not negotiable here.** 25 XP / 25 Embers / 2 Body per
workout, whatever the session size — ECONOMY §3 puts "a workout" in sustained effort by
name. Only `fitflexr:reps` scales (one per completed set). Never mint `core:favor`.

## Dev commands

- Validate dataset: `node validate.js`
- Serve locally (service worker needs HTTP): `python -m http.server 8642` from this folder
- Deploy: live at <https://dirkragesmith.github.io/fitflexr/>, served from the `gh-pages`
  branch of <https://github.com/DirkRageSmith/fitflexr>. To ship: `git push origin main main:gh-pages`
  (push BOTH branches or the site goes stale). All paths are relative, so subpath hosting works.
- Commits use the GitHub no-reply author email (repo-local git config) — keep it that way; the repo is public.

## Smoke-test checklist (run at the end of every session)

1. Filters exclude correctly: toggle "Knee Issues," confirm no `knee`-tagged exercise appears in the deck.
2. Right swipe adds to My Routine; left swipe skips; skipped items don't reappear this session.
2a. **On a real touch device** (a simulator will not catch this): drag a card left and right — it must follow your finger and fly off past the threshold. Then drag vertically on a card whose text overflows: that must scroll the text and must NOT count as a swipe.
2b. Workout caps: save until the Stack hits `WORKOUT_CAP` (10) — the deck must keep dealing **stretches** while refusing more training moves, and only show the "full workout" state once `STRETCH_CAP` (10) is also spent. Undo must reopen it. Cards are single-faced (no flip): name, cue, full description, meta, and pinned gear/difficulty tags all on the front.
2c. In-workout: an exercise with 3 sets must start the rest timer after **every** set including the 3rd; the only set that ends dry is the last set of the last exercise. The timer overlays the how-to rather than sitting beside it, and survives pressing "Next".
3. Routine, notes, sets/reps, and filters survive a page reload.
4. `avoidIf` tags all match the conditions array (`node validate.js`, not eyeball).
5. Export button downloads valid JSON.
6. Serve locally over HTTP: service worker registers, then app loads offline on refresh.
7. Open via `file://`: app still works, no thrown errors from SW registration.

## Roadmap

Phase 1 — MVP: **done** (initial commit). Swipe deck, filter/condition safety system,
My Routine with reorder/sets/notes, settings with theme + JSON export, PWA shell
(manifest + service worker + icons).

2026-07-17 personalization pass (Matt request): library rebuilt to **170 exercises,
Bodyweight + Dumbbell only** (~evenly split, every group ≥ 8); added a **Gear filter**
on the setup screen (empty = all, like groups); reskinned to a **black / white / blue /
red** theme with **dark as the default** (blue = save, red = skip); schema bumped to v2
with a one-time `system`→`dark` theme migration. Old non-gear exercises were removed —
any that a user had saved show under "No longer in the library" and stay removable.

Phase 2 — Real PWA install experience:

- Verify install works on Android Chrome (native prompt via manifest + SW). On iOS there is NO native install prompt — the deliverable is correct `apple-touch-icon` / `apple-mobile-web-app-*` meta tags plus a short in-app hint telling iOS users to use Share → Add to Home Screen.
- Splash/theme colors (iOS startup images require per-device `apple-touch-startup-image` tags — a themed background color is an acceptable simpler alternative).
- Full offline test: install, airplane mode, confirm app opens and swiping works.
- "Update available" banner when the service worker detects a new version.
- Note: an installed iOS PWA gets its own localStorage, separate from Safari's — data doesn't carry over from browser to installed app. Export/import is the bridge; mention it in the README.

Phase 3 — Routine builder upgrades:

- Organize My Routine into named workout days ("Day A – Push," etc.) by tap-to-assign (tap exercise → pick a day from a small sheet). No drag-and-drop.
- "Start Workout" mode: step through today's routine one exercise at a time with a checkbox/simple timer per exercise.

Phase 4 — Personalization & data portability:

- Add custom exercises (name, muscle group, avoidIf tags, cue) via a form, stored in localStorage alongside the seed data.
- Let the user edit/re-tag seed exercises. Store user edits as OVERRIDES keyed by exercise id, merged over the seed data at load time — never mutate `exercises.js` — so the seed dataset can grow without clobbering user edits.
- JSON import to complement the Phase 1 export (routine + custom exercises + overrides).

Phase 5 — Progress tracking & polish:

- Log completed workouts with date stamps; simple history/calendar view.
- Optional bodyweight/measurement tracker with a hand-rolled SVG line chart (no chart libraries from CDNs).
- Streaks / "days since last workout" indicator.
- Accessibility pass: font-size control, high-contrast mode, full keyboard navigation as an alternative to swiping. (Phase 1 already has ArrowLeft/ArrowRight/U/F keys on the deck.)
- Visual polish: refined animations, haptics via `navigator.vibrate` as progressive enhancement (Android only — iOS doesn't support it), tightened dark mode.

Parking lot (no assigned phase):

- Per-exercise illustration/GIF support. Note: images can't be referenced by local filename in an installed PWA and are too big for localStorage — the real implementation is a file-input upload stored in IndexedDB, which amends the localStorage-only rule when the time comes.
- "Superset" swipe-up gesture to pair two exercises.
- Multiple saved profiles/routines ("Home," "Gym," "Travel").

## How to resume a session

State which phase you're starting. The code and this file are already in the repo —
build on the real code, don't regenerate from scratch. Commit at the end of the phase
and bump the `sw.js` cache version if any app file changed.
