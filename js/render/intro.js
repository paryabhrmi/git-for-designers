import { state, passedCount, firstOpen, totalMinutes, totalXP, maxXP, rankOf } from '../state.js';
import { LEVELS, PHASES } from '../course.js';
import { XP_PASS, XP_PERFECT, PHASE_IC, SITE, LINKEDIN, AVATAR_SRC } from '../config.js';
import { BADGES, earned } from '../content.js';
import { $, FA } from '../dom.js';
import { authorCard as authorCardFn } from '../ui.js';
import { ctx } from '../ctx.js';
import { t, tf } from '../i18n.js';
import { analyticsEnabled } from '../analytics.js';

const authorCard = () => authorCardFn(AVATAR_SRC, SITE, LINKEDIN);

export function renderIntro() {
  window.scrollTo({ top: 0, behavior: 'auto' });
  document.documentElement.style.setProperty('--pc', 'var(--p1)');
  $('#crumbTitle').textContent = t('intro.crumb');
  const n = passedCount();
  $('#root').innerHTML = `
    <div class="hero">
      <span class="hero-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="7" cy="6" r="2.3"/><circle cx="7" cy="18" r="2.3"/><circle cx="17" cy="12" r="2.3"/>
          <path d="M7 8.3v7.4M7 12h5.6a2.1 2.1 0 0 0 2.1-2.1V9"/>
        </svg>${t('intro.heroBadge')}</span>
      <h1>${t('intro.h2')}</h1>
      <p class="lead">${t('intro.lead')}</p>
    </div>
    <div class="stats">
      <div class="stat"><i class="ph-duotone ph-stack"></i><b>${FA(LEVELS.length)}</b><span>${t('intro.stat.levels')}</span></div>
      <div class="stat"><i class="ph-duotone ph-seal-question"></i><b>${FA(LEVELS.reduce((a, l) => a + l.quiz.length, 0))}</b><span>${t('intro.stat.quiz')}</span></div>
      <div class="stat"><i class="ph-duotone ph-lightning"></i><b>${FA(maxXP())}</b><span>${t('intro.stat.xp')}</span></div>
      <div class="stat"><i class="ph-duotone ph-clock"></i><b>${FA(totalMinutes())}</b><span>${t('intro.stat.mins')}</span></div>
    </div>

    <h2 style="font-size:19px;font-weight:800;margin:26px 0 12px">${t('intro.how')}</h2>
    <div class="steps">
      <div class="step"><span class="n"><i class="ph-bold ph-book-open"></i></span><div><b>${t('intro.step1.t')}</b><p>${t('intro.step1.d')}</p></div></div>
      <div class="step"><span class="n"><i class="ph-bold ph-exam"></i></span><div><b>${t('intro.step2.t')}</b><p>${t('intro.step2.d')}</p></div></div>
      <div class="step"><span class="n"><i class="ph-bold ph-lock-simple-open"></i></span><div><b>${t('intro.step3.t')}</b><p>${t('intro.step3.d')}</p></div></div>
      <div class="step"><span class="n"><i class="ph-bold ph-trophy"></i></span><div><b>${t('intro.step4.t')}</b><p>${t('intro.step4.d')}</p></div></div>
    </div>

    <h2 style="font-size:19px;font-weight:800;margin:28px 0 2px">${t('intro.badges.h')}</h2>
    <p class="sub" style="font-size:13.5px;margin:0 0 4px">${tf('intro.badges.sub', FA(earned().length), FA(BADGES.length), FA(XP_PASS), FA(XP_PERFECT))}</p>
    <div class="badges">
      ${BADGES.map(b => { const ok = earned().some(x => x.id === b.id); return `
        <div class="badge${ok ? '' : ' off'}">
          <i class="ph-${ok ? 'fill' : 'bold'} ${ok ? b.ic : 'ph-lock-simple'}"></i>
          <div><b>${b.t}</b><span>${b.d}</span></div>
        </div>`; }).join('')}
    </div>

    <div class="namebox">
      <label for="nameIn"><i class="ph-fill ph-user-circle"></i>${t('intro.name.label')}</label>
      <p>${t('intro.name.desc')}</p>
      <input id="nameIn" type="text" placeholder="${t('intro.name.ph')}" value="${state.learner.replace(/"/g, '&quot;')}">
    </div>

    <h2 style="font-size:19px;font-weight:800;margin:26px 0 4px">${t('intro.phases.h')}</h2>
    <div class="phase-cards">
      ${PHASES.map((p, i) => `<div class="phase-card" style="--pc:${p.color}">
        <i class="ph-fill ${PHASE_IC[i]}"></i><span>${p.name}</span>
        <em>${String(p.from).padStart(2, '0')}–${String(p.to).padStart(2, '0')}</em></div>`).join('')}
    </div>

    <div class="track-entry">
      <div class="te-txt">
        <b>${t('nav.tracks')}</b>
        <p>${t('intro.tracks.p')}</p>
      </div>
      <button class="btn btn-primary" id="tracksBtn"><i class="ph-bold ph-path"></i>${t('intro.tracks.btn')}</button>
    </div>

    <div class="quiz-actions" style="border:none;margin-top:26px">
      <button class="btn btn-primary" id="startBtn">
        <i class="ph-bold ph-play"></i>${n ? tf('intro.continue', FA(LEVELS[firstOpen()].id)) : t('intro.start')}
      </button>
      <button class="btn btn-ghost" id="glBtn"><i class="ph ph-book-bookmark"></i>${t('nav.glossary')}</button>
      ${n ? `<span class="streak"><i class="ph-fill ph-lightning"></i>${tf('intro.xpRank', FA(totalXP()), rankOf(totalXP()).t)}</span>` : ''}
    </div>
    <p class="privacy-note"><i class="ph-fill ph-lock-simple" aria-hidden="true"></i>${t('intro.privacy')}${analyticsEnabled() ? ' ' + t('intro.privacy.an') : ''}</p>
    ${authorCard()}`;

  $('#nameIn').addEventListener('input', e => { state.learner = e.target.value; ctx.save(); });
  $('#startBtn').addEventListener('click', () => ctx.go(firstOpen()));
  $('#glBtn').addEventListener('click', () => { state.view = 'glossary'; ctx.render(); ctx.save(); });
  $('#tracksBtn').addEventListener('click', () => { state.view = 'tracks'; state.track = null; ctx.render(); ctx.save(); });
}
