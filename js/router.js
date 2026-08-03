import { state, isUnlocked, firstOpen } from './state.js';
import { LEVELS } from './course.js';
import { TRACK_BY_ID } from '../data/tracks.js';
import { FA } from './dom.js';
import { toast } from './ui.js';

export function hashFor() {
  if (state.view === 'lesson') return '#/level-' + LEVELS[state.current].id;
  if (state.view === 'cert') return '#/certificate';
  if (state.view === 'glossary') return '#/glossary';
  if (state.view === 'track' && TRACK_BY_ID[state.track]) return '#/track-' + state.track;
  if (state.view === 'tracks') return '#/tracks';
  return '#/intro';
}

export function syncHash() {
  const h = hashFor();
  if (location.hash !== h) { state.routing = true; location.hash = h; setTimeout(() => { state.routing = false; }, 30); }
  const t = state.view === 'lesson' ? `سطح ${FA(LEVELS[state.current].id)} · ${LEVELS[state.current].title}`
    : state.view === 'cert' ? 'نشان فتح مسیر' : state.view === 'glossary' ? 'واژه‌نامهٔ Git'
    : state.view === 'tracks' ? 'مسیرهای یادگیری'
    : state.view === 'track' ? `مسیر ${TRACK_BY_ID[state.track] ? TRACK_BY_ID[state.track].shortTitle : ''}`
    : 'معرفی دوره';
  document.title = `${t} | دورهٔ Git برای طراحان — پریا بهرامی`;
}

export function applyHash() {
  const h = decodeURIComponent(location.hash || '');
  if (!h || h === '#') return false;
  const m = h.match(/#\/level-(\d+)/);
  if (m) {
    const idx = LEVELS.findIndex(l => l.id === +m[1]);
    if (idx > -1) {
      if (!isUnlocked(idx)) {
        toast('این سطح هنوز قفل است؛ از سطح باز فعلی ادامه بده.');
        state.view = 'lesson';
        state.current = firstOpen();
        return true;
      }
      state.view = 'lesson';
      state.current = idx;
      return true;
    }
    // unknown level id → intro
    state.view = 'intro';
    return true;
  }
  const tm = h.match(/#\/track-([a-z0-9-]+)/);
  if (tm) {
    if (TRACK_BY_ID[tm[1]]) { state.view = 'track'; state.track = tm[1]; return true; }
    // unknown track id → track overview
    state.view = 'tracks'; state.track = null; return true;
  }
  if (h.startsWith('#/tracks')) { state.view = 'tracks'; state.track = null; return true; }
  if (h.startsWith('#/certificate')) { state.view = 'cert'; return true; }
  if (h.startsWith('#/glossary')) { state.view = 'glossary'; return true; }
  if (h.startsWith('#/intro')) { state.view = 'intro'; return true; }
  // invalid route → intro
  state.view = 'intro';
  return true;
}
