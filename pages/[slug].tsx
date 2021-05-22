import Head from 'next/head';
import markdownToHtml from '../lib/markdownToHtml';
import { getPostBySlug, getAllPosts } from '../lib/api';

export default function Post({ post }) {
  return (
    <>
      <article>
        <Head>
          <title>{post.title}</title>
        </Head>
        <h2>{post.title}</h2>
        <p>{post.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, ['title', 'slug', 'content']);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content
      }
    }
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      };
    }),
    fallback: false
  };
}
