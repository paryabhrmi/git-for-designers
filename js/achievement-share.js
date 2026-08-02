/**
 * Progressive share / download helpers for achievement cards.
 * Native file share when supported; download + caption copy otherwise.
 */
import { PUBLIC_COURSE_URL } from './config.js';
import { toast } from './ui.js';
import { buildShareCaption, ACHIEVEMENT_TITLE } from './achievement.js';
import { renderAchievementFile, renderAchievementBlob, achievementFilename } from './achievement-export.js';

function publicUrl() {
  const u = (PUBLIC_COURSE_URL || '').trim();
  if (!u) return '';
  try {
    const parsed = new URL(u);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.href;
  } catch (e) { /* ignore */ }
  return '';
}

export function canShareFiles() {
  try {
    if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') return false;
    if (typeof navigator.canShare !== 'function') return false;
    const probe = new File([new Blob(['x'], { type: 'image/png' })], 'probe.png', { type: 'image/png' });
    return !!navigator.canShare({ files: [probe] });
  } catch (e) {
    return false;
  }
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function downloadAchievement(data, format = 'square') {
  const blob = await renderAchievementBlob(data, format);
  triggerDownload(blob, achievementFilename(format));
  toast('تصویر کارت دستاورد دانلود شد.', 'ph-download-simple');
  return blob;
}

function copyTextFallback(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  const ok = document.execCommand('copy');
  ta.remove();
  return ok;
}

export async function copyShareCaption(data) {
  const text = buildShareCaption(data);
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        toast('متن پست کپی شد.', 'ph-check');
        return true;
      } catch (e) {
        /* fall through to execCommand */
      }
    }
    if (copyTextFallback(text)) {
      toast('متن پست کپی شد.', 'ph-check');
      return true;
    }
    toast('کپی متن ممکن نشد؛ دستی انتخاب کن.', 'ph-warning');
    return false;
  } catch (e) {
    toast('کپی متن ممکن نشد؛ دستی انتخاب کن.', 'ph-warning');
    return false;
  }
}

/**
 * Attempt native file share. Cancellation is neutral (no error toast).
 * Returns: 'shared' | 'cancelled' | 'unsupported' | 'fallback'
 */
export async function shareAchievement(data, format = 'square') {
  const caption = buildShareCaption(data);
  const url = publicUrl();
  const title = ACHIEVEMENT_TITLE;

  if (!canShareFiles()) {
    await downloadAchievement(data, format);
    return 'fallback';
  }

  try {
    const file = await renderAchievementFile(data, format);
    const payload = { files: [file], title, text: caption };
    if (url) payload.url = url;
    if (!navigator.canShare(payload)) {
      await downloadAchievement(data, format);
      return 'fallback';
    }
    await navigator.share(payload);
    // Dialog opened and resolved without throw — do not claim post success.
    return 'shared';
  } catch (err) {
    if (err && (err.name === 'AbortError' || err.name === 'NotAllowedError')) {
      return 'cancelled';
    }
    try {
      await downloadAchievement(data, format);
      return 'fallback';
    } catch (e2) {
      toast('اشتراک‌گذاری ممکن نشد؛ تصویر را دانلود کن.', 'ph-warning');
      return 'unsupported';
    }
  }
}

/** Optional LinkedIn URL share for the public course link only (no image upload). */
export function openLinkedInUrlShare() {
  const url = publicUrl();
  if (!url) {
    toast('آدرس عمومی دوره تنظیم نشده است.', 'ph-link');
    return false;
  }
  const share = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url);
  window.open(share, '_blank', 'noopener,noreferrer');
  toast('لینک دوره در LinkedIn باز شد؛ تصویر را جداگانه بارگذاری کن.', 'ph-linkedin-logo');
  return true;
}
