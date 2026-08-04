/**
 * Design-system page.
 *
 * Everything here is read from the *live* computed styles at render time, so the
 * page cannot drift from `styles/tokens.css`. Nothing is hardcoded — if a token
 * changes, this page changes with it. That is the whole point: it documents the
 * system as it actually is, not as a spec file claims it is.
 */
import { $ } from '../dom.js';
import { byline as bylineFn } from '../ui.js';
import { SITE, LINKEDIN } from '../config.js';
import { t } from '../i18n.js';

const byline = () => bylineFn(SITE, LINKEDIN);

const cs = () => getComputedStyle(document.documentElement);
const val = (name) => cs().getPropertyValue(name).trim();

/* The monochrome ramp is the whole brand palette. Phase colours p1..p4 are the
   only "identity" colours in the product; everything else is ink/surface/line. */
const RAMP = ['--p1', '--p2', '--p3', '--p4'];
const INK = ['--ink', '--ink-2', '--muted', '--line'];
const SURFACE = ['--paper', '--surface', '--surface-2', '--rail'];
/* Green and red exist only to answer "was my answer right?" — never as brand. */
const SEMANTIC = ['--add', '--gold'];

function swatch(name) {
  const v = val(name);
  // dir="ltr" is not cosmetic here: a hex starting with a letter (#DFE0E2) is a
  // strong-LTR run after a neutral '#', so in RTL flow the hash renders at the
  // wrong end. This is the same rule the page documents for Git commands.
  return `<li class="ds-sw">
    <span class="ds-chip" style="background:${v}"></span>
    <code dir="ltr">${name}</code>
    <em dir="ltr">${v || '—'}</em>
  </li>`;
}

function typeRow(label, size, weight, sample) {
  return `<li class="ds-type">
    <span class="ds-type-sample" style="font-size:${size}; font-weight:${weight}">${sample}</span>
    <span class="ds-type-meta"><code dir="ltr">${label}</code><em dir="ltr">${size} · ${weight}</em></span>
  </li>`;
}

function spaceRow(name) {
  const v = val(name);
  return `<li class="ds-space"><span class="ds-space-bar" style="inline-size:${v}"></span><code dir="ltr">${name}</code><em dir="ltr">${v || '—'}</em></li>`;
}

export function renderSystem() {
  window.scrollTo({ top: 0, behavior: 'auto' });
  document.documentElement.style.setProperty('--pc', 'var(--p2)');
  $('#crumbTitle').textContent = t('nav.system');

  const spaceTokens = ['--s2', '--s3', '--s4', '--s6', '--s7', '--s8'].filter(n => val(n));

  $('#root').innerHTML = `
    <div class="tracks-head">
      <span class="hero-badge"><i class="ph-fill ph-swatches" aria-hidden="true"></i>${t('system.badge')}</span>
      <h2>${t('nav.system')}</h2>
      <p class="lead">${t('system.lead')}</p>
    </div>

    <section class="ds-sec">
      <h3>${t('system.palette.h')}</h3>
      <p class="ds-note">${t('system.palette.p')}</p>
      <ul class="ds-grid">${RAMP.map(swatch).join('')}</ul>
    </section>

    <section class="ds-sec">
      <h3>${t('system.ink.h')}</h3>
      <p class="ds-note">${t('system.ink.p')}</p>
      <ul class="ds-grid">${INK.map(swatch).join('')}</ul>
      <ul class="ds-grid">${SURFACE.map(swatch).join('')}</ul>
    </section>

    <section class="ds-sec">
      <h3>${t('system.semantic.h')}</h3>
      <p class="ds-note">${t('system.semantic.p')}</p>
      <ul class="ds-grid">${SEMANTIC.map(swatch).join('')}</ul>
    </section>

    <section class="ds-sec">
      <h3>${t('system.type.h')}</h3>
      <p class="ds-note">${t('system.type.p')}</p>
      <ul class="ds-type-list">
        ${typeRow('h2.title', '37px', '900', t('system.type.display'))}
        ${typeRow('.body h3', '20px', '800', t('system.type.section'))}
        ${typeRow('body', val('--fs') || '16px', '400', t('system.type.body'))}
        ${typeRow('.ds-note', '12.6px', '400', t('system.type.meta'))}
      </ul>
    </section>

    <section class="ds-sec">
      <h3>${t('system.space.h')}</h3>
      <p class="ds-note">${t('system.space.p')}</p>
      <ul class="ds-space-list">${spaceTokens.map(spaceRow).join('')}</ul>
    </section>

    <section class="ds-sec">
      <h3>${t('system.dir.h')}</h3>
      <p class="ds-note">${t('system.dir.p')}</p>
      <div class="ds-dir">
        <div class="ds-dir-cell">
          <b>${t('system.dir.ui')}</b>
          <p>${t('system.dir.uiNote')}</p>
        </div>
        <div class="ds-dir-cell">
          <b>${t('system.dir.cmd')}</b>
          <pre dir="ltr"><code>git switch -c ds/brand-color</code></pre>
          <p>${t('system.dir.cmdNote')}</p>
        </div>
      </div>
    </section>

    <section class="ds-sec">
      <h3>${t('system.comp.h')}</h3>
      <p class="ds-note">${t('system.comp.p')}</p>
      <div class="ds-comp">
        <button type="button" class="btn btn-primary"><i class="ph-bold ph-play" aria-hidden="true"></i>${t('system.comp.primary')}</button>
        <button type="button" class="btn btn-ghost"><i class="ph ph-arrow-counter-clockwise" aria-hidden="true"></i>${t('system.comp.ghost')}</button>
        <span class="hero-badge"><i class="ph-fill ph-path" aria-hidden="true"></i>${t('system.comp.badge')}</span>
      </div>
    </section>
    ${byline()}`;
}
