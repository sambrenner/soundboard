const Router = require("koa-rest-router");

const router = new Router({
    prefix: "/"
});

const ensureLoggedIn = (ctx, next) => {
    if (ctx.isAuthenticated()) {
        return next();
    }

    return ctx.redirect("/");
};

const ensureLoggedOut = (ctx, next) => {
    if (ctx.isUnauthenticated()) {
        return next();
    }

    return ctx.redirect("/app");
};

router.addRoute("GET", "/",
                ensureLoggedOut,
                async (ctx, next) => {
                    await ctx.render("index");
                });

router.addRoute("GET", "/app",
                ensureLoggedIn,
                async (ctx, next) => {
                    await ctx.render("app");
                });

module.exports = router;
