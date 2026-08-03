import { state, phaseIndex, firstOpen, isUnlocked, passedCount, totalXP, maxXP, rankOf, allPassed } from './state.js';
import { LEVELS, PHASES } from './course.js';
import { PHASE_IC } from './config.js';
import { earned } from './content.js';
import { $, FA } from './dom.js';
import { ctx } from './ctx.js';
import { t, tf } from './i18n.js';

export function defaultOpenPhase() {
  const idx = state.view === 'lesson' ? state.current : firstOpen();
  return phaseIndex(LEVELS[idx].id);
}

const TEXT = {};
export function levelText(l) {
  if (!TEXT[l.id]) TEXT[l.id] = (l.title + ' ' + l.subtitle + ' ' + l.branch + ' ' +
    l.body.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
  return TEXT[l.id];
}

export function snippet(text, q) {
  const i = text.indexOf(q);
  if (i < 0) return '';
  const from = Math.max(0, i - 40), to = Math.min(text.length, i + q.length + 60);
  const esc = t => t.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  return (from ? '…' : '') + esc(text.slice(from, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' +
    esc(text.slice(i + q.length, to)) + (to < text.length ? '…' : '');
}

export function buildNav(filter = '') {
  const nav = $('#navList');
  const keepScroll = nav.scrollTop;
  const q = filter.trim();
  if (state.openPhases === null) state.openPhases = new Set([defaultOpenPhase()]);
  if (state.view === 'lesson') state.openPhases.add(phaseIndex(LEVELS[state.current].id));
  nav.innerHTML = '';

  if (!q) {
    const intro = document.createElement('button');
    intro.className = 'nav-item nav-special' + (state.view === 'intro' ? ' active' : '');
    intro.dataset.nav = 'intro';
    intro.style.setProperty('--pc', 'var(--p1)');
    intro.innerHTML = `<span class="nav-lb"><i class="ph ph-house"></i><span>${t('nav.intro')}</span></span>`;
    intro.addEventListener('click', () => { state.view = 'intro'; ctx.render(); ctx.closeMenu(); ctx.save(); });
    nav.appendChild(intro);

    const tr = document.createElement('button');
    tr.className = 'nav-item nav-special' + (state.view === 'tracks' || state.view === 'track' ? ' active' : '');
    tr.dataset.nav = 'tracks';
    tr.style.setProperty('--pc', 'var(--p2)');
    tr.innerHTML = `<span class="nav-lb"><i class="ph ph-path"></i><span>${t('nav.tracks')}</span></span>`;
    tr.addEventListener('click', () => { state.view = 'tracks'; state.track = null; ctx.render(); ctx.closeMenu(); ctx.save(); });
    nav.appendChild(tr);

    const ms = document.createElement('button');
    ms.className = 'nav-item nav-special' + (state.view === 'missions' || state.view === 'mission' ? ' active' : '');
    ms.dataset.nav = 'missions';
    ms.style.setProperty('--pc', 'var(--p3)');
    ms.innerHTML = `<span class="nav-lb"><i class="ph ph-flag-checkered"></i><span>${t('nav.missions')}</span></span>`;
    ms.addEventListener('click', () => { state.view = 'missions'; state.mission = null; ctx.render(); ctx.closeMenu(); ctx.save(); });
    nav.appendChild(ms);
  }

  let hits = 0;
  PHASES.forEach((ph, pi) => {
    const items = LEVELS.filter(l => l.id >= ph.from && l.id <= ph.to &&
      (!q || levelText(l).includes(q)));
    if (!items.length) return;
    hits += items.length;
    const total = LEVELS.filter(l => l.id >= ph.from && l.id <= ph.to).length;
    const passed = LEVELS.filter(l => l.id >= ph.from && l.id <= ph.to && state.done[l.id]).length;
    const open = q ? true : state.openPhases.has(pi);

    const grp = document.createElement('section');
    grp.className = 'grp' + (open ? ' open' : '') + (passed === total ? ' done-all' : '');
    grp.style.setProperty('--pc', ph.color);
    const head = document.createElement('button');
    head.className = 'phase';
    head.type = 'button';
    head.innerHTML = `<i class="ph-fill ${PHASE_IC[pi]}"></i>
      <span class="grp-name">${ph.name}</span>
      <span class="grp-meta">${FA(passed)}/${FA(total)}</span>
      <i class="ph-bold ph-caret-down chev-p"></i>`;
    head.addEventListener('click', () => {
      grp.classList.toggle('open');
      if (grp.classList.contains('open')) state.openPhases.add(pi); else state.openPhases.delete(pi);
    });
    grp.appendChild(head);

    const bodyEl = document.createElement('div');
    bodyEl.className = 'grp-body';
    items.forEach((l, i) => {
      const idx = LEVELS.indexOf(l), unlocked = isUnlocked(idx);
      const isCurrent = state.view === 'lesson' && idx === state.current;
      const isNext = !state.done[l.id] && unlocked && idx === firstOpen();
      const b = document.createElement('button');
      b.className = 'nav-item' + (state.done[l.id] ? ' done' : '') + (unlocked ? '' : ' lock') + (isCurrent ? ' active' : '');
      b.dataset.id = l.id;
      b.style.setProperty('--pc', ph.color);
      b.innerHTML = `<span class="gcol">
          <span class="gline ${i === 0 ? 'off' : ''}"></span>
          <span class="gdot"><i class="ph-bold ph-check"></i></span>
          <span class="gline ${i === items.length - 1 ? 'off' : ''}"></span>
        </span>
        <span class="nav-lb">
          <span><span class="nav-n">${tf('level.n', FA(String(l.id).padStart(2, '0')))}</span>${l.title}
          ${q ? `<span class="hit-snip">${snippet(levelText(l), q)}</span>` : ''}</span>
          ${isNext && !isCurrent && !q ? `<span class="here"><b></b>${t('state.here')}</span>` : ''}
          ${unlocked ? '' : '<i class="ph-fill ph-lock-simple lk"></i>'}
        </span>`;
      b.addEventListener('click', () => {
        if (!unlocked) {
          ctx.toast(t('lock.prevQuiz'), 'ph-lock-simple',
            { label: t('lock.goOpen'), fn: () => { ctx.go(firstOpen()); ctx.closeMenu(); } });
          return;
        }
        ctx.go(idx); ctx.closeMenu();
      });
      bodyEl.appendChild(b);
    });
    grp.appendChild(bodyEl);
    nav.appendChild(grp);
  });

  if (q) {
    const m = document.createElement('div');
    m.className = 'search-mode';
    m.innerHTML = `<i class="ph ph-text-aa"></i>${tf('nav.searchMode', FA(hits))}`;
    nav.insertBefore(m, nav.firstChild);
  }
  if (q && !hits) {
    const e = document.createElement('div');
    e.className = 'no-hit';
    e.innerHTML = `<i class="ph ph-magnifying-glass" style="font-size:20px;display:block;margin-bottom:6px"></i>${t('nav.noHit')}`;
    nav.appendChild(e);
  }

  if (!q) {
    const g = document.createElement('button');
    g.className = 'nav-item nav-special' + (state.view === 'glossary' ? ' active' : '');
    g.dataset.nav = 'glossary';
    g.style.setProperty('--pc', 'var(--p3)');
    g.innerHTML = `<span class="nav-lb"><i class="ph ph-book-bookmark"></i><span>${t('nav.glossary')}</span></span>`;
    g.addEventListener('click', () => { state.view = 'glossary'; ctx.render(); ctx.closeMenu(); ctx.save(); });
    nav.appendChild(g);

    const c = document.createElement('button');
    const ok = allPassed();
    c.className = 'nav-item nav-special' + (state.view === 'cert' ? ' active' : '') + (ok ? '' : ' lock');
    c.dataset.nav = 'cert'; // internal view id kept for stored state / #/certificate
    c.style.setProperty('--pc', 'var(--p4)');
    c.innerHTML = `<span class="nav-lb"><i class="ph-fill ph-trophy" aria-hidden="true"></i><span>${t('nav.achievement')}</span>
      ${ok ? '' : '<i class="ph-fill ph-lock-simple lk" aria-hidden="true"></i>'}</span>`;
    c.addEventListener('click', () => { state.view = 'cert'; ctx.render(); ctx.closeMenu(); ctx.save(); });
    nav.appendChild(c);
  }

  nav.scrollTop = keepScroll;          // never yank the list back to the top
  $('#clearS').classList.toggle('show', !!q);
  syncNav();
  requestAnimationFrame(() => { revealActive(); fades(); });
}

export function revealActive() {
  const nav = $('#navList');
  const el = nav.querySelector('.nav-item.active');
  if (!el) return;
  const r = el.getBoundingClientRect(), n = nav.getBoundingClientRect();
  if (r.top < n.top + 44 || r.bottom > n.bottom - 8) {
    nav.scrollTop += (r.top - n.top) - n.height / 2 + r.height / 2;
  }
}

export function fades() {
  const nav = $('#navList');
  const more = nav.scrollHeight - nav.clientHeight;
  $('#fadeTop').classList.toggle('show', nav.scrollTop > 6);
  $('#fadeBot').classList.toggle('show', more > 6 && nav.scrollTop < more - 6);
}

export function syncNav() {
  document.querySelectorAll('.nav-item[data-id]').forEach(el => {
    el.classList.toggle('active', state.view === 'lesson' && LEVELS[state.current].id === +el.dataset.id);
  });
  document.querySelectorAll('.nav-special').forEach(el => {
    const kind = el.dataset.nav || 'intro';
    el.classList.toggle('active', state.view === kind || (kind === 'tracks' && state.view === 'track') || (kind === 'missions' && state.view === 'mission'));
  });
  const n = passedCount(), xp = totalXP();
  $('#progTxt').textContent = tf('nav.progTxt', FA(n), FA(LEVELS.length), FA(earned().length));
  $('#xpTxt').textContent = `${FA(xp)} XP`;
  $('#xpBar').style.width = (xp / maxXP() * 100) + '%';
  $('#rankTxt').textContent = rankOf(xp).t;
}

export function focusMain() {
  const r = $('#root');
  if (r) { r.setAttribute('tabindex', '-1'); r.focus({ preventScroll: true }); }
}

export function go(i) {
  if (i < 0 || i >= LEVELS.length) return;
  if (!isUnlocked(i)) {
    ctx.toast(t('lock.levelLockedGo'), 'ph-lock-simple',
      { label: t('lock.goOpen'), fn: () => go(firstOpen()) });
    return;
  }
  state.current = i; state.view = 'lesson';
  ctx.render(); ctx.save();
  window.scrollTo({ top: 0, behavior: 'auto' });
  focusMain();
}

export function updateMob() {
  const lesson = state.view === 'lesson';
  $('#mPrev').disabled = !(lesson && state.current > 0);
  const canNext = lesson && state.current < LEVELS.length - 1 && isUnlocked(state.current + 1);
  $('#mNext').disabled = !canNext;
  $('#mNext').innerHTML = canNext ? '<i class="ph-bold ph-arrow-left"></i>' : '<i class="ph-fill ph-lock-simple"></i>';
  updateMidBtn();
  const n = passedCount();
  $('#lvlPill').innerHTML = `<i class="ph-fill ph-lightning"></i><b>${FA(totalXP())} XP</b>`;
}

export function updateMidBtn() {
  const mid = $('#mMid');
  if (state.view !== 'lesson') {
    mid.disabled = state.view === 'cert' && !allPassed();
    mid.innerHTML = state.view === 'cert'
      ? `<i class="ph-bold ph-printer" aria-hidden="true"></i><span>${t('ach.print')}</span>`
      : `<i class="ph-bold ph-play" aria-hidden="true"></i><span>${t('mid.start')}</span>`;
    mid.dataset.act = state.view === 'cert' ? 'print' : 'start';
    return;
  }
  const l = LEVELS[state.current];
  const quiz = $('#quiz');
  const inQuiz = quiz && quiz.getBoundingClientRect().top < window.innerHeight * 0.65;
  if (state.checked) {
    if (state.done[l.id] && state.current < LEVELS.length - 1) {
      mid.disabled = false; mid.dataset.act = 'next';
      mid.innerHTML = `<i class="ph-bold ph-arrow-left"></i><span>${t('mid.next')}</span>`;
    } else if (state.done[l.id] && allPassed()) {
      mid.disabled = false; mid.dataset.act = 'cert';
      mid.innerHTML = `<i class="ph-fill ph-trophy" aria-hidden="true"></i><span>${t('ach.view')}</span>`;
    } else {
      mid.disabled = false; mid.dataset.act = 'retry';
      mid.innerHTML = `<i class="ph-bold ph-arrow-counter-clockwise"></i><span>${t('mid.retry')}</span>`;
    }
  } else if (inQuiz) {
    const answered = Object.keys(state.picks).length;
    mid.disabled = false;
    mid.dataset.act = 'check';
    mid.innerHTML = `<i class="ph-bold ph-check-square-offset"></i><span>${tf('quiz.checkCount', FA(answered), FA(l.quiz.length))}</span>`;
  } else {
    mid.disabled = false; mid.dataset.act = 'toquiz';
    mid.innerHTML = `<i class="ph-bold ph-exam"></i><span>${t('mid.toquiz')}</span>`;
  }
}

export function closeMenu() {
  $('#rail').classList.remove('open'); $('#overlay').classList.remove('show');
  document.body.classList.remove('no-scroll');
}

export function toggleMenu() {
  const open = !$('#rail').classList.contains('open');
  $('#rail').classList.toggle('open', open);
  $('#overlay').classList.toggle('show', open);
  document.body.classList.toggle('no-scroll', open && window.matchMedia('(max-width:940px)').matches);
  if (open) requestAnimationFrame(() => { revealActive(); fades(); });
}
