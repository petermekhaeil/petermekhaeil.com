import rss from '@astrojs/rss';

import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export const prerender = true;

export async function GET(context) {
  const blog = await getCollection('blog');

  return rss({
    stylesheet: 'pretty-feed-v3.xsl',
    title: 'Peter Mekhaeil',
    description:
      'I am an experienced web developer with a focus on optimizing performance and delivering a seamless user experience. I teach web development using the latest technologies.',
    site: context.site,
    items: blog.map((post) => {
      return {
        link: `/${post.slug}`,
        pubDate: post.data.date,
        content: sanitizeHtml(parser.render(post.body)),
        ...post.data
      };
    })
  });
}
