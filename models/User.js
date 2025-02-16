const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
	email: {
		type: String, 
		required: [true, "Email is required"]
	},
	password: {
		type: String,
		required: [true, "Password is required"]
	},

	isAdmin: {
		type: Boolean,
	default: false
	}

});


module.exports = mongoose.model("User", UserSchema);
