import satori from 'satori';
import { html } from 'satori-html';
import { readFileSync } from 'fs';
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { getCollection } from 'astro:content';

function blogPostTemplate(post: { data: { title: string; pubDate: Date } }) {
  const title = post.data.title;
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
    new Date(post.data.pubDate)
  );

  return `
    <div tw="flex p-10 h-full w-full bg-white flex-col" style="font-family: Inter 300">
        <header tw="flex text-[36px] w-full">
            <div tw="font-bold" style="font-family: Inter 600">Peter Mekhaeil</div>
        </header>
        <main tw="flex grow pb-3 flex-col items-center justify-center">
            <div tw="flex">
                <div tw="bg-gray-100 p-8 text-7xl font-medium rounded-md text-center" style="font-family: Inter 500">
                    ${title}
                </div>
            </div>
            <div tw="mt-5 flex text-3xl text-gray-500">
                ${date}
            </div>
        </main>
    </div>
    `;
}

export async function getStaticPaths() {
  const blogEntries = await getCollection('blog');

  const paths = blogEntries.map((post) => {
    return {
      params: {
        route: post.slug
      }
    };
  });

  return paths;
}

export const GET: APIRoute = async ({ params }) => {
  const blogEntries = await getCollection('blog');

  const post = blogEntries.find((post) => {
    return post.slug === params.route;
  });

  if (!post) return new Response('Page not found', { status: 404 });

  const inter300Path = `${process.cwd()}/node_modules/@fontsource/inter/files/inter-latin-300-normal.woff`;
  const inter300 = readFileSync(inter300Path);
  const inter500Path = `${process.cwd()}/node_modules/@fontsource/inter/files/inter-latin-500-normal.woff`;
  const inter500 = readFileSync(inter500Path);
  const inter600Path = `${process.cwd()}/node_modules/@fontsource/inter/files/inter-latin-600-normal.woff`;
  const inter600 = readFileSync(inter600Path);

  const markup = html(blogPostTemplate(post));

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter 300',
        data: inter300,
        style: 'normal'
      },
      {
        name: 'Inter 500',
        data: inter500,
        style: 'normal'
      },
      {
        name: 'Inter 600',
        data: inter600,
        style: 'normal'
      }
    ]
  });

  const png = sharp(Buffer.from(svg)).png();
  const response = await png.toBuffer();

  return new Response(response, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 's-maxage=1, stale-while-revalidate=59'
    }
  });
};
