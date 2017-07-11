const db = require("../../db");
const Router = require("koa-rest-router");

const router = new Router({
    prefix: "/api/v1"
});

router.resource("users", {
    index: function(ctx, next) {
        return db.users.all().then((users) => {
            ctx.body = JSON.stringify(users);
            return next();
        });
    },

    show: function(ctx, next) {
    },

    create: function(ctx, next) {
    }
});

module.exports = router;
