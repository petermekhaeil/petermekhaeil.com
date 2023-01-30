import { defineCollection } from 'astro:content';
import { rssSchema } from '@astrojs/rss';

const blogCollection = defineCollection({
  schema: rssSchema
});

export const collections = {
  blog: blogCollection
};
