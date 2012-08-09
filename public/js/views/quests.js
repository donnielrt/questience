define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/quests.html',
	'common'
], function($, _, Backbone, questsTemplate, Common){

	var QuestView = Backbone.View.extend({

		tagName:  "li",

		template: _.template(questsTemplate),

		events: {
		},

		initialize: function() {
		},

		render: function() {
		}
	});


	return QuestView;
});
