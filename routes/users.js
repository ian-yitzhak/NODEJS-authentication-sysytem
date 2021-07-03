const express = require('express')
const passport = require("passport");
const User = require('../models/User')

const route = express.Router()


route.get("/sign-up", (req, res) => res.render("register"));

route.post("/sign-up", (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).save(err => {
    if (err) { 
      return next(err);
    }
    res.redirect("/user/log-in");
  });
});


route.get('/welcome', (req,res)=>{
  res.render('welcome' , { user: req.user })
})

route.get('/log-in', (req,res)=>{
  res.render('login')
})


route.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/user/welcome",
    failureRedirect: "/user/login"
  })
);

route.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/user/log-in");
});



module.exports = route