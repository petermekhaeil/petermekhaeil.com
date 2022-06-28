---
title: Proxying Ackee through Netlify
date: 2022-06-29
description: Ackee is an open-source analytics tool that can be self-hosted on your own server. Learn how to use Netlify Redirects to proxy requests to your Ackee server.
tags:
  - ackee
  - netlify
---

[Ackee](https://ackee.electerious.com/) is an open-source analytics tool that can be self-hosted on your own server and what is attractive about Ackee is that it comes with a [one-click Netlify installation](https://docs.ackee.electerious.com/#/docs/Get%20started#with-netlify). The installation forks the Ackee repository and creates a new site under your Netlify account. The new site will come with a new unique domain which will not match the domain of your website and so additional configuration is required to handle CORS. This is where [Netlify Redirects](https://docs.netlify.com/routing/redirects/) can help us.

Proxying the requests to Ackee through Netlify comes with some advantages:

- **It bypasses the need to configure CORS headers** because the requests to Ackee will be from the same origin.
- **It makes it difficult for ad-blockers to detect the tracker** because we can rewrite the path to the tracker to not include keywords that can be blocked.

## Adding the rewrite rules

Netlify Redirects rules are configured in a file called `_redirects`. Create the file if you do not have one already. Here are the rules to use for Ackee:

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

You will need to update the Ackee script to point to the new location of the JS file and to point the server to the same domain as your website:

```html
<script
  async
  src="/script.js"
  data-ackee-server="https://petermekhaeil.com"
  data-ackee-domain-id="0000-0000-0000-0000-0000"
></script>
```

## Verify the changes

Verify the proxy is working by seeing requests to `/script.js` and `/api` have responses with status 200.
