const db = require("../../db");
const Router = require("koa-rest-router");

const router = new Router({
    prefix: "/api/v1"
});

router.resource("users", {
    index: (ctx, next) => {
        return db.users.all().then(users => {
            ctx.body = JSON.stringify(users);
            return next();
        });
    },

    show: (ctx, next) => {
        return db.users.findById(ctx.params.user).then(user => {
            ctx.body = JSON.stringify(user);
            return next();
        });
    }
});

// router.resource("soundboards", {
//     show:
// });

module.exports = router;
