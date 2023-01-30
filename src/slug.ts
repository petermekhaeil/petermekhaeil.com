import slugify from 'slugify';

export const slug = (value: string) => {
  return slugify(value).toLowerCase();
};
