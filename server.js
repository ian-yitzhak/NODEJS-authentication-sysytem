const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

require('./db/db')
const{  ensureAuthenticated } = require('./auth');

const signinRouter = require('./routes/users')

require('./routes/passport')(passport)

const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'))

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


app.get("/", ensureAuthenticated , (req, res) => res.render("index"));


app.use('/user', signinRouter)




app.listen(3000, () => console.log("app listening on port 3000!"));