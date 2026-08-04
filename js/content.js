/**
 * Locale-aware content hub (Phase 5B).
 *
 * Persian data modules in data/ remain the structural + behavioral source of
 * truth (IDs, ordering, correct-answer indexes, tones, commands, thresholds,
 * badge eligibility closures). English text lives in data/en/. This module
 * merges the selected locale's TEXT over the shared structure and exposes
 * stable, mutated-in-place collections so every consumer keeps one array/object
 * identity across language switches. Progress identity never changes with
 * language: completion is keyed by level/mission/badge IDs only.
 *
 * applyContentLocale(lang) is idempotent and must run before the first render
 * and on every language switch (wired via i18n.setLang).
 */
import { LEVELS, PHASES, buildLevelsWithScenarios } from './course.js';
import { LEVELS as FA_LEVELS } from '../data/levels.js';
import { SCENARIO as FA_SCENARIO } from '../data/scenarios.js';
import { GLOSSARY as FA_GLOSSARY } from '../data/glossary.js';
import { TRACKS as FA_TRACKS } from '../data/tracks.js';
import { MISSIONS as FA_MISSIONS } from '../data/missions.js';
import { BADGES as FA_BADGES } from '../data/badges.js';
import { RANKS as FA_RANKS } from '../data/ranks.js';
import { PHASES as FA_PHASES } from '../data/phases.js';
/* The English text modules are ~197 KB and are useless to a Persian reader, so
   they are fetched on demand instead of at startup. Persian stays the default
   and pays nothing for a translation it never reads; English costs one extra
   request the first time it is selected, then nothing.

   Everything below reads these through EN, which stays null until loaded. Only
   the en branch of applyContentLocale touches it, and that branch is reached
   only after loadEnglish() has resolved. */
const byId = (arr) => arr.reduce((m, x) => { m[x.id] = x; return m; }, {});

let EN = null;
let enPending = null;

export function englishLoaded() { return EN !== null; }

function loadEnglish() {
  if (EN) return Promise.resolve(EN);
  // Concurrent callers share one in-flight request rather than racing.
  if (!enPending) {
    enPending = Promise.all([
      import('../data/en/levels.js'),
      import('../data/en/content.js'),
    ]).then(([lv, ct]) => {
      EN = {
        LEVELS: lv.EN_LEVELS, SCENARIO: ct.EN_SCENARIO, GLOSSARY: ct.EN_GLOSSARY,
        TRACKS: ct.EN_TRACKS, MISSIONS: ct.EN_MISSIONS, BADGES: ct.EN_BADGES,
        RANKS: ct.EN_RANKS, PHASES: ct.EN_PHASES,
        LEVEL_BY_ID: byId(lv.EN_LEVELS), TRACK_BY_ID: byId(ct.EN_TRACKS),
        MISSION_BY_ID: byId(ct.EN_MISSIONS), BADGE_BY_ID: byId(ct.EN_BADGES),
      };
      enPending = null;
      return EN;
    });
  }
  return enPending;
}

/* Stable localized collections (same references across switches). */
export const GLOSSARY = [];
export const TRACKS = [];
export const TRACK_BY_ID = {};
export const MISSIONS = [];
export const MISSION_BY_ID = {};
export const BADGES = [];
export const RANKS = [];

export const earned = () => BADGES.filter(b => { try { return b.ok(); } catch (e) { return false; } });
export const rankOf = (xp) => RANKS.filter(r => xp >= r.min).pop();
export const trackOfLevel = (levelId) => TRACKS.find(t => t.levelIds.includes(levelId)) || null;
export const missionsForTrack = (trackId) => MISSIONS.filter(m => m.trackId === trackId);

function levelsFor(lang) {
  if (lang !== 'en') return FA_LEVELS;
  return FA_LEVELS.map(fa => {
    const en = EN.LEVEL_BY_ID[fa.id];
    return {
      ...fa,
      title: en.title, subtitle: en.subtitle, body: en.body,
      quiz: fa.quiz.map((q, i) => ({ ...q, q: en.quiz[i].q, o: en.quiz[i].o, why: en.quiz[i].why })),
    };
  });
}

function scenariosFor(lang) {
  if (lang !== 'en') return FA_SCENARIO;
  const out = {};
  Object.keys(FA_SCENARIO).forEach(k => {
    out[k] = FA_SCENARIO[k].map((s, i) => ({ ...s, q: EN.SCENARIO[k][i].q, o: EN.SCENARIO[k][i].o, why: EN.SCENARIO[k][i].why }));
  });
  return out;
}

const swap = (arr, next) => { arr.length = 0; arr.push(...next); };

export async function applyContentLocale(lang) {
  const en = lang === 'en';
  if (en) await loadEnglish();

  swap(LEVELS, buildLevelsWithScenarios(levelsFor(lang), scenariosFor(lang)));

  swap(PHASES, FA_PHASES.map((p, i) => en ? { ...p, name: EN.PHASES[i] } : { ...p }));

  // English mode shows the English term + definition; the Persian equivalent and
  // pronunciation are Persian-learner aids and are dropped (renderer guards them).
  swap(GLOSSARY, FA_GLOSSARY.map((g, i) => en
    ? { ...g, t: EN.GLOSSARY[i].t, d: EN.GLOSSARY[i].d, fa: '', p: '' }
    : { ...g }));

  swap(TRACKS, FA_TRACKS.map(t => {
    if (!en) return { ...t };
    const e = EN.TRACK_BY_ID[t.id];
    return { ...t, title: e.title, shortTitle: e.shortTitle, audience: e.audience, description: e.description, completionMessage: e.completionMessage, difficulty: e.difficulty };
  }));
  Object.keys(TRACK_BY_ID).forEach(k => delete TRACK_BY_ID[k]);
  TRACKS.forEach(t => { TRACK_BY_ID[t.id] = t; });

  swap(MISSIONS, FA_MISSIONS.map(m => {
    if (!en) return { ...m };
    const e = EN.MISSION_BY_ID[m.id];
    return {
      ...m,
      title: e.title, shortDescription: e.shortDescription, context: e.context,
      objectives: e.objectives.slice(), difficulty: e.difficulty,
      completionMessage: e.completionMessage,
      nextAction: { href: m.nextAction.href, label: e.nextActionLabel },
      steps: m.steps.map((s, i) => {
        const es = e.steps[i];
        return {
          ...s,
          situation: es.situation, explanation: es.explanation, hint: es.hint,
          ...(s.stateNote ? { stateNote: es.stateNote } : {}),
          choices: s.choices.map((c, j) => ({ ...c, label: es.choices[j].label, feedback: es.choices[j].feedback })),
        };
      }),
    };
  }));
  Object.keys(MISSION_BY_ID).forEach(k => delete MISSION_BY_ID[k]);
  MISSIONS.forEach(m => { MISSION_BY_ID[m.id] = m; });

  swap(BADGES, FA_BADGES.map(b => {
    if (!en) return { ...b };
    const e = EN.BADGE_BY_ID[b.id];
    return { ...b, t: e.t, d: e.d };
  }));

  swap(RANKS, FA_RANKS.map((r, i) => en ? { min: r.min, t: EN.RANKS[i] } : { ...r }));
}
