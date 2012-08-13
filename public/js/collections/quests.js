define([
	'underscore',
	'backbone',
	'models/quest'
], function(_, Backbone, Quest){

	var QuestsCollection = Backbone.Collection.extend({

    url: "/api/quests",

		model: Quest,

    initialize: function () {
      console.log("Initializing Quests collection");
    }

	});

	return new QuestsCollection();
});
