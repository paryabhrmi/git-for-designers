/**
 * English level text (Phase 5B), split into three modules for maintainability.
 *
 * Text only: id + title + subtitle + body + quiz {q, o, why}. Structure and
 * behavior (ordering, branch names, correct-answer indexes) stay in
 * data/levels.js and are merged by js/content.js.
 */
import { EN_LEVELS_1 } from './levels-1.js';
import { EN_LEVELS_2 } from './levels-2.js';
import { EN_LEVELS_3 } from './levels-3.js';

export const EN_LEVELS = [...EN_LEVELS_1, ...EN_LEVELS_2, ...EN_LEVELS_3];
