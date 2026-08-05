import { state, passedCount, perfectCount, allPassed } from '../js/state.js';
import { MISSION_IDS } from './missions.js';

export const BADGES = [
  { id: 'first', ic: 'ph-git-commit', t: 'اولین Commit', d: 'سطح 1 را قبول شدی', ok: () => !!state.done[1] },
  { id: 'setup', ic: 'ph-wrench', t: 'راه‌انداز', d: 'محیط کارت آماده است (سطح 2 و 3)', ok: () => state.done[2] && state.done[3] },
  { id: 'branch', ic: 'ph-git-branch', t: 'شاخه‌ساز', d: 'Branch و Merge را رد کردی', ok: () => state.done[7] && state.done[9] },
  { id: 'conflict', ic: 'ph-swap', t: 'حلّال تعارض', d: 'از پس Merge Conflict برآمدی', ok: () => !!state.done[10] },
  { id: 'pr', ic: 'ph-git-pull-request', t: 'تحویل‌دهنده', d: 'Pull Request طراحی را یاد گرفتی', ok: () => state.done[11] && state.done[12] },
  { id: 'diff', ic: 'ph-magnifying-glass', t: 'بازبین', d: 'خواندن Diff را مسلط شدی', ok: () => !!state.done[13] },
  { id: 'half', ic: 'ph-flag', t: 'نیمهٔ راه', d: '15 سطح پشت سر گذاشته شد', ok: () => passedCount() >= 15 },
  { id: 'perfect5', ic: 'ph-target', t: 'بی‌خطا ×5', d: '5 آزمون با نمرهٔ کامل', ok: () => perfectCount() >= 5 },
  { id: 'tokens', ic: 'ph-palette', t: 'توکن‌شناس', d: 'Design System و Tokenها', ok: () => state.done[23] && state.done[24] },
  { id: 'missions', ic: 'ph-flag-checkered', t: 'مأمور میدان', d: 'هر چهار مأموریت عملی را کامل کردی', ok: () => MISSION_IDS.every(id => (state.missionsDone || []).includes(id)) },
  { id: 'all', ic: 'ph-crown-simple', t: 'پایان مسیر', d: 'هر 30 سطح قبول شد', ok: () => allPassed() }
];

export const earned = () => BADGES.filter(b => { try { return b.ok(); } catch (e) { return false; } });
