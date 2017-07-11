CREATE TABLE IF NOT EXISTS ${schema~}.users
(
    id serial PRIMARY KEY,
    name text NOT NULL,
    provider text NOT NULL,
    providerId text NOT NULL,
    created timestamp DEFAULT CURRENT_TIMESTAMP,
    modified timestamp DEFAULT CURRENT_TIMESTAMP
)
