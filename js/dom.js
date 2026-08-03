export const $ = (s) => document.querySelector(s);
import { getLang } from './i18n.js';
export const FA = (n) => getLang() === 'en' ? String(n) : String(n).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
