import { state, passedCount, allPassed, firstOpen, totalXP, maxXP, rankOf } from '../state.js';
import { LEVELS } from '../course.js';
import { AVATAR_SRC, SITE, LINKEDIN } from '../config.js';
import { BADGES, earned } from '../../data/badges.js';
import { certId } from '../certificate.js';
import { $, FA } from '../dom.js';
import { byline as bylineFn } from '../ui.js';
import { ctx } from '../ctx.js';

const byline = () => bylineFn(SITE, LINKEDIN);
const escapeHtml = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

export function renderCert() {
  window.scrollTo({ top: 0, behavior: 'auto' });
  document.documentElement.style.setProperty('--pc', 'var(--p4)');
  $('#crumbTitle').textContent = 'گواهی پایان دوره';
  const n = passedCount();
  if (!allPassed()) {
    $('#root').innerHTML = `
      <div class="locked-cert">
        <i class="ph-duotone ph-certificate big"></i>
        <h2>گواهی هنوز قفل است</h2>
        <p>گواهی پایان دوره پس از قبولی در آزمون هر ۳۰ سطح صادر می‌شود. تا اینجا ${FA(n)} سطح را کامل کرده‌ای.</p>
        <div class="mini-prog"><i style="width:${n / LEVELS.length * 100}%"></i></div>
        <button class="btn btn-primary" id="contBtn"><i class="ph-bold ph-play"></i>ادامه از سطح ${FA(LEVELS[firstOpen()].id)}</button>
      </div>`;
    $('#contBtn').addEventListener('click', () => ctx.go(firstOpen()));
    ctx.syncNav(); return;
  }
  const today = new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());
  const name = escapeHtml(state.learner.trim() || 'نام شما');
  $('#root').innerHTML = `
    <div class="cert-wrap">
      <div class="cert">
        <div class="cert-in">
          <div class="cert-seal"><i class="ph-duotone ph-seal-check"></i></div>
          <div class="cert-kicker">گواهی پایان دوره</div>
          <h2>گواهی پایان دورهٔ Git برای طراحان</h2>
          <p class="to">این گواهی به افتخار</p>
          <div class="who" id="certName" contenteditable="true" spellcheck="false">${name}</div>
          <p class="desc">صادر می‌شود؛ به‌پاس گذراندن کامل دورهٔ ۳۰ سطحی «Git برای Product Designer و Design Technologist» و قبولی در آزمون تمام سطح‌ها، از مفاهیم پایه و Commit و Branch تا Pull Request، بررسی خروجی AI، نسخه‌بندی Design System و همگام‌سازی Design Tokenها.</p>
          <div class="cert-grid">
            <div class="cert-cell"><em>سطح‌ها</em><b>${FA(LEVELS.length)} از ${FA(LEVELS.length)} سطح</b></div>
            <div class="cert-cell"><em>امتیاز</em><b>${FA(totalXP())} از ${FA(maxXP())} امتیاز · ${rankOf(totalXP()).t}</b></div>
            <div class="cert-cell"><em>تاریخ صدور</em><b>${today}</b></div>
          </div>
          <div class="badge-strip" style="justify-content:center;margin-bottom:6px">
            ${BADGES.map(b => { const ok = earned().some(x => x.id === b.id); return `<span class="mini-badge${ok ? '' : ' off'}" title="${b.t}"><i class="ph-${ok ? 'fill' : 'bold'} ${ok ? b.ic : 'ph-lock-simple'}"></i></span>`; }).join('')}
          </div>
          <div class="cert-foot">
            <div class="sig"><img class="cert-avatar" src="${AVATAR_SRC}" alt="" style="margin-bottom:8px"><div class="name">پریا بهرامی</div><div class="role">تهیه‌کننده و مدرس دوره · paryabahrami.ir</div></div>
            <div class="cert-id">شمارهٔ گواهی: ${certId(state.learner)}<br>paryabahrami.ir</div>
          </div>
        </div>
      </div>
      <div class="cert-actions">
        <button class="btn btn-gold" id="printBtn"><i class="ph-bold ph-printer"></i>چاپ یا ذخیره به PDF</button>
        <button class="btn btn-ghost" id="editName"><i class="ph ph-pencil-simple"></i>ویرایش نام</button>
        <button class="btn btn-ghost" id="backBtn"><i class="ph ph-arrow-right"></i>بازگشت به دوره</button>
      </div>
      ${byline()}
    </div>`;

  const nameEl = $('#certName');
  const commit = () => { state.learner = nameEl.textContent.trim(); ctx.save(); $('.cert-id').innerHTML = `شمارهٔ گواهی: ${certId(state.learner)}<br>paryabahrami.ir`; };
  nameEl.addEventListener('blur', commit);
  nameEl.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); nameEl.blur(); } });
  $('#editName').addEventListener('click', () => { nameEl.focus(); document.getSelection().selectAllChildren(nameEl); });
  $('#printBtn').addEventListener('click', () => { commit(); window.print(); });
  $('#backBtn').addEventListener('click', () => ctx.go(LEVELS.length - 1));
  ctx.syncNav();
}
