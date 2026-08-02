/**
 * Path achievement data (user-facing: نشان فتح مسیر).
 * Kept separate from certificate.js which remains for backward-compatible IDs.
 */
import { state, passedCount, totalXP, rankOf, allPassed } from './state.js';
import { LEVELS } from './course.js';
import { BADGES } from '../data/badges.js';
import { RANKS } from '../data/ranks.js';
import { FA } from './dom.js';

const BADGE_BY_ID = Object.fromEntries(BADGES.map(b => [b.id, b]));

/** Rank accent themes — keyed by rank.min; colors work in light/dark UI. */
export const RANK_THEMES = {
  0: { key: 'start', accent: '#5C6067', soft: '#E8E9EA', ink: '#131416', darkAccent: '#9AA0A8', darkSoft: '#232629' },
  600: { key: 'basics', accent: '#1D4ED8', soft: '#E8EDFC', ink: '#1E3A8A', darkAccent: '#8CA0FF', darkSoft: '#161C33' },
  1400: { key: 'branch', accent: '#127A4B', soft: '#E6F4EC', ink: '#0F5132', darkAccent: '#4ECB8C', darkSoft: '#0F2A1E' },
  2400: { key: 'team', accent: '#A15C07', soft: '#FBF0E0', ink: '#7A4505', darkAccent: '#E0A455', darkSoft: '#2A2013' },
  3400: { key: 'ds', accent: '#0F766E', soft: '#E0F2F1', ink: '#115E59', darkAccent: '#5EEAD4', darkSoft: '#134E4A' },
  4500: { key: 'dt', accent: '#3B3E43', soft: '#F0F0F1', ink: '#131416', darkAccent: '#C6C9CE', darkSoft: '#1C1F24' },
};

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function layoutModeForCount(count) {
  const n = Math.max(0, Math.min(10, Number(count) || 0));
  if (n === 0) return 'none';
  if (n <= 3) return 'hero';
  if (n <= 6) return 'constellation';
  return 'orbit';
}

function themeForRank(rank) {
  const min = rank && typeof rank.min === 'number' ? rank.min : 0;
  let chosen = RANK_THEMES[0];
  for (const r of RANKS) {
    if (min >= r.min && RANK_THEMES[r.min]) chosen = RANK_THEMES[r.min];
  }
  return chosen;
}

/**
 * Prefer the last earned badge in BADGES order (highest-order / latest unlock).
 * No earned-date data is stored; order is deterministic from the badge catalog.
 */
export function selectHeroBadge(earnedBadges) {
  if (!earnedBadges || !earnedBadges.length) return null;
  return earnedBadges[earnedBadges.length - 1];
}

function resolveEarnedBadges(badgeIds) {
  const seen = new Set();
  const list = [];
  const source = Array.isArray(badgeIds) ? badgeIds : null;

  if (source) {
    for (const id of source) {
      if (typeof id !== 'string' || !BADGE_BY_ID[id] || seen.has(id)) continue;
      seen.add(id);
      const b = BADGE_BY_ID[id];
      list.push({ id: b.id, ic: b.ic, t: b.t, d: b.d });
    }
    // Preserve catalog order
    list.sort((a, b) => BADGES.findIndex(x => x.id === a.id) - BADGES.findIndex(x => x.id === b.id));
    return list;
  }

  for (const b of BADGES) {
    let ok = false;
    try { ok = !!b.ok(); } catch (e) { ok = false; }
    if (!ok || seen.has(b.id)) continue;
    seen.add(b.id);
    list.push({ id: b.id, ic: b.ic, t: b.t, d: b.d });
  }
  return list;
}

function formatDisplayDate(date = new Date()) {
  try {
    return new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  } catch (e) {
    return '—';
  }
}

/**
 * Normalized achievement snapshot for preview, export, and share caption.
 * Does not mutate global state. Safe defaults for old / partial stored state.
 *
 * @param {{ learnerName?: string, badgeIds?: string[], xp?: number, completedLevelCount?: number, completedAt?: string|null }} [overrides]
 */
export function normalizeAchievement(overrides = {}) {
  const totalLevelCount = LEVELS.length;
  let completedLevelCount = overrides.completedLevelCount != null
    ? Number(overrides.completedLevelCount)
    : passedCount();
  if (!Number.isFinite(completedLevelCount) || completedLevelCount < 0) completedLevelCount = 0;
  completedLevelCount = Math.min(Math.floor(completedLevelCount), totalLevelCount);

  let xp = overrides.xp != null ? Number(overrides.xp) : totalXP();
  if (!Number.isFinite(xp) || xp < 0) xp = 0;
  xp = Math.floor(xp);

  const rank = rankOf(xp) || RANKS[0];
  const theme = themeForRank(rank);
  const earnedBadges = resolveEarnedBadges(overrides.badgeIds);
  const earnedBadgeCount = earnedBadges.length;
  const heroBadge = selectHeroBadge(earnedBadges);
  const layoutMode = layoutModeForCount(earnedBadgeCount);

  let learnerName = overrides.learnerName != null
    ? String(overrides.learnerName)
    : String(state.learner || '');
  learnerName = learnerName.trim();
  const displayName = learnerName || 'یادگیرنده';

  // No historical completion date is stored; show a safe viewing-date fallback.
  const completedAt = overrides.completedAt === null
    ? null
    : (overrides.completedAt != null ? String(overrides.completedAt) : formatDisplayDate());

  return {
    learnerName: displayName,
    learnerNameRaw: learnerName,
    completedAt,
    completedLevelCount,
    totalLevelCount,
    xp,
    rank: { min: rank.min, t: rank.t },
    earnedBadges,
    earnedBadgeCount,
    heroBadge,
    themeKey: theme.key,
    theme,
    layoutMode,
    eligible: overrides.eligible != null ? !!overrides.eligible : allPassed(),
  };
}

export function buildShareCaption(data) {
  const d = data || normalizeAchievement();
  const rank = d.rank?.t || '—';
  const count = FA(d.earnedBadgeCount || 0);
  return [
    'مسیر Git for Designers را کامل کردم و نشان فتح مسیر را گرفتم.',
    `رتبهٔ فعلی من: ${rank}`,
    `نشان‌های به‌دست‌آمده: ${count}`,
    '#GitForDesigners #DesignTechnologist #ProductDesign',
  ].join('\n');
}

export const ACHIEVEMENT_DISCLAIMER =
  'این نشان یادبود دیجیتال تکمیل مسیر آموزشی Git for Designers است و مدرک رسمی، دانشگاهی یا حرفه‌ای محسوب نمی‌شود.';

export const ACHIEVEMENT_TITLE = 'نشان فتح مسیر Git for Designers';
export const ACHIEVEMENT_SHORT = 'نشان مسیر';
export const ACHIEVEMENT_PAGE = 'نشان فتح مسیر';
