/**
 * Canvas PNG exporter for the path achievement card (both locales).
 * Uses the same normalized data as the in-app preview; no third-party libs.
 */
import { FA } from './dom.js';
import { ACHIEVEMENT_TITLE } from './achievement.js';
import { getLang, t, tf } from './i18n.js';

/* Canvas does NOT inherit CSS direction — it must be set explicitly per locale. */
const dirFor = () => (getLang() === 'en' ? 'ltr' : 'rtl');
const startAlign = () => (getLang() === 'en' ? 'left' : 'right');
const fontStack = () => (getLang() === 'en'
  ? 'system-ui, Segoe UI, Helvetica, Arial, sans-serif'
  : 'IRANYekanX, Tahoma, sans-serif');

const ICON_CODE = {
  'ph-git-commit': '\ue27a',
  'ph-wrench': '\ue5d4',
  'ph-git-branch': '\ue278',
  'ph-swap': '\ue83c',
  'ph-git-pull-request': '\ue282',
  'ph-magnifying-glass': '\ue30c',
  'ph-flag': '\ue244',
  'ph-target': '\ue47c',
  'ph-palette': '\ue6c8',
  'ph-crown-simple': '\ue616',
  'ph-medal': '\ue320',
  'ph-trophy': '\ue67e',
  'ph-path': '\ue39c',
  'ph-lightning': '\ue2de',
};

const SIZES = {
  square: { w: 1080, h: 1080, name: 'git-for-designers-achievement-square.png' },
  story: { w: 1080, h: 1920, name: 'git-for-designers-achievement-story.png' },
};

export function achievementFilename(format) {
  return (SIZES[format] || SIZES.square).name;
}

async function waitFonts() {
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.load('700 48px IRANYekanX');
      await document.fonts.load('400 28px IRANYekanX');
      await document.fonts.load('48px Phosphor-Fill');
      await document.fonts.ready;
    } catch (e) { /* continue with fallbacks */ }
  }
}

function isDarkTheme() {
  return document.documentElement.dataset.theme === 'dark';
}

function palette(data) {
  const dark = isDarkTheme();
  const t = data.theme || {};
  const accent = dark ? (t.darkAccent || t.accent) : t.accent;
  const soft = dark ? (t.darkSoft || t.soft) : t.soft;
  return {
    bg: dark ? '#0B0C0E' : '#F1F1F2',
    card: dark ? '#141619' : '#FFFFFF',
    ink: dark ? '#F0F1F2' : '#131416',
    muted: dark ? '#9AA0A8' : '#63676D',
    line: dark ? '#262A30' : '#DFE0E2',
    accent,
    soft,
    inkOnAccent: dark ? '#0B0C0E' : '#FFFFFF',
  };
}

function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function fitText(ctx, text, maxWidth, fontPx, weight = '700') {
  let size = fontPx;
  ctx.font = `${weight} ${size}px ${fontStack()}`;
  while (size > 22 && ctx.measureText(text).width > maxWidth) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${fontStack()}`;
  }
  return size;
}

function drawIcon(ctx, ic, x, y, size, color) {
  const ch = ICON_CODE[ic] || ICON_CODE['ph-medal'];
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `${size}px Phosphor-Fill, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.direction = 'ltr';
  ctx.fillText(ch, x, y + 1);
  ctx.restore();
}

function badgeSlots(count, cx, cy, format) {
  const n = Math.max(0, count);
  const slots = [];
  if (n === 0) return slots;

  if (n <= 3) {
    slots.push({ x: cx, y: cy - (format === 'story' ? 40 : 20), r: 78 });
    if (n >= 2) slots.push({ x: cx - 150, y: cy + 90, r: 48 });
    if (n >= 3) slots.push({ x: cx + 150, y: cy + 90, r: 48 });
    return slots;
  }

  if (n <= 6) {
    const ring = [
      [cx, cy - 110], [cx + 130, cy - 30], [cx + 90, cy + 100],
      [cx - 90, cy + 100], [cx - 130, cy - 30], [cx, cy + 10],
    ];
    for (let i = 0; i < n; i++) {
      const [x, y] = ring[i];
      slots.push({ x, y, r: i === n - 1 ? 64 : 44 });
    }
    return slots;
  }

  // 7–10: compact orbit / grid
  const cols = n <= 8 ? 4 : 5;
  const rows = Math.ceil(n / cols);
  const gap = 110;
  const startX = cx - ((cols - 1) * gap) / 2;
  const startY = cy - ((rows - 1) * gap) / 2;
  for (let i = 0; i < n; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    slots.push({
      x: startX + col * gap,
      y: startY + row * gap,
      r: i === n - 1 ? 52 : 40,
    });
  }
  return slots;
}

