import { state, levelMinutes, phaseOf, phaseIndex, allPassed } from '../state.js';
import { LEVELS } from '../course.js';
import { trackOfLevel } from '../../data/tracks.js';
import { MISSIONS } from '../../data/missions.js';
import { PASS_RATIO, KEYS, XP_PASS, XP_PERFECT, PHASE_IC, SITE, LINKEDIN } from '../config.js';
import { $, FA } from '../dom.js';
import { byline as bylineFn } from '../ui.js';
import { ctx } from '../ctx.js';
import { placeSim } from '../simulator.js';

const byline = () => bylineFn(SITE, LINKEDIN);

export function renderLesson() {
  const l = LEVELS[state.current], ph = phaseOf(l.id), pi = phaseIndex(l.id);
  const trk = trackOfLevel(l.id);
  const practice = MISSIONS.find(m => m.levelIds.includes(l.id)) || null;
  const need = Math.ceil(l.quiz.length * PASS_RATIO);
  const mins = levelMinutes(l);
  document.documentElement.style.setProperty('--pc', ph.color);
  $('#crumbTitle').textContent = `سطح ${FA(l.id)} · ${l.title}`;
  const draft = state.drafts[l.id];
  state.attempt = (draft && draft.attempt) || ctx.newAttempt(l);
  state.picks = (draft && draft.picks) ? { ...draft.picks } : {};
  state.checked = false;

  $('#root').innerHTML = `
    <div class="step-meter">
      <span class="sm-txt">سطح <b>${FA(l.id)}</b> از ${FA(LEVELS.length)}</span>
      <span class="sm-bar"><i style="width:${(l.id / LEVELS.length * 100).toFixed(1)}%"></i></span>
      <span class="sm-phase"><i class="ph-fill ${PHASE_IC[pi]}" aria-hidden="true"></i> ${ph.name.split('·')[0].trim()}</span>
    </div>
    <h2 class="title">${l.title}</h2>
    <p class="sub">${l.subtitle}</p>
    <div class="meta">
      <span class="mono" style="direction:ltr"><i class="ph ph-git-branch"></i>${l.branch}</span>
      <span><i class="ph ph-clock"></i>حدود ${FA(mins)} دقیقه مطالعه</span>
      <span><i class="ph ph-seal-question"></i>${FA(l.quiz.length)} سؤال آزمون</span>
      <span><i class="ph ph-target"></i>حد نصاب: ${FA(need)} پاسخ درست</span>
      ${state.done[l.id] ? `<span style="font-weight:700"><i class="ph-fill ph-check-circle"></i>قبول‌شده · ${FA(XP_PASS + (state.done[l.id].perfect ? XP_PERFECT : 0))} XP${state.done[l.id].perfect ? ' · نمرهٔ کامل' : ''}</span>` : `<span><i class="ph ph-lightning"></i>تا ${FA(XP_PASS + XP_PERFECT)} امتیاز</span>`}
      ${trk ? `<a class="meta-track" href="#/track-${trk.id}"><i class="ph ph-path"></i>بخشی از مسیر ${trk.shortTitle}</a>` : ''}
    </div>
    <div class="rule"></div>
    ${(state.mistakes[l.id] && state.mistakes[l.id].length) ? `
      <div class="review">
        <b><i class="ph-fill ph-warning-circle"></i>در تلاش قبلی این‌ها را اشتباه زدی</b>
        <ol>${state.mistakes[l.id].map(m => `<li>${m}</li>`).join('')}</ol>
        <button class="go" id="goQuiz">رفتن به آزمون<i class="ph-bold ph-arrow-left"></i></button>
      </div>` : ''}
    <div class="body">${l.body}</div>

    <section class="quiz" id="quiz">
      <div class="quiz-top">
        <span class="quiz-ic"><i class="ph-duotone ph-exam"></i></span>
        <div>
          <h3>آزمون سطح ${FA(l.id)}</h3>
          <p class="quiz-sub">${FA(l.quiz.length)} سؤال · برای باز شدن سطح بعد ${FA(need)} پاسخ درست لازم است.</p>
        </div>
        <span class="qcount" id="qcount">${FA(0)}/${FA(l.quiz.length)}</span>
      </div>
      ${state.attempt.map((a, qi) => { const q = l.quiz[a.i]; return `
        <div class="q-item" data-q="${qi}" role="group" aria-labelledby="qt-${qi}">
          <div class="q-text" id="qt-${qi}"><i>${FA(String(qi + 1).padStart(2, '0'))}</i><span>${q.q}</span></div>
          ${a.opts.map((src, oi) => `
            <label class="opt${state.picks[qi] === oi ? ' sel' : ''}" data-q="${qi}" data-o="${oi}">
              <input type="radio" name="q-${qi}" value="${oi}"${state.picks[qi] === oi ? ' checked' : ''}>
              <span class="opt-key" aria-hidden="true">${KEYS[oi]}</span>
              <span class="opt-text">${q.o[src]}</span>
              <span class="opt-mark" aria-hidden="true"></span>
            </label>`).join('')}
          <div class="q-why" data-why="${qi}"></div>
        </div>`; }).join('')}
      <div class="quiz-actions">
        <button class="btn btn-primary" id="checkBtn"><i class="ph-bold ph-check-square-offset"></i>بررسی پاسخ‌ها</button>
        <span class="ans-count" id="ansCount"></span>
        <button class="btn btn-ghost" id="retryBtn"><i class="ph ph-arrow-counter-clockwise"></i>پاک‌کردن پاسخ‌ها</button>
        <span class="result" id="result" role="status" aria-live="polite"></span>
      </div>
    </section>

    <div class="gate ${state.done[l.id] ? 'open' : ''}" id="gate">
      <i class="ph-fill ${state.done[l.id] ? 'ph-lock-simple-open' : 'ph-lock-simple'}"></i>
      <span>${state.done[l.id]
        ? (state.current < LEVELS.length - 1 ? 'قفل سطح بعدی باز است. هر وقت آماده بودی ادامه بده.' : 'آخرین سطح را هم قبول شدی؛ نشان فتح مسیر آماده است.')
        : 'سطح بعدی قفل است. برای باز شدن آن، در آزمون بالا قبول شو.'}</span>
    </div>

    ${practice ? `<div class="lesson-practice">
      <i class="ph-fill ph-flag-checkered lp-ic" aria-hidden="true"></i>
      <div class="lp-txt"><b>تمرین این مهارت</b><span>مأموریت عملی «${practice.title}» — اختیاری و بدون اثر روی امتیاز.</span></div>
      <a class="btn btn-ghost" href="#/mission-${practice.id}"><i class="ph-bold ph-play" aria-hidden="true"></i>شروع تمرین</a>
    </div>` : ''}
    <div class="lesson-nav">
      ${state.current > 0
        ? `<button class="nav-card" id="prevCard"><span class="ic"><i class="ph-bold ph-arrow-right"></i></span><span><em>سطح ${FA(LEVELS[state.current-1].id)}</em><b>${LEVELS[state.current-1].title}</b></span></button>`
        : '<span></span>'}
      ${state.current < LEVELS.length - 1
        ? `<button class="nav-card next" id="nextCard" ${state.done[l.id] ? '' : 'disabled'}>
             <span class="ic"><i class="ph-bold ${state.done[l.id] ? 'ph-arrow-left' : 'ph-lock-simple'}"></i></span>
             <span><em>سطح ${FA(LEVELS[state.current+1].id)}</em><b>${LEVELS[state.current+1].title}</b></span></button>`
        : `<button class="nav-card next" id="certCard" ${allPassed() ? '' : 'disabled'}>
             <span class="ic"><i class="ph-fill ${allPassed() ? 'ph-trophy' : 'ph-lock-simple'}"></i></span>
             <span><em>پایان دوره</em><b>مشاهده نشان مسیر</b></span></button>`}
    </div>
    ${byline()}`;

  const selectOpt = opt => {
    if (state.checked || !opt) return;
    const qi = +opt.dataset.q;
    state.picks[qi] = +opt.dataset.o;
    state.drafts[l.id] = { attempt: state.attempt, picks: { ...state.picks } };
    document.querySelectorAll(`.opt[data-q="${qi}"]`).forEach(o => o.classList.remove('sel'));
    opt.classList.add('sel');
    const inp = opt.querySelector('input'); if (inp) inp.checked = true;
    const item = opt.closest('.q-item'); if (item) item.classList.remove('need');
    ctx.refreshCount();
  };
  $('#root').querySelectorAll('.opt').forEach(opt => {
    opt.addEventListener('click', () => selectOpt(opt));
    const inp = opt.querySelector('input');
    if (inp) inp.addEventListener('change', () => selectOpt(opt));
  });
  ctx.refreshCount();
  $('#checkBtn').addEventListener('click', ctx.checkQuiz);
  const gq = $('#goQuiz'); if (gq) gq.addEventListener('click', () => $('#quiz').scrollIntoView({ behavior: 'smooth', block: 'start' }));
  $('#retryBtn').addEventListener('click', () => { delete state.drafts[l.id]; renderLesson(); });
  const p = $('#prevCard'), nx = $('#nextCard'), cc = $('#certCard');
  if (p) p.addEventListener('click', () => ctx.go(state.current - 1));
  if (nx) nx.addEventListener('click', () => ctx.go(state.current + 1));
  if (cc) cc.addEventListener('click', () => { state.view = 'cert'; ctx.render(); ctx.save(); });

  enhance();
  ctx.syncNav();
}

