/**
 * Learning-tracks views: overview (#/tracks) and detail (#/track-<id>).
 *
 * Track progress is DERIVED from state.done (completed level IDs) and the
 * existing linear-unlock rule (isUnlocked). No per-track completion state is
 * stored, and level navigation reuses the existing lesson route via ctx.go —
 * no lesson pages are duplicated and no new locks are introduced.
 */
import { state, isUnlocked, firstOpen } from '../state.js';
import { LEVELS } from '../course.js';
import { TRACKS, TRACK_BY_ID } from '../content.js';
import { missionsForTrack } from '../content.js';
import { SITE, LINKEDIN } from '../config.js';
import { $, FA } from '../dom.js';
import { byline as bylineFn } from '../ui.js';
import { ctx } from '../ctx.js';
import { t, tf } from '../i18n.js';

const byline = () => bylineFn(SITE, LINKEDIN);
const levelIndex = (id) => LEVELS.findIndex(l => l.id === id);

/** Runtime progress for a track, derived from completed level IDs. */
function trackStats(track) {
  const levels = track.levelIds.map(id => {
    const idx = levelIndex(id);
    return { id, idx, level: LEVELS[idx], done: !!state.done[id], unlocked: isUnlocked(idx) };
  });
  const total = levels.length;
  const passed = levels.filter(l => l.done).length;
  const pct = total ? Math.round(passed / total * 100) : 0;
  return {
    levels, total, passed, pct,
    complete: passed === total,
    started: passed > 0,
    nextUnlocked: levels.find(l => !l.done && l.unlocked) || null,
  };
}

function statusLabel(track) {
  if (track.kind === 'required') return t('track.status.required');
  // track.difficulty is LOCALIZED content, so never compare it against a bare
  // literal: match on the stable track ID, with the localized value as a fallback.
  if (track.id === 'design-technologist' || track.difficulty === t('track.difficulty.advanced')) {
    return t('track.status.advanced');
  }
  return t('track.status.optional');
}

function ctaLabel(st) {
  if (st.complete) return t('track.cta.review');
  return st.started ? t('track.cta.continue') : t('track.cta.start');
}

/* ---------- overview ---------- */

function trackCard(track) {
  const st = trackStats(track);
  const flag = track.kind === 'required'
    ? `<span class="tc-flag t-req">${t('track.flag.required')}</span>`
    : `<span class="tc-flag t-opt">${t('track.flag.optional')}</span>`;
  return `
    <li>
      <a class="track-card${st.complete ? ' is-done' : ''}" href="#/track-${track.id}"
         aria-label="${tf('track.card.aria', track.shortTitle, statusLabel(track), FA(st.passed), FA(st.total))}">
        <span class="tc-top">
          <span class="tc-ic"><i class="ph-fill ${track.icon}" aria-hidden="true"></i></span>
          <span class="tc-name"><b>${track.shortTitle}</b><em dir="ltr">${track.title}</em></span>
          ${flag}
        </span>
        <span class="tc-aud">${track.audience}</span>
        <span class="tc-prog">
          <span class="tc-prog-txt">${tf('track.levelsOf', FA(st.passed), FA(st.total))}${st.complete ? ` · ${t('state.done')}` : ''}</span>
          <span class="tc-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${st.pct}"
                aria-label="${tf('track.prog.aria', track.shortTitle, FA(st.pct))}"><i style="width:${st.pct}%"></i></span>
        </span>
        <span class="tc-cta">${ctaLabel(st)}<i class="ph-bold ph-arrow-left" aria-hidden="true"></i></span>
      </a>
    </li>`;
}

