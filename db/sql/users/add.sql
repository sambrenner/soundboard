INSERT INTO ${schema~}.users(name, provider, providerId)
VALUES(${name}, ${provider}, ${providerId})
RETURNING *
