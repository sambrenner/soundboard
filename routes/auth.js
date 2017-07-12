module.exports = function(passport) {
    const Router = require("koa-rest-router");

    const router = new Router({
        prefix: "/auth"
    });

    router.addRoute("GET", "/dropbox", passport.authenticate("dropbox-oauth2"));

    router.addRoute("GET", "/dropbox/cb", passport.authenticate("dropbox-oauth2", {
        successRedirect: "/app",
        failureRedirect: "/"
    }));

    router.addRoute("GET", "/google", passport.authenticate("google", {
        scope: ["profile"]
    }));

    router.addRoute("GET", "/google/cb", passport.authenticate("google", {
        successRedirect: "/app",
        failureRedirect: "/"
    }));

    router.addRoute("GET", "/logout", ctx => {
        ctx.logout();
        ctx.redirect("/");
    });

    return router;
};
