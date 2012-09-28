define(['backbone', 'backbone-validate', 'moment'], function(Backbone, validation, moment) {

  "use strict";

	return Backbone.Model.extend({

    idAttribute: "_id",

    urlRoot: "/api/quests",

    schema: {
      name: 'Text',
      description: { validators: ['required', 'email'] },
      deadline: 'Date'
    },

    /*validation: {
      name: {
        required: true,
        min: 3,
        max: 100,
        msg: "Name is required"
      },
      description: {
        max: 1000,
        msg: "Invalid description"
      },
      deadline: {

      }
    },*/

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

      if(response) {

        if(response.deadline && moment(response.deadline).isValid()) {

          deadline = moment(response.deadline);

          if(deadline.unix() < today.unix()) {
            deadlineStatus = "deadline-past";
          } else {
            deadlineStatus = "deadline-future";
          }

          // "6 days from now formatting"
          response.humanFriendlyDeadline = deadline.fromNow();
          response.deadline = deadline.format("MM/DD/YYYY");

        } else {
          response.deadline = "date missing or invalid";
        }

        if(!response.status || !response.status.length) {
          response.status = "Pending";
        } else {
          // decipher status
          response.status = response.status[0].name;
        }

        response.deadlineStatus = deadlineStatus;


      }

      return response;

    }

	});

});