const db = require("../models/");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
	//find a user
	try {
		console.log("REQUEST:", req.body);
		let user = null;
		if( typeof req.body.email != "undefined" ) {
			user = await db.User.findOne({
				email: req.body.email
			});
		} else if( typeof req.body.username != "undefined" ) {
			user = await db.User.findOne({
				login_name: req.body.username.toLowerCase()
			});
		}
		console.log("USER FOUND:", user);

		let { id, username, profileImageUrl } = user;
		let isMatch = await user.comparePassword(req.body.password);
		if( isMatch ) {
			let token = jwt.sign({
				id,
				username,
				profileImageUrl
			}, process.env.SECRET_KEY);
			return res.status(200).json({
				id,
				username,
				profileImageUrl,
				token
			});
		} else {
			return next({
				status: 200,
				message: "Invalid Email/Password."
			});
		}
	} catch(err) {
		return next({
			status: 200,
			message: "Invalid Email/Password."
		});
	}
};

exports.signup = async function(req,res,next) {
	console.log("DATA:", req.body);
	try {
		//create user
		let user = await db.User.create(req.body);
		let { id, username, profileImageUrl } = user;
		//create token
		let token = jwt.sign({
		//payload data
			id,
			username,
			profileImageUrl
		// SECRET_KEY
		}, process.env.SECRET_KEY);
		return res.status(200).json({
			id, username, profileImageUrl, token
		});
	}catch( err ) {
		console.log("ERROR:", err);
		//see what kind of error
		switch( err.code ) {
			case 11000:
				err.message = "Sorry that username and/or email is taken!";
				break;
			default:
				break;
		}
		//if certain error respond appropriately
		//(i.e. username/password already taken) 
		return next({
			status: 400,
			message: err.message
		});
	}
};