import { readFileSync } from 'fs';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { ImageResponse } from '../../../lib/astro-opengraph-image';
import { getGitHubTilRepo } from '../../../_data/github_til_repo';

function font(name: string) {
  return `font-family: ${name};`
}

function Template(post: {
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
  const til = await getGitHubTilRepo();

  return til.map((post) => ({
    params: { slug: post.path },
    props: { post }
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const tilEntries = await getGitHubTilRepo();

  const post = tilEntries.find((post) => {
    return post.path === params.slug;
  });

  if (!post) return new Response('Page not found', { status: 404 });

  const inter300Path = `${process.cwd()}/node_modules/@fontsource/inter/files/inter-latin-300-normal.woff`;
  const inter300 = readFileSync(inter300Path);
  const inter500Path = `${process.cwd()}/node_modules/@fontsource/inter/files/inter-latin-500-normal.woff`;
  const inter500 = readFileSync(inter500Path);
  const inter600Path = `${process.cwd()}/node_modules/@fontsource/inter/files/inter-latin-600-normal.woff`;
  const inter600 = readFileSync(inter600Path);

  return new ImageResponse(Template(post), {
    fonts: [
      { name: 'Inter 300', weight: 300, data: inter300 },
      { name: 'Inter 500', weight: 500, data: inter500 },
      { name: 'Inter 600', weight: 600, data: inter600 },
    ]
  });
};
