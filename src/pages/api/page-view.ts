import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

const sql = neon(import.meta.env.DATABASE_URL);

export const POST: APIRoute = async ({ request, locals }) => {
    const date = new Date();
    const { path } = await new Response(request.body).json();

    if (!path) {
        return Response.json({ message: 'Missing path.' });
    } else {
        await sql(
            'INSERT INTO analytics(date, path) VALUES($1, $2)',
            [date, path]
        );

        return Response.json({ context: locals.netlify.context.geo });
    }
}