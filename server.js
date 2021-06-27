const express = require('express');
const bodyParser = require('body-parser'); // parser middleware
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login');
const app = express()




app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());




passport.use(User.createStrategy());

// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const authRoute = require('./routes/auth')
require('./db/db')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/' , authRoute)

const port = 3000;

app.listen(port,()=> console.log(`listening on ${port}`) )