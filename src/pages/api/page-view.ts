import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';
import { geolocation } from '@vercel/edge';
import { detectBot } from '../../lib/ai-crawlers';

export const prerender = false;

const sql = neon(import.meta.env.DATABASE_URL);

// Input validation constants
const MAX_PATH_LENGTH = 2048;
const MAX_REFERRER_LENGTH = 2048;

/**
 * Sanitize and validate a URL path
 */
function sanitizePath(input: unknown): string | null {
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
function sanitizeReferrer(input: unknown): string {
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
function sanitizeCity(input: string): string {
  return input.replace(/[^a-zA-Z ]/g, ' ').trim();
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse JSON body with error handling
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    // Validate body is an object
    if (!body || typeof body !== 'object') {
      return Response.json(
        { error: 'Request body must be an object' },
        { status: 400 }
      );
    }

    const { path: rawPath, referrer: rawReferrer } = body as Record<
      string,
      unknown
    >;

    // Validate and sanitize inputs
    const path = sanitizePath(rawPath);
    if (!path) {
      return Response.json(
        { error: 'Invalid or missing path parameter' },
        { status: 400 }
      );
    }

    const referrer = sanitizeReferrer(rawReferrer);

    // Get geolocation data
    const { flag, country, city, latitude, longitude } = geolocation(request);

    // Detect AI crawlers from User-Agent header
    const userAgent = request.headers.get('user-agent');
    const botName = detectBot(userAgent);

    // Validate required geolocation data
    if (!(flag && country && city && latitude && longitude)) {
      return Response.json(
        { error: 'Missing geolocation data' },
        { status: 400 }
      );
    }

    const sanitizedCity = sanitizeCity(city);
    const date = new Date();

    // Insert into database (parameterized query prevents SQL injection)
    await sql(
      'INSERT INTO analytics(date, path, referrer, flag, country, city, bot_name) VALUES($1, $2, $3, $4, $5, $6, $7)',
      [date, path, referrer, flag, country, sanitizedCity, botName]
    );

    return Response.json({
      message: {
        date,
        path,
        referrer,
        flag,
        country,
        city: sanitizedCity,
        bot_name: botName
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
};
