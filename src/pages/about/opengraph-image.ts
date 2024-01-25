import type { APIRoute } from 'astro';
import { ImageResponse } from '../../lib/astro-opengraph-image';
import { readFileSync } from 'fs';

function font(name: string) {
  return `font-family: ${name};`;
}

function Template() {
  return `
      <div tw="flex p-8 h-full w-full bg-white flex-col" style="${font('Inter 300')}">
          <main tw="flex grow pb-4 flex-col items-center justify-center">
              <div tw="flex">
                  <div tw="bg-gray-100 p-8 text-7xl font-medium rounded-md text-center" style="${font('Inter 500')}">
                      About Peter Mekhaeil
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

export const GET: APIRoute = async function () {
  return new ImageResponse(Template(), {
    fonts: [
      { name: 'Inter', weight: 300, data: inter300 },
      { name: 'Inter', weight: 500, data: inter500 }
    ]
  });
};
