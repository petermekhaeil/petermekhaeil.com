import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

export const prerender = false;

const sql = neon(import.meta.env.DATABASE_URL);

// https://github.com/vercel/vercel/blob/main/packages/edge/src/edge-headers.ts#L34
const EMOJI_FLAG_UNICODE_STARTING_POSITION = 127397;

function getFlag(countryCode: string | undefined): string | undefined {
  const regex = new RegExp('^[A-Z]{2}$').test(countryCode!);
  if (!countryCode || !regex) return undefined;
  return String.fromCodePoint(
    ...countryCode
      .split('')
      .map((char) => EMOJI_FLAG_UNICODE_STARTING_POSITION + char.charCodeAt(0))
  );
}

export const POST: APIRoute = async ({ request, locals }) => {
  const date = new Date();
  const { path, referrer } = await new Response(request.body).json();

  const { country, city } = locals.netlify.context.geo;
  const { code, name: countryName } = country || {};
  const flag = getFlag(code);

  if (!path) {
    return Response.json({ message: 'Missing path.' });
  } else {
    await sql(
      'INSERT INTO analytics(date, path, referrer, flag, country, city) VALUES($1, $2, $3, $4, $5, $6)',
      [
        date,
        path,
        referrer,
        flag,
        countryName,
        city?.replace(/[^a-zA-Z ]/g, ' ')
      ]
    );

    return Response.json({
      message: {
        date,
        path,
        referrer,
        flag,
        countryName,
        city: city?.replace(/[^a-zA-Z ]/g, ' ')
      }
    });
  }
};
