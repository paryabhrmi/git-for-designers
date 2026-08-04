import { state, isUnlocked } from '../state.js';
import { LEVELS } from '../course.js';
import { SITE, LINKEDIN } from '../config.js';
import { GLOSSARY } from '../content.js';
import { $, FA } from '../dom.js';
import { byline as bylineFn, toast } from '../ui.js';
import { ctx } from '../ctx.js';
import { t, tf } from '../i18n.js';

const byline = () => bylineFn(SITE, LINKEDIN);
let voiceReady = typeof window !== 'undefined' && 'speechSynthesis' in window;

export function speak(text, btn) {
  if (!voiceReady) { toast(t('gl.noVoice'), 'ph-speaker-slash'); return; }
  try {
    speechSynthesis.cancel();
    const clean = text.replace(/[()\/]/g, ' ').replace(/-{2}/g, ' ').replace(/\s+/g, ' ').trim();
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = 'en-US'; u.rate = .85; u.pitch = 1;
    const v = speechSynthesis.getVoices().find(x => /^en(-|_)?/i.test(x.lang));
    if (v) u.voice = v;
    if (btn) {
      btn.classList.add('on');
      u.onend = u.onerror = () => btn.classList.remove('on');
      setTimeout(() => btn.classList.remove('on'), 4000);
    }
    speechSynthesis.speak(u);
  } catch (e) { toast(t('gl.voiceFail'), 'ph-speaker-slash'); }
}

if (voiceReady && typeof speechSynthesis !== 'undefined' && speechSynthesis.getVoices().length === 0) {
  speechSynthesis.onvoiceschanged = () => {};
}

export function renderGlossary() {
  window.scrollTo({ top: 0, behavior: 'auto' });
  document.documentElement.style.setProperty('--pc', 'var(--p3)');
  $('#crumbTitle').textContent = t('nav.glossary');
  $('#root').innerHTML = `
    <div class="gl-head">
      <span class="gl-ic"><i class="ph-duotone ph-book-bookmark"></i></span>
      <div><h1 class="title" style="font-size:28px">${t('nav.glossary')}</h1>
      <p class="sub" style="margin-top:4px">${tf('gl.sub', FA(GLOSSARY.length))}</p></div>
    </div>
    <div class="gl-wrap">
      <i class="ph ph-magnifying-glass"></i>
      <input class="gl-search" id="glSearch" type="search" placeholder="${t('gl.searchPh')}" value="${state.glQuery.replace(/"/g, '&quot;')}">
    </div>
    <p class="gl-count" id="glCount"></p>
    <div class="gl-list" id="glList"></div>
    ${byline()}`;

  const list = $('#glList'), count = $('#glCount');
  const paint = () => {
    const q = state.glQuery.trim().toLowerCase();
    const items = GLOSSARY.filter(g => !q || (g.t + ' ' + (g.fa || '') + ' ' + g.d).toLowerCase().includes(q));
    count.textContent = q ? tf('gl.results', FA(items.length)) : tf('gl.terms', FA(items.length));
    list.innerHTML = items.length ? items.map(g => `
      <div class="gl-item">
        <div class="gl-top">
          <button class="say" data-say="${g.t.replace(/"/g, '&quot;')}" aria-label="${tf('gl.hear', g.t)}"><i class="ph-fill ph-speaker-high"></i></button>
          <span class="gl-term">${g.t}</span>
          ${g.fa ? `<span class="gl-fa">${g.fa}</span>` : ''}
          <button class="gl-lv" data-lv="${g.lv}">${tf('level.n', FA(g.lv))}</button>
        </div>
        ${g.p ? `<span class="gl-pron">${t('gl.pron')} <b>${g.p}</b></span>` : ''}
        <p>${g.d}</p>
      </div>`).join('')
      : `<p style="color:var(--muted);text-align:center;padding:26px 0">${t('gl.empty')}</p>`;
    list.querySelectorAll('.say').forEach(b => b.addEventListener('click', () => speak(b.dataset.say, b)));
    list.querySelectorAll('.gl-lv').forEach(b => b.addEventListener('click', () => {
      const idx = LEVELS.findIndex(l => l.id === +b.dataset.lv);
      if (!isUnlocked(idx)) { toast(t('lock.levelLocked')); return; }
      ctx.go(idx);
    }));
  };
  $('#glSearch').addEventListener('input', e => { state.glQuery = e.target.value; paint(); });
  paint();
  ctx.syncNav();
}
