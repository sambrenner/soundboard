const QueryFile = require("pg-promise").QueryFile;
const path = require("path");

module.exports = {
    users: {
        create: sql("users/create.sql"),
        empty: sql("users/empty.sql"),
        init: sql("users/init.sql"),
        drop: sql("users/drop.sql"),
        add: sql("users/add.sql"),
        findById: sql("users/findById.sql"),
        findByProvider: sql("users/findByProvider.sql")
    }
};

function sql(file) {
    const fullPath = path.join(__dirname, file);

    const options = {
        minify: true,
        params: {
            schema: "public"
        }
    };

    const qf = new QueryFile(fullPath, options);

    if (qf.error) {
        console.error(qf.error);
    }

    return qf;
}
