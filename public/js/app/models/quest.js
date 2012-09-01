define(['backbone'], function(Backbone) {

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
		}

	});

});