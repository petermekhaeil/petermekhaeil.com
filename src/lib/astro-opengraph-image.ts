import satori, { type Font } from 'satori';
import { html } from 'satori-html';
import sharp from 'sharp';

interface ImageResponseOptions {
  fonts?: Font[];
}

export class ImageResponse extends Response {
  constructor(template: string, options: ImageResponseOptions = {}) {
    const result = new ReadableStream({
      async start(controller) {
        const markup = html(template) as React.ReactNode;

        const svg = await satori(markup, {
          width: 1200,
          height: 630,
          fonts: [...(options.fonts || [])]
        });

        const png = sharp(Buffer.from(svg)).png();
        const response = await png.toBuffer();

        controller.enqueue(response);
        controller.close();
      }
    });

    super(result, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control':
          process.env.NODE_ENV === 'development'
            ? 'no-cache, no-store'
            : 'public, immutable, no-transform, max-age=31536000'
      }
    });
  }
}
