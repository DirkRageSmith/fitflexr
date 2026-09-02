/* FitFlexr → Ragesmith. The second writer.
 *
 * ADR-022: "connecting the apps" does not mean an integration, an API, or a
 * sync service. It means FitFlexr writes events to the shared ledger. This file
 * is that, and it is deliberately about sixty lines of actual logic.
 *
 * ── WHY THIS WORKS WITH NO SERVER, NO ACCOUNT, AND NO NETWORK ───────────────
 *
 * FitFlexr and Hearthsmith both ship to dirkragesmith.github.io. Same origin,
 * therefore ONE localStorage, already, today. `ragesmith.ledger.v1` written
 * here is the same key Hearthsmith reads. There is nothing to connect: they
 * were already in the same room, and until now only one of them was speaking.
 *
 * The consequence a person actually feels: a workout logged here earns Embers
 * that are spent on the room in Hearthsmith, and the character sheet there
 * starts listing "fitflexr" as one of the games that made you.
 *
 * ── THE RULES THIS FILE MUST NOT BREAK ──────────────────────────────────────
 *
 * 1. IT MUST NEVER BREAK A WORKOUT. Every entry point is wrapped. If the ledger
 *    is missing, unreadable, full, or throws for a reason nobody predicted, the
 *    workout finishes normally and the event is simply not written. A self-care
 *    app that loses your session because a side-effect failed has done more
 *    harm than the feature was worth.
 * 2. ONE EVENT PER WORKOUT, carrying core AND local currency together
 *    (ECONOMY.md §0). Never two events, never an exchange between them.
 * 3. THE ONE-WAY VALVE. `fitflexr:reps` is local: it is granted ALONGSIDE
 *    `core:*`, never in exchange for it, and nothing here converts between
 *    them. A local economy that is broken or overgenerous must never be able
 *    to inflate the world.
 * 4. IT NEVER MINTS `core:favor`. Favor is T4-witnessed only, and an app
 *    cannot witness anything (ADR-009). This is what keeps the economy
 *    unfarmable, and it is why the grant table below is hard-coded rather than
 *    computed from anything the user controls.
 *
 * ── ledger.js IS A VERBATIM COPY, AND THAT IS DELIBERATE ────────────────────
 *
 * ADR-018 says extract, do not copy, because two divergent copies of a shared
 * layer end "one character across games". The divergence is the danger, not the
 * duplication — so the copy is byte-identical and Ragesmith's doctor fails if
 * it ever stops being. Same move as SHELL_HASH: do not forbid the duplication,
 * mechanise the invariant.
 *
 * The alternative — loading /hearthsmith/ledger.js at runtime — was rejected:
 * it would couple this app's availability to another repo's deploy and break it
 * offline and in local dev, which is most of what this app is for.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Ragesmith = api;
})(typeof self !== "undefined" ? self : globalThis, function () {
  "use strict";

  /* Bump when what this app grants changes, never when the app merely changes.
   * `character.js` splits on the "@" to attribute a game, and every event
   * carries this forever — so it is a shipped ID under Ragesmith's
   * only-ever-add rule and "fitflexr" may never be renamed. */
  const SOURCE = "fitflexr@1.0.0";

  /* THE AWARD, fixed and not computed from anything the user types.
   *
   * ECONOMY.md §3's table puts "a workout" in SUSTAINED EFFORT — 25 XP, 25
   * Embers, 2 skill points — by name, so that is exactly what this grants. Not
   * more, because an app that pays better than brushing your teeth turns the
   * award table into a reason to open this app instead of doing the thing that
   * was hard today, and §3 forbids multipliers precisely there.
   *
   * A ten-set session and a two-set session grant the same core currency. Only
   * the LOCAL currency scales with effort, which is exactly what local currency
   * is for. */
  const GRANT = { "core:xp": 25, "core:embers": 25, "skill:body": 2 };

  /* Reps are FitFlexr's own and buy only FitFlexr things. One per completed
   * set: legible, honest, and impossible to inflate the world with because
   * nothing converts it. */
  const REPS_PER_SET = 1;

  /* T2 — "app-attested". The app watched you tick each set off, which is more
   * than a claim (T0) and less than another human confirming it (T4). Recorded
   * at write time and never upgraded retroactively (ECONOMY §2). */
  const TRUST = "T2";

  /* The verb is from the curated catalogue (ADR-012). Users never invent verbs,
   * and neither do apps — `complete_workout` is registered in Hearthsmith's
   * catalog.json as an external action, meaning it is written by this tool and
   * is deliberately NOT tappable in Hearthsmith's own list. Self-logging a
   * FitFlexr workout by hand over there would be a second source of truth. */
  const VERB = "complete_workout";

  function ledger() {
    return (typeof Ledger !== "undefined" && Ledger) || null;
  }

  /* Is the shared ledger present and usable at all? Never throws. */
  function available() {
    try {
      const L = ledger();
      return !!(L && typeof localStorage !== "undefined");
    } catch (_) { return false; }
  }

  /* Write one event for a finished workout.
   *
   * Returns the event on success and null on every failure, including the
   * boring ones. The caller treats null as "nothing to say" and carries on —
   * see rule 1 at the top. */
  function logWorkout(summary) {
    try {
      const L = ledger();
      if (!L) return null;
      const s = summary || {};
      const sets = Math.max(0, Math.floor(s.sets || 0));
      if (sets <= 0) return null;          // nothing was actually done

      const grants = {};
      Object.keys(GRANT).forEach(function (k) { grants[k] = GRANT[k]; });
      grants["fitflexr:reps"] = sets * REPS_PER_SET;

      const ev = L.newEvent({
        verb: VERB,
        skill: "body",
        trust: TRUST,
        source: SOURCE,
        grants: grants,
        /* meta is the right home for app-specific detail: it is preserved
         * verbatim by every reader (ECONOMY §2.6) and interpreted by none, so
         * Hearthsmith ignores it safely and a future FitFlexr can still read
         * its own history out of the shared ledger. */
        meta: {
          exercises: Math.max(0, Math.floor(s.exercises || 0)),
          sets: sets,
          groups: Array.isArray(s.groups) ? s.groups.slice(0, 12) : []
        }
      });

      /* Validate against the SAME registry Hearthsmith uses. An unregistered
       * currency is a hard error, never a warning — that one check is the whole
       * defence against currency soup arriving by accident (ECONOMY §0), and it
       * matters most here, at the moment a second tool starts minting. */
      const ids = REGISTRY ? L.currencyIdSet(REGISTRY) : null;
      const errs = L.validate(ev, ids);
      if (errs.length) {
        console.error("ragesmith: refusing to write an invalid event", errs);
        return null;
      }

      L.appendAndSave(ev, ids);
      return ev;
    } catch (e) {
      /* Deliberately swallowed. See rule 1. */
      console.error("ragesmith: could not write to the shared ledger", e);
      return null;
    }
  }

  /* The registry is fetched once at boot and is optional: without it the event
   * is still written, just validated without the currency check. Offline-first
   * means never making a workout depend on a file load. */
  let REGISTRY = null;
  function useRegistry(reg) { REGISTRY = reg || null; }

  function boot() {
    try {
      if (typeof fetch !== "function") return;
      fetch("./currencies.json")
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(useRegistry)
        .catch(function () { /* offline, or opened from file:// — fine */ });
    } catch (_) { /* never let boot throw */ }
  }

  return { SOURCE, GRANT, VERB, TRUST, available, logWorkout, useRegistry, boot };
});
