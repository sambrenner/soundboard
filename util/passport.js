const db = require("../db");
const passport = require("koa-passport");

const DropboxStrategy = require("passport-dropbox-oauth2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const findUser = (() => {
    return async function(id) {
        return db.users.findById(id).catch(err => {
            console.error(err);
            return null;
        });
    };
})();

const findOrCreateUser = (() => {
    return async function(user) {
        return db.task("find-or-create-user", t => {
            return t.users.findByProvider(user.provider, user.providerId)
                .then(dbUser => {
                    return dbUser || t.users.add(user);
                }).catch(err => {
                    console.error(err);
                });
        });
    };
})();

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        const user = await findUser(id);
        done(null, user);
    } catch(err) {
        done(err);
    }
});

passport.use(new DropboxStrategy({
    apiVersion: "2",
    clientID: process.env.DROPBOX_KEY,
    clientSecret: process.env.DROPBOX_SECRET,
    callbackURL: "http://localhost:3000/auth/dropbox/cb"
}, function(token, tokenSecret, profile, done) {
    findOrCreateUser({
        provider: "dropbox",
        providerId: profile.id,
        name: profile.displayName
    }).then(user => done(null, user));
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_KEY,
    clientSecret: process.env.GOOGLE_SECRET,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    callbackURL: "http://localhost:3000/auth/google/cb"
}, function(token, refreshToken, profile, done) {
    console.log(profile);
    findOrCreateUser({
        provider: "google",
        providerId: profile.id,
        name: profile.displayName
    }).then(user => done(null, user));
}));

module.exports = passport;
