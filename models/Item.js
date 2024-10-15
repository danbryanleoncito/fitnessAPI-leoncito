const mongoose = require("mongoose")

const ItemSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, 'User ID is Required']
	},

	name: {
		type: String,
		required: [true, "Name is required"]
	},

	duration: {
		type: String,
		required: [true, "Duration is required"]
	},

	status: {
		type: String,
	default: "pending"

	},

	dateAdded: {
		type: Date,
		default: Date.now
	},
})

module.exports = mongoose.model("Item", ItemSchema);