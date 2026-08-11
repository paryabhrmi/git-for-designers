/**
 * The sandbox terminal, and the panel that makes its state visible.
 *
 * The panel is not decoration. Git's problem for a designer is that it is
 * invisible: you type something and nothing on screen changes. Showing the
 * working tree, the staging area and the last commit side by side — and letting
 * a file visibly move between them — is what turns `git add` from a magic word
 * into a place a file went.
 *
 * Everything here is layout and events. All Git behaviour lives in repo.js, so
 * the two can be tested and changed apart.
 */
import { run, KNOWN } from './repo.js';
import { t } from '../i18n.js';

const esc = (s) => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

/** Working tree, index and HEAD as three buckets of file names. */
function buckets(repo) {
  const headId = repo.head ? repo.branches[repo.head] : null;
  const head = headId ? repo.commits[headId].snapshot : {};
  const idx = repo.staged === null ? head : repo.staged;
  const changed = Object.keys(repo.files)
    .filter(p => !(p in idx) || repo.files[p] !== idx[p]).sort();
  const staged = Object.keys(idx)
    .filter(p => !(p in head) || idx[p] !== head[p]).sort();
  return { changed, staged, committed: Object.keys(head).sort() };
}

function renderState(el, repo) {
  if (!repo.init) {
    el.innerHTML = `<p class="sbx-empty">${t('sbx.noRepo')}</p>`;
    return;
  }
  const b = buckets(repo);
  const col = (label, hint, names, tone) => `
    <div class="sbx-col${tone ? ' ' + tone : ''}">
      <b>${label}</b><em>${hint}</em>
      <ul>${names.length
        ? names.map(n => `<li dir="ltr">${esc(n)}</li>`).join('')
        : `<li class="none">—</li>`}</ul>
    </div>`;
  const count = Object.keys(repo.commits).length;
  el.innerHTML = `
    <div class="sbx-branch">
      <span class="sbx-chip" dir="ltr"><i class="ph-bold ph-git-branch" aria-hidden="true"></i>${esc(repo.head)}</span>
      <span class="sbx-commits">${t('sbx.commits')}: <b dir="ltr">${count}</b></span>
    </div>
    <div class="sbx-cols">
      ${col(t('sbx.work'), t('sbx.work.h'), b.changed, 'is-work')}
      ${col(t('sbx.stage'), t('sbx.stage.h'), b.staged, 'is-stage')}
      ${col(t('sbx.done'), t('sbx.done.h'), b.committed, 'is-done')}
    </div>`;
}

/**
 * Mounts a terminal into `host`. Returns { reset, focus } so the caller can
 * put the learner back at the start of a scenario without rebuilding the DOM.
 */
export function mountTerminal(host, { repo, seed, onRun }) {
  let state = repo;
  const history = [];
  let cursor = 0;

  host.innerHTML = `
    <div class="sbx">
      <div class="sbx-term" dir="ltr">
        <div class="sbx-bar">
          <i></i><i></i><i></i>
          <span class="sbx-title">project — zsh</span>
        </div>
        <div class="sbx-out" id="sbxOut" role="log" aria-live="polite"></div>
        <label class="sbx-line" for="sbxIn">
          <span class="sbx-prompt" aria-hidden="true">$</span>
          <input id="sbxIn" type="text" autocomplete="off" autocapitalize="off"
                 spellcheck="false" aria-label="${esc(t('sbx.input'))}">
        </label>
      </div>
      <div class="sbx-state" id="sbxState"></div>
    </div>`;

  const out = host.querySelector('#sbxOut');
  const input = host.querySelector('#sbxIn');
  const panel = host.querySelector('#sbxState');

  const write = (html, cls) => {
    const d = document.createElement('div');
    d.className = 'sbx-row' + (cls ? ' ' + cls : '');
    d.innerHTML = html;
    out.appendChild(d);
    out.scrollTop = out.scrollHeight;
  };

  const submit = (line) => {
    write(`<span class="sbx-prompt">$</span>${esc(line)}`, 'sbx-cmd');
    if (line.trim() === 'clear') { out.innerHTML = ''; return; }
    if (line.trim() === 'help') {
      write(`${esc(t('sbx.help'))}\n${KNOWN.join('\n')}`);
      return;
    }
    const res = run(state, line);
    if (res.out) write(esc(res.out), res.error ? 'sbx-err' : '');
    renderState(panel, state);
    if (onRun) onRun(state, line, res);
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const line = input.value;
      if (line.trim()) { history.push(line); cursor = history.length; }
      input.value = '';
      submit(line);
    } else if (e.key === 'ArrowUp') {
      if (!history.length) return;
      e.preventDefault();
      cursor = Math.max(0, cursor - 1);
      input.value = history[cursor] || '';
    } else if (e.key === 'ArrowDown') {
      if (!history.length) return;
      e.preventDefault();
      cursor = Math.min(history.length, cursor + 1);
      input.value = history[cursor] || '';
    } else if (e.key === 'Tab') {
      // Completion over the sandbox's own command list, so a learner who half
      // remembers `git swi` is not punished for it.
      const v = input.value;
      const hit = KNOWN.find(k => k.startsWith(v) && k !== v);
      if (hit) { e.preventDefault(); input.value = hit + ' '; }
    }
  });

  // Clicking anywhere in the window focuses the prompt, the way a terminal does.
  host.querySelector('.sbx-term').addEventListener('click', (e) => {
    if (!window.getSelection().toString()) input.focus();
  });

  renderState(panel, state);
  return {
    focus: () => input.focus(),
    reset: () => { state = seed(); out.innerHTML = ''; renderState(panel, state); },
    repo: () => state,
  };
}
