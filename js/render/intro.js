import { state, passedCount, firstOpen, totalMinutes, totalXP, maxXP, rankOf } from '../state.js';
import { LEVELS, PHASES } from '../course.js';
import { XP_PASS, XP_PERFECT, PHASE_IC, SITE, LINKEDIN, AVATAR_SRC } from '../config.js';
import { BADGES, earned } from '../../data/badges.js';
import { $, FA } from '../dom.js';
import { authorCard as authorCardFn } from '../ui.js';
import { ctx } from '../ctx.js';

const authorCard = () => authorCardFn(AVATAR_SRC, SITE, LINKEDIN);

export function renderIntro() {
  window.scrollTo({ top: 0, behavior: 'auto' });
  document.documentElement.style.setProperty('--pc', 'var(--p1)');
  $('#crumbTitle').textContent = 'معرفی دوره';
  const n = passedCount();
  $('#root').innerHTML = `
    <div class="hero">
      <span class="hero-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="7" cy="6" r="2.3"/><circle cx="7" cy="18" r="2.3"/><circle cx="17" cy="12" r="2.3"/>
          <path d="M7 8.3v7.4M7 12h5.6a2.1 2.1 0 0 0 2.1-2.1V9"/>
        </svg>دورهٔ آموزشی گام‌به‌گام</span>
      <h2>Git برای Product Designer و Design Technologist</h2>
      <p class="lead">از «Commit یعنی چه؟» تا نسخه‌بندی Design System و بررسی کدی که هوش مصنوعی نوشته. هر مفهوم با زبان ساده، مثال واقعی طراحی و یک آزمون کوتاه که تا قبولی در آن، سطح بعدی باز نمی‌شود.</p>
    </div>
    <div class="stats">
      <div class="stat"><i class="ph-duotone ph-stack"></i><b>${FA(LEVELS.length)}</b><span>سطح آموزشی</span></div>
      <div class="stat"><i class="ph-duotone ph-seal-question"></i><b>${FA(LEVELS.reduce((a, l) => a + l.quiz.length, 0))}</b><span>سؤال آزمون</span></div>
      <div class="stat"><i class="ph-duotone ph-lightning"></i><b>${FA(maxXP())}</b><span>امتیاز قابل کسب</span></div>
      <div class="stat"><i class="ph-duotone ph-clock"></i><b>${FA(totalMinutes())}</b><span>دقیقه مطالعه (تقریبی)</span></div>
    </div>

    <h3 style="font-size:19px;font-weight:800;margin:26px 0 12px">دوره چطور کار می‌کند؟</h3>
    <div class="steps">
      <div class="step"><span class="n"><i class="ph-bold ph-book-open"></i></span><div><b>۱. سطح را بخوان</b><p>هر سطح یک موضوع کامل است: توضیح روان، مثال طراحی و دستورهای واقعی Git با قابلیت کپی.</p></div></div>
      <div class="step"><span class="n"><i class="ph-bold ph-exam"></i></span><div><b>۲. آزمون بده</b><p>در پایان هر سطح چند سؤال چهارگزینه‌ای. پاسخ درست، پاسخ تو و دلیلش بعد از بررسی نمایش داده می‌شود.</p></div></div>
      <div class="step"><span class="n"><i class="ph-bold ph-lock-simple-open"></i></span><div><b>۳. سطح بعد باز می‌شود</b><p>با کسب حداقل ۷۰٪ نمره، قفل سطح بعدی باز می‌شود. اگر قبول نشوی، توضیح‌ها را می‌خوانی و دوباره امتحان می‌کنی.</p></div></div>
      <div class="step"><span class="n"><i class="ph-bold ph-certificate"></i></span><div><b>۴. گواهی بگیر</b><p>با قبولی در هر ۳۰ سطح، گواهی پایان دوره به نام تو صادر و قابل چاپ یا ذخیره به‌صورت PDF می‌شود.</p></div></div>
    </div>

    <h3 style="font-size:19px;font-weight:800;margin:28px 0 2px">نشان‌ها</h3>
    <p class="sub" style="font-size:13.5px;margin:0 0 4px">${FA(earned().length)} از ${FA(BADGES.length)} نشان باز شده · هر سطح ${FA(XP_PASS)} امتیاز و نمرهٔ کامل ${FA(XP_PERFECT)} امتیاز اضافه دارد.</p>
    <div class="badges">
      ${BADGES.map(b => { const ok = earned().some(x => x.id === b.id); return `
        <div class="badge${ok ? '' : ' off'}">
          <i class="ph-${ok ? 'fill' : 'bold'} ${ok ? b.ic : 'ph-lock-simple'}"></i>
          <div><b>${b.t}</b><span>${b.d}</span></div>
        </div>`; }).join('')}
    </div>

    <div class="namebox">
      <label for="nameIn"><i class="ph-fill ph-user-circle"></i>نام تو (روی گواهی چاپ می‌شود)</label>
      <p>هر وقت خواستی می‌توانی تغییرش بدهی؛ روی صفحهٔ گواهی هم قابل ویرایش است.</p>
      <input id="nameIn" type="text" placeholder="مثلاً: سارا احمدی" value="${state.learner.replace(/"/g, '&quot;')}">
    </div>

    <h3 style="font-size:19px;font-weight:800;margin:26px 0 4px">مسیر یادگیری</h3>
    <div class="phase-cards">
      ${PHASES.map((p, i) => `<div class="phase-card" style="--pc:${p.color}">
        <i class="ph-fill ${PHASE_IC[i]}"></i><span>${p.name}</span>
        <em>${String(p.from).padStart(2, '0')}–${String(p.to).padStart(2, '0')}</em></div>`).join('')}
    </div>

    <div class="quiz-actions" style="border:none;margin-top:26px">
      <button class="btn btn-primary" id="startBtn">
        <i class="ph-bold ph-play"></i>${n ? `ادامهٔ دوره از سطح ${FA(LEVELS[firstOpen()].id)}` : 'شروع دوره از سطح ۱'}
      </button>
      <button class="btn btn-ghost" id="glBtn"><i class="ph ph-book-bookmark"></i>واژه‌نامهٔ Git</button>
      ${n ? `<span class="streak"><i class="ph-fill ph-lightning"></i>${FA(totalXP())} XP · رتبهٔ ${rankOf(totalXP()).t}</span>` : ''}
    </div>
    ${authorCard()}`;

  $('#nameIn').addEventListener('input', e => { state.learner = e.target.value; ctx.save(); });
  $('#startBtn').addEventListener('click', () => ctx.go(firstOpen()));
  $('#glBtn').addEventListener('click', () => { state.view = 'glossary'; ctx.render(); ctx.save(); });
}
