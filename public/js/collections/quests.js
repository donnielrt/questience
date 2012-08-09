define([
	'underscore',
	'backbone',
	'libs/localstorage',
	'models/quests'
], function(_, Backbone, Store, Quest){

	var QuestsCollection = Backbone.Collection.extend({

		model: Quest,

		localStorage: new Store("questience")

	});
	return new QuestsCollection;
});
