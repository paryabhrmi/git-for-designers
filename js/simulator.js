import { $, FA } from './dom.js';
import { state } from './state.js';
import { LEVELS } from './course.js';
import { t, tf } from './i18n.js';

export function buildSim(host) {
  const FILES = [
    { n: 'styles.css', z: 'wd' },
    { n: 'tokens.json', z: 'wd' }
  ];
  let files = FILES.map(f => ({ ...f }));
  let log = [];
  let pushed = false;

  const el = document.createElement('div');
  el.className = 'sim';
  el.innerHTML = `
    <div class="sim-head"><i class="ph-duotone ph-cursor-click"></i><b>${t('sim.head')}</b></div>
    <p class="sim-note">${t('sim.note')}</p>
    <div class="sim-cols">
      <div class="sim-col" data-z="wd"><h4><i class="ph ph-folder-open"></i>${t('sim.col.wd')} <em>working</em></h4><div class="chips"></div></div>
      <div class="sim-col" data-z="st"><h4><i class="ph ph-tray"></i>${t('sim.col.st')} <em>staged</em></h4><div class="chips"></div></div>
      <div class="sim-col" data-z="cm"><h4><i class="ph ph-git-commit"></i>${t('sim.col.cm')} <em>committed</em></h4><div class="chips"></div></div>
    </div>
    <div class="sim-cmds">
      <button class="sim-cmd" data-a="status">git status</button>
      <button class="sim-cmd" data-a="add1">git add styles.css</button>
      <button class="sim-cmd" data-a="addall">git add .</button>
      <button class="sim-cmd" data-a="commit">git commit</button>
      <button class="sim-cmd" data-a="push">git push</button>
      <button class="sim-cmd ghost" data-a="reset">${t('sim.reset')}</button>
    </div>
    <div class="sim-log"></div>`;

  const say = (cmd, exp) => { log.unshift({ cmd, exp }); log = log.slice(0, 3); };

  function paint(hot) {
    ['wd', 'st', 'cm'].forEach(z => {
      const col = el.querySelector(`.sim-col[data-z="${z}"]`);
      col.classList.toggle('hot', hot === z);
      const box = col.querySelector('.chips');
      const list = files.filter(f => f.z === z);
      const cls = z === 'wd' ? 'mod' : z === 'st' ? 'stg' : 'cmt';
      const ic = z === 'wd' ? 'ph-pencil-simple' : z === 'st' ? 'ph-check' : (pushed ? 'ph-cloud-check' : 'ph-git-commit');
      box.innerHTML = list.length
        ? list.map(f => `<span class="chip-f ${cls}"><i class="ph-bold ${ic}"></i>${f.n}</span>`).join('')
        : `<div class="sim-empty">${t('sim.empty')}</div>`;
    });
    el.querySelector('[data-a="add1"]').disabled = !files.some(f => f.z === 'wd' && f.n === 'styles.css');
    el.querySelector('[data-a="addall"]').disabled = !files.some(f => f.z === 'wd');
    el.querySelector('[data-a="commit"]').disabled = !files.some(f => f.z === 'st');
    el.querySelector('[data-a="push"]').disabled = pushed || !files.some(f => f.z === 'cm');
    el.querySelector('.sim-log').innerHTML = log.length
      ? log.map(l => `<div><span class="cmd">$ ${l.cmd}</span><span class="exp">${l.exp}</span></div>`).join('')
      : `<div><span class="exp" style="color:#7A8AA3">${t('sim.logEmpty')}</span></div>`;
  }

  el.querySelectorAll('.sim-cmd').forEach(b => b.addEventListener('click', () => {
    const a = b.dataset.a;
    let hot = null;
    if (a === 'status') {
      const wd = files.filter(f => f.z === 'wd').length, st = files.filter(f => f.z === 'st').length;
      say('git status', tf('sim.exp.status', FA(st), FA(wd)));
      hot = wd ? 'wd' : 'st';
    } else if (a === 'add1') {
      files.forEach(f => { if (f.n === 'styles.css' && f.z === 'wd') f.z = 'st'; });
      say('git add styles.css', t('sim.exp.add1')); hot = 'st';
    } else if (a === 'addall') {
      files.forEach(f => { if (f.z === 'wd') f.z = 'st'; });
      say('git add .', t('sim.exp.addall')); hot = 'st';
    } else if (a === 'commit') {
      const n = files.filter(f => f.z === 'st').length;
      files.forEach(f => { if (f.z === 'st') f.z = 'cm'; });
      say('git commit -m "…"', tf('sim.exp.commit', FA(n))); hot = 'cm';
    } else if (a === 'push') {
      pushed = true;
      say('git push', t('sim.exp.push')); hot = 'cm';
    } else {
      files = FILES.map(f => ({ ...f })); log = []; pushed = false;
    }
    paint(hot);
  }));

  paint(null);
  host.appendChild(el);
  return el;
}

export function placeSim() {
  const body = $('#root').querySelector('.body');
  if (!body) return;
  const id = LEVELS[state.current].id;
  if (id !== 1 && id !== 4) return;
  const holder = document.createElement('div');
  const anchorText = id === 1 ? t('sim.anchor') : 'git commit';
  const h = [...body.querySelectorAll('h3')].find(x => x.textContent.includes(anchorText));
  if (h) {
    let node = h.nextElementSibling;
    while (node && !['PRE', 'DIV'].includes(node.tagName)) node = node.nextElementSibling;
    (node || h).after(holder);
  } else body.appendChild(holder);
  buildSim(holder);
}
