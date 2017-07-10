require("dotenv").config();

const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");

const app = new koa();

const passport = require("./util/passport");
const auth = require("./routes/auth")(passport);
const api = require("./routes/api/v1");

app.keys = [process.env.SECRET_KEY];

app.use(session({}, app));
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(api.middleware());
app.use(auth.middleware());

app.listen(3000, () => {
    //api.routes.forEach(route => {
    //console.log(`${route.method} ${route.path}`);
    //});
});
