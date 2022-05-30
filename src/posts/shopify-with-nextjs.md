---
title: Improving Shopify page performance using Next.js
date: 2021-04-13
description: Learn about how Shopify-enabled online stores can improve their web page speed performance by moving across to Next.js. We will use Core Web Vitals to measure the performance that Next.js provides out of the box.
tags:
  - performance
devto: https://dev.to/petermekhaeil/improving-shopify-page-performance-using-next-js-1ihb
---

With Google [announcing](https://support.google.com/webmasters/thread/86521401?hl=en) that from May 2021 onwards websites will have their rankings impacted by their [Core Web Vitals Audit](https://web.dev/learn-web-vitals/) scores, this is a perfect time for a Shopify-based online store to take the lead against their competitors by improving their SEO and their page performance speeds.

One way to improve page speed performance is to migrate to a JAMStack architecture - static sites have the benefits of a strong SEO performance boost which is key to an online e-commerce store.

[Go Bare](http://gobare.com.au/) is a popular Australian based skin care company hosted on Shopify. They have plans to take on the world globally and so they are going to need a website with strong SEO and fast page load speeds to improve their Google ranking.

We will use Lighthouse to measure the [Lab Data](https://web.dev/user-centric-performance-metrics/#in-the-lab) (because the Chrome User Experience Report [does not have sufficient real-world speed data](https://developers.google.com/speed/docs/insights/about#faq) for the new website we are building). Here is the score for the existing website hosted on Shopify:
![Go Bare performance Scores](/images/uploads/gobare-shopify-lighthouse.png 'Go Bare performance Scores')

Areas of improvement include:

- Removing unused CSS and JavaScript
- Eliminate render-blocking resources
- Reducing the impact of third-party code.

These are very common to see on e-commerce websites that allow their owners to purchase custom made UI themes and widgets that do not consider performance in their designs. We are going to look at how we can improve these areas by migrating to a static website designed with performance in mind.

## Improving the performance scores

We are going to use [Next.js](https://nextjs.org/) and their [Commerce Framework](https://nextjs.org/commerce). Out of the box, it has a slick look-and-feel and includes the UI components we need without having to build much of it from scratch.

At the time of migrating to the new website, the Next.js Commerce framework was relatively new and so a [Shopify Provider](https://github.com/petermekhaeil/nextjs-commerce-shopify) was required for the integration with the Shopify APIs.

Shopify provides developers access to their APIs - which will allow us to hook our own Front-End UI to the Shopify backend. These APIs allow us to:

1. Create a cart on entry to the site
2. Add products to the cart
3. Checkout by redirecting the user to the Shopify payment page (which is entirely hosted on Shopify's end).

![Go Bare User Journey](/images/uploads/gobare-user-journey.png 'Go Bare User Journey')

Shopify redirecting to their own payment page is an awesome feature to the Shopify APIs because it allows us developers to not worry about building payment pages and the security involved in building one.

Along the way, some changes were made to the UI to improve the lighthouse scores in terms of accessbility and best practices.

## The Result

It speaks for itself. Here is the final Lab Data scores after migrating the Front-End stack to a static website:

![Go Bare performance Scores](/images/uploads/gobare-nextjs-lighthouse.gif 'Go Bare performance Scores')

Next steps for GoBare is to start reporting on real user's scores and wait for [Chrome UX Report](https://developers.google.com/web/tools/chrome-user-experience-report) to have enough Field Data for us to revisit the site's performance.

You can check out the website at [gobare.vercel.app](https://gobare.vercel.app/) and compare the experience to the original website at [gobare.com.au](https://gobare.com.au).

## How did Next.js improve the performance?

- **Pre-rendering** - Each page is generated in advance during the build process. The output is static HTML files with minimal client-side JavaScript to render the pages. The static files are then cached into a CDN.
- **Image Optimization** - Next.js optimizes images on demand and works with images hosted on external sources (in our use-case, they are hosted on Shopify). They are also lazy-loaded and are only loaded once they are in the user's view.
- **Code Splitting** - Each page will be code split into its own bundle during the build process and will only include what is only required for that page to render. Smaller bundles means less code to execute, which will result in quicker page load speeds. This also includes the CSS.

These 3 key items helped Go Bare improve their performance scores - removed unused CSS and Javascript, eliminated render-blocking resources and reduced the impact on third-party code.
