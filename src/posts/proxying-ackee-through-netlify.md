---
title: Proxying Ackee through Netlify
date: 2022-06-29
description: Ackee is an open-source analytics tool that can be self-hosted on your own server. Learn how to use Netlify Redirects to proxy requests to your Ackee server.
tags:
  - ackee
  - netlify
devto: https://dev.to/petermekhaeil/proxying-ackee-through-netlify-23j
eleventyNavigation:
  parent: Writing
---

Proxying the requests to [Ackee](https://ackee.electerious.com/) through Netlify comes with some advantages:

- **It bypasses the need to configure CORS headers** - Because Ackee is self-hosted on a domain that is different to your website, during the installation you will be asked to configure CORS headers for Ackee to accept requests from other domains. With proxy rewrites, the browser will be making a request to Ackee through the same domain so we can skip configuring CORS headers.
- **It makes it difficult for ad-blockers to detect the tracker** - We can rewrite the path to the tracker to not include keywords that can be blocked.

[Netlify Redirects](https://docs.netlify.com/routing/redirects/) can redirect requests to external services and this is how we will be setting up our proxy rewrites.

## Adding the rewrite rules

Netlify Redirects rules are configured in a file called `_redirects`. Create the file if you do not have one already. Here are the rules to use:

```bash
/script.js https://your-ackee-domain.com/tracker.js 200
/api https://your-ackee-domain.com/api 200
```

What we have done is proxying these paths to an external path on another domain:

```bash
https://yourdomain.com/script.js -> https://your-ackee-domain.com/tracker.js
https://yourdomain.com/api -> https://your-ackee-domain.com/api
```

## Update the path in your script tag

You will need to update the Ackee script to reference the new path:

```html
<script
  async
  src="/script.js"
  data-ackee-server="https://yourdomain.com"
  data-ackee-domain-id="0000-0000-0000-0000-0000"></script>
```

## Verify the changes

Verify the proxy is working by seeing your website making requests to `/script.js` and `/api` and that they respond with status 200.
