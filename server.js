const express = require('express');
const bodyParser = require('body-parser')
const passport =  require('passport');
const session = require("express-session")

const app = express()


const authRoute = require('./routes/auth')
require('./db/db')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.urlencoded({ extended: false }))


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());





app.use('/' , authRoute)

const port = 3000;

app.listen(port,()=> console.log(`listening on ${port}`) )