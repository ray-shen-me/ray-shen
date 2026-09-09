/**
 * RUM tracker for ray-shen.me (tasks 4.1–4.6, design D2–D12).
 *
 * Loaded as a bundled Astro script (<script> in Base.astro). Reads the site
 * key from <meta name="rum-site"> so it is not a build-time constant (D12).
 *
 * Privacy guarantees (design D8–D9):
 *   - Cookieless: session ID lives only in sessionStorage (fresh per visit).
 *   - Honors GPC and DNT: no-ops if either signal is set (task 4.1).
 *   - No raw IP, full UA, or full referrer URL ever sent to the server.
 *   - All geo/device derivation happens server-side and the raw inputs are
 *     immediately discarded by ingest (design D6, D9).
 */

// --- Task 4.1: Privacy gate ---
// GPC is a boolean; DNT is the string '1' when set.
if (
  (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl ||
  navigator.doNotTrack === '1'
) {
  // Signal set — no-op entirely.
  throw new Error('[rum] GPC/DNT set — tracker disabled');
}

// --- Task 4.2: Site key + session / pageview IDs ---
const SITE = document.querySelector('meta[name="rum-site"]')?.getAttribute('content');
if (!SITE) throw new Error('[rum] missing rum-site meta tag');

const INGEST_URL = document.querySelector('meta[name="rum-ingest"]')?.getAttribute('content')
  ?? 'https://api.ray-shen.me/track';

// sessionStorage UUID — cookieless, fresh per browser tab/visit (design D8).
function getOrCreateId(key: string): string {
  try {
    let id = sessionStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(key, id);
    }
    return id;
  } catch {
    // sessionStorage unavailable (private mode, security policy) — generate
    // a page-scoped ID that won't persist but lets the beacon be valid.
    return crypto.randomUUID();
  }
}

const sid  = getOrCreateId('rum_sid');
const pvid = crypto.randomUUID(); // fresh per page load (design D5)

// --- Task 4.3: Engaged time via Page Visibility API ---
// Only counts time the tab is visible — never background-tab time.
let engagedMs = 0;
let visibleSince: number | null = document.visibilityState === 'visible' ? Date.now() : null;

function snapshotEngagedMs(): void {
  if (visibleSince !== null) {
    engagedMs += Date.now() - visibleSince;
    visibleSince = null;
  }
}

function currentEngagedMs(): number {
  return visibleSince !== null ? engagedMs + (Date.now() - visibleSince) : engagedMs;
}

// --- Task 4.4: Section funnel via IntersectionObserver ---
const SECTION_ORDER = ['hero', 'about', 'experience', 'projects', 'contact'];
const seenSections  = new Set<string>();
let   maxSection: string | null = null;

const sectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const slug = entry.target.id;
      if (!SECTION_ORDER.includes(slug)) continue;
      if (!seenSections.has(slug)) {
        seenSections.add(slug);
        const idx    = SECTION_ORDER.indexOf(slug);
        const maxIdx = maxSection ? SECTION_ORDER.indexOf(maxSection) : -1;
        if (idx > maxIdx) maxSection = slug;
      }
    }
  },
  { threshold: 0.2 },
);

// Observe every section that matches a tracked slug (uses existing id= attributes).
SECTION_ORDER.forEach((slug) => {
  const el = document.getElementById(slug);
  if (el) sectionObserver.observe(el);
});

// --- Behavioral signals (for bot detection, design D7) ---
let scrolled = false;
let pointer  = false;
document.addEventListener('scroll',     () => { scrolled = true; }, { passive: true });
document.addEventListener('pointerdown',() => { pointer  = true; }, { passive: true });
document.addEventListener('keydown',    () => { pointer  = true; }, { passive: true });

// --- Beacon dispatch ---
let beaconCount = 0;

type ClickBeacon = { t: 'click'; target: string; href_host?: string };
type FlushBeacon = { t: 'flush' | 'pageview' };

function dispatch(extra: ClickBeacon | FlushBeacon): void {
  beaconCount++;
  const isFlush = extra.t === 'flush';
  const payload: Record<string, unknown> = {
    site:     SITE,
    sid,
    pvid,
    t:        extra.t,
    page:     location.pathname,
    // Referrer only on the first beacon (design D9 — reduced to hostname server-side).
    ...(beaconCount === 1 && document.referrer ? { ref: document.referrer } : {}),
    engaged_ms: currentEngagedMs(),
    ...(isFlush ? {
      sections:    [...seenSections],
      max_section: maxSection ?? undefined,
      signals:     { scrolled, pointer, beacons: beaconCount },
    } : {}),
    ...('target' in extra ? { target: extra.target, href_host: extra.href_host } : {}),
  };
  // sendBeacon with text/plain body = CORS simple request, no preflight (design D2).
  navigator.sendBeacon(INGEST_URL, JSON.stringify(payload));
}

// --- Task 4.5: Click tracking ---
// Immediate beacons for outbound / handoff clicks.
document.addEventListener('click', (e) => {
  const anchor = (e.target as Element).closest('a');
  if (!anchor) return;
  const href = anchor.getAttribute('href') ?? '';

  let target: string | null = null;
  if (anchor.hostname === 'github.com')                         target = 'github';
  else if (href.startsWith('mailto:'))                          target = 'email';
  else if (href.endsWith('.pdf') || href.includes('resume'))    target = 'resume';
  else if (anchor.hostname === 'linkedin.com' ||
           anchor.hostname === 'www.linkedin.com')              target = 'linkedin';

  if (target) {
    dispatch({ t: 'click', target, href_host: anchor.hostname || undefined });
  }
});

// --- Task 4.6: Lifecycle beacons ---
// Pageview-start beacon fires immediately on load.
dispatch({ t: 'pageview' });

// Flush on visibilitychange → hidden (tab switch, background, close).
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // Tab came back — resume engaged-time accumulation.
    visibleSince = Date.now();
  } else {
    // Tab hidden — snapshot engaged time, flush.
    snapshotEngagedMs();
    dispatch({ t: 'flush' });
  }
});

// Flush on pagehide (navigation away, page unload). sendBeacon is safe here.
// We deliberately do NOT use 'unload' (design D3 — deprecated, unreliable on mobile).
window.addEventListener('pagehide', () => {
  snapshotEngagedMs();
  dispatch({ t: 'flush' });
});
