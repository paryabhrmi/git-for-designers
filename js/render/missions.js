/**
 * Learning-mission views: hub (#/missions) and detail (#/mission-<id>).
 *
 * One reusable step engine renders every mission. Nothing here executes Git —
 * commands shown are labelled educational simulations. Completion is stored as
 * a deduplicated list of mission IDs (state.missionsDone) and awards no XP.
 */
import { state } from '../state.js';
import { MISSIONS, MISSION_BY_ID, missionsForTrack } from '../content.js';
import { TRACK_BY_ID } from '../content.js';
import { SITE, LINKEDIN } from '../config.js';
import { $, FA } from '../dom.js';
import { byline as bylineFn } from '../ui.js';
import { ctx } from '../ctx.js';
import { t, tf } from '../i18n.js';

const byline = () => bylineFn(SITE, LINKEDIN);

// transient per-session UI state for the active mission (not persisted)
let ui = { missionId: null, step: 0, picked: null };
let hubFilter = 'all';

// Headings are catalog keys, not strings: this map is built once at import time
// while the UI language can change at runtime, so it is resolved at render time.
const TONE = {
  correct:   { cls: 'ok',        ic: 'ph-check-circle',    headKey: 'mission.tone.correct' },
  unsafe:    { cls: 'unsafe',    ic: 'ph-shield-warning',  headKey: 'mission.tone.unsafe' },
  risky:     { cls: 'risky',     ic: 'ph-warning-circle',  headKey: 'mission.tone.risky' },
  incorrect: { cls: 'incorrect', ic: 'ph-x-circle',        headKey: 'mission.tone.incorrect' },
};

const isDone = (id) => state.missionsDone.includes(id);
const trackName = (id) => (TRACK_BY_ID[id] ? TRACK_BY_ID[id].shortTitle : id);

function markDone(id) {
  if (!isDone(id)) { state.missionsDone.push(id); ctx.save(); }   // first completion only; no XP, no duplicates
}

/* ---------------- hub ---------------- */

function missionCard(m) {
  const done = isDone(m);
  const cta = done ? t('mission.reviewCta') : t('mission.startCta');
  return `
    <li>
      <a class="mission-card${done ? ' is-done' : ''}" href="#/mission-${m.id}"
         aria-label="${tf('mission.card.aria', m.title, done ? t('state.done') : t('state.notStarted'))}">
        <span class="mc-top">
          <span class="mc-ic"><i class="ph-fill ${m.icon}" aria-hidden="true"></i></span>
          <span class="mc-flag">${done ? `<i class="ph-fill ph-check" aria-hidden="true"></i>${t('state.done')}` : t('mission.flag')}</span>
        </span>
        <b class="mc-title">${m.title}</b>
        <span class="mc-desc">${m.shortDescription}</span>
        <span class="mc-meta">
          <span class="mc-chip">${tf('track.crumb', trackName(m.trackId))}</span>
          <span class="mc-chip">${m.difficulty}</span>
          <span class="mc-chip">${tf('mission.steps', FA(m.steps.length))}</span>
        </span>
        <span class="mc-cta">${cta}<i class="ph-bold ph-arrow-left" aria-hidden="true"></i></span>
      </a>
    </li>`;
}

function hub() {
  document.documentElement.style.setProperty('--pc', 'var(--p2)');
  $('#crumbTitle').textContent = t('nav.missions');
  const recommended = MISSIONS.find(m => !isDone(m.id)) || null;
  const filters = [['all', t('filter.all')]].concat(MISSIONS.map(m => [m.trackId, trackName(m.trackId)]));
  const shown = hubFilter === 'all' ? MISSIONS : MISSIONS.filter(m => m.trackId === hubFilter);
  $('#root').innerHTML = `
    <div class="tracks-head">
      <span class="hero-badge"><i class="ph-fill ph-flag-checkered" aria-hidden="true"></i>${t('mission.heroBadge')}</span>
      <h1>${t('nav.missions')}</h1>
      <p class="lead">${t('mission.lead')}</p>
      <p class="mission-sim"><i class="ph-fill ph-info" aria-hidden="true"></i>${t('mission.simNotice')}</p>
    </div>
    ${recommended ? `
    <div class="track-reco">
      <span class="tr-ic"><i class="ph-fill ${recommended.icon}" aria-hidden="true"></i></span>
      <div class="tr-txt">
        <b>${tf('mission.reco', recommended.title)}</b>
        <p>${tf('mission.recoMeta', trackName(recommended.trackId), FA(recommended.steps.length), recommended.difficulty)}</p>
      </div>
      <a class="btn btn-primary" href="#/mission-${recommended.id}"><i class="ph-bold ph-play" aria-hidden="true"></i>${t('mission.startCta')}</a>
    </div>` : `
    <div class="td-done"><i class="ph-fill ph-check-circle" aria-hidden="true"></i><div><b>${t('mission.allDone.h')}</b><p>${t('mission.allDone.p')}</p></div></div>`}
    <div class="mission-filter" role="group" aria-label="${t('mission.filter.aria')}">
      ${filters.map(([id, label]) => `<button type="button" class="mf-btn${hubFilter === id ? ' active' : ''}" data-filter="${id}" aria-pressed="${hubFilter === id}">${label}</button>`).join('')}
    </div>
    <ul class="mission-grid" aria-label="${t('mission.list.aria')}">
      ${shown.map(missionCard).join('')}
    </ul>
    ${byline()}`;

  $('#root').querySelectorAll('.mf-btn').forEach(b => {
    b.addEventListener('click', () => { hubFilter = b.dataset.filter; hub(); });
  });
}

