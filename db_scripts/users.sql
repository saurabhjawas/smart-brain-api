 \c db_smartbrain user_smartbrain
 
CREATE TABLE schema_smartbrain.users (
  id      serial PRIMARY KEY,
  name    VARCHAR(100),
  email   TEXT UNIQUE NOT NULL,
  entries BIGINT DEFAULT 0,
  joined timestamp NOT NULL
);