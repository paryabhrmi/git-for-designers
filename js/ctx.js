/** Cross-module call hub — wired once in app.js after all modules load. */
export const ctx = {
  render: null,
  go: null,
  save: null,
  closeMenu: null,
  buildNav: null,
  updateMob: null,
  updateMidBtn: null,
  checkQuiz: null,
  refreshCount: null,
  syncNav: null,
  syncHash: null,
  focusMain: null,
  toast: null,
};