/* ---------------- detail: step engine ---------------- */

function stepBody(m, step, stepIdx) {
  const total = m.steps.length;
  const picked = ui.picked ? step.choices.find(c => c.id === ui.picked) : null;
  const isCorrect = picked && step.correct === picked.id;
  return `
    <div class="ms-progress">
      <span class="ms-step-txt">${tf('mission.stepOf', FA(stepIdx + 1), FA(total))}</span>
      <span class="ms-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${stepIdx}" aria-label="${tf('mission.progAria', FA(stepIdx + 1), FA(total))}"><i style="width:${(stepIdx) / total * 100}%"></i></span>
    </div>
    <div class="ms-situation" id="msSituation" tabindex="-1"><h2 class="sr-only">${tf('mission.situationOf', FA(stepIdx + 1))}</h2>${step.situation}</div>
    ${step.stateNote ? `<p class="ms-state"><i class="ph ph-git-branch" aria-hidden="true"></i>${step.stateNote}</p>` : ''}
    <div class="ms-choices" role="group" aria-label="${t('mission.choices.aria')}">
      ${step.choices.map(c => {
        const chosen = ui.picked === c.id;
        const reveal = chosen ? TONE[c.tone] : null;
        return `<button type="button" class="ms-choice${chosen ? ' picked ' + reveal.cls : ''}" data-choice="${c.id}"${chosen && isCorrect ? ' data-correct="1"' : ''}>
          <span class="ms-choice-mark" aria-hidden="true"><i class="ph-bold ${chosen ? reveal.ic : 'ph-circle'}"></i></span>
          <span class="ms-choice-label">${c.label}</span>
        </button>`;
      }).join('')}
    </div>
    <div class="ms-feedback" id="msFeedback" role="status" aria-live="polite">
      ${picked ? feedbackHtml(m, step, picked, isCorrect, stepIdx) : ''}
    </div>
    <div class="ms-tools">
      <button type="button" class="btn btn-ghost" id="msHintBtn" aria-expanded="false" aria-controls="msHint"><i class="ph ph-lightbulb" aria-hidden="true"></i>${t('mission.hint')}</button>
      <a class="btn btn-ghost" href="#/missions"><i class="ph ph-squares-four" aria-hidden="true"></i>${t('mission.all')}</a>
    </div>
    <div class="ms-hint" id="msHint" hidden><i class="ph-fill ph-lightbulb" aria-hidden="true"></i>${step.hint}</div>`;
}

function feedbackHtml(m, step, choice, isCorrect, stepIdx) {
  const tone = TONE[choice.tone];
  const last = stepIdx === m.steps.length - 1;
  return `
    <div class="ms-fb ${tone.cls}">
      <div class="ms-fb-head"><i class="ph-fill ${tone.ic}" aria-hidden="true"></i><b tabindex="-1" id="msFbHead">${t(tone.headKey)}</b></div>
      <p class="ms-fb-body">${choice.feedback}</p>
      ${isCorrect ? `<p class="ms-fb-explain"><i class="ph ph-arrow-bend-down-right" aria-hidden="true"></i>${step.explanation}</p>` : ''}
      ${/* The command is the consequence of a correct decision, never a hint shown
            before it — rendering it above the choices made 14 of 20 steps a
            matching exercise instead of a decision. */
        isCorrect && step.commandPreview ? `
        <div class="ms-cmd">
          <div class="ms-cmd-label"><i class="ph ph-terminal-window" aria-hidden="true"></i>${t('mission.cmdSim')}</div>
          <pre dir="ltr"><code>${step.commandPreview}</code></pre>
        </div>` : ''}
      ${isCorrect
        ? `<button type="button" class="btn btn-primary" id="msNext">${last ? t('mission.finish') : t('mission.nextStep')}<i class="ph-bold ph-arrow-left" aria-hidden="true"></i></button>`
        : `<p class="ms-fb-retry"><i class="ph ph-arrow-counter-clockwise" aria-hidden="true"></i>${t('mission.retryNote')}</p>`}
    </div>`;
}

