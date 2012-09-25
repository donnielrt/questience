define(['backbone',	'models/quest', 'views/quests/single'], function(Backbone, Quest, QuestView){

  "use strict";

	return Backbone.Collection.extend({

    url: "/api/quests",

		model: Quest,

    initialize: function (options) {

    	options = options || {};
    	this.limit = options.limit || -1;
    	console.log("Initializing Quests collection, limit ", this.limit);

    	if(this.limit > 0) {
    		this.url = this.url + "/limit/" + this.limit;
    	}

    }

	});

});
