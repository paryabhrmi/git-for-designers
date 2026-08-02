/**
 * Completion view renderer.
 * Internal name "certificate" / renderCert kept for route & module compatibility.
 * User-facing product: نشان فتح مسیر / کارت دستاورد.
 */
import { state, passedCount, allPassed, firstOpen } from '../state.js';
import { LEVELS } from '../course.js';
import { SITE, LINKEDIN } from '../config.js';
import { $, FA } from '../dom.js';
import { byline as bylineFn } from '../ui.js';
import { ctx } from '../ctx.js';
import {
  normalizeAchievement,
  escapeHtml,
  buildShareCaption,
  ACHIEVEMENT_DISCLAIMER,
  ACHIEVEMENT_TITLE,
  ACHIEVEMENT_PAGE,
} from '../achievement.js';
import { canShareFiles, shareAchievement, downloadAchievement, copyShareCaption, openLinkedInUrlShare } from '../achievement-share.js';

const byline = () => bylineFn(SITE, LINKEDIN);

function badgeMarkup(data) {
  if (!data.earnedBadgeCount) {
    return `
      <div class="ach-empty" aria-hidden="false">
        <i class="ph-duotone ph-path" aria-hidden="true"></i>
        هنوز نشانی به‌دست نیاورده‌ای؛ مسیر را کامل کرده‌ای و می‌توانی کارت دستاورد را بسازی.
      </div>`;
  }
  const heroId = data.heroBadge ? data.heroBadge.id : null;
  return data.earnedBadges.map(b => {
    const hero = b.id === heroId;
    return `<span class="ach-badge${hero ? ' hero' : ''}" title="${escapeHtml(b.t)}" role="img" aria-label="${escapeHtml(b.t)}">
      <i class="ph-fill ${b.ic}" aria-hidden="true"></i>
    </span>`;
  }).join('');
}

function currentData() {
  return normalizeAchievement({ learnerName: state.learner });
}

