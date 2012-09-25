define(['backbone',	'models/quest', 'views/quests/single'], function(Backbone, Quest, QuestView){

  "use strict";

	return Backbone.Collection.extend({

    url: "/api/quests",

	model: Quest,

    initialize: function () {

      console.log("Initializing Quests collection");

    }

	});

});
