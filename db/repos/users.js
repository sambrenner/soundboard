const sql = require("../sql").users;

class UsersRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    create() {
        return this.db.none(sql.create);
    }

    init() {
        return this.db.map(sql.init, [], row => row.id);
    }

    drop() {
        return this.db.none(sql.drop);
    }

    empty() {
        return this.db.none(sql.empty);
    }

    add(name) {
        return this.db.one(sql.add, name);
    }

    remove(id) {
        return this.db.result("DELETE FROM users WHERE id = $1", +id, r => r.rowCount);
    }

    all() {
        return this.db.any("SELECT * FROM users");
    }
}

module.exports = UsersRepository;