export function renderCert() {
  window.scrollTo({ top: 0, behavior: 'auto' });
  document.documentElement.style.setProperty('--pc', 'var(--p4)');
  $('#crumbTitle').textContent = ACHIEVEMENT_PAGE;
  const n = passedCount();
  if (!allPassed()) {
    $('#root').innerHTML = `
      <div class="locked-cert">
        <i class="ph-duotone ph-trophy big" aria-hidden="true"></i>
        <h2>نشان مسیر هنوز قفل است</h2>
        <p>نشان فتح مسیر پس از قبولی در آزمون هر ۳۰ سطح باز می‌شود. تا اینجا ${FA(n)} سطح را کامل کرده‌ای.</p>
        <div class="mini-prog"><i style="width:${n / LEVELS.length * 100}%"></i></div>
        <button class="btn btn-primary" id="contBtn"><i class="ph-bold ph-play" aria-hidden="true"></i>ادامه از سطح ${FA(LEVELS[firstOpen()].id)}</button>
      </div>`;
    $('#contBtn').addEventListener('click', () => ctx.go(firstOpen()));
    ctx.syncNav();
    return;
  }

  const data = currentData();
  const nameHtml = escapeHtml(data.learnerName);
  const heroName = data.heroBadge ? escapeHtml(data.heroBadge.t) : '';
  const nativeShare = canShareFiles();

  $('#root').innerHTML = `
    <div class="ach-wrap">
      <div class="ach-card ach-theme-${data.themeKey} ach-layout-${data.layoutMode}" id="achCard" data-theme-key="${data.themeKey}">
        <div class="ach-in">
          <div class="ach-kicker"><i class="ph-fill ph-trophy" aria-hidden="true"></i>کارت دستاورد</div>
          <h2 class="ach-title">${ACHIEVEMENT_TITLE}</h2>
          <p class="ach-to">مسیر را کامل کرد</p>
          <div class="ach-who" id="certName" contenteditable="true" spellcheck="false" role="textbox" aria-label="نام روی نشان مسیر">${nameHtml}</div>
          <div class="ach-meta">
            <div class="ach-cell"><em>رتبه</em><b id="achRank">${escapeHtml(data.rank.t)}</b></div>
            <div class="ach-cell"><em>امتیاز</em><b id="achXp">${FA(data.xp)} XP</b></div>
            <div class="ach-cell"><em>سطح‌های کامل‌شده</em><b>${FA(data.completedLevelCount)} از ${FA(data.totalLevelCount)}</b></div>
            <div class="ach-cell"><em>نشان‌ها</em><b id="achBadgeCount">${FA(data.earnedBadgeCount)}</b></div>
          </div>
          <div class="ach-badges" id="achBadges" aria-label="نشان‌های به‌دست‌آمده">
            ${badgeMarkup(data)}
          </div>
          ${heroName ? `<p class="ach-badge-name">نشان برجسته: ${heroName}</p>` : ''}
          ${data.completedAt ? `<p class="ach-badge-name">${escapeHtml(data.completedAt)}</p>` : ''}
          <p class="ach-disclaimer">${ACHIEVEMENT_DISCLAIMER}</p>
          <div class="ach-foot">تهیه‌شده در دورهٔ Git for Designers · پریا بهرامی</div>
        </div>
      </div>

      <div class="ach-actions cert-actions">
        <button type="button" class="btn btn-gold" id="buildCardBtn">
          <i class="ph-bold ph-image" aria-hidden="true"></i>ساخت کارت دستاورد
        </button>
        <button type="button" class="btn btn-primary" id="shareBtn" ${nativeShare ? '' : 'hidden'}>
          <i class="ph-bold ph-share-network" aria-hidden="true"></i>اشتراک‌گذاری
        </button>
        <button type="button" class="btn btn-ghost" id="printBtn">
          <i class="ph-bold ph-printer" aria-hidden="true"></i>چاپ
        </button>
        <button type="button" class="btn btn-ghost" id="editName">
          <i class="ph ph-pencil-simple" aria-hidden="true"></i>ویرایش نام
        </button>
        <button type="button" class="btn btn-ghost" id="backBtn">
          <i class="ph ph-arrow-right" aria-hidden="true"></i>بازگشت به دوره
        </button>
      </div>

      <div class="ach-share-panel" id="sharePanel" hidden>
        <h3><i class="ph-fill ph-export" aria-hidden="true"></i>ساخت و اشتراک کارت دستاورد</h3>
        <p id="shareHint">${nativeShare
          ? 'می‌توانی تصویر را از طریق برگهٔ اشتراک دستگاه بفرستی، یا دانلود کنی و در LinkedIn یا Instagram بارگذاری کنی.'
          : 'اشتراک‌گذاری مستقیم فایل در این مرورگر در دسترس نیست. تصویر را دانلود کن و همراه متن پست در LinkedIn یا Instagram بارگذاری کن.'}</p>
        <div class="ach-share-row">
          <button type="button" class="btn btn-primary" id="dlSquare">
            <i class="ph-bold ph-download-simple" aria-hidden="true"></i>دانلود تصویر مربعی
          </button>
          <button type="button" class="btn btn-ghost" id="dlStory">
            <i class="ph-bold ph-device-mobile" aria-hidden="true"></i>دانلود تصویر استوری
          </button>
          <button type="button" class="btn btn-ghost" id="shareNative" ${nativeShare ? '' : 'hidden'}>
            <i class="ph-bold ph-share-network" aria-hidden="true"></i>اشتراک‌گذاری
          </button>
          <button type="button" class="btn btn-ghost" id="copyCaption">
            <i class="ph-bold ph-copy" aria-hidden="true"></i>کپی متن پست
          </button>
          <button type="button" class="btn btn-ghost" id="liUrlBtn">
            <i class="ph-fill ph-linkedin-logo" aria-hidden="true"></i>اشتراک لینک LinkedIn
          </button>
        </div>
        <label class="sr-only" for="captionBox">متن پست</label>
        <textarea id="captionBox" class="ach-caption" rows="5">${escapeHtml(buildShareCaption(data))}</textarea>
      </div>
      ${byline()}
    </div>`;

  const nameEl = $('#certName');
  const commit = () => {
    state.learner = nameEl.textContent.trim();
    ctx.save();
    const next = currentData();
    nameEl.textContent = next.learnerName;
    const cap = $('#captionBox');
    if (cap) cap.value = buildShareCaption(next);
  };

  nameEl.addEventListener('blur', commit);
  nameEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); nameEl.blur(); }
  });
  $('#editName').addEventListener('click', () => {
    nameEl.focus();
    document.getSelection().selectAllChildren(nameEl);
  });
  $('#printBtn').addEventListener('click', () => { commit(); window.print(); });
  $('#backBtn').addEventListener('click', () => ctx.go(LEVELS.length - 1));

  const openPanel = () => {
    const panel = $('#sharePanel');
    panel.hidden = false;
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  $('#buildCardBtn').addEventListener('click', openPanel);
  const shareBtn = $('#shareBtn');
  if (shareBtn) shareBtn.addEventListener('click', async () => {
    commit();
    openPanel();
    await shareAchievement(currentData(), 'square');
  });

  $('#dlSquare').addEventListener('click', async () => {
    commit();
    await downloadAchievement(currentData(), 'square');
  });
  $('#dlStory').addEventListener('click', async () => {
    commit();
    await downloadAchievement(currentData(), 'story');
  });
  const shareNative = $('#shareNative');
  if (shareNative) {
    shareNative.addEventListener('click', async () => {
      commit();
      await shareAchievement(currentData(), 'square');
    });
  }
  $('#copyCaption').addEventListener('click', async () => {
    commit();
    const box = $('#captionBox');
    const custom = box && box.value.trim();
    if (custom) {
      // Prefer copying the editable textarea contents; fall back to generated caption helper.
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          try {
            await navigator.clipboard.writeText(custom);
            ctx.toast('متن پست کپی شد.', 'ph-check');
            return;
          } catch (e) { /* fall through */ }
        }
        box.focus();
        box.select();
        if (document.execCommand('copy')) {
          ctx.toast('متن پست کپی شد.', 'ph-check');
          return;
        }
      } catch (e) { /* fall through */ }
    }
    await copyShareCaption(currentData());
  });
  $('#liUrlBtn').addEventListener('click', () => openLinkedInUrlShare());

  ctx.syncNav();
}
