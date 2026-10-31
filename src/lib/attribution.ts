/**
 * Remembers how a visitor first arrived at the site, so a booking made days
 * later can still be credited to the link that brought them in.
 *
 * Recorded on the first page view and kept for 30 days in the visitor's own
 * browser (nothing is sent anywhere until they submit a form):
 *   ref           ?ref=... on the link, e.g. kaizen.ph/?ref=matt
 *   utm_source / utm_medium / utm_campaign   standard tracking tags
 *   landing_page  the first page they opened on the site
 *   referrer      the site that linked to us (e.g. l.instagram.com)
 *
 * Every read and write is wrapped: private browsing or blocked storage just
 * means the fields are sent empty.
 */

const STORAGE_KEY = "kaizen-first-visit";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export type Attribution = {
  ref?: string | undefined;
  utmSource?: string | undefined;
  utmMedium?: string | undefined;
  utmCampaign?: string | undefined;
  landingPage?: string | undefined;
  referrer?: string | undefined;
};

type Stored = Attribution & { savedAt: number };

function clean(
  value: string | null | undefined,
  max = 120,
): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

function readStored(): Stored | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (typeof parsed.savedAt !== "number") return null;
    if (Date.now() - parsed.savedAt > MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Call once on every page load; only the first visit (or a new tagged link) is kept. */
export function recordVisit(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const fromLink: Attribution = {
      ref: clean(params.get("ref")),
      utmSource: clean(params.get("utm_source")),
      utmMedium: clean(params.get("utm_medium")),
      utmCampaign: clean(params.get("utm_campaign")),
    };
    const tagged = Object.values(fromLink).some(Boolean);
    const existing = readStored();
    // Keep the first visit, unless they come back through a new tagged link.
    if (existing && !tagged) return;

    let referrer: string | undefined;
    try {
      const host = document.referrer ? new URL(document.referrer).hostname : "";
      if (host && host !== window.location.hostname) referrer = clean(host);
    } catch {
      referrer = undefined;
    }

    const next: Stored = {
      ...fromLink,
      landingPage: clean(window.location.pathname, 200),
      referrer,
      savedAt: Date.now(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage blocked: nothing to remember.
  }
}

/** What to send with a form submission. Empty if nothing was recorded. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const stored = readStored();
  if (!stored) return {};
  const { savedAt: _savedAt, ...rest } = stored;
  return rest;
}
