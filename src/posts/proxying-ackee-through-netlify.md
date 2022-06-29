---
title: Proxying Ackee through Netlify
date: 2022-06-29
description: Ackee is an open-source analytics tool that can be self-hosted on your own server. Learn how to use Netlify Redirects to proxy requests to your Ackee server.
tags:
  - ackee
  - netlify
---

[Ackee](https://ackee.electerious.com/) is an open-source analytics tool that can be self-hosted on your own server. During installation, you will be asked to configure CORS headers for Ackee to accept requests from another domain. This is where [Netlify Redirects](https://docs.netlify.com/routing/redirects/) can help us cut that step out.

Netlify Redirects can redirect requests to external services and this is how we will be setting up our proxy rewrites, so that we do not need to configure CORS headers.

Proxying the requests to Ackee through Netlify comes with some advantages:

- **It bypasses the need to configure CORS headers** because the requests to Ackee will be from the same origin as your website.
- **It makes it difficult for ad-blockers to detect the tracker** because we can rewrite the path to the tracker to not include keywords that can be blocked.

## Adding the rewrite rules

Netlify Redirects rules are configured in a file called `_redirects`. Create the file if you do not have one already. Here are the rules to use:

```bash
/script.js https://pmekh-ackee.netlify.app/tracker.js 200
/api https://pmekh-ackee.netlify.app/api 200
```

What we have done is proxying these paths to an external path on another domain:

```bash
https://petermekhaeil.com/script.js -> https://pmekh-ackee.netlify.app/tracker.js
https://petermekhaeil.com/api -> https://pmekh-ackee.netlify.app/api
```

## Update the path in your script tag

You will need to update the Ackee script to reference the new path:

```html
<script
  async
  src="/script.js"
  data-ackee-server="https://petermekhaeil.com"
  data-ackee-domain-id="0000-0000-0000-0000-0000"
></script>
```

## Verify the changes

Verify the proxy is working by seeing your website making requests to `/script.js` and `/api` and that they respond with status 200.
