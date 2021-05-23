import Head from 'next/head';
import React from 'react';
import Intro from '../components/Intro';
import Posts from '../components/Posts';
import Projects from '../components/Projects';
import Sites from '../components/Sites';
import { getAllPosts } from '../lib/api';
import getGitHubProjects from '../lib/getGitHubProjects';

export default function Home({ allPosts, allProjects, sites }) {
  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PMekhaeil" />
        <meta name="twitter:creator" content="@PMekhaeil" />
        <meta name="twitter:title" content="petermekhaeil.com" />
        <meta
          name="twitter:description"
          content="Software engineer with a passion for building performant web apps using the latest web technologies."
        />
        <meta
          name="twitter:image"
          content={`https://petermekhaeil.com/profile.png`}
        />
        <meta property="og:url" content="https://pmekhaeil.com" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="petermekhaeil.com" />
        <meta
          property="og:description"
          content="Software engineer with a passion for building performant web apps using the latest web technologies."
        />
        <meta
          property="og:image"
          content={`https://petermekhaeil.com/profile.png`}
        />
        <title>Peter Mekhaeil</title>
        <meta
          name="description"
          content="Software engineer with a passion for building performant web apps using the latest web technologies."
        />
      </Head>
      <article className="mt-4 lg:mt-10 mb-4 prose prose-sm sm:prose lg:prose-lg mx-auto">
        <h2>Improving Page Speed Performance</h2>
        <Posts posts={allPosts} tags={['performance']} />
        <h2>Web Development</h2>
        <Posts posts={allPosts} tags={['javascript', 'webdev']} />
        <h2>Career Learnings</h2>
        <Posts posts={allPosts} tags={['career']} />
        <h2>Projects</h2>
        <Projects projects={allProjects} />
        <h2>Sites</h2>
        <Sites sites={sites} />
        <hr />
        <Intro />
      </article>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'excerpt', 'slug', 'tags']);
  const allProjects = await getGitHubProjects();

  const additionalPosts = [
    {
      title: 'Modernising an Enterprise Front End Stack',
      excerpt:
        'Almost any large enterprise struggles to keep their front-end code maintainable — and so did we! CSS and Javascript code bases grow large and unwieldy quite easily. With our component library, we were able to overcome these challenges.',
      slug: 'https://medium.com/singtel-digital-technology/modernising-an-enterprise-front-end-stack-fe0571f259a1',
      tags: ['webdev']
    }
  ];

  const sites = [
    {
      title: 'Go Bare + Next.js',
      description:
        'Australian based skin care company - website built using Next.js and Shopify.',
      link: 'https://gobare.vercel.app/'
    },
    {
      title: 'Formula 1 Page Speed Insights',
      description:
        'Performance report using PageSpeed Insights and Chrome User Experience Report to showcase which Formula 1 team has the fastest web performance.',
      link: 'https://f1-page-speed-insights.netlify.app/'
    },
    {
      title: 'Singapore E-Commerce Page Speed Insights',
      description:
        'Performance report using PageSpeed Insights and Chrome User Experience Report to showcase which Singapore E-Commerce store has the fastest web performance.',
      link: 'https://sg-page-speed-insights.netlify.app/'
    }
  ];

  return {
    props: { allPosts: allPosts.concat(additionalPosts), sites, allProjects }
  };
}
