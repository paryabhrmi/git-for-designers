import { state, isUnlocked, firstOpen } from './state.js';
import { LEVELS } from './course.js';
import { FA } from './dom.js';
import { toast } from './ui.js';

export function hashFor() {
  if (state.view === 'lesson') return '#/level-' + LEVELS[state.current].id;
  if (state.view === 'cert') return '#/certificate';
  if (state.view === 'glossary') return '#/glossary';
  return '#/intro';
}

export function syncHash() {
  const h = hashFor();
  if (location.hash !== h) { state.routing = true; location.hash = h; setTimeout(() => { state.routing = false; }, 30); }
  const t = state.view === 'lesson' ? `سطح ${FA(LEVELS[state.current].id)} · ${LEVELS[state.current].title}`
    : state.view === 'cert' ? 'نشان فتح مسیر' : state.view === 'glossary' ? 'واژه‌نامهٔ Git' : 'معرفی دوره';
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
  if (h.startsWith('#/certificate')) { state.view = 'cert'; return true; }
  if (h.startsWith('#/glossary')) { state.view = 'glossary'; return true; }
  if (h.startsWith('#/intro')) { state.view = 'intro'; return true; }
  // invalid route → intro
  state.view = 'intro';
  return true;
}
