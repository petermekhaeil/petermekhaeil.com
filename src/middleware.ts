import { defineMiddleware } from 'astro:middleware';
import { getGitHubTilRepo, type TIL } from './_data/github_til_repo';
import { markdownToHtml } from './lib/markdownToHtml';

let cachedTils: TIL[] | null = null;
let lastFetched = 0;

const tilRoute = '/today-i-learned/random';

export const onRequest = defineMiddleware(async (context, next) => {
  if (new URL(context.url).pathname.startsWith(tilRoute)) {
    const now = Date.now();
    const isStale = now - lastFetched > 3600 * 1000; // 1 hour

    if (!cachedTils || isStale) {
      // Cache is empty or stale, fetch the TILs
      try {
        cachedTils = await getGitHubTilRepo();
        lastFetched = now;
      } catch (error) {
        console.error('Failed to update TIL cache:', error);
        return next();
      }
    }

    const randomTil = cachedTils[Math.floor(Math.random() * cachedTils.length)];

    if (!randomTil) {
      return new Response('No TILs found', { status: 404 });
    }

    const response = await next();
    const htmlOriginal = await response.text();
    const content = (await markdownToHtml(randomTil.content)) as string;

    const html = htmlOriginal
      .replaceAll(`{{TITLE}}`, randomTil.title)
      .replaceAll(`{{CONTENT}}`, content);

    return new Response(html, {
      status: 200,
      headers: {
        ...response.headers,
        'Content-Type': 'text/html',
        'Cache-Control': 's-maxage=60, stale-while-revalidate=300' // Cache for 60 seconds, revalidate in the background
      }
    });
  }

  return next();
});
