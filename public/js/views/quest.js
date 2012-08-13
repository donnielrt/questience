define([
	'backbone',
	'text!templates/quest.html',
	'common'
], function(Backbone, questsTemplate, Common){

	var QuestView = Backbone.View.extend({

		tagName:  "li",
    className: "span4",

		template: _.template(questsTemplate),

		events: {
		},

		initialize: function(model) {

      this.model.bind('reset', this.render, this);
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
		},

		render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
		},

    remove: function() {
      this.el.remove();
    }

	});


	return QuestView;
});
