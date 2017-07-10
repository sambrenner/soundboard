const Router = require("koa-rest-router");

const router = new Router({
    prefix: "/api/v1"
});

router.resource("users", {
    index: function(ctx, next) {
        ctx.body = JSON.stringify(ctx.params);
        return next();
    },

    show: function(ctx, next) {
    },

    create: function(ctx, next) {
    }
});

module.exports = router;
