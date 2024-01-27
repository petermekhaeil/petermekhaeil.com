import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

export const prerender = false;

const sql = neon(import.meta.env.DATABASE_URL);

export const POST: APIRoute = async ({ request, locals }) => {
    const date = new Date();
    const { path } = await new Response(request.body).json();

    const { country, city, latitude, longitude } =  locals.netlify.context.geo;

    if (!path) {
        return Response.json({ message: 'Missing path.' });
    } else {
        await sql(
            'INSERT INTO analytics(date, path, country, city, latitude, longitude) VALUES($1, $2, $3, $4, $5, $6)',
            [date, path, country, city, latitude, longitude]
        );

        return Response.json({ context: locals.netlify.context.geo });
    }
}