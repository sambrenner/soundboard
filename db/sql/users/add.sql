INSERT INTO ${schema~}.users(name)
VALUES($1)
RETURNING *
