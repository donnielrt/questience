exports.users = function () {
	var mongoose = require('mongoose');
	mongoose.model('Users', new mongoose.Schema({
		name: String,
		password_hash: String,
		joined: Date
	}));
}