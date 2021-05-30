-- Drop and recreate Users table (Example)
SET TIMEZONE = 'SystemV/PST8PDT';
DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  is_owner BOOLEAN NOT NULL DEFAULT FALSE
);