function overview() {
  document.documentElement.style.setProperty('--pc', 'var(--p1)');
  $('#crumbTitle').textContent = t('nav.tracks');
  const coreSt = trackStats(TRACK_BY_ID['core']);
  $('#root').innerHTML = `
    <div class="tracks-head">
      <span class="hero-badge"><i class="ph-fill ph-path" aria-hidden="true"></i>${t('track.heroBadge')}</span>
      <h2>${t('nav.tracks')}</h2>
      <p class="lead">${t('track.lead')}</p>
    </div>
    <div class="track-reco">
      <span class="tr-ic"><i class="ph-fill ph-book-open" aria-hidden="true"></i></span>
      <div class="tr-txt">
        <b>${t('track.reco.h')}</b>
        <p>${t('track.reco.p')}</p>
      </div>
      <a class="btn btn-primary" href="#/track-core"><i class="ph-bold ph-play" aria-hidden="true"></i>${coreSt.started ? t('track.reco.continue') : t('track.reco.start')}</a>
    </div>
    <ul class="track-grid" aria-label="${t('track.list.aria')}">
      ${TRACKS.map(trackCard).join('')}
    </ul>
    <p class="track-note"><i class="ph ph-info" aria-hidden="true"></i>${t('track.note')}</p>
    ${byline()}`;
}

/* ---------- detail ---------- */

function levelRow(l, recIdx) {
  const isRec = l.idx === recIdx;
  const stateTxt = l.done ? t('state.passed') : (isRec ? t('state.here') : (l.unlocked ? t('state.open') : t('state.locked')));
  const icon = l.done ? 'ph-check' : (l.unlocked ? 'ph-circle' : 'ph-lock-simple');
  return `
    <li>
      <button type="button" class="td-lv${l.done ? ' done' : ''}${l.unlocked ? '' : ' lock'}${isRec ? ' td-here' : ''}"
              data-idx="${l.idx}" aria-label="${tf('track.lvAria', FA(l.id), l.level.title, stateTxt)}">
        <span class="td-lv-dot"><i class="ph-bold ${icon}" aria-hidden="true"></i></span>
        <span class="td-lv-main">
          <span class="td-lv-n">${tf('level.n', FA(String(l.id).padStart(2, '0')))}</span>
          <span class="td-lv-t">${l.level.title}</span>
        </span>
        <span class="td-lv-state">${stateTxt}</span>
      </button>
    </li>`;
}

function actionBlock(track, st) {
  if (st.complete) return '';
  if (st.nextUnlocked) {
    const label = st.started ? t('track.cta.continue') : t('track.cta.start');
    return `<button type="button" class="btn btn-primary td-action" id="tdAction" data-idx="${st.nextUnlocked.idx}">
      <i class="ph-bold ph-play" aria-hidden="true"></i>${tf('track.action', label, FA(st.nextUnlocked.id), st.nextUnlocked.level.title)}</button>`;
  }
  // some/none done, but the next level in this track is still locked by the course order
  const title = st.started ? t('track.gate.t1') : t('track.gate.t2');
  const body = st.started ? t('track.gate.b1') : t('track.gate.b2');
  return `<div class="td-gate">
    <i class="ph-fill ph-lock-simple" aria-hidden="true"></i>
    <div>
      <b>${title}</b>
      <p>${body}</p>
    </div>
    <button type="button" class="btn btn-ghost td-action" id="tdAction" data-idx="${firstOpen()}"><i class="ph-bold ph-arrow-left" aria-hidden="true"></i>${t('track.gate.cta')}</button>
  </div>`;
}

function missionSection(track) {
  const missions = missionsForTrack(track.id);
  if (!missions.length) return '';
  const rows = missions.map(m => {
    const done = state.missionsDone.includes(m.id);
    return `<li><a class="td-mission${done ? ' is-done' : ''}" href="#/mission-${m.id}">
      <span class="tm-ic"><i class="ph-fill ${m.icon}" aria-hidden="true"></i></span>
      <span class="tm-main">
        <span class="tm-title">${m.title}</span>
        <span class="tm-meta">${tf('mission.stepsDiff', FA(m.steps.length), m.difficulty)}</span>
      </span>
      <span class="tm-state">${done ? t('state.done') : t('mission.startCta')}</span>
    </a></li>`;
  }).join('');
  return `<section class="td-missions">
    <h3 class="td-missions-h">${t('track.missions.h')}</h3>
    <p class="td-missions-sub">${t('track.missions.sub')}</p>
    <ol class="td-levels" style="margin-bottom:0">${rows}</ol>
  </section>`;
}

