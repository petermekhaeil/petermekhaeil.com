import Link from 'next/link';
import React from 'react';

const Posts = ({ posts, tags }) => {
  return (
    <ul>
      {posts
        .filter((post) => post.tags.some((tag) => tags.includes(tag)))
        .map((post) => {
          return (
            <div title={post.title} key={post.slug}>
              <h3>
                {post.slug.indexOf('https://') === 0 ? (
                  <Link as={`${post.slug}`} href="[slug]">
                    <a>{post.title}</a>
                  </Link>
                ) : (
                  <Link as={`/${post.slug}`} href="/[slug]">
                    <a>{post.title}</a>
                  </Link>
                )}
              </h3>
              <p>{post.excerpt}</p>
            </div>
          );
        })}
    </ul>
  );
};

export default Posts;
