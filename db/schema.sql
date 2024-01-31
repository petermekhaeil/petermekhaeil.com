CREATE TABLE analytics (
  id            SERIAL PRIMARY KEY,
  date          TIMESTAMP WITH TIME ZONE NOT NULL,
  path          VARCHAR NOT NULL,
  referrer      VARCHAR,
  flag          VARCHAR,
  country       VARCHAR,
  city          VARCHAR
)