function completionBlock(track) {
  const nextNames = track.recommendedNextTrackIds.map(id => TRACK_BY_ID[id]).filter(Boolean);
  const next = nextNames.length
    ? `<p>${tf('track.next', nextNames.map(x => `<a href="#/track-${x.id}">${x.shortTitle}</a>`).join(' · '))}</p>`
    : `<p>${t('track.allDone')}</p>`;
  return `<div class="td-done">
    <i class="ph-fill ph-check-circle" aria-hidden="true"></i>
    <div><b>${track.completionMessage}</b>${next}</div>
  </div>`;
}

function detail(track) {
  document.documentElement.style.setProperty('--pc', 'var(--p1)');
  $('#crumbTitle').textContent = tf('track.crumb', track.shortTitle);
  const st = trackStats(track);
  const recIdx = st.nextUnlocked ? st.nextUnlocked.idx : -1;
  const prereqNames = track.prerequisiteTrackIds.map(id => TRACK_BY_ID[id] && TRACK_BY_ID[id].shortTitle).filter(Boolean);
  $('#root').innerHTML = `
    <a class="track-back" href="#/tracks"><i class="ph-bold ph-arrow-right" aria-hidden="true"></i>${t('track.back')}</a>
    <div class="track-detail-head">
      <span class="td-ic"><i class="ph-fill ${track.icon}" aria-hidden="true"></i></span>
      <div>
        <h2>${track.shortTitle}</h2>
        <p class="td-en" dir="ltr">${track.title}</p>
      </div>
    </div>
    <div class="td-tags">
      <span class="td-tag ${track.kind === 'required' ? 't-req' : 't-opt'}">${statusLabel(track)}</span>
      <span class="td-tag">${tf('track.tag.diff', track.difficulty)}</span>
      <span class="td-tag">${tf('track.tag.levels', FA(st.total))}</span>
    </div>
    <p class="td-desc">${track.description}</p>
    <p class="td-aud"><i class="ph ph-user-focus" aria-hidden="true"></i>${track.audience}</p>
    ${prereqNames.length ? `<p class="td-prereq"><i class="ph ph-path" aria-hidden="true"></i>${tf('track.prereq', prereqNames.join(t('and.join')))}</p>` : ''}
    <div class="td-prog">
      <div class="td-prog-row"><b>${t('track.prog.h')}</b><span>${tf('track.prog.txt', FA(st.passed), FA(st.total), FA(st.pct))}</span></div>
      <div class="td-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${st.pct}" aria-label="${tf('track.prog.barAria', track.shortTitle)}"><i style="width:${st.pct}%"></i></div>
    </div>
    ${actionBlock(track, st)}
    <h3 class="td-lv-h">${t('track.levels.h')}</h3>
    <ol class="td-levels">
      ${st.levels.map(l => levelRow(l, recIdx)).join('')}
    </ol>
    ${missionSection(track)}
    ${st.complete ? completionBlock(track) : ''}
    ${byline()}`;

  $('#root').querySelectorAll('.td-lv[data-idx]').forEach(b => {
    b.addEventListener('click', () => ctx.go(+b.dataset.idx));
  });
  const act = $('#tdAction');
  if (act) act.addEventListener('click', () => ctx.go(+act.dataset.idx));
}

export function renderTracks() {
  window.scrollTo({ top: 0, behavior: 'auto' });
  if (state.view === 'track' && TRACK_BY_ID[state.track]) {
    detail(TRACK_BY_ID[state.track]);
  } else {
    state.view = 'tracks';
    state.track = null;
    overview();
  }
  ctx.syncNav();
}
