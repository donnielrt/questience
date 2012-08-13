define(['underscore', 'backbone'], function(_, Backbone) {

	var QuestModel = Backbone.Model.extend({

    idAttribute: "_id",

    urlRoot: "/api/quests",

		defaults: {
      name: "Untitled Quest",
      created: new Date(),
      updated: new Date()

		},

		initialize: function() {

      console.log("Quest model initialized");

		},

    render: function () {

    }

	});

	return QuestModel;
});