import { LEVELS, PHASES } from './course.js';
import { XP_PASS, XP_PERFECT } from './config.js';
import { RANKS } from './content.js';

export const state = {
  view: 'intro',
  current: 0,
  track: null,   // active track id in track-detail view (derived; never a source of progress)
  mission: null, // active mission id in mission-detail view
  missionsDone: [], // completed mission IDs (practice completion; awards no XP)
  lang: 'fa',    // UI language ('fa' | 'en'); curriculum content stays fa until translated
  done: {},
  learner: '',
  picks: {},
  checked: false,
  attempt: [],
  drafts: {},
  mistakes: {},
  tries: {},
  openPhases: null,
  glQuery: '',
  routing: false,
};

export const levelMinutes = (l) => Math.max(3, Math.round(l.body.replace(/<[^>]+>/g, ' ').split(/\s+/).length / 180));
export const totalMinutes = () => LEVELS.reduce((a, l) => a + levelMinutes(l), 0);
export const perfectCount = () => Object.values(state.done).filter(v => v && v.perfect).length;
export const totalXP = () => Object.values(state.done).reduce((a, v) => a + (v ? XP_PASS + (v.perfect ? XP_PERFECT : 0) : 0), 0);
export const maxXP = () => LEVELS.length * (XP_PASS + XP_PERFECT);
export const rankOf = (xp) => RANKS.filter(r => xp >= r.min).pop();
/** Position in the ladder, so the UI can say "3 of 6" instead of a bare name. */
export const rankIndex = (xp) => RANKS.reduce((at, r, i) => (xp >= r.min ? i : at), 0);
/** The next rank up, or null at the top — the difference is what the rail shows. */
export const nextRank = (xp) => RANKS.find(r => xp < r.min) || null;
export const phaseOf = (id) => PHASES.find(p => id >= p.from && id <= p.to) || PHASES[PHASES.length - 1];
export const phaseIndex = (id) => PHASES.indexOf(phaseOf(id));
export const passedCount = () => LEVELS.filter(l => state.done[l.id]).length;
export const allPassed = () => passedCount() === LEVELS.length;
export const isUnlocked = (i) => i === 0 || !!state.done[LEVELS[i - 1].id];
export const firstOpen = () => {
  for (let i = 0; i < LEVELS.length; i++) if (!state.done[LEVELS[i].id]) return i;
  return LEVELS.length - 1;
};
