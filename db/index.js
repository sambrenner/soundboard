const repos = {
    users: require("./repos/users")
};

const options = {
    extend: (obj, dc) => {
        obj.users = new repos.users(obj, pgp);
    }
};

const config = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB,
    user: process.env.PG_USER
};

const pgp = require("pg-promise")(options);
const db = pgp(config);

module.exports = db;
