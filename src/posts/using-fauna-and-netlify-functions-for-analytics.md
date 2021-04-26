---
title: Using FaunaDB and Netlify Functions for Analytics
date: 2020-12-06
tags:
  - javascript
  - serverless
---

As I continue to build this blog, I want to add some analytics to get an idea of my viewers and what they are interested in reading. Using [FaunaDB](https://fauna.com/){title="FaunaDB"} and [Netlify Functions](https://www.netlify.com/products/functions/){title="Netlify Functions"}, we are going to build a basic API that will allow us to track the page hits.

## TL;DR

You can use Netlify Functions to talk to a database such as FaunaDB. In the below example, we use tracking page hits as a use-case to save into the database. You can found the source code to the Netlify Function [here](https://github.com/petermekhaeil/pmekh.com/blob/master/functions/tracker.js){title="GitHub"}.

## The Setup

### Front End

We want to keep it as minimal as possible. We can achieve this without using JavaScript by implementing a "Tracking Pixel" which is a `<img/>` that will be placed on each page. This approach allows us to talk one-way to the server without expecting any data in return. This image `src` will request our Netlify function which will respond with an transparent image. The Netlify Function will store the page hits into the database and then respond to the client with the transparent pixel.

### Back End

This blog doesn't sit on a server (woohoo!). It's a static website built on [Eleventy](https://www.11ty.dev/){title="Eleventy"} and served from [Netlify](https://netlify.app/){title="Netlify"}. Our solution will involve using [Netlify Functions](https://www.netlify.com/products/functions/){title="Netlify Functions"} which are serverless functions that you can deploy alongside your static website. Behind the scenes, Netlify Functions run on AWS Lambda and the beautiful thing about this is that you don't need to worry about using AWS. Lambda functions are fully managed and auto-scale. AWS and Netlify will take care of setting everything up for you, all we need to do is write the API function and deploy it.

### Database

We going to use [FaunaDB](https://fauna.com/){title="FaunaDB"}, a serverless database that is easy to use, can be set up in a couple minutes and works well with serverless functions. This is where we are going to store the page URLs and their page hits.

Everything together should look like this:

![](/images/uploads/analytics-1.png)

## Putting it together

### FaunaDB

1. [Sign up](https://dashboard.fauna.com/accounts/register){title="FaunaDB"} for an account. The Free account is enough for this tutorial.

2. Create a new Database and name it after your project.

   ![](/images/uploads/analytics-7.png)

3. Create a new collection `hits`. We will use this to store the page hits.

   ![](/images/uploads/analytics-3.png)

4. We now need to create a new [Index](https://docs.fauna.com/fauna/current/api/fql/indexes?lang=javascript){title="FaunaDB Indexes"}. In FaunaDB, you use the index to query your documents. (a) Set the `Source Collection` to `hits` (b) Set `Index Name` to `hits_by_pathname` (c) Set `Terms` to `data.pathname`.

   ![](/images/uploads/analytics-4.png)

5. Generate an API key under `Security`. We will use this to query our database from within our serverless function.

   ![](/images/uploads/analytics-6.png)

### Netlify Function

We need to write an API that will:

1. Query the database for the current page hit for the requested page.
2. Increase this count and store it back into the database.
3. Respond to the client with a transparent image.

We are going to use the [faunadb](https://github.com/fauna/faunadb-js){title="FaunaDB"} package. We will need this as dependency to the serverless function (it won't be used on the client side).

```bash
npm install faunadb
```

Create a file `./netlify/functions/tracker.js`. Below is the code we will use. I've added comments to walk through what the function does:

```js
const faunadb = require('faunadb');

exports.handler = async (event) => {
  const { headers } = event;
  const q = faunadb.query;

  // Connect to our database.
  const client = new faunadb.Client({
    // This is the Fauna API Key we created.
    // It's stored in Netlify Environment Variables.
    secret: process.env.FAUNA_SECRET_KEY
  });

  // We will use the referer to know which page we want to track.
  const referer = headers.referer;
  const { pathname } = new URL(referer);

  try {
    await client.query(
      // Bind variables to be in the expression (second parameter)
      q.Let(
        {
          // Match the document by the pathname index
          match: q.Match(q.Index('hits_by_pathname'), pathname)
        },
        // Conditionally evaluate expressions
        q.If(
          // IF the document exists
          q.Exists(q.Var('match')),
          // THEN update the document with an updated page hit.
          q.Update(q.Select('ref', q.Get(q.Var('match'))), {
            data: {
              hits: q.Add(
                // Increment the previous hits by 1
                q.Select(['data', 'hits'], q.Get(q.Var('match'))),
                1
              )
            }
          }),
          // ELSE create the document and set the page hit to 1
          q.Create(q.Collection('hits'), {
            data: { pathname, hits: 1 }
          })
        )
      )
    );
  } catch (error) {
    console.error(error);
  }

  // We respond with a transparent image
  return {
    statusCode: 200,
    body: 'R0lGODlhAQABAJAAAP8AAAAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==',
    headers: { 'content-type': 'image/gif' },
    isBase64Encoded: true
  };
};
```

The [Fauna Query Language](https://docs.fauna.com/fauna/current/api/fql/functions){title="Fauna Query Language"} provides a collection of built-in functions that we used in this function. We started with [Let](https://docs.fauna.com/fauna/current/api/fql/functions/let?lang=javascript){title="Fauna Query Language"} that allowed us to create the variable `match`. The expression used an [If](https://docs.fauna.com/fauna/current/api/fql/functions/if?lang=javascript){title="Fauna Query Language"} which takes 3 parameters `( cond_expr, true_expr, false_expr )`. For the condition, we want to check if the document exists using [Exists](https://docs.fauna.com/fauna/current/api/fql/functions/exists?lang=javascript){title="Fauna Query Language"}. If it exists, we referenced it using [Select](https://docs.fauna.com/fauna/current/api/fql/functions/select?lang=javascript) and [Update](https://docs.fauna.com/fauna/current/api/fql/functions/update?lang=javascript){title="Fauna Query Language"}. We used [Add](https://docs.fauna.com/fauna/current/api/fql/functions/add?lang=javascript){title="Fauna Query Language"} to add `1` to the previous count. If the document did not exist, we created it with [Create](https://docs.fauna.com/fauna/current/api/fql/functions/create?lang=javascript){title="Fauna Query Language"}.

### Build Environment Variables

We need to add the FaunaDB API Key into Netlify's [Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/){title="Netlify Environment Variables"}. It's referenced in the above code using `process.env.FAUNA_SECRET_KEY`.

![](/images/uploads/analytics-5.png)

### Insert the image

Place the `<img/>` on your template. Here is how I did it for my template:

{% raw %}

```html
{% if env.environment == "production" %}
<img src="/.netlify/functions/tracker" title="" />
{% endif %}
```

{% endraw %}

## Testing

Testing is a large topic on it's own. Read up on [Netlify Dev](https://docs.netlify.com/cli/get-started/#get-started-with-netlify-dev){title="Netlify Dev"} to get started on the Netlify CLI which will let you test your serverless function locally. I recommend you to test your functions before commiting and deploying.

## Wrapping it up

Serverless has a large collection of use-cases other than connecting to a database - such as sending out emails and processing payments. With Netlify Functions we didn't need to worry about setting up any cloud infrastructure or configurations, Netlify took care of that for us. FaunaDB being serverless, it also worked very well with our use-case. Both Netlify Functions and FaunaDB have usage-based pricing models, so you only pay for what you consume. Give both a try - you can go one step further and build yourself a portal that queries your new database and graph out your page hits.
