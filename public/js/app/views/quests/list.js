define(['backbone', 'text!templates/quests/list.html'], function(Backbone, questsTemplate){

  "use strict";

	var QuestsView = Backbone.View.extend({

		tag: "ul",
    id: "quests-list",
    className: "list list-plain",

		template: _.template(questsTemplate),

		events: {
		},

		initialize: function(options) {

      var $root = this.$el;

      this.collection = options.collection || {};
      this.model = options.model || {};

			// we also use this view for the models, so collections might be empty
      if (!_.isEmpty(options.collection)) {

        this.collection.bind('change reset', this.render, this);
        this.collection.bind("add", function (quest) {
          $root.append(new QuestView( { model:quest}).render().el);
        });
        this.collection.fetch();

      }

		},

		render: function() {

      var $root = this.$el, Quests = this.collection.toJSON();

      // set up base template
      $root.html(this.template({Quests: Quests, ctr: 0}));

      return this;
		}

	});


	return QuestsView;
});