function debrief(m) {
  const track = TRACK_BY_ID[m.trackId];
  markDone(m.id);
  return `
    <div class="ms-debrief">
      <div class="ms-debrief-head"><i class="ph-fill ph-flag-checkered" aria-hidden="true"></i><h2>${t('mission.debrief.h')}</h2></div>
      <p class="ms-debrief-msg">${m.completionMessage}</p>
      <h3 class="ms-objectives-h">${t('mission.debrief.obj')}</h3>
      <ul class="ms-objectives">
        ${m.objectives.map(o => `<li><i class="ph-bold ph-check" aria-hidden="true"></i>${o}</li>`).join('')}
      </ul>
      <div class="ms-debrief-actions">
        <a class="btn btn-primary" href="${m.nextAction.href}"><i class="ph-bold ph-arrow-left" aria-hidden="true"></i>${m.nextAction.label}</a>
        ${track ? `<a class="btn btn-ghost" href="#/track-${track.id}"><i class="ph ph-path" aria-hidden="true"></i>${tf('track.crumb', track.shortTitle)}</a>` : ''}
        <button type="button" class="btn btn-ghost" id="msReplay"><i class="ph ph-arrow-counter-clockwise" aria-hidden="true"></i>${t('mission.replay')}</button>
        <a class="btn btn-ghost" href="#/missions"><i class="ph ph-squares-four" aria-hidden="true"></i>${t('mission.all')}</a>
      </div>
    </div>`;
}

function renderDetail(m) {
  document.documentElement.style.setProperty('--pc', 'var(--p2)');
  $('#crumbTitle').textContent = tf('mission.crumb', m.title);
  const finished = ui.step >= m.steps.length;
  const step = finished ? null : m.steps[ui.step];
  $('#root').innerHTML = `
    <a class="track-back" href="#/missions"><i class="ph-bold ph-arrow-right" aria-hidden="true"></i>${t('mission.all')}</a>
    <div class="mission-detail-head">
      <span class="md-ic"><i class="ph-fill ${m.icon}" aria-hidden="true"></i></span>
      <div>
        <h1>${m.title}</h1>
        <p class="md-sub">${tf('track.crumb', trackName(m.trackId))} · ${m.difficulty}${isDone(m.id) ? ` · <span class="md-done">${t('state.done')}</span>` : ''}</p>
      </div>
    </div>
    ${finished ? '' : `<div class="ms-context"><i class="ph-fill ph-info" aria-hidden="true"></i><div><b>${t('mission.context')}</b><p>${m.context}</p></div></div>`}
    <div id="msStage">${finished ? debrief(m) : stepBody(m, step, ui.step)}</div>
    ${byline()}`;

  if (finished) { wireDebrief(m); return; }
  wireStep(m, step);
}

function wireStep(m, step) {
  $('#root').querySelectorAll('.ms-choice').forEach(b => {
    b.addEventListener('click', () => {
      ui.picked = b.dataset.choice;
      // re-render only the stage to reveal feedback, then move focus to feedback heading
      $('#msStage').innerHTML = stepBody(m, step, ui.step);
      wireStep(m, step);
      const head = $('#msFbHead');
      if (head) head.focus();
    });
  });
  const hintBtn = $('#msHintBtn');
  if (hintBtn) hintBtn.addEventListener('click', () => {
    const hint = $('#msHint');
    const open = hint.hasAttribute('hidden');
    if (open) hint.removeAttribute('hidden'); else hint.setAttribute('hidden', '');
    hintBtn.setAttribute('aria-expanded', String(open));
  });
  const next = $('#msNext');
  if (next) next.addEventListener('click', () => {
    ui.step += 1; ui.picked = null;
    renderDetail(m);
    const anchor = $('#msSituation') || $('#msStage') || $('#root');
    if (anchor) anchor.focus();
  });
}

function wireDebrief(m) {
  const replay = $('#msReplay');
  if (replay) replay.addEventListener('click', () => {
    ui = { missionId: m.id, step: 0, picked: null };
    renderDetail(m);
    const a = $('#msSituation'); if (a) a.focus();
  });
}

export function renderMissions() {
  window.scrollTo({ top: 0, behavior: 'auto' });
  if (state.view === 'mission' && MISSION_BY_ID[state.mission]) {
    const m = MISSION_BY_ID[state.mission];
    if (ui.missionId !== m.id) ui = { missionId: m.id, step: 0, picked: null };
    renderDetail(m);
  } else {
    state.view = 'missions';
    state.mission = null;
    hub();
  }
  ctx.syncNav();
}
