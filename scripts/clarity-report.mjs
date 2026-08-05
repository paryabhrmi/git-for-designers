#!/usr/bin/env node
/**
 * Pull the Clarity Data Export API and render a self-contained HTML report.
 *
 *   CLARITY_API_TOKEN=… node scripts/clarity-report.mjs --days 3
 *   CLARITY_API_TOKEN=… node scripts/clarity-report.mjs --days 1 --dims OS,Device
 *   node scripts/clarity-report.mjs --mock fixture.json      # render without calling out
 *
 * The token never leaves your machine: it is read from the environment, used for
 * one request, and never written into the report or committed anywhere. Do not
 * put it in js/config.js — that file ships to the browser.
 *
 * The API is deliberately small: the last 1–3 days only, up to three dimensions
 * per call, and a low daily request budget. This script therefore writes the raw
 * response next to the report so you can re-render without spending a call.
 *
 * Nothing here assumes a response shape. Metric names, row fields and dimension
 * names are discovered from what actually comes back, so a change on Clarity's
 * side degrades into "a column I have not seen before" instead of a crash.
 */
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const API = 'https://www.clarity.ms/export-data/api/v1/project-live-insights';
const OUT_DIR = resolve(process.cwd(), '.clarity');
const OUT_HTML = resolve(OUT_DIR, 'report.html');
const OUT_JSON = resolve(OUT_DIR, 'raw.json');

/* ---------- arguments ---------- */
function args(argv) {
  const o = { days: 3, dims: [], mock: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--days') o.days = Number(argv[++i]);
    else if (a === '--dims') o.dims = String(argv[++i]).split(',').map(s => s.trim()).filter(Boolean);
    else if (a === '--mock') o.mock = argv[++i];
    else if (a === '--help' || a === '-h') o.help = true;
  }
  return o;
}

const HELP = `
clarity-report — fetch Clarity insights and render an HTML report

  --days N        1, 2 or 3 (the API accepts no more). Default 3.
  --dims A,B,C    up to three dimensions, e.g. OS,Device,Country
  --mock FILE     render from a saved JSON response instead of calling the API
  --help

Environment:
  CLARITY_API_TOKEN   generated in Clarity → Settings → Data export
`;

/* ---------- fetch ---------- */
async function fetchInsights({ days, dims }) {
  const token = process.env.CLARITY_API_TOKEN;
  if (!token) {
    throw new Error('CLARITY_API_TOKEN is not set. Generate one in Clarity → Settings → Data export, then run:\n  CLARITY_API_TOKEN=… node scripts/clarity-report.mjs');
  }
  if (![1, 2, 3].includes(days)) throw new Error(`--days must be 1, 2 or 3 (got ${days}). The API does not serve longer ranges.`);
  if (dims.length > 3) throw new Error(`--dims takes at most three (got ${dims.length}).`);

  const url = new URL(API);
  url.searchParams.set('numOfDays', String(days));
  dims.forEach((d, i) => url.searchParams.set(`dimension${i + 1}`, d));

  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const body = await res.text();
  if (res.status === 401 || res.status === 403) {
    throw new Error(`Clarity rejected the token (${res.status}). Generate a fresh one in Settings → Data export.`);
  }
  if (res.status === 429) {
    throw new Error('Clarity rate-limited this project (429). The export API allows only a handful of calls per day — re-render the saved response with --mock .clarity/raw.json instead of refetching.');
  }
  if (!res.ok) throw new Error(`Clarity returned ${res.status}: ${body.slice(0, 400)}`);
  try { return JSON.parse(body); } catch { throw new Error(`Clarity returned something that is not JSON:\n${body.slice(0, 400)}`); }
}

/* ---------- render ---------- */
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const isNum = (v) => v !== '' && v !== null && v !== undefined && !Number.isNaN(Number(v));

/** Discover columns from the rows themselves — never from a hard-coded list. */
function columns(rows) {
  const seen = [];
  for (const r of rows) for (const k of Object.keys(r)) if (!seen.includes(k)) seen.push(k);
  // dimension-ish columns (non-numeric) first, so a table reads label → numbers
  const dim = seen.filter(k => rows.some(r => r[k] != null && !isNum(r[k])));
  return [...dim, ...seen.filter(k => !dim.includes(k))];
}

function table(rows) {
  if (!rows.length) return '<p class="empty">هیچ ردیفی برنگشت.</p>';
  const cols = columns(rows);
  // sort by the first numeric column, descending — the biggest bar first
  const numCol = cols.find(c => rows.every(r => r[c] == null || isNum(r[c])));
  const sorted = numCol ? [...rows].sort((a, b) => Number(b[numCol] || 0) - Number(a[numCol] || 0)) : rows;
  const max = numCol ? Math.max(...sorted.map(r => Number(r[numCol] || 0)), 1) : 1;
  return `<table><thead><tr>${cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${
    sorted.map(r => `<tr>${cols.map(c => {
      const v = r[c] ?? '';
      if (c === numCol && isNum(v)) {
        const pct = (Number(v) / max * 100).toFixed(1);
        return `<td class="n"><span class="bar" style="width:${pct}%"></span><b>${esc(v)}</b></td>`;
      }
      // Same rule the course itself teaches: a Latin run inside RTL flow reorders.
      // '/#/level-10' renders as 'level-10/#/' unless the cell is isolated LTR.
      const ascii = typeof v === 'string' && v !== '' && !/[^\x00-\x7F]/.test(v);
      return `<td${isNum(v) ? ' class="n"' : (ascii ? ' class="ltr" dir="ltr"' : '')}>${esc(v)}</td>`;
    }).join('')}</tr>`).join('')
  }</tbody></table>`;
}

