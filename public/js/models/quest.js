define(['backbone'], function(Backbone) {

  "use strict";

	var QuestModel = Backbone.Model.extend({

    idAttribute: "_id",

    urlRoot: "/api/quests",

    schema: {
      name: 'Text',
      description: { validators: ['required', 'email'] },
      deadline: 'Date'
    },

		defaults: {
      _id: null,
      name: "Untitled Quest",
      created: new Date(),
      updated: new Date()

		},

		initialize: function() {

      console.log("Quest model initialized");

		}

	});

	return QuestModel;
});