import { LEVELS } from './course.js';

export function certId(name) {
  let h = 5381;
  const s = 'git-course|' + (name || 'learner') + '|' + LEVELS.length;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return 'GIT-' + h.toString(16).toUpperCase().padStart(8, '0');
}
