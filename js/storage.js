import { STORE_KEY } from './config.js';
import { state, isUnlocked, firstOpen } from './state.js';
import { LEVELS } from './course.js';
import { TRACK_BY_ID } from '../data/tracks.js';

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
        state.done = d.done || {};
        state.learner = d.learner || '';
        state.tries = d.tries || {};
        Object.keys(state.done).forEach(k => {
          if (state.done[k] === true) state.done[k] = { perfect: false, score: 0 };
        });
        if (d.theme) document.documentElement.dataset.theme = d.theme;
        if (typeof d.last === 'number' && d.last >= 0 && d.last < LEVELS.length) state.current = d.last;
        state.track = (typeof d.track === 'string' && TRACK_BY_ID[d.track]) ? d.track : null;
        const VIEWS = ['intro', 'lesson', 'glossary', 'cert', 'tracks', 'track'];
        state.view = VIEWS.includes(d.view) ? d.view : 'intro';
        if (state.view === 'lesson' && !isUnlocked(state.current)) state.current = firstOpen();
        if (state.view === 'track' && !state.track) state.view = 'tracks';
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
    theme: document.documentElement.dataset.theme,
  });
  lsSet(payload);
  try { if (window.storage) await window.storage.set(STORE_KEY, payload, false); } catch (e) {}
}
