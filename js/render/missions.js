/**
 * Learning-mission views: hub (#/missions) and detail (#/mission-<id>).
 *
 * One reusable step engine renders every mission. Nothing here executes Git —
 * commands shown are labelled educational simulations. Completion is stored as
 * a deduplicated list of mission IDs (state.missionsDone) and awards no XP.
 */
import { state } from '../state.js';
import { MISSIONS, MISSION_BY_ID, missionsForTrack } from '../../data/missions.js';
import { TRACK_BY_ID } from '../../data/tracks.js';
import { SITE, LINKEDIN } from '../config.js';
import { $, FA } from '../dom.js';
import { byline as bylineFn } from '../ui.js';
import { ctx } from '../ctx.js';

const byline = () => bylineFn(SITE, LINKEDIN);

// transient per-session UI state for the active mission (not persisted)
let ui = { missionId: null, step: 0, picked: null };
let hubFilter = 'all';

const TONE = {
  correct:   { cls: 'ok',        ic: 'ph-check-circle',    head: 'انتخاب درست' },
  unsafe:    { cls: 'unsafe',    ic: 'ph-shield-warning',  head: 'در این موقعیت امن نیست' },
  risky:     { cls: 'risky',     ic: 'ph-warning-circle',  head: 'ممکن است، ولی بهترین انتخاب نیست' },
  incorrect: { cls: 'incorrect', ic: 'ph-x-circle',        head: 'این مدل ذهنی دقیق نیست' },
};

const isDone = (id) => state.missionsDone.includes(id);
const trackName = (id) => (TRACK_BY_ID[id] ? TRACK_BY_ID[id].shortTitle : id);

function markDone(id) {
  if (!isDone(id)) { state.missionsDone.push(id); ctx.save(); }   // first completion only; no XP, no duplicates
}

/* ---------------- hub ---------------- */

function missionCard(m) {
  const done = isDone(m);
  const cta = done ? 'مرور دوباره' : 'شروع تمرین';
  return `
    <li>
      <a class="mission-card${done ? ' is-done' : ''}" href="#/mission-${m.id}"
         aria-label="مأموریت ${m.title} — ${done ? 'تکمیل‌شده' : 'شروع‌نشده'}">
        <span class="mc-top">
          <span class="mc-ic"><i class="ph-fill ${m.icon}" aria-hidden="true"></i></span>
          <span class="mc-flag">${done ? '<i class="ph-fill ph-check" aria-hidden="true"></i>تکمیل‌شده' : 'مأموریت عملی'}</span>
        </span>
        <b class="mc-title">${m.title}</b>
        <span class="mc-desc">${m.shortDescription}</span>
        <span class="mc-meta">
          <span class="mc-chip">مسیر ${trackName(m.trackId)}</span>
          <span class="mc-chip">${m.difficulty}</span>
          <span class="mc-chip">${FA(m.steps.length)} مرحله</span>
        </span>
        <span class="mc-cta">${cta}<i class="ph-bold ph-arrow-left" aria-hidden="true"></i></span>
      </a>
    </li>`;
}

function hub() {
  document.documentElement.style.setProperty('--pc', 'var(--p2)');
  $('#crumbTitle').textContent = 'مأموریت‌های عملی';
  const recommended = MISSIONS.find(m => !isDone(m.id)) || null;
  const filters = [['all', 'همه']].concat(MISSIONS.map(m => [m.trackId, trackName(m.trackId)]));
  const shown = hubFilter === 'all' ? MISSIONS : MISSIONS.filter(m => m.trackId === hubFilter);
  $('#root').innerHTML = `
    <div class="tracks-head">
      <span class="hero-badge"><i class="ph-fill ph-flag-checkered" aria-hidden="true"></i>تمرین عملی</span>
      <h2>مأموریت‌های عملی</h2>
      <p class="lead">هر مأموریت یک موقعیت واقعی طراحی است که در چند مرحله تصمیم می‌گیری و برای هر انتخاب، بازخورد روشن می‌گیری: چه اتفاقی می‌افتد، کدام حالت Git تغییر می‌کند و امن‌تر چیست. این‌ها اختیاری‌اند و مکمل درس‌ها و آزمون‌ها هستند؛ روی امتیاز و نشان فتح مسیر اثری ندارند.</p>
      <p class="mission-sim"><i class="ph-fill ph-info" aria-hidden="true"></i>شبیه‌سازی آموزشی — هیچ فرمانی روی سیستم تو اجرا نمی‌شود.</p>
    </div>
    ${recommended ? `
    <div class="track-reco">
      <span class="tr-ic"><i class="ph-fill ${recommended.icon}" aria-hidden="true"></i></span>
      <div class="tr-txt">
        <b>مأموریت پیشنهادی: ${recommended.title}</b>
        <p>مسیر ${trackName(recommended.trackId)} · ${FA(recommended.steps.length)} مرحله · ${recommended.difficulty}</p>
      </div>
      <a class="btn btn-primary" href="#/mission-${recommended.id}"><i class="ph-bold ph-play" aria-hidden="true"></i>شروع تمرین</a>
    </div>` : `
    <div class="td-done"><i class="ph-fill ph-check-circle" aria-hidden="true"></i><div><b>همهٔ مأموریت‌ها را کامل کردی</b><p>هر وقت خواستی می‌توانی دوباره مرورشان کنی.</p></div></div>`}
    <div class="mission-filter" role="group" aria-label="فیلتر مأموریت‌ها بر اساس مسیر">
      ${filters.map(([id, label]) => `<button type="button" class="mf-btn${hubFilter === id ? ' active' : ''}" data-filter="${id}" aria-pressed="${hubFilter === id}">${label}</button>`).join('')}
    </div>
    <ul class="mission-grid" aria-label="فهرست مأموریت‌ها">
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
      <span class="ms-step-txt">مرحلهٔ ${FA(stepIdx + 1)} از ${FA(total)}</span>
      <span class="ms-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${stepIdx}" aria-label="پیشرفت مأموریت: مرحلهٔ ${FA(stepIdx + 1)} از ${FA(total)}"><i style="width:${(stepIdx) / total * 100}%"></i></span>
    </div>
    <div class="ms-situation" id="msSituation" tabindex="-1"><h3 class="sr-only">موقعیت مرحلهٔ ${FA(stepIdx + 1)}</h3>${step.situation}</div>
    ${step.commandPreview ? `
      <div class="ms-cmd">
        <div class="ms-cmd-label"><i class="ph ph-terminal-window" aria-hidden="true"></i>شبیه‌سازی آموزشی — این فرمان روی سیستم تو اجرا نمی‌شود</div>
        <pre dir="ltr"><code>${step.commandPreview}</code></pre>
      </div>` : ''}
    ${step.stateNote ? `<p class="ms-state"><i class="ph ph-git-branch" aria-hidden="true"></i>${step.stateNote}</p>` : ''}
    <div class="ms-choices" role="group" aria-label="گزینه‌ها">
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
      <button type="button" class="btn btn-ghost" id="msHintBtn" aria-expanded="false" aria-controls="msHint"><i class="ph ph-lightbulb" aria-hidden="true"></i>راهنمایی</button>
      <a class="btn btn-ghost" href="#/missions"><i class="ph ph-squares-four" aria-hidden="true"></i>همهٔ مأموریت‌ها</a>
    </div>
    <div class="ms-hint" id="msHint" hidden><i class="ph-fill ph-lightbulb" aria-hidden="true"></i>${step.hint}</div>`;
}

