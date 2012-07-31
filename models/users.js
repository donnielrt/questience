exports.users = function () {
	var mongoose = require('mongoose');

}

exports.users = function(mongoose) {
	var collection = 'questience';
	var Schema = mongoose.Schema;
	var ObjectId = Schema.ObjectId;

	var schema = new Schema('Users', {
		name: String,
		password_hash: String,
		joined: Date
	});

	this.model = mongoose.model(collection, schema);

	return this;
};