const db = require("../../db");
const Dropbox = require("dropbox");
const Router = require("koa-rest-router");

const router = new Router({
    prefix: "/api/v1"
});

const ensureDropboxUser = (ctx, next) => {
    if (ctx.state.user.provider !== "dropbox" || !ctx.session.dropboxToken) {
        throw new Error({
            status: 403
        });
    } else {
        ctx.state.dropboxApi = new Dropbox({
            accessToken: ctx.session.dropboxToken
        });
    }

    return next();
};

router.resource("folders", {
    index: [
        ensureDropboxUser,
        async (ctx, next) => {
            const folder = await ctx.state.dropboxApi.filesListFolder({
                path: ""
            });

            ctx.body = JSON.stringify(folder.entries);
            await next();
        }
    ],

    show: [
        ensureDropboxUser,
        async (ctx, next) => {
            const folder = await ctx.state.dropboxApi.filesListFolder({
                path: ctx.params.folder
            });

            ctx.body = JSON.stringify(folder.entries);
            await next();
        }
    ]
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
