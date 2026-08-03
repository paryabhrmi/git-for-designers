import { $ } from './dom.js';
import { t } from './i18n.js';

export function toast(msg, icon = 'ph-lock-simple', action) {
  const t = $('#toast');
  t.innerHTML = `<i class="ph ${icon}"></i>${msg}`;
  if (action) {
    const b = document.createElement('button');
    b.className = 'toast-act'; b.textContent = action.label;
    b.addEventListener('click', () => { t.classList.remove('show'); action.fn(); });
    t.appendChild(b);
  }
  t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), action ? 5200 : 2600);
}

export function authorCard(avatarSrc, site, linkedin) {
  return `
  <div class="author-card">
    <img class="avatar" src="${avatarSrc}" alt="${t('author.name')}" width="62" height="62">
    <div class="who">
      <b>${t('author.name')}</b>
      <span>${t('author.roleFull')}</span>
    </div>
    <div class="links">
      <a href="${site}" target="_blank" rel="noopener"><i class="ph-bold ph-globe-simple"></i>paryabahrami.ir</a>
      <a href="${linkedin}" target="_blank" rel="noopener"><i class="ph-fill ph-linkedin-logo"></i>LinkedIn</a>
    </div>
  </div>`;
}

export function byline(site, linkedin) {
  return `
  <div class="byline">
    <span>${t('byline.by')} <b>${t('author.name')}</b></span>
    <span class="dot"></span>
    <a href="${site}" target="_blank" rel="noopener"><i class="ph ph-globe-simple"></i>paryabahrami.ir</a>
    <span class="dot"></span>
    <a href="${linkedin}" target="_blank" rel="noopener"><i class="ph-fill ph-linkedin-logo"></i>LinkedIn</a>
  </div>`;
}
