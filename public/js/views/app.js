define([
	'jquery',
	'underscore',
	'backbone',
	'collections/quests',
	'views/quests',
	'text!templates/quests.html',
	'common'
], function($, _, Backbone, Quests, QuestsView, questsTemplate, Common) {

	var AppView = Backbone.View.extend({

		el: $("#questience-app"),

		template: _.template(questsTemplate),

		events: {
		},

		initialize: function() {

		},

		render: function() {
		}
	});

	return AppView;
});
