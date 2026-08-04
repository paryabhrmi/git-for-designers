/**
 * Completion view renderer.
 * Internal name "certificate" / renderCert kept for route & module compatibility.
 * User-facing product: the path achievement / achievement card (i18n: ach.*).
 */
import { state, passedCount, allPassed, firstOpen } from '../state.js';
import { LEVELS } from '../course.js';
import { SITE, LINKEDIN } from '../config.js';
import { $, FA } from '../dom.js';
import { byline as bylineFn } from '../ui.js';
import { ctx } from '../ctx.js';
import { t, tf } from '../i18n.js';
import {
  normalizeAchievement,
  escapeHtml,
  buildShareCaption,
} from '../achievement.js';
import { canShareFiles, shareAchievement, downloadAchievement, copyShareCaption, openLinkedInUrlShare } from '../achievement-share.js';

const byline = () => bylineFn(SITE, LINKEDIN);

function badgeMarkup(data) {
  if (!data.earnedBadgeCount) {
    return `
      <div class="ach-empty" aria-hidden="false">
        <i class="ph-duotone ph-path" aria-hidden="true"></i>
        ${t('ach.empty')}
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
  $('#crumbTitle').textContent = t('ach.page');
  const n = passedCount();
  if (!allPassed()) {
    $('#root').innerHTML = `
      <div class="locked-cert">
        <i class="ph-duotone ph-trophy big" aria-hidden="true"></i>
        <h2>${t('ach.locked.h')}</h2>
        <p>${tf('ach.locked.p', FA(n))}</p>
        <div class="mini-prog"><i style="width:${n / LEVELS.length * 100}%"></i></div>
        <button class="btn btn-primary" id="contBtn"><i class="ph-bold ph-play" aria-hidden="true"></i>${tf('ach.continue', FA(LEVELS[firstOpen()].id))}</button>
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
          <div class="ach-kicker"><i class="ph-fill ph-trophy" aria-hidden="true"></i>${t('ach.card')}</div>
          <h2 class="ach-title">${t('ach.title')}</h2>
          <p class="ach-to">${t('ach.completed')}</p>
          <div class="ach-who" id="certName" contenteditable="true" spellcheck="false" role="textbox" aria-label="${t('ach.nameAria')}">${nameHtml}</div>
          <div class="ach-meta">
            <div class="ach-cell"><em>${t('ach.rank')}</em><b id="achRank">${escapeHtml(data.rank.t)}</b></div>
            <div class="ach-cell"><em>${t('ach.xp')}</em><b id="achXp">${FA(data.xp)} XP</b></div>
            <div class="ach-cell"><em>${t('ach.levelsDone')}</em><b>${tf('ach.ofTotal', FA(data.completedLevelCount), FA(data.totalLevelCount))}</b></div>
            <div class="ach-cell"><em>${t('ach.badges')}</em><b id="achBadgeCount">${FA(data.earnedBadgeCount)}</b></div>
          </div>
          <div class="ach-badges" id="achBadges" aria-label="${t('ach.badgesAria')}">
            ${badgeMarkup(data)}
          </div>
          ${heroName ? `<p class="ach-badge-name">${tf('ach.hero', heroName)}</p>` : ''}
          ${data.completedAt ? `<p class="ach-badge-name">${escapeHtml(data.completedAt)}</p>` : ''}
          <p class="ach-disclaimer">${t('ach.disclaimer')}</p>
          <div class="ach-foot">${t('ach.foot')}</div>
        </div>
      </div>

      <div class="ach-actions cert-actions">
        <!-- Exactly one filled button on the screen: building the card is the
             action this page exists for. Everything else is secondary. -->
        <button type="button" class="btn btn-primary" id="buildCardBtn">
          <i class="ph-bold ph-image" aria-hidden="true"></i>${t('ach.build')}
        </button>
        <button type="button" class="btn btn-ghost" id="shareBtn" ${nativeShare ? '' : 'hidden'}>
          <i class="ph-bold ph-share-network" aria-hidden="true"></i>${t('ach.share')}
        </button>
        <button type="button" class="btn btn-ghost" id="printBtn">
          <i class="ph-bold ph-printer" aria-hidden="true"></i>${t('ach.print')}
        </button>
        <button type="button" class="btn btn-ghost" id="editName">
          <i class="ph ph-pencil-simple" aria-hidden="true"></i>${t('ach.editName')}
        </button>
        <button type="button" class="btn btn-ghost" id="backBtn">
          <i class="ph ph-arrow-right" aria-hidden="true"></i>${t('ach.back')}
        </button>
      </div>

      <div class="ach-share-panel" id="sharePanel" hidden>
        <h3><i class="ph-fill ph-export" aria-hidden="true"></i>${t('ach.panel.h')}</h3>
        <p id="shareHint">${nativeShare ? t('ach.hint.native') : t('ach.hint.dl')}</p>
        <div class="ach-share-row">
          <button type="button" class="btn btn-primary" id="dlSquare">
            <i class="ph-bold ph-download-simple" aria-hidden="true"></i>${t('ach.dl.square')}
          </button>
          <button type="button" class="btn btn-ghost" id="dlStory">
            <i class="ph-bold ph-device-mobile" aria-hidden="true"></i>${t('ach.dl.story')}
          </button>
          <button type="button" class="btn btn-ghost" id="shareNative" ${nativeShare ? '' : 'hidden'}>
            <i class="ph-bold ph-share-network" aria-hidden="true"></i>${t('ach.share')}
          </button>
          <button type="button" class="btn btn-ghost" id="copyCaption">
            <i class="ph-bold ph-copy" aria-hidden="true"></i>${t('ach.copyCaption')}
          </button>
          <button type="button" class="btn btn-ghost" id="liUrlBtn">
            <i class="ph-fill ph-linkedin-logo" aria-hidden="true"></i>${t('ach.liShare')}
          </button>
        </div>
        <label class="sr-only" for="captionBox">${t('ach.caption')}</label>
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
            ctx.toast(t('ach.captionCopied'), 'ph-check');
            return;
          } catch (e) { /* fall through */ }
        }
        box.focus();
        box.select();
        if (document.execCommand('copy')) {
          ctx.toast(t('ach.captionCopied'), 'ph-check');
          return;
        }
      } catch (e) { /* fall through */ }
    }
    await copyShareCaption(currentData());
  });
  $('#liUrlBtn').addEventListener('click', () => openLinkedInUrlShare());

  ctx.syncNav();
}
