import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

export const prerender = false;

const sql = neon(import.meta.env.DATABASE_URL);

export const POST: APIRoute = async ({ request, locals }) => {
    const date = new Date();
    const { path, referrer } = await new Response(request.body).json();

    const { country, city } =  locals.netlify.context.geo;
    const { code: countryCode } = country || {};

    if (!path) {
        return Response.json({ message: 'Missing path.' });
    } else {
        await sql(
            'INSERT INTO analytics(date, path, referrer, country, city) VALUES($1, $2, $3, $4, $5)',
            [date, path, referrer, countryCode, city]
        );

        return Response.json({ });
    }
}