function drawCard(ctx, data, format) {
  const { w, h } = SIZES[format] || SIZES.square;
  const c = palette(data);
  const pad = format === 'story' ? 96 : 72;
  const safeTop = format === 'story' ? 140 : pad;
  const safeBot = format === 'story' ? h - 140 : h - pad;

  // Background atmosphere
  ctx.fillStyle = c.bg;
  ctx.fillRect(0, 0, w, h);
  const grad = ctx.createRadialGradient(w * 0.75, h * 0.15, 40, w * 0.6, h * 0.2, w * 0.7);
  grad.addColorStop(0, c.soft);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Card plane
  const cardX = pad * 0.55;
  const cardY = safeTop - 40;
  const cardW = w - cardX * 2;
  const cardH = safeBot - cardY + 20;
  ctx.save();
  ctx.shadowColor = 'rgba(19,20,22,0.18)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 18;
  ctx.fillStyle = c.card;
  roundRect(ctx, cardX, cardY, cardW, cardH, 36);
  ctx.fill();
  ctx.restore();

  // Accent bar
  ctx.fillStyle = c.accent;
  roundRect(ctx, cardX, cardY, cardW, 10, 6);
  ctx.fill();

  ctx.direction = dirFor();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  let y = cardY + 72;

  // Kicker
  ctx.fillStyle = c.accent;
  ctx.font = `700 22px ${fontStack()}`;
  ctx.fillText(t('ach.card'), w / 2, y);
  y += 48;

  // Title
  ctx.fillStyle = c.ink;
  const titleSize = fitText(ctx, ACHIEVEMENT_TITLE, cardW - 80, format === 'story' ? 44 : 40);
  ctx.font = `900 ${titleSize}px ${fontStack()}`;
  ctx.fillText(ACHIEVEMENT_TITLE, w / 2, y);
  y += format === 'story' ? 70 : 56;

  // Learner name
  ctx.fillStyle = c.muted;
  ctx.font = `400 22px ${fontStack()}`;
  ctx.fillText(t('ach.completed'), w / 2, y);
  y += 48;
  const name = data.learnerName || t('ach.learner');
  const nameSize = fitText(ctx, name, cardW - 100, format === 'story' ? 64 : 56);
  ctx.fillStyle = c.ink;
  ctx.font = `900 ${nameSize}px ${fontStack()}`;
  ctx.fillText(name, w / 2, y);
  y += 28;

  // Underline accent
  ctx.strokeStyle = c.accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 80, y);
  ctx.lineTo(w / 2 + 80, y);
  ctx.stroke();

  // Badge field
  const badges = data.earnedBadges || [];
  const fieldY = format === 'story' ? y + 220 : y + 170;
  const slots = badgeSlots(badges.length, w / 2, fieldY, format);

  if (!badges.length) {
    ctx.save();
    ctx.strokeStyle = c.line;
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 10]);
    ctx.beginPath();
    ctx.arc(w / 2, fieldY, 70, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    drawIcon(ctx, 'ph-path', w / 2, fieldY, 52, c.muted);
    ctx.restore();
  } else {
    badges.forEach((b, i) => {
      const s = slots[i];
      if (!s) return;
      const isHero = data.heroBadge && b.id === data.heroBadge.id;
      ctx.beginPath();
      ctx.fillStyle = isHero ? c.accent : c.soft;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (isHero) {
        ctx.strokeStyle = c.accent;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r + 8, 0, Math.PI * 2);
        ctx.stroke();
      }
      drawIcon(ctx, b.ic, s.x, s.y, s.r * 0.9, isHero ? c.inkOnAccent : c.accent);
    });
  }

  // Stats strip
  const statsY = format === 'story' ? fieldY + 260 : fieldY + (badges.length > 6 ? 200 : 180);
  const cells = [
    { em: t('ach.rank'), b: data.rank?.t || '—' },
    { em: t('ach.xp'), b: `${FA(data.xp)} XP` },
    { em: t('ach.levelsDone'), b: tf('ach.ofTotal', FA(data.completedLevelCount), FA(data.totalLevelCount)) },
    { em: t('ach.badges'), b: FA(data.earnedBadgeCount) },
  ];
  const cellW = (cardW - 80) / 2;
  const cellH = 88;
  cells.forEach((cell, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = cardX + 40 + col * (cellW + 16);
    const yy = statsY + row * (cellH + 14);
    ctx.fillStyle = c.soft;
    roundRect(ctx, x, yy, cellW, cellH, 18);
    ctx.fill();
    ctx.direction = dirFor();
    ctx.textAlign = startAlign();
    const anchor = getLang() === 'en' ? x + 22 : x + cellW - 22;
    ctx.fillStyle = c.muted;
    ctx.font = `400 18px ${fontStack()}`;
    ctx.fillText(cell.em, anchor, yy + 32);
    ctx.fillStyle = c.ink;
    const bSize = fitText(ctx, cell.b, cellW - 40, 26);
    ctx.font = `700 ${bSize}px ${fontStack()}`;
    ctx.fillText(cell.b, anchor, yy + 64);
  });

  // Date + disclaimer
  const footY = safeBot - (format === 'story' ? 40 : 24);
  ctx.textAlign = 'center';
  ctx.fillStyle = c.muted;
  ctx.font = `400 20px ${fontStack()}`;
  if (data.completedAt) ctx.fillText(data.completedAt, w / 2, footY - 36);
  ctx.font = `400 16px ${fontStack()}`;
  const disc = t('ach.disclaimer');
  ctx.fillText(disc, w / 2, footY);
}

/**
 * @param {object} data normalizeAchievement() result
 * @param {'square'|'story'} format
 * @returns {Promise<Blob>}
 */
export async function renderAchievementBlob(data, format = 'square') {
  const size = SIZES[format] || SIZES.square;
  await waitFonts();
  const canvas = document.createElement('canvas');
  canvas.width = size.w;
  canvas.height = size.h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unsupported');
  drawCard(ctx, data, format === 'story' ? 'story' : 'square');

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) reject(new Error('PNG export failed'));
      else resolve(blob);
    }, 'image/png');
  });
}

export async function renderAchievementFile(data, format = 'square') {
  const blob = await renderAchievementBlob(data, format);
  const name = achievementFilename(format);
  return new File([blob], name, { type: 'image/png' });
}
