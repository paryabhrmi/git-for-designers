import { state, firstOpen, allPassed, isUnlocked } from './state.js';
import { LEVELS } from './course.js';
import { load, save } from './storage.js';
import { applyHash, syncHash } from './router.js';
import { toast } from './ui.js';
import { $ } from './dom.js';
import { ctx } from './ctx.js';

import { shuffle, newAttempt, refreshCount, checkQuiz } from './quiz.js';
import {
  buildNav, revealActive, fades, syncNav, focusMain, go,
  updateMob, updateMidBtn, closeMenu, toggleMenu,
} from './navigation.js';
import { renderIntro } from './render/intro.js';
import { renderLesson, enhance, buildToc } from './render/lesson.js';
import { renderGlossary } from './render/glossary.js';
import { renderCert } from './render/certificate.js';
import { renderTracks } from './render/tracks.js';
import { renderMissions } from './render/missions.js';

export { shuffle, newAttempt, refreshCount, checkQuiz };
export {
  buildNav, revealActive, fades, syncNav, focusMain, go,
  updateMob, updateMidBtn, closeMenu, toggleMenu,
};
export { renderIntro, renderLesson, enhance, buildToc, renderGlossary, renderCert, renderTracks, renderMissions };

export function render() {
  if (state.view === 'intro') renderIntro();
  else if (state.view === 'cert') renderCert();
  else if (state.view === 'glossary') renderGlossary();
  else if (state.view === 'tracks' || state.view === 'track') renderTracks();
  else if (state.view === 'missions' || state.view === 'mission') renderMissions();
  else renderLesson();
  buildNav($('#search').value);
  updateMob();
  syncHash();
  const r = $('#root');
  r.classList.remove('view-in'); void r.offsetWidth; r.classList.add('view-in');
}

let modalAction = null;
export function openModal(action) {
  modalAction = action;
  $('#modalBg').hidden = false;
  $('#modalYes').focus();
}
export function closeModal() { $('#modalBg').hidden = true; modalAction = null; }

// Wire cross-module hub once
Object.assign(ctx, {
  render, go, save, closeMenu, buildNav, updateMob, updateMidBtn,
  checkQuiz, refreshCount, syncNav, syncHash, focusMain, toast,
  renderLesson, enhance, buildToc, newAttempt,
});

$('#overlay').addEventListener('click', closeMenu);
$('#railClose').addEventListener('click', closeMenu);
$('#menuBtn').addEventListener('click', toggleMenu);
$('#mMid').addEventListener('click', () => {
  const act = $('#mMid').dataset.act;
  if (act === 'start') go(firstOpen());
  else if (act === 'toquiz') $('#quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
  else if (act === 'check') checkQuiz();
  else if (act === 'retry') renderLesson();
  else if (act === 'next') go(state.current + 1);
  else if (act === 'cert') { state.view = 'cert'; render(); save(); }
  else if (act === 'print') $('#printBtn') && $('#printBtn').click();
});
$('#toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* swipe between levels on touch devices */
let tx = 0, ty = 0, tt = 0;
document.addEventListener('touchstart', e => {
  if (e.target.closest('pre, .tbl-scroll, .rail, input, [contenteditable]')) { tt = 0; return; }
  tx = e.changedTouches[0].clientX; ty = e.changedTouches[0].clientY; tt = Date.now();
}, { passive: true });
document.addEventListener('touchend', e => {
  if (!tt || Date.now() - tt > 700 || state.view !== 'lesson') return;
  const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) < 70 || Math.abs(dy) > 55) return;
  if (!state.checked && Object.keys(state.picks).length) {
    toast('آزمون نیمه‌کاره است؛ برای رفتن به سطح دیگر از فهرست استفاده کن.', 'ph-hand-tap');
    return;
  }
  if (dx < 0) go(state.current + 1); else go(state.current - 1);
}, { passive: true });
$('#mPrev').addEventListener('click', () => go(state.current - 1));
$('#mNext').addEventListener('click', () => go(state.current + 1));
$('#navList').addEventListener('scroll', fades, { passive: true });
$('#search').addEventListener('input', e => buildNav(e.target.value));
$('#search').addEventListener('keydown', e => {
  if (e.key === 'Escape') { e.target.value = ''; buildNav(''); e.target.blur(); }
});
$('#clearS').addEventListener('click', () => { $('#search').value = ''; buildNav(''); $('#search').focus(); });
$('#themeBtn').addEventListener('click', () => {
  const el = document.documentElement;
  el.dataset.theme = el.dataset.theme === 'dark' ? 'light' : 'dark';
  $('#themeBtn').innerHTML = `<i class="ph ph-${el.dataset.theme === 'dark' ? 'sun' : 'moon'}"></i>`;
  save();
});
$('#modalNo').addEventListener('click', closeModal);
$('#modalBg').addEventListener('click', e => { if (e.target === $('#modalBg')) closeModal(); });
$('#modalYes').addEventListener('click', () => { const a = modalAction; closeModal(); if (a) a(); });
$('#resetBtn').addEventListener('click', () => openModal(() => {
  state.done = {}; state.drafts = {}; state.mistakes = {}; state.tries = {};
  state.picks = {}; state.checked = false; state.attempt = []; state.glQuery = '';
  state.current = 0; state.view = 'intro'; state.openPhases = null;
  state.track = null; state.mission = null; state.missionsDone = [];
  save(); render();
  toast('پیشرفت پاک شد؛ دوره از ابتدا شروع می‌شود.', 'ph-arrow-counter-clockwise');
}));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !$('#modalBg').hidden) { closeModal(); return; }
  if (e.key === 'Escape' && $('#rail').classList.contains('open')) { closeMenu(); return; }
  if (e.target.tagName === 'INPUT' || e.target.isContentEditable || e.metaKey || e.ctrlKey || e.altKey) return;
  if (state.view !== 'lesson') return;
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
  if (!state.checked && Object.keys(state.picks).length) {
    toast('آزمون نیمه‌کاره است؛ برای رفتن به سطح دیگر از فهرست استفاده کن.', 'ph-hand-tap');
    return;
  }
  if (e.key === 'ArrowLeft') go(state.current + 1);
  if (e.key === 'ArrowRight') go(state.current - 1);
});
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const h = document.body.scrollHeight - window.innerHeight;
    $('#readBar').style.width = (h > 0 ? Math.min(100, window.scrollY / h * 100) : 0) + '%';
    $('#toTop').classList.toggle('show', window.scrollY > 700);
    updateMidBtn();
    ticking = false;
  });
}, { passive: true });
window.addEventListener('resize', () => {
  $('#menuBtn').style.display = window.matchMedia('(max-width:940px)').matches ? 'grid' : 'none';
  if (!window.matchMedia('(max-width:940px)').matches) closeMenu();
  updateMob();
}, { passive: true });

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.dataset.theme = 'dark';
if (window.matchMedia('(max-width:940px)').matches) $('#menuBtn').style.display = 'grid';

window.addEventListener('hashchange', () => {
  if (state.routing) return;
  if (applyHash()) { render(); save(); focusMain(); }
});

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    const ok = ['Phosphor', 'Phosphor-Bold', 'Phosphor-Fill'].some(f => { try { return document.fonts.check('16px "' + f + '"'); } catch (e) { return true; } });
    if (!ok) document.documentElement.classList.add('no-icons');
  });
}

(async () => {
  await load();
  $('#themeBtn').innerHTML = `<i class="ph ph-${document.documentElement.dataset.theme === 'dark' ? 'sun' : 'moon'}"></i>`;
  applyHash();   // a shared link wins over the stored position
  render();
})();

