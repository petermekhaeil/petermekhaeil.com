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
