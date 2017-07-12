require("dotenv").config();

const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const render = require("koa-ejs");
const session = require("koa-session");

const db = require("./db");
const path = require("path");

const passport = require("./util/passport");
const auth = require("./routes/auth")(passport);
const api = require("./routes/api/v1");
const index = require("./routes");

const app = new koa();

render(app, {
    root: path.join(__dirname, "views"),
    layout: "template",
    viewExt: "ejs",
    cache: process.env.NODE_ENV != "development",
    debug: false
});

app.keys = [process.env.SECRET_KEY];

app.use(session({}, app));
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(api.middleware());
app.use(auth.middleware());
app.use(index.middleware());

db.users.create().then(() => {
    app.listen(3000, () => {
        console.log("Listening at localhost:3000");
    });
});
