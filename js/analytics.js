import { CLARITY_ID } from './config.js';
import { state, passedCount, perfectCount, totalXP, rankOf } from './state.js';
import { LEVELS, PHASES } from './course.js';

/**
 * Microsoft Clarity, loaded only when a project id is configured, plus the
 * product-specific tags and events that make its dashboard worth opening.
 *
 * Three rules this file exists to keep:
 *
 * 1. Without an id, nothing loads and every function here is a no-op. A fork of
 *    this repo stays exactly as dependency-free as it was.
 * 2. The intro screen tells learners what happens to their data, and that copy
 *    is assembled from the same flag. Do not change one without the other.
 * 3. Nothing identifying is ever sent. No `clarity("identify", …)`, no learner
 *    name, no free text they typed. Only the coarse, bucketed dimensions below.
 *
 * Tag cardinality is kept deliberately low. Clarity filters get useless when a
 * tag has hundreds of values, so progress is bucketed rather than exact and the
 * only high-ish cardinality tag is `level` (30 values), which is the one that
 * actually answers "where do people stop?".
 */

export const analyticsEnabled = () => !!CLARITY_ID;
const q = (...args) => { if (window.clarity) { try { window.clarity(...args); } catch (e) { /* never break the course for a tag */ } } };

export function initAnalytics() {
  if (!CLARITY_ID) return false;
  if (window.clarity) return true;                       // already installed
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return false;

  // Clarity's own bootstrap, kept verbatim in shape so their loader recognises it.
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_ID);
  return true;
}

/** One custom tag. */
export const tag = (key, value) => q('set', key, String(value));

/** A named event; these become the filters and funnel steps in the dashboard. */
export const trackEvent = (name) => q('event', name);

/**
 * Ask Clarity to keep this session's recording. Sampling means an ordinary
 * session may never be stored — but a session where someone failed a quiz or
 * abandoned a mission is exactly the one worth watching, so those are pinned.
 */
export const keepSession = (reason) => q('upgrade', reason);

/** Bucketed progress: five values instead of thirty-one. */
function progressBucket(n) {
  if (n === 0) return '00 · not started';
  if (n <= 5) return '01 · 1-5 levels';
  if (n <= 14) return '02 · 6-14 levels';
  if (n <= 29) return '03 · 15-29 levels';
  return '04 · finished';
}

const phaseOf = (levelId) => {
  const i = PHASES.findIndex(p => levelId >= p.from && levelId <= p.to);
  return i < 0 ? 'unknown' : `${i + 1} · ${PHASES[i].name}`;
};

const pad = (n) => String(n).padStart(2, '0');

/**
 * The dimensions every session is sliced by. Called on each render, so a
 * session's tags always describe the furthest point it reached.
 */
export function tagContext() {
  if (!window.clarity) return;
  const passed = passedCount();
  tag('view', state.view);
  tag('lang', state.lang || 'fa');
  tag('theme', document.documentElement.dataset.theme || 'light');
  tag('progress', progressBucket(passed));
  tag('rank', rankOf(totalXP()).t);
  tag('perfect_quizzes', String(perfectCount()));
  tag('missions_done', String((state.missionsDone || []).length));
  // state.current is an index into LEVELS, not a level id — read the id off the
  // level itself so the tag survives any future reordering.
  const lv = LEVELS[state.current];
  if (state.view === 'lesson' && lv) {
    tag('level', pad(lv.id));
    tag('phase', phaseOf(lv.id));
  }
}

/** Route change, for Clarity's own page grouping. */
export function trackView(route) { tag('route', String(route)); }
