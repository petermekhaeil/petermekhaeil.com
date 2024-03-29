# petermekhaeil.com

## Tech Stack

- [Astro](https://astro.build/) - Framework
- [Vercel](https://www.vercel.com/) - Hosting
- [Neon](https://neon.tech/) - Database
- [TailwindCSS](https://tailwindcss.com/) - UI

## Design Notes

- Blog posts are static pages hosted under `./src/content/blog`.
- The _Today I Learned_ notes are stored in the [petermekhaeil/til](https://github.com/petermekhaeil/til) repo. A Netlify webhook from that repo will trigger a new build of this site.
- Analytics data is stored in a Postgres database. See the API route `./src/pages/api/page-view.ts`.
- The OpenGraph images are statically generated using [satori](https://github.com/vercel/satori). See `./src/lib/astro-opengraph-image.ts` for implementation.

## Posts

<!-- BLOG-POST-LIST:START -->

- [How to build an npx starter template](https://petermekhaeil.com/how-to-build-an-npx-starter-template/)
- [Typescript tips by Matt Pocock](https://petermekhaeil.com/typescript-tips-by-matt-pocock/)
- [How to keep undefined values in JSON.stringify](https://petermekhaeil.com/how-to-keep-undefined-values-in-json.stringify/)
- [Proxying Ackee through Netlify](https://petermekhaeil.com/proxying-ackee-through-netlify/)
- [3 benefits interviews bring you](https://petermekhaeil.com/3-benefits-interviews-bring-you/)
- [Measuring the performance of the McLaren Racing website](https://petermekhaeil.com/measuring-the-performance-of-the-mclaren-racing-website/)
- [How to build an app with Remix and Netlify Graph](https://petermekhaeil.com/how-to-build-an-app-with-remix-and-netlify-graph/)
- [How I landed my first job as a software engineer](https://petermekhaeil.com/how-i-landed-my-first-job-as-a-software-engineer/)
- [Jamstack vs Traditional Web](https://petermekhaeil.com/jamstack-vs-traditional-web/)
- [How to get started with improving site performance](https://petermekhaeil.com/how-to-get-started-with-improving-site-performance/)
- [Page Speed Comparison of Singapore Commerce](https://petermekhaeil.com/page-speed-comparison-of-singapore-commerce/)
- [Data Fetching in Next.js](https://petermekhaeil.com/data-fetching-in-next.js/)
- [Improving Shopify page performance using Next.js](https://petermekhaeil.com/improving-shopify-page-performance-using-next.js/)
- [Notes - The Coding Career Handbook](https://petermekhaeil.com/notes-the-coding-career-handbook/)
- [Page Speed Performance of Formula 1 Websites](https://petermekhaeil.com/page-speed-performance-of-formula-1-websites/)
- [Using FaunaDB and Netlify Functions for Analytics](https://petermekhaeil.com/using-faunadb-and-netlify-functions-for-analytics/)
- [Adding Dark Mode to your Tailwind CSS website](https://petermekhaeil.com/adding-dark-mode-to-your-tailwind-css-website/)
- [What I have learnt as an engineering manager](https://petermekhaeil.com/what-i-have-learnt-as-an-engineering-manager/)
- [Be strong like your code](https://petermekhaeil.com/be-strong-like-your-code/)
<!-- BLOG-POST-LIST:END -->
