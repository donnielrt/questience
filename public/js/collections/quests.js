define(['backbone',	'models/quest', 'views/quest'], function(Backbone, Quest, QuestView){

  "use strict";

	var QuestsCollection = Backbone.Collection.extend({

    url: "/api/quests",

		model: Quest,

    initialize: function () {

      console.log("Initializing Quests collection");

    }

	});

	return new QuestsCollection();
});
