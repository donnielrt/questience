var mongoose = require('mongoose');

module.exports = function () {

  return {

		/* attributes */
    Attributes : function() {
      var collection = 'Attribute';
      var Schema = mongoose.Schema;
      var ObjectId = Schema.ObjectId;

      var schema = new Schema({
        name: String
      });

      return mongoose.model(collection, schema);
    },

		/* statuses */
    Statuses : function() {
      var collection = 'Status';
      var Schema = mongoose.Schema;
      var ObjectId = Schema.ObjectId;

      var schema = new Schema({
        name: String
      });

      return mongoose.model(collection, schema);
    },

		/* tasks */
    Tasks : function() {
      var collection = 'Task';
      var Schema = mongoose.Schema;
      var ObjectId = Schema.ObjectId;
      var that = this;

      var schema = new Schema({
        attributeId: mongoose.Schema.ObjectId,
        name: String,
        points: Number,
        deadline: Date,
        status: [that.Status],
        created: Date,
        updated: Date
      });

      return mongoose.model(collection, schema);
    },

		/* users */
    Users : function() {
      var collection = 'User';
      var Schema = mongoose.Schema;
      var ObjectId = Schema.ObjectId;

      var schema = new Schema({
        name: String,
        password_hash: String,
        joined: Date
      });

      return mongoose.model(collection, schema);
    },

		/* quests */
    Quests : function () {

      var collection = 'Quest';
      var Schema = mongoose.Schema;
      var ObjectId = Schema.ObjectId;
      var that = this;

      var schema = new Schema({
        name: String,
        description: String,
        tasks: [that.Task],
        owner: mongoose.Schema.ObjectId,
        deadline: Date,
        status: [that.Status],
        created: Date,
        updated: Date
      });

      return mongoose.model(collection, schema);

    }

  }

}();