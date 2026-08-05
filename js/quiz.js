import { state, totalXP, allPassed } from './state.js';
import { LEVELS } from './course.js';
import { PASS_RATIO } from './config.js';
import { earned } from './content.js';
import { $, FA } from './dom.js';
import { ctx } from './ctx.js';
import { t, tf } from './i18n.js';

export const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

export function newAttempt(l) {
  const order = shuffle(l.quiz.map((_, i) => i));
  return order.map(i => ({ i, opts: shuffle(l.quiz[i].o.map((_, k) => k)) }));
}

export function refreshCount() {
  const l = LEVELS[state.current];
  const n = Object.keys(state.picks).length, total = l.quiz.length;
  const qc = $('#qcount'); if (qc) qc.textContent = `${FA(n)}/${FA(total)}`;
  const ac = $('#ansCount');
  if (ac) {
    ac.className = 'ans-count' + (n === total ? ' full' : '');
    ac.innerHTML = n === total
      ? `<i class="ph-bold ph-check"></i>${tf('quiz.allAnswered', FA(total))}`
      : tf('quiz.answered', FA(n), FA(total));
  }
  ctx.updateMidBtn();
}

export function checkQuiz() {
  const lv = LEVELS[state.current];
  if (!state.checked) {
    const missing = [];
    for (let i = 0; i < lv.quiz.length; i++) if (state.picks[i] === undefined) missing.push(i);
    if (missing.length) {
      document.querySelectorAll('.q-item').forEach(it => it.classList.remove('need'));
      missing.forEach(i => {
        const it = document.querySelector(`.q-item[data-q="${i}"]`);
        if (it) it.classList.add('need');
      });
      const first = document.querySelector(`.q-item[data-q="${missing[0]}"]`);
      ctx.toast(tf('quiz.missing', FA(missing.length)), 'ph-warning-circle');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
  }

  const l = LEVELS[state.current];
  state.checked = true;
  let correct = 0, firstWrong = null;
  const missed = [];
  state.attempt.forEach((a, qi) => {
    const q = l.quiz[a.i];
    const rightPos = a.opts.indexOf(q.a);
    const item = document.querySelector(`.q-item[data-q="${qi}"]`);
    item.querySelectorAll('.opt').forEach((opt, oi) => {
      opt.classList.remove('sel'); opt.classList.add('locked');
      const inp = opt.querySelector('input'); if (inp) inp.disabled = true;
      const mark = opt.querySelector('.opt-mark');
      if (oi === rightPos) { opt.classList.add('ok'); mark.innerHTML = '<i class="ph-fill ph-check-circle"></i>'; }
      else if (state.picks[qi] === oi) { opt.classList.add('no'); mark.innerHTML = '<i class="ph-fill ph-x-circle"></i>'; }
    });
    const why = item.querySelector('.q-why');
    why.innerHTML = `<b>${t('quiz.why')} </b>${q.why}`;
    why.classList.add('show');
    if (state.picks[qi] === rightPos) correct++;
    else { missed.push(q.q.replace(/<[^>]+>/g, '')); if (firstWrong === null) firstWrong = item; }
  });
  state.mistakes[l.id] = missed;
  delete state.drafts[l.id];

  const need = Math.ceil(l.quiz.length * PASS_RATIO);
  const passed = correct >= need;
  state.tries[l.id] = (state.tries[l.id] || 0) + 1;
  const perfect = correct === l.quiz.length && state.tries[l.id] === 1;
  const beforeBadges = earned().map(b => b.id);
  const beforeXP = totalXP();
  if (passed) {
    const prev = state.done[l.id];
    state.done[l.id] = { perfect: perfect || !!(prev && prev.perfect), score: Math.max(correct, prev ? prev.score || 0 : 0) };
  }
  ctx.save();
  const gained = totalXP() - beforeXP;
  const fresh = earned().filter(b => !beforeBadges.includes(b.id));

  const res = $('#result');
  res.className = 'result show ' + (passed ? 'pass' : 'fail');
  res.innerHTML = `<span class="tag"><i class="ph-bold ph-${passed ? 'check' : 'x'}"></i>${FA(correct)}/${FA(l.quiz.length)}</span>` +
    // On a pass the row carries data only — score, XP, perfect bonus. The verdict
    // is already the green tick on the score chip and the gate line below it, and
    // a fourth restatement of "you passed" was most of why this area felt loud.
    // A failure still needs its sentence: the number alone does not say what to do.
    (passed ? '' : tf('quiz.fail', FA(need))) +
    (gained ? `<span class="xp-gain"><i class="ph-fill ph-lightning"></i>+${gained} XP</span>` : '') +
    (perfect && passed ? `<span class="perfect-tag"><i class="ph-fill ph-target"></i>${t('quiz.perfect')}</span>` : '') +
    (state.tries[l.id] > 1 ? `<span class="streak"><i class="ph ph-arrow-counter-clockwise"></i>${tf('quiz.try', FA(state.tries[l.id]))}</span>` : '');
  fresh.forEach((b, i) => setTimeout(() => ctx.toast(tf('quiz.newBadge', b.t), b.ic), 900 + i * 1400));
  // Hidden, not merely disabled: a greyed-out filled button still reads as the
  // heaviest control on the row and competed with the real next action.
  $('#checkBtn').disabled = true;
  $('#checkBtn').hidden = true;
  const ac0 = $('#ansCount'); if (ac0) ac0.style.display = 'none';
  $('#retryBtn').innerHTML = '<i class="ph ph-arrow-counter-clockwise"></i>' + (passed ? t('quiz.redo') : t('mid.retry'));

  const gate = $('#gate');
  const last = state.current === LEVELS.length - 1;
  if (passed) {
    gate.className = 'gate open';
    gate.innerHTML = `<i class="ph-fill ph-lock-simple-open"></i><span>${last && allPassed()
      ? t('quiz.gate.all')
      : t('quiz.gate.next')}</span>`;
    const b = document.createElement('button');
    if (last && allPassed()) {
      b.className = 'btn btn-gold';
      b.innerHTML = `<i class="ph-fill ph-trophy" aria-hidden="true"></i>${t('ach.view')}`;
      b.addEventListener('click', () => { state.view = 'cert'; ctx.render(); ctx.save(); });
    } else if (!last) {
      // Monochrome primary, not the semantic green: this is navigation, and the
      // green is reserved for "your answer was right".
      b.className = 'btn btn-primary';
      b.innerHTML = `${t('quiz.goNext')}<i class="ph-bold ph-arrow-left"></i>`;
      b.addEventListener('click', () => ctx.go(state.current + 1));
    }
    // Insert ahead of the (now hidden) check button so the next action leads.
    if (b.className) $('.quiz-actions').insertBefore(b, $('#checkBtn'));
    // The result row and the gate already announce the pass; a third toast for
    // the same event only dilutes it. New badges still toast — that is new news.
  }
  ctx.buildNav($('#search').value);
  const nx = $('#nextCard'); if (nx && passed) { nx.disabled = false; nx.querySelector('.ic i').className = 'ph-bold ph-arrow-left'; }
  const cc = $('#certCard'); if (cc && allPassed()) { cc.disabled = false; cc.querySelector('.ic i').className = 'ph-fill ph-trophy'; }
  ctx.updateMob();
  (firstWrong || $('#result')).scrollIntoView({ behavior: 'smooth', block: 'center' });
}