function render(payload, meta) {
  const metrics = Array.isArray(payload) ? payload : [payload];
  const cards = metrics.map(m => {
    const name = m.metricName || m.name || 'metric';
    const rows = Array.isArray(m.information) ? m.information : (Array.isArray(m.rows) ? m.rows : []);
    return `<section><h2>${esc(name)}</h2>${table(rows)}</section>`;
  }).join('');

  return `<!doctype html>
<html lang="fa" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>گزارش Clarity — Git برای طراحان</title>
<style>
  :root{--paper:#F1F1F2;--surface:#fff;--ink:#131416;--muted:#63676D;--line:#DFE0E2;
        --mono:ui-monospace,Menlo,Consolas,monospace;}
  @media (prefers-color-scheme:dark){:root{--paper:#0B0C0E;--surface:#141619;--ink:#F0F1F2;--muted:#9AA0A8;--line:#262A30;}}
  :root[data-theme=dark]{--paper:#0B0C0E;--surface:#141619;--ink:#F0F1F2;--muted:#9AA0A8;--line:#262A30;}
  :root[data-theme=light]{--paper:#F1F1F2;--surface:#fff;--ink:#131416;--muted:#63676D;--line:#DFE0E2;}
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:var(--paper);color:var(--ink);font-family:system-ui,-apple-system,'Segoe UI',sans-serif;
       line-height:1.7;padding:38px 22px 90px;}
  .wrap{max-width:940px;margin:0 auto;}
  h1{font-size:26px;font-weight:800;letter-spacing:-.5px;}
  .meta{color:var(--muted);font-size:13.5px;margin-top:6px;font-family:var(--mono);direction:ltr;text-align:right;}
  .warn{margin:20px 0 0;padding:12px 15px;border:1px solid var(--line);border-inline-start:3px solid var(--muted);
        border-radius:10px;color:var(--muted);font-size:13px;background:var(--surface);}
  section{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:18px 20px;margin-top:18px;overflow-x:auto;}
  h2{font-size:16px;font-weight:700;margin-bottom:12px;}
  table{width:100%;border-collapse:collapse;font-size:13.5px;min-width:520px;}
  th{text-align:start;color:var(--muted);font-weight:700;font-size:12px;padding:6px 10px;border-bottom:1px solid var(--line);white-space:nowrap;}
  td{padding:7px 10px;border-bottom:1px solid var(--line);vertical-align:middle;}
  td.n{font-family:var(--mono);direction:ltr;text-align:end;position:relative;white-space:nowrap;}
  td.ltr{font-family:var(--mono);font-size:12.5px;direction:ltr;unicode-bidi:isolate;text-align:start;}
  .bar{position:absolute;inset-inline-start:0;top:4px;bottom:4px;background:color-mix(in srgb,var(--ink) 10%,transparent);border-radius:5px;z-index:0;}
  td.n b{position:relative;z-index:1;font-weight:700;}
  .empty{color:var(--muted);font-size:13px;}
</style></head><body><div class="wrap">
<h1>گزارش Clarity</h1>
<div class="meta">${esc(meta.generated)} · ${esc(meta.source)}</div>
<div class="warn">مسدودکننده‌های تبلیغات جلوی Clarity را می‌گیرند و مخاطب این سایت فنی است، پس این اعداد کم‌شمارند. آن‌ها را نسبت بخوان، نه تعداد بازدیدکننده.</div>
${cards || '<p class="empty">پاسخ خالی بود.</p>'}
</div></body></html>`;
}

/* ---------- main ---------- */
const o = args(process.argv.slice(2));
if (o.help) { console.log(HELP); process.exit(0); }

let payload, source;
try {
  if (o.mock) {
    payload = JSON.parse(readFileSync(o.mock, 'utf8'));
    source = `rendered from ${o.mock}`;
  } else {
    payload = await fetchInsights(o);
    source = `live · last ${o.days}d` + (o.dims.length ? ` · dims: ${o.dims.join(', ')}` : '');
  }
} catch (err) {
  console.error('\n✗ ' + err.message + '\n');
  process.exit(1);
}

mkdirSync(dirname(OUT_HTML), { recursive: true });
if (!o.mock) writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2));
writeFileSync(OUT_HTML, render(payload, { generated: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC', source }));

const metrics = Array.isArray(payload) ? payload : [payload];
console.log('\n✓ Clarity report');
for (const m of metrics) {
  const rows = Array.isArray(m.information) ? m.information : [];
  console.log(`  ${String(m.metricName || m.name || 'metric').padEnd(26)} ${rows.length} row(s)`);
}
console.log(`\n  report → ${OUT_HTML}`);
if (!o.mock) console.log(`  raw    → ${OUT_JSON}   (re-render with --mock, it costs no API call)\n`);
else console.log('');
