---
title: Jamstack vs Traditional Web
date: 2021-12-11
description: Learn about what is Jamstack and how it compares to a traditional website. We go through the steps involved in building one, the components that make up a Jamstack site and its advantages and limitations.
tags:
  - jamstack
  - javascript
  - webdev
devto: https://dev.to/petermekhaeil/jamstack-vs-traditional-web-4gco
---

## Traditional Web

Here is a story about a popular online store - Uncle Bobba’s Bubble Tea. Uncle Bobba had a traditional web application that looked like this:

![Traditional Web](/images/uploads/jamstack-1.png 'Traditional Web')

This is a simplified diagram and the idea behind this is to show you a rough example of how a typical e-commerce website looks like. It’s not limited to auth and payment services and can also have other moving systems. When the user requests a page, the server is generating the content on the server side before returning the content back to the user.

It works. It does it’s job. Uncle Bubba had happy customers.

Then came a time when Uncle Bubba decided to release a new product. The news spread fast across the land and Uncle Bubba found a lot of customers coming to his store:

![Traditional Web](/images/uploads/jamstack-2.png 'Traditional Web')

Suddenly, things did not go to plan. The team soon discovered the pages were not responding. There was lag in server response and API calls between services were timing out. The systems were so heavily coupled together and it was too difficult to pin-point where it went wrong. Not long after, Uncle Bubba found himself with some angry customers who didn’t get to enjoy his new bubble tea flavours.

![Traditional Web](/images/uploads/jamstack-3.png 'Traditional Web')

This could be caused by many reasons in Uncle Bubba's architecture and there is a high chance of happening in systems that are highly coupled with so many moving parts.

Surely there is a way to solve this. After all, we are only serving a product catalog of some text and images. What if we can remove this black box (the server in the diagram) and allow the users to interact directly with the HTML without needing a server to generate the content on the fly every time the user requests the page?

This is where Jamstack comes to play.

## What is Jamstack?

Statically generating your UI application and decoupling it from your other systems.

![Jamstack](/images/uploads/jamstack-4.png 'Jamstack')

**Javascript** Client-side interactions such as navigation and talking to API services.

**API** Interact with third-party services that are decoupled from each other.

**Markdown** Prebuilt HTML pages generated using a static site generator.

Using your favourite front-end framework (eg React, Vue, Svelte) to build a pre-rendered copy of your UI application and deploying it on a CDN. Think of it like taking a snapshot of your UI and storing it on the cloud. Your users do not need to interact with your server.

## How is a Jamstack site generated?

This happens in the continuous-integration (CI) build pipeline:

![Jamstack](/images/uploads/jamstack-5.png 'Jamstack')

**Source code** It all starts in the git repository. Jamstack requires the application stored in a version control.

**Static site generator** On a new commit, a build step is triggered and the static site generator will build the application. During the build, if the application requires any content from an external data source, the static site generator will fetch that data. This can be from any external service that provides content in a format that the static site generator supports. Example of data sources: Headless CMS, databases, Markdown.

**Static content** Once the package is bundled and optimised for the web, it is deployed to a CDN. Which is an important element of Jamstack and it one of many reasons why Jamstack is so fast - the pre-rendered static HTML content is served around the world.

This process of building a Jamstack application moves the server generation of your page to the build pipeline.

## How does it look like now that there is no server?

There is no connection with the users and the build pipeline. The users are only requesting the prebuilt HTML markdown that has been served from the CDN and the user is only interacting with the client-side APIs.

![Jamstack](/images/uploads/jamstack-6.png 'Jamstack')

## Why Jamstack?

- **Lower costs:** No server costs (only paying for storage).
- **Security:** No user-facing systems required to serve the content.
- **SEO:** Crawlers work better with pre-rendered content.
- **Performance:**
  - Static pages served from CDN.
  - No flash of unstyled content.
- **Web-optimised image rendering:**
  - Fetch above-the-fold images immediately.
  - Delay rendering of off-screen images.
  - Image placeholders to avoid layout shifts.
  - Automatically compressed and optimised for web.

## Any limitations?

Some limitations that the community and static-site-generators are working on solving:

- Previewing content before publishing can be challenging.
- Long builds times if there are a large number of pages to generate.
- Not suitable for dynamic content.

## Conclusion

By moving away from a traditional architecture, an online e-commerce store can now handle a large number of users by serving statically generated pages from a CDN - fast rendering pages decoupled from the underlying systems that were used to generate the content.

Jamstack decouples your UI from your other systems, making it a powerful approach in building high performing applications that can scale and is cost-efficient.
