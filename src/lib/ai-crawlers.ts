/**
 * Bot Detection Utility
 *
 * - Uses `isbot` for detection
 * - Uses a curated list of bot patterns for friendly names
 *
 * Sources:
 * - https://github.com/omrilotan/isbot
 * - https://github.com/monperrus/crawler-user-agents
 * - https://bots.fyi
 */

import { isbot } from 'isbot';

/**
 * Curated list of bot patterns with friendly names.
 * Ordered from most specific to least specific.
 */
const BOT_PATTERNS: { pattern: RegExp; name: string }[] = [
  // AI Crawlers & Assistants
  { pattern: /GPTBot/i, name: 'GPTBot' },
  { pattern: /ChatGPT-User/i, name: 'ChatGPT-User' },
  { pattern: /OAI-SearchBot/i, name: 'OAI-SearchBot' },
  { pattern: /ClaudeBot/i, name: 'ClaudeBot' },
  { pattern: /Claude-User/i, name: 'Claude-User' },
  { pattern: /Claude-SearchBot/i, name: 'Claude-SearchBot' },
  { pattern: /PerplexityBot/i, name: 'PerplexityBot' },
  { pattern: /Perplexity-User/i, name: 'Perplexity-User' },
  { pattern: /Amazonbot/i, name: 'Amazonbot' },
  { pattern: /meta-externalagent/i, name: 'Meta AI' },
  { pattern: /Google-Extended/i, name: 'Google-Extended' },
  { pattern: /CCBot/i, name: 'CCBot' },
  { pattern: /Bytespider/i, name: 'Bytespider' },
  { pattern: /TikTokSpider/i, name: 'TikTokSpider' },
  { pattern: /Applebot/i, name: 'Applebot' },
  { pattern: /cohere-ai/i, name: 'Cohere' },
  { pattern: /AI2Bot/i, name: 'AI2Bot' },
  { pattern: /Diffbot/i, name: 'Diffbot' },
  { pattern: /ImagesiftBot/i, name: 'ImagesiftBot' },
  { pattern: /YouBot/i, name: 'YouBot' },

  // Search Engines
  { pattern: /Googlebot-Image/i, name: 'Googlebot-Image' },
  { pattern: /Googlebot-Video/i, name: 'Googlebot-Video' },
  { pattern: /Googlebot-News/i, name: 'Googlebot-News' },
  { pattern: /Googlebot/i, name: 'Googlebot' },
  { pattern: /bingbot/i, name: 'Bingbot' },
  { pattern: /BingPreview/i, name: 'BingPreview' },
  { pattern: /msnbot/i, name: 'MSNBot' },
  { pattern: /Slurp/i, name: 'Yahoo! Slurp' },
  { pattern: /DuckDuckBot/i, name: 'DuckDuckBot' },
  { pattern: /Baiduspider/i, name: 'Baiduspider' },
  { pattern: /YandexBot/i, name: 'YandexBot' },
  { pattern: /Sogou/i, name: 'Sogou' },
  { pattern: /PetalBot/i, name: 'PetalBot' },
  { pattern: /Qwantify/i, name: 'Qwantify' },
  { pattern: /SeznamBot/i, name: 'SeznamBot' },
  { pattern: /NaverBot|Yeti/i, name: 'NaverBot' },

  // Social Media
  { pattern: /Twitterbot/i, name: 'Twitterbot' },
  { pattern: /facebookexternalhit/i, name: 'Facebook' },
  { pattern: /LinkedInBot/i, name: 'LinkedInBot' },
  { pattern: /Slackbot/i, name: 'Slackbot' },
  { pattern: /TelegramBot/i, name: 'TelegramBot' },
  { pattern: /Discordbot/i, name: 'Discordbot' },
  { pattern: /WhatsApp/i, name: 'WhatsApp' },
  { pattern: /Pinterest/i, name: 'Pinterest' },
  { pattern: /redditbot/i, name: 'Redditbot' },
  { pattern: /Mastodon/i, name: 'Mastodon' },

  // SEO Tools
  { pattern: /SemrushBot/i, name: 'SemrushBot' },
  { pattern: /AhrefsBot/i, name: 'AhrefsBot' },
  { pattern: /MJ12bot/i, name: 'MJ12bot' },
  { pattern: /DotBot/i, name: 'DotBot' },
  { pattern: /Screaming Frog/i, name: 'Screaming Frog' },
  { pattern: /SEOkicks/i, name: 'SEOkicks' },
  { pattern: /DataForSeoBot/i, name: 'DataForSeoBot' },

  // Monitoring
  { pattern: /UptimeRobot/i, name: 'UptimeRobot' },
  { pattern: /Pingdom/i, name: 'Pingdom' },
  { pattern: /GTmetrix/i, name: 'GTmetrix' },
  { pattern: /Chrome-Lighthouse/i, name: 'Lighthouse' },
  { pattern: /StatusCake/i, name: 'StatusCake' },

  // Other Common Bots
  { pattern: /curl\//i, name: 'curl' },
  { pattern: /python-requests/i, name: 'Python-Requests' },
  { pattern: /Go-http-client/i, name: 'Go-http-client' },
  { pattern: /axios/i, name: 'axios' },
  { pattern: /HeadlessChrome/i, name: 'HeadlessChrome' },
  { pattern: /Wget/i, name: 'Wget' },
  { pattern: /Feedly/i, name: 'Feedly' },
  { pattern: /ia_archiver/i, name: 'Internet Archive' }
];

/**
 * Detects if a User-Agent string belongs to a bot/crawler.
 * Returns the bot name if detected, null otherwise.
 */
export function detectBot(userAgent: string | null): string | null {
  if (!userAgent) return null;
  if (!isbot(userAgent)) return null;

  // Match against curated patterns
  for (const { pattern, name } of BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return name;
    }
  }

  // Fallback: extract bot name from user agent
  const botMatch = userAgent.match(/([a-zA-Z][a-zA-Z0-9_-]*[Bb]ot)/);
  if (botMatch?.[1]) return botMatch[1];

  const crawlerMatch = userAgent.match(/([a-zA-Z][a-zA-Z0-9_-]*[Cc]rawler)/i);
  if (crawlerMatch?.[1]) return crawlerMatch[1];

  const spiderMatch = userAgent.match(/([a-zA-Z][a-zA-Z0-9_-]*[Ss]pider)/i);
  if (spiderMatch?.[1]) return spiderMatch[1];

  return 'Other Bot';
}
