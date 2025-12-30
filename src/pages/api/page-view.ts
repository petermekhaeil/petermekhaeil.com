import type { APIRoute } from 'astro';
import { geolocation } from '@vercel/edge';
import { detectBot } from '../../lib/ai-crawlers';
import {
  sanitizePath,
  sanitizeReferrer,
  trackPageView
} from '../../lib/analytics';

export const prerender = false;

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

    // Validate path
    const path = sanitizePath(rawPath as string);
    if (!path) {
      return Response.json(
        { error: 'Invalid or missing path parameter' },
        { status: 400 }
      );
    }

    const referrer = sanitizeReferrer(rawReferrer as string);

    // Get geolocation data
    const { flag, country, city, latitude, longitude } = geolocation(request);

    // Validate required geolocation data
    if (!(flag && country && city && latitude && longitude)) {
      return Response.json(
        { error: 'Missing geolocation data' },
        { status: 400 }
      );
    }

    // Detect bot from User-Agent header
    const userAgent = request.headers.get('user-agent');
    const botName = detectBot(userAgent);

    await trackPageView({
      path,
      referrer,
      flag,
      country,
      city,
      botName
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
};
