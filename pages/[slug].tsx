import Head from 'next/head';
import markdownToHtml from '../lib/markdownToHtml';
import { getPostBySlug, getAllPosts } from '../lib/api';

const Timestamp = ({ date }) => {
  const formatted = new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
  return <small>{formatted}</small>;
};

const ReadingTime = ({ content }) => {
  const wpm = 275;
  const minutes = Math.ceil(content.trim().split(/\s+/).length / wpm);
  const displayLabel = `${minutes} min. read`;

  return <small>{displayLabel}</small>;
};

const Discuss = ({ url }) => {
  if (!url) return null;

  return (
    <p className="text-center">
      Leave a comment on{' '}
      <a rel="noreferrer" target="_blank" href={url}>
        Dev.to
      </a>
      .
    </p>
  );
};
export default function Post({ post }) {
  return (
    <article className="mt-4 lg:mt-10 mb-4 prose prose-sm sm:prose lg:prose-lg mx-auto">
      <Head>
        <title>{post.title}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PMekhaeil" />
        <meta name="twitter:creator" content="@PMekhaeil" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta
          name="twitter:image"
          content={`https://petermekhael.com/profile.png`}
        />
        <meta
          property="og:url"
          content={`https://petermekhael.com/${post.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta
          property="og:image"
          content={`https://petermekhael.com/profile.png`}
        />
        <meta name="description" content={post.excerpt}></meta>
      </Head>
      <h2>{post.title}</h2>
      <div className="flex space-x-2">
        <Timestamp date={post.date} />
        <ReadingTime content={post.content} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <Discuss url={post.devto} />
    </article>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'slug',
    'content',
    'date',
    'devto',
    'excerpt'
  ]);
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
