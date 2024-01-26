import type { APIRoute } from 'astro';
import { ImageResponse } from '../../lib/astro-opengraph-image';
import { readFileSync } from 'fs';

function font(name: string) {
  return `font-family: ${name};`;
}

function Template() {
  return `
  <div
  tw="flex p-10 h-full w-full bg-white flex-col"
  style="${font('Inter 300')}"
>
  <main tw="flex grow pt-4 w-full justify-center items-center">
    <div tw="flex flex-row">
      <div tw="flex">
          <img
          tw="rounded-full h-74"
          src="https://petermekhaeil.com/assets/profile.png"
        />
      </div>
      <div tw="flex flex-col px-10 grow text-[28px] h-70 justify-center">
        <div tw="text-[64px] mb-7" style="${font('Inter 600')}">
          Peter Mekhaeil
        </div>
        <div tw="flex mb-5" style="${font('Inter 500')}">
          <span tw="text-gray-400 mr-3">—</span> Software Engineer
        </div>
        <div tw="flex mb-5" style="${font('Inter 500')}">
          <span tw="text-gray-400 mr-3">—</span> Based in Singapore
        </div>
        <div tw="flex" style="${font('Inter 500')}">
          <span tw="text-gray-400 mr-3">—</span> Web Development Advocate
        </div>
      </div>
    </div>
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
  return new ImageResponse(Template(), {
    fonts: [
      { name: 'Inter 300', data: inter300 },
      { name: 'Inter 500', data: inter500 },
      { name: 'Inter 600', data: inter600 }
    ]
  });
};
