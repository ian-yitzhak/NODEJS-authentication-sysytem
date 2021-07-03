const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('./models/User')
require('./db/db')
const{  ensureAuthenticated } = require('./auth');

const app = express();

app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


app.get("/", ensureAuthenticated , (req, res) => res.render("index"));

app.get("/sign-up", (req, res) => res.render("register"));

app.post("/sign-up", (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).save(err => {
    if (err) { 
      return next(err);
    }
    res.redirect("/log-in");
  });
});
//local  strategy
passport.use(
  new LocalStrategy(
    (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.get('/welcome', (req,res)=>{
  res.render('welcome' , { user: req.user })
})

app.get('/log-in', (req,res)=>{
  res.render('login')
})


app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/"
  })
);

app.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/log-in");
});




app.listen(3000, () => console.log("app listening on port 3000!"));