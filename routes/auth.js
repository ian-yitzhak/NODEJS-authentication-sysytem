const express = require('express')
const passport = require('passport');
const User = require('../models/User')
const route = express.Router()


route.get('/register',(req,res)=>{
	res.render('register')

})

route.get('/',(req,res)=>{
	res.render('index')

})

route.get('/welcome',(req,res)=>{
	res.render('welcome')

})

route.get('/login',(req,res)=>{
	res.render('login')

})

router.post('/login', (req,res,next)=>{
	passport.authenticate('local',
	{
	successRedirect: '/welcome',
    failureRedirect: '/login',
    failureFlash: true

	}) (req,res,next);
})

route.post('/register',async (req,res)=>{
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})

	try{
		const savedUser = await user.save()
		res.redirect('/login')
	}catch(err){
		console.log(err)
	}

})

module.exports = route