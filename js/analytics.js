import { CLARITY_ID } from './config.js';

/**
 * Microsoft Clarity, loaded only when a project id is configured.
 *
 * Two rules this file exists to keep:
 *
 * 1. Without an id, nothing loads. A fork of this repo stays exactly as
 *    dependency-free as it was, and no one inherits someone else's analytics.
 * 2. The site tells learners what happens to their data on the intro screen.
 *    That copy and this file have to agree — if you turn Clarity on, the
 *    privacy line must say so. It already does; do not revert one without the
 *    other.
 *
 * Clarity records interactions (clicks, scrolls, a replayable session) and
 * sends them to Microsoft. It does not touch localStorage progress, and the
 * course keeps working with the script blocked, which is the normal case for
 * anyone running a content blocker.
 */
/** True when this build actually loads analytics — drives the privacy copy. */
export const analyticsEnabled = () => !!CLARITY_ID;

export function initAnalytics() {
  if (!CLARITY_ID) return false;
  if (window.clarity) return true;                       // already installed
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return false;

  // Clarity's own bootstrap, kept verbatim in shape so their loader recognises it.
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_ID);
  return true;
}

/** Report a route change to Clarity as a page view; a no-op when it is off. */
export function trackView(route) {
  if (window.clarity) window.clarity('set', 'route', String(route));
}
