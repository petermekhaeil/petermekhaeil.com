import type { MiddlewareHandler } from 'astro';
import { geolocation } from '@vercel/edge';
import { detectBot } from './lib/ai-crawlers';
import { isPageRequest, trackPageView } from './lib/analytics';

/**
 * Middleware to track bot/crawler page views server-side.
 * Bots don't execute JavaScript, so client-side tracking won't catch them.
 * Human visitors are tracked via client-side Analytics component.
 */
export const onRequest: MiddlewareHandler = async ({ request, url }, next) => {
  const response = await next();

  // Get user-agent first - if missing, this is a build-time prerender, not a real request
  const userAgent = request.headers.get('user-agent');
  if (!userAgent) {
    return response;
  }

  // Only track bot visits - humans are tracked via client-side JS
  const botName = detectBot(userAgent);
  if (!botName) {
    return response;
  }

  // Only track HTML page requests
  if (!isPageRequest(request, url)) {
    return response;
  }

  // Only track successful responses
  if (!response.ok) {
    return response;
  }

  // Must have geolocation data (ensures this is a real Vercel edge request)
  const { flag, country, city } = geolocation(request);
  if (!flag || !country) {
    return response;
  }

  try {
    const referrer = request.headers.get('referer');

    await trackPageView({
      path: url.pathname,
      referrer,
      flag,
      country,
      city: city || null,
      botName
    });
  } catch (error) {
    console.error('Bot tracking error:', error);
  }

  return response;
};
