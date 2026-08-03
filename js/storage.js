import { STORE_KEY } from './config.js';
import { state, isUnlocked, firstOpen } from './state.js';
import { LEVELS } from './course.js';
import { TRACK_BY_ID } from './content.js';
import { MISSION_BY_ID } from './content.js';

function lsGet() { try { return window.localStorage.getItem(STORE_KEY); } catch (e) { return null; } }
function lsSet(v) { try { window.localStorage.setItem(STORE_KEY, v); } catch (e) {} }

export async function load() {
  try {
    let raw = null;
    if (window.storage) {
      const r = await window.storage.get(STORE_KEY, false);
      if (r && r.value) raw = r.value;
    }
    if (!raw) raw = lsGet();
    {
      const r = raw ? { value: raw } : null;
      if (r && r.value) {
        const d = JSON.parse(r.value);
        const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
        // learner: string only
        state.learner = typeof d.learner === 'string' ? d.learner : '';
        // done: keep valid level keys with normalized {perfect, score}; drop any junk safely
        const rawDone = isObj(d.done) ? d.done : {};
        state.done = {};
        Object.keys(rawDone).forEach(k => {
          const id = Number(k);
          if (!Number.isInteger(id) || id < 1) return;
          const v = rawDone[k];
          if (v === true) state.done[id] = { perfect: false, score: 0 };
          else if (isObj(v)) state.done[id] = { perfect: !!v.perfect, score: Number(v.score) || 0 };
        });
        // tries: level -> positive integer attempt count
        const rawTries = isObj(d.tries) ? d.tries : {};
        state.tries = {};
        Object.keys(rawTries).forEach(k => {
          const id = Number(k), n = Number(rawTries[k]);
          if (Number.isInteger(id) && id >= 1 && Number.isFinite(n) && n > 0) state.tries[id] = Math.floor(n);
        });
        if (d.theme === 'light' || d.theme === 'dark') document.documentElement.dataset.theme = d.theme;
        if (typeof d.last === 'number' && d.last >= 0 && d.last < LEVELS.length) state.current = d.last;
        state.lang = d.lang === 'en' ? 'en' : 'fa';
        state.track = (typeof d.track === 'string' && TRACK_BY_ID[d.track]) ? d.track : null;
        state.mission = (typeof d.mission === 'string' && MISSION_BY_ID[d.mission]) ? d.mission : null;
        // completed mission IDs: dedupe + drop unknown IDs; tolerate a missing/corrupt value
        state.missionsDone = Array.isArray(d.missionsDone)
          ? [...new Set(d.missionsDone.filter(id => MISSION_BY_ID[id]))]
          : [];
        const VIEWS = ['intro', 'lesson', 'glossary', 'cert', 'tracks', 'track', 'missions', 'mission'];
        state.view = VIEWS.includes(d.view) ? d.view : 'intro';
        if (state.view === 'lesson' && !isUnlocked(state.current)) state.current = firstOpen();
        if (state.view === 'track' && !state.track) state.view = 'tracks';
        if (state.view === 'mission' && !state.mission) state.view = 'missions';
      }
    }
  } catch (e) {}
}

export async function save() {
  const payload = JSON.stringify({
    done: state.done,
    tries: state.tries,
    learner: state.learner,
    last: state.current,
    view: state.view,
    track: state.track,
    mission: state.mission,
    missionsDone: state.missionsDone,
    lang: state.lang,
    theme: document.documentElement.dataset.theme,
  });
  lsSet(payload);
  try { if (window.storage) await window.storage.set(STORE_KEY, payload, false); } catch (e) {}
}
