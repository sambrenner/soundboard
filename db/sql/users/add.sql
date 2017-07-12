INSERT INTO ${schema~}.users(name, provider, provider_id)
VALUES(${name}, ${provider}, ${providerId})
RETURNING *
