import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';
import { geolocation } from '@vercel/edge';

export const prerender = false;

const sql = neon(import.meta.env.DATABASE_URL);

export const POST: APIRoute = async ({ request }) => {
  const date = new Date();
  const { path, referrer } = await new Response(request.body).json();

  const { flag, country, city, latitude, longitude } = geolocation(request);

  if (!(flag && country && city && latitude && longitude && path)) {
    return Response.json({ message: 'Missing required parameters' });
  } else {
    await sql(
      'INSERT INTO analytics(date, path, referrer, flag, country, city) VALUES($1, $2, $3, $4, $5, $6)',
      [date, path, referrer, flag, country, city.replace(/[^a-zA-Z ]/g, ' ')]
    );

    return Response.json({
      message: {
        date,
        path,
        referrer,
        flag,
        country,
        city: city.replace(/[^a-zA-Z ]/g, ' ')
      }
    });
  }
};
