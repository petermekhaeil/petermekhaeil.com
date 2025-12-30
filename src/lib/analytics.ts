import { neon } from '@neondatabase/serverless';

const sql = neon(import.meta.env.DATABASE_URL);

// Validation constants
const MAX_PATH_LENGTH = 2048;
const MAX_REFERRER_LENGTH = 2048;

/**
 * Sanitize and validate a URL path
 */
export function sanitizePath(input: string | null | undefined): string | null {
  if (typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_PATH_LENGTH) return null;
  // Only allow valid URL path characters
  if (!/^[\w\-./~%?&=#]+$/.test(trimmed)) return null;
  return trimmed;
}

/**
 * Sanitize and validate a referrer URL
 */
export function sanitizeReferrer(input: string | null | undefined): string {
  if (typeof input !== 'string') return '';
  const trimmed = input.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_REFERRER_LENGTH) return '';
  // Basic URL validation - must start with http(s) or be empty
  if (trimmed && !/^https?:\/\/.+/i.test(trimmed)) return '';
  return trimmed;
}

/**
 * Sanitize city name - only allow letters and spaces
 */
export function sanitizeCity(input: string | null | undefined): string | null {
  if (typeof input !== 'string') return null;
  return input.replace(/[^a-zA-Z ]/g, ' ').trim() || null;
}

/**
 * Check if a request is for an HTML page (not an API, asset, or other non-page request)
 */
export function isPageRequest(request: Request, url: URL): boolean {
  // Check Accept header - browsers request text/html for pages
  const accept = request.headers.get('accept') || '';
  if (!accept.includes('text/html')) {
    return false;
  }

  // Skip known non-page paths
  if (url.pathname.startsWith('/api/')) {
    return false;
  }

  return true;
}

interface TrackPageViewParams {
  path: string;
  referrer: string | null;
  flag: string | null;
  country: string | null;
  city: string | null;
  botName: string | null;
}

/**
 * Track a page view in the database
 */
export async function trackPageView(
  params: TrackPageViewParams
): Promise<void> {
  const path = sanitizePath(params.path);
  if (!path) {
    throw new Error('Invalid path');
  }

  const referrer = sanitizeReferrer(params.referrer);
  const city = sanitizeCity(params.city);

  await sql(
    'INSERT INTO analytics(date, path, referrer, flag, country, city, bot_name) VALUES($1, $2, $3, $4, $5, $6, $7)',
    [
      new Date(),
      path,
      referrer,
      params.flag || null,
      params.country || null,
      city,
      params.botName
    ]
  );
}
