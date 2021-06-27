const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const userShema = new mongoose.Schema({

	name:{
		type:String,
		required: true
	},

	email:{
		type:String,
		required: true
	},

	password:{
		type:String,
		required: true
	}

	
})
userSchema.plugin(passportLocalMongoose

module.exports = mongoose.model('User' , userShema)