export function enhance() {
  const ICON = { tip: 'ph-lightbulb', warn: 'ph-warning', note: 'ph-info' };
  // wide tables get their own scroll area so they never break the layout on phones
  $('#root').querySelectorAll('.body table').forEach(t => {
    if (t.parentNode.classList.contains('tbl-scroll')) return;
    const w = document.createElement('div');
    w.className = 'tbl-scroll';
    t.parentNode.insertBefore(w, t); w.appendChild(t);
  });
  $('#root').querySelectorAll('.callout').forEach(c => {
    const kind = c.classList.contains('tip') ? 'tip' : c.classList.contains('warn') ? 'warn' : 'note';
    const t = c.querySelector('.co-title');
    if (t && !t.querySelector('i')) t.insertAdjacentHTML('afterbegin', `<i class="ph-fill ${ICON[kind]}"></i>`);
  });
  $('#root').querySelectorAll('.example .ex-title').forEach(t => {
    if (!t.querySelector('i')) t.insertAdjacentHTML('afterbegin', '<i class="ph-fill ph-cursor-click"></i>');
  });
  buildToc();
  placeSim();
  $('#root').querySelectorAll('pre').forEach(pre => {
    const wrap = document.createElement('div');
    wrap.className = 'code-wrap';
    pre.parentNode.insertBefore(wrap, pre); wrap.appendChild(pre);
    const btn = document.createElement('button');
    btn.className = 'copy';
    btn.innerHTML = '<i class="ph ph-copy"></i>کپی';
    btn.addEventListener('click', async () => {
      const clone = pre.cloneNode(true);
      clone.querySelectorAll('.c').forEach(x => x.remove());   // drop the Persian side-comments
      const text = clone.innerText.split('\n').map(x => x.replace(/\s+$/, '')).filter(x => x.trim()).join('\n');
      try { await navigator.clipboard.writeText(text || pre.innerText); btn.innerHTML = '<i class="ph-bold ph-check"></i>کپی شد'; }
      catch (e) { btn.innerHTML = 'دستی انتخاب کن'; }
      setTimeout(() => btn.innerHTML = '<i class="ph ph-copy"></i>کپی', 1600);
    });
    wrap.appendChild(btn);
  });
}

export function buildToc() {
  const body = $('#root').querySelector('.body');
  if (!body) return;
  const hs = [...body.querySelectorAll('h3')];
  if (hs.length < 3) return;
  hs.forEach((h, i) => h.id = 'sec-' + i);
  const small = window.matchMedia('(max-width:940px)').matches;
  const nav = document.createElement('nav');
  nav.className = 'toc' + (small ? ' collapsed' : '');
  nav.innerHTML = `<button class="toc-h" type="button">
      <i class="ph-fill ph-list-bullets"></i>در این سطح می‌خوانی
      <span class="cnt">${hs.length}</span><i class="ph-bold ph-caret-down chev"></i></button>
    <ol class="toc-list">${hs.map((h, i) =>
      `<li><a href="#sec-${i}"><em>${String(i + 1).padStart(2, '0')}</em>${h.textContent}</a></li>`).join('')}</ol>`;
  body.parentNode.insertBefore(nav, body);
  nav.querySelector('.toc-h').addEventListener('click', () => nav.classList.toggle('collapsed'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (window.matchMedia('(max-width:940px)').matches) nav.classList.add('collapsed');
  }));
}
