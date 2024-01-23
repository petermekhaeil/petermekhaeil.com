import satori from 'satori';
import { html } from 'satori-html';
import { readFileSync } from 'fs';
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { getGitHubTilRepo } from '../../../_data/github_til_repo';

function font(name: string) {
  return `font-family: ${name};`
}

function blogPostTemplate(post: {
  date: string;
  title: string;
}) {
  const title = post.title;
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
    new Date(post.date)
  );

  return `
    <div tw="flex p-8 h-full w-full bg-white flex-col" style="${font('Inter 300')}">
        <header tw="flex text-[36px] w-full">
            <div tw="font-bold" style="${font('Inter 600')}">Peter Mekhaeil</div>
        </header>
        <main tw="flex grow pb-4 flex-col items-center justify-center">
            <div tw="flex">
                <div tw="bg-gray-100 p-8 text-7xl font-medium rounded-md text-center" style="${font('Inter 500')}">
                    ${title}
                </div>
            </div>
            <div tw="mt-6 flex text-3xl text-gray-500">
                ${date}
            </div>
        </main>
    </div>
    `;
}

export async function getStaticPaths() {
  const tilEntries = await getGitHubTilRepo();

  const paths = tilEntries.map((post) => {
    return {
      params: {
        route: post.path
      }
    };
  });

  return paths;
}

export const GET: APIRoute = async ({ params }) => {
  const tilEntries = await getGitHubTilRepo();

  const post = tilEntries.find((post) => {
    return post.path === params.route;
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