function feedbackHtml(m, step, choice, isCorrect, stepIdx) {
  const tone = TONE[choice.tone];
  const last = stepIdx === m.steps.length - 1;
  return `
    <div class="ms-fb ${tone.cls}">
      <div class="ms-fb-head"><i class="ph-fill ${tone.ic}" aria-hidden="true"></i><b tabindex="-1" id="msFbHead">${tone.head}</b></div>
      <p class="ms-fb-body">${choice.feedback}</p>
      ${isCorrect ? `<p class="ms-fb-explain"><i class="ph ph-arrow-bend-down-right" aria-hidden="true"></i>${step.explanation}</p>` : ''}
      ${isCorrect
        ? `<button type="button" class="btn btn-primary" id="msNext">${last ? 'پایان مأموریت' : 'مرحلهٔ بعد'}<i class="ph-bold ph-arrow-left" aria-hidden="true"></i></button>`
        : `<p class="ms-fb-retry"><i class="ph ph-arrow-counter-clockwise" aria-hidden="true"></i>گزینهٔ دیگری را امتحان کن؛ تلاش دوباره اشکالی ندارد.</p>`}
    </div>`;
}

function debrief(m) {
  const track = TRACK_BY_ID[m.trackId];
  markDone(m.id);
  return `
    <div class="ms-debrief">
      <div class="ms-debrief-head"><i class="ph-fill ph-flag-checkered" aria-hidden="true"></i><h2>مأموریت کامل شد</h2></div>
      <p class="ms-debrief-msg">${m.completionMessage}</p>
      <h3 class="ms-objectives-h">در این مأموریت تمرین کردی:</h3>
      <ul class="ms-objectives">
        ${m.objectives.map(o => `<li><i class="ph-bold ph-check" aria-hidden="true"></i>${o}</li>`).join('')}
      </ul>
      <div class="ms-debrief-actions">
        <a class="btn btn-primary" href="${m.nextAction.href}"><i class="ph-bold ph-arrow-left" aria-hidden="true"></i>${m.nextAction.label}</a>
        ${track ? `<a class="btn btn-ghost" href="#/track-${track.id}"><i class="ph ph-path" aria-hidden="true"></i>مسیر ${track.shortTitle}</a>` : ''}
        <button type="button" class="btn btn-ghost" id="msReplay"><i class="ph ph-arrow-counter-clockwise" aria-hidden="true"></i>تمرین دوباره</button>
        <a class="btn btn-ghost" href="#/missions"><i class="ph ph-squares-four" aria-hidden="true"></i>همهٔ مأموریت‌ها</a>
      </div>
    </div>`;
}

function renderDetail(m) {
  document.documentElement.style.setProperty('--pc', 'var(--p2)');
  $('#crumbTitle').textContent = `مأموریت: ${m.title}`;
  const finished = ui.step >= m.steps.length;
  const step = finished ? null : m.steps[ui.step];
  $('#root').innerHTML = `
    <a class="track-back" href="#/missions"><i class="ph-bold ph-arrow-right" aria-hidden="true"></i>همهٔ مأموریت‌ها</a>
    <div class="mission-detail-head">
      <span class="md-ic"><i class="ph-fill ${m.icon}" aria-hidden="true"></i></span>
      <div>
        <h2>${m.title}</h2>
        <p class="md-sub">مسیر ${trackName(m.trackId)} · ${m.difficulty}${isDone(m.id) ? ' · <span class="md-done">تکمیل‌شده</span>' : ''}</p>
      </div>
    </div>
    ${finished ? '' : `<div class="ms-context"><i class="ph-fill ph-info" aria-hidden="true"></i><div><b>موقعیت</b><p>${m.context}</p></div></div>`}
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
