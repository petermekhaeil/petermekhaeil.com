import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    isDraft: z.boolean().optional(),
    title: z.string(),
    description: z.string(),
    pubDate: z.date()
  })
});

export const collections = {
  blog: blogCollection
};
