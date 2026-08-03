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
import { TRACKS, TRACK_BY_ID } from '../../data/tracks.js';
import { SITE, LINKEDIN } from '../config.js';
import { $, FA } from '../dom.js';
import { byline as bylineFn } from '../ui.js';
import { ctx } from '../ctx.js';

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
  if (track.kind === 'required') return 'ضروری · پیشنهاد برای شروع';
  if (track.difficulty === 'پیشرفته') return 'اختیاری · پیشرفته';
  return 'اختیاری · تخصصی';
}

function ctaLabel(st) {
  if (st.complete) return 'مرور مسیر تکمیل‌شده';
  return st.started ? 'ادامهٔ مسیر' : 'شروع مسیر';
}

/* ---------- overview ---------- */

function trackCard(track) {
  const st = trackStats(track);
  const flag = track.kind === 'required'
    ? '<span class="tc-flag t-req">ضروری</span>'
    : '<span class="tc-flag t-opt">اختیاری</span>';
  return `
    <li>
      <a class="track-card${st.complete ? ' is-done' : ''}" href="#/track-${track.id}"
         aria-label="مسیر ${track.shortTitle} — ${statusLabel(track)}؛ ${FA(st.passed)} از ${FA(st.total)} سطح">
        <span class="tc-top">
          <span class="tc-ic"><i class="ph-fill ${track.icon}" aria-hidden="true"></i></span>
          <span class="tc-name"><b>${track.shortTitle}</b><em dir="ltr">${track.title}</em></span>
          ${flag}
        </span>
        <span class="tc-aud">${track.audience}</span>
        <span class="tc-prog">
          <span class="tc-prog-txt">${FA(st.passed)} از ${FA(st.total)} سطح${st.complete ? ' · تکمیل‌شده' : ''}</span>
          <span class="tc-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${st.pct}"
                aria-label="پیشرفت مسیر ${track.shortTitle}: ${FA(st.pct)} درصد"><i style="width:${st.pct}%"></i></span>
        </span>
        <span class="tc-cta">${ctaLabel(st)}<i class="ph-bold ph-arrow-left" aria-hidden="true"></i></span>
      </a>
    </li>`;
}

function overview() {
  document.documentElement.style.setProperty('--pc', 'var(--p1)');
  $('#crumbTitle').textContent = 'مسیرهای یادگیری';
  const coreSt = trackStats(TRACK_BY_ID['core']);
  $('#root').innerHTML = `
    <div class="tracks-head">
      <span class="hero-badge"><i class="ph-fill ph-path" aria-hidden="true"></i>چهار مسیر یادگیری</span>
      <h2>مسیرهای یادگیری</h2>
      <p class="lead">این دوره چند نوع کار طراحی را پوشش می‌دهد. لازم نیست همه را بروی: از «مبانی Git» شروع کن، بعد هر مسیر تخصصی که به کارت می‌آید. پیشرفت هر مسیر از همان سطح‌هایی که قبول شده‌ای حساب می‌شود.</p>
    </div>
    <div class="track-reco">
      <span class="tr-ic"><i class="ph-fill ph-book-open" aria-hidden="true"></i></span>
      <div class="tr-txt">
        <b>از «مبانی Git» شروع کن</b>
        <p>مسیر اصلی و ضروری دوره. سه مسیر دیگر تخصصی و اختیاری‌اند و بعد از یادگیری مبانی معنا پیدا می‌کنند.</p>
      </div>
      <a class="btn btn-primary" href="#/track-core"><i class="ph-bold ph-play" aria-hidden="true"></i>${coreSt.started ? 'ادامهٔ مبانی' : 'شروع از مبانی'}</a>
    </div>
    <ul class="track-grid" aria-label="فهرست مسیرهای یادگیری">
      ${TRACKS.map(trackCard).join('')}
    </ul>
    <p class="track-note"><i class="ph ph-info" aria-hidden="true"></i>سطح‌های تکمیل‌شده همین حالا در مسیرشان شمرده می‌شوند و چیزی از نو تکرار نمی‌شود. مسیرهای تخصصی جلوی تکمیل مبانی را نمی‌گیرند. نشان فتح مسیر با قبولی در هر ۳۰ سطح (همهٔ مسیرها) باز می‌شود.</p>
    ${byline()}`;
}

/* ---------- detail ---------- */

function levelRow(l, recIdx) {
  const isRec = l.idx === recIdx;
  const stateTxt = l.done ? 'قبول‌شده' : (isRec ? 'اینجایی' : (l.unlocked ? 'باز' : 'قفل'));
  const icon = l.done ? 'ph-check' : (l.unlocked ? 'ph-circle' : 'ph-lock-simple');
  return `
    <li>
      <button type="button" class="td-lv${l.done ? ' done' : ''}${l.unlocked ? '' : ' lock'}${isRec ? ' td-here' : ''}"
              data-idx="${l.idx}" aria-label="سطح ${FA(l.id)}: ${l.level.title} — ${stateTxt}">
        <span class="td-lv-dot"><i class="ph-bold ${icon}" aria-hidden="true"></i></span>
        <span class="td-lv-main">
          <span class="td-lv-n">سطح ${FA(String(l.id).padStart(2, '0'))}</span>
          <span class="td-lv-t">${l.level.title}</span>
        </span>
        <span class="td-lv-state">${stateTxt}</span>
      </button>
    </li>`;
}

