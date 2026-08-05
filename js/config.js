export const STORE_KEY = 'git-course-fa-v3';
export const COURSE_VERSION = 3;
export const PASS_RATIO = 0.7;
export const XP_PASS = 100;
export const XP_PERFECT = 50;
export const PHASE_IC = ['ph-seedling', 'ph-briefcase', 'ph-compass-tool', 'ph-crown-simple'];
export const SITE = 'https://paryabahrami.ir';
export const LINKEDIN = 'https://www.linkedin.com/in/paryabhrmi';
export const AVATAR_SRC = './assets/avatar.jpg';
/** Public course URL for optional share links; empty disables URL attachment. */
export const PUBLIC_COURSE_URL = '';
/**
 * Microsoft Clarity project id. Empty means no analytics script is loaded at
 * all — that is the default, and it is what forks of this repo get.
 * Paste the id from clarity.microsoft.com → Settings → Overview to switch it on.
 * If you do, keep the `intro.privacy` string in js/i18n.js honest about it.
 */
export const CLARITY_ID = '';
export const ROUTES = {
  intro: '#/intro',
  glossary: '#/glossary',
  certificate: '#/certificate', // route id kept for bookmarks / stored state
  level: (id) => '#/level-' + id,
  tracks: '#/tracks',
  track: (id) => '#/track-' + id,
  missions: '#/missions',
  mission: (id) => '#/mission-' + id,
  system: '#/system',
};
