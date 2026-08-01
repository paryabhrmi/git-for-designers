import { $ } from './dom.js';
import { state } from './state.js';
import { LEVELS } from './course.js';

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
    <div class="sim-head"><i class="ph-duotone ph-cursor-click"></i><b>تمرین تعاملی: مسیر یک تغییر</b></div>
    <p class="sim-note">دستورها را بزن و ببین فایل‌ها بین سه ناحیهٔ Git چطور جابه‌جا می‌شوند.</p>
    <div class="sim-cols">
      <div class="sim-col" data-z="wd"><h5><i class="ph ph-folder-open"></i>پوشهٔ کار <em>working</em></h5><div class="chips"></div></div>
      <div class="sim-col" data-z="st"><h5><i class="ph ph-tray"></i>ناحیهٔ آماده‌سازی <em>staged</em></h5><div class="chips"></div></div>
      <div class="sim-col" data-z="cm"><h5><i class="ph ph-git-commit"></i>تاریخچه <em>committed</em></h5><div class="chips"></div></div>
    </div>
    <div class="sim-cmds">
      <button class="sim-cmd" data-a="status">git status</button>
      <button class="sim-cmd" data-a="add1">git add styles.css</button>
      <button class="sim-cmd" data-a="addall">git add .</button>
      <button class="sim-cmd" data-a="commit">git commit</button>
      <button class="sim-cmd" data-a="push">git push</button>
      <button class="sim-cmd ghost" data-a="reset">از نو</button>
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
        : '<div class="sim-empty">خالی</div>';
    });
    el.querySelector('[data-a="add1"]').disabled = !files.some(f => f.z === 'wd' && f.n === 'styles.css');
    el.querySelector('[data-a="addall"]').disabled = !files.some(f => f.z === 'wd');
    el.querySelector('[data-a="commit"]').disabled = !files.some(f => f.z === 'st');
    el.querySelector('[data-a="push"]').disabled = pushed || !files.some(f => f.z === 'cm');
    el.querySelector('.sim-log').innerHTML = log.length
      ? log.map(l => `<div><span class="cmd">$ ${l.cmd}</span><span class="exp">${l.exp}</span></div>`).join('')
      : '<div><span class="exp" style="color:#7A8AA3">هنوز دستوری اجرا نشده. با <span class="cmd">git status</span> شروع کن.</span></div>';
  }

  el.querySelectorAll('.sim-cmd').forEach(b => b.addEventListener('click', () => {
    const a = b.dataset.a;
    let hot = null;
    if (a === 'status') {
      const wd = files.filter(f => f.z === 'wd').length, st = files.filter(f => f.z === 'st').length;
      say('git status', `${FA(st)} فایل آمادهٔ ثبت، ${FA(wd)} فایل تغییرکردهٔ Stage‌نشده.`);
      hot = wd ? 'wd' : 'st';
    } else if (a === 'add1') {
      files.forEach(f => { if (f.n === 'styles.css' && f.z === 'wd') f.z = 'st'; });
      say('git add styles.css', 'فقط همین فایل وارد ناحیهٔ آماده‌سازی شد.'); hot = 'st';
    } else if (a === 'addall') {
      files.forEach(f => { if (f.z === 'wd') f.z = 'st'; });
      say('git add .', 'همهٔ تغییرات Stage شدند — با احتیاط استفاده کن.'); hot = 'st';
    } else if (a === 'commit') {
      const n = files.filter(f => f.z === 'st').length;
      files.forEach(f => { if (f.z === 'st') f.z = 'cm'; });
      say('git commit -m "…"', `${FA(n)} فایل در یک Commit ثبت شد. چیزی که Stage نبود، ثبت نشد.`); hot = 'cm';
    } else if (a === 'push') {
      pushed = true;
      say('git push', 'Commitها روی Remote (GitHub) هم قرار گرفتند.'); hot = 'cm';
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
  const anchorText = id === 1 ? 'سه ناحیهٔ اصلی Git' : 'git commit';
  const h = [...body.querySelectorAll('h3')].find(x => x.textContent.includes(anchorText));
  if (h) {
    let node = h.nextElementSibling;
    while (node && !['PRE', 'DIV'].includes(node.tagName)) node = node.nextElementSibling;
    (node || h).after(holder);
  } else body.appendChild(holder);
  buildSim(holder);
}
