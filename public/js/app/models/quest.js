define(['backbone', 'moment'], function(Backbone, moment) {

  "use strict";

	return Backbone.Model.extend({

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
			description: "",
			deadline: "",
      created: new Date(),
      updated: new Date()

		},

		initialize: function() {
		},

    parse: function(response) {

      response.deadline = moment(response.deadline).format("MM/DD/YYYY");

      return response;

    }

	});

});