function actionBlock(track, st) {
  if (st.complete) return '';
  if (st.nextUnlocked) {
    const label = st.started ? 'ادامهٔ مسیر' : 'شروع مسیر';
    return `<button type="button" class="btn btn-primary td-action" id="tdAction" data-idx="${st.nextUnlocked.idx}">
      <i class="ph-bold ph-play" aria-hidden="true"></i>${label} — سطح ${FA(st.nextUnlocked.id)}: ${st.nextUnlocked.level.title}</button>`;
  }
  // some/none done, but the next level in this track is still locked by the course order
  const title = st.started ? 'سطح‌های بعدی این مسیر هنوز باز نشده‌اند' : 'هنوز به سطح‌های این مسیر نرسیده‌ای';
  const body = st.started
    ? 'بخشی از این مسیر را رفته‌ای. سطح‌های باقی‌مانده با ادامهٔ ترتیب دوره باز می‌شوند.'
    : 'این مسیر در ادامهٔ دوره باز می‌شود. اول در مبانی پیش برو؛ سطح‌های این مسیر با ترتیب دوره باز می‌شوند.';
  return `<div class="td-gate">
    <i class="ph-fill ph-lock-simple" aria-hidden="true"></i>
    <div>
      <b>${title}</b>
      <p>${body}</p>
    </div>
    <button type="button" class="btn btn-ghost td-action" id="tdAction" data-idx="${firstOpen()}"><i class="ph-bold ph-arrow-left" aria-hidden="true"></i>ادامه از سطح باز فعلی</button>
  </div>`;
}

function completionBlock(track) {
  const nextNames = track.recommendedNextTrackIds.map(id => TRACK_BY_ID[id]).filter(Boolean);
  const next = nextNames.length
    ? `<p>مسیر پیشنهادی بعدی: ${nextNames.map(t => `<a href="#/track-${t.id}">${t.shortTitle}</a>`).join(' · ')}</p>`
    : '<p>همهٔ مسیرها را پوشش دادی. اگر هر ۳۰ سطح را قبول شده‌ای، نشان فتح مسیر آماده است.</p>';
  return `<div class="td-done">
    <i class="ph-fill ph-check-circle" aria-hidden="true"></i>
    <div><b>${track.completionMessage}</b>${next}</div>
  </div>`;
}

function detail(track) {
  document.documentElement.style.setProperty('--pc', 'var(--p1)');
  $('#crumbTitle').textContent = `مسیر ${track.shortTitle}`;
  const st = trackStats(track);
  const recIdx = st.nextUnlocked ? st.nextUnlocked.idx : -1;
  const prereqNames = track.prerequisiteTrackIds.map(id => TRACK_BY_ID[id] && TRACK_BY_ID[id].shortTitle).filter(Boolean);
  $('#root').innerHTML = `
    <a class="track-back" href="#/tracks"><i class="ph-bold ph-arrow-right" aria-hidden="true"></i>همهٔ مسیرها</a>
    <div class="track-detail-head">
      <span class="td-ic"><i class="ph-fill ${track.icon}" aria-hidden="true"></i></span>
      <div>
        <h2>${track.shortTitle}</h2>
        <p class="td-en" dir="ltr">${track.title}</p>
      </div>
    </div>
    <div class="td-tags">
      <span class="td-tag ${track.kind === 'required' ? 't-req' : 't-opt'}">${statusLabel(track)}</span>
      <span class="td-tag">سختی: ${track.difficulty}</span>
      <span class="td-tag">${FA(st.total)} سطح</span>
    </div>
    <p class="td-desc">${track.description}</p>
    <p class="td-aud"><i class="ph ph-user-focus" aria-hidden="true"></i>${track.audience}</p>
    ${prereqNames.length ? `<p class="td-prereq"><i class="ph ph-path" aria-hidden="true"></i>پیش‌نیاز: مسیر ${prereqNames.join(' و ')} را اول پیش ببر.</p>` : ''}
    <div class="td-prog">
      <div class="td-prog-row"><b>پیشرفت مسیر</b><span>${FA(st.passed)} از ${FA(st.total)} سطح · ${FA(st.pct)}٪</span></div>
      <div class="td-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${st.pct}" aria-label="پیشرفت مسیر ${track.shortTitle}"><i style="width:${st.pct}%"></i></div>
    </div>
    ${actionBlock(track, st)}
    <h3 class="td-lv-h">سطح‌های این مسیر</h3>
    <ol class="td-levels">
      ${st.levels.map(l => levelRow(l, recIdx)).join('')}
    </ol>
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
