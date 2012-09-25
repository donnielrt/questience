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

      var deadline, deadlineStatus = "", today = moment();

      if(moment(response.deadline).isValid()) {

        deadline = moment(response.deadline);

        if(deadline.unix() < today.unix()) {
          deadlineStatus = "deadline-past";
        } else {
          deadlineStatus = "deadline-future";
        }
        response.deadline = deadline.format("MM/DD/YYYY");

      } else {
        response.deadline = "Invalid or missing deadline";
      }

      if(!response.status || !response.status.length) {
        response.status = "Pending";
      } else {
        // decipher status
        response.status = response.status[0].name;
      }

      response.deadlineStatus = deadlineStatus;

      return response;

    }

	});

});