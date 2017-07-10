const passport = require("koa-passport");

const DropboxStrategy = require("passport-dropbox-oauth2").Strategy;

const fetchUser = (() => {
    const user = {
        id: 1,
        username: "test",
        password: "test"
    };

    return async function() {
        return user;
    };
})();

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        const user = await fetchUser();
        done(null, user);
    } catch(err) {
        done(err);
    }
});

passport.use(new DropboxStrategy({
    apiVersion: 2,
    clientID: process.env.DROPBOX_KEY,
    clientSecret: process.env.DROPBOX_SECRET,
    callbackURL: "http://localhost:3000/auth/dropbox/cb"
}, function(token, tokenSecret, profile, done) {
    console.log(token, tokenSecret, profile);
    fetchUser().then(user => {
        done(null, user);
    });
}));

module.exports = passport;
