 \c db_smartbrain user_smartbrain;

CREATE TABLE schema_smartbrain.login (
  id serial PRIMARY KEY,
  hash VARCHAR(100) not null,
  email TEXT UNIQUE NOT NULL
);