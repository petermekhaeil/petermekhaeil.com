import type { MiddlewareHandler } from 'astro';
import { geolocation } from '@vercel/edge';
import { detectBot } from './lib/ai-crawlers';
import { isPageRequest, trackPageView } from './lib/analytics';

/**
 * Middleware to track bot/crawler page views server-side.
 * Bots don't execute JavaScript, so client-side tracking won't catch them.
 * Human visitors are tracked via client-side Analytics component.
 */
export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();

  // Skip during prerendering - no tracking needed for static generation
  // import.meta.env.PROD is true during build AND runtime, but we only
  // want to track during actual runtime requests
  if (context.isPrerendered) {
    return response;
  }

  const { request, url } = context;

  // Only track HTML page requests
  if (!isPageRequest(request, url)) {
    return response;
  }

  // Only track successful responses
  if (!response.ok) {
    return response;
  }

  // Detect if request is from a bot
  const userAgent = request.headers.get('user-agent');
  const botName = detectBot(userAgent);

  // Only track bot visits - humans are tracked via client-side JS
  if (!botName) {
    return response;
  }

  try {
    const { flag, country, city } = geolocation(request);
    const referrer = request.headers.get('referer');

    await trackPageView({
      path: url.pathname,
      referrer,
      flag: flag || null,
      country: country || null,
      city: city || null,
      botName
    });
  } catch (error) {
    // Log but don't block the response
    console.error('Bot tracking error:', error);
  }

  return response;
};
