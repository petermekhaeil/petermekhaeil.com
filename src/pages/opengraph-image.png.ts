import type { APIRoute } from 'astro';
import { ImageResponse } from '../lib/astro-opengraph-image';
import { readFileSync } from 'fs';
import { getCollection } from 'astro:content';

export const prerender = true;

function font(name: string) {
  return `font-family: ${name};`;
}

function Template(posts: { title: string; id: string; date: Date }[]) {
  return `
  <div
  tw="flex p-10 h-full w-full bg-white flex-col" style="${font('Inter 300')}"
>
  <header tw="flex text-[36px] w-full">
    <div tw="font-bold" style="${font('Inter 600')}">
      Peter Mekhaeil
    </div>
  </header>
  <main tw="flex mt-10 flex-col w-full" style="${font('Inter 300')}">
    <div tw="flex w-full text-[26px] text-gray-400 mb-3" style="${font('Inter 500')}">
      <div tw="w-24">Date</div>
      <div tw="grow">Title</div>
    </div>

    ${posts
      .map((post, index) => {
        const year = new Date(post.date).getFullYear();
        const prevPost = posts[index - 1];
        const prevYear = prevPost && new Date(prevPost.date).getFullYear();
        const showYear = year !== prevYear;

        return `
      <div
        key="${post.id}"
        tw="flex py-6 text-[26px] border-gray-300 border-t w-full"
      >
        <div tw="flex text-gray-400 w-24">
          ${showYear ? year : ''}
        </div>
        <div tw="flex grow">${post.title}</div>
      </div>
        `;
      })
      .join('')}
  </main>
</div>
      `;
}

const inter300Path = `${process.cwd()}/node_modules/@fontsource/inter/files/inter-latin-300-normal.woff`;
const inter300 = readFileSync(inter300Path);
const inter500Path = `${process.cwd()}/node_modules/@fontsource/inter/files/inter-latin-500-normal.woff`;
const inter500 = readFileSync(inter500Path);
const inter600Path = `${process.cwd()}/node_modules/@fontsource/inter/files/inter-latin-600-normal.woff`;
const inter600 = readFileSync(inter600Path);

export const GET: APIRoute = async function () {
  const posts = (await getCollection('blog')).map((post) => {
    return {
      id: post.id,
      title: post.data.title,
      date: post.data.pubDate
    };
  });

  return new ImageResponse(Template(posts), {
    fonts: [
      { name: 'Inter 300', data: await inter300 },
      { name: 'Inter 500', data: inter500 },
      { name: 'Inter 600', data: inter600 }
    ]
  });
};
