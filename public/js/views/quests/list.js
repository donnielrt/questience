define(['backbone', 'views/quests/single', 'text!templates/quests/list.html'], function(Backbone, QuestView, questsTemplate){

  "use strict";

	var QuestsView = Backbone.View.extend({

		id:  "quests-list",
    tagName: "ul",
    className: "list-plain list",

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

      var $root = this.$el, data = {}, ctr = 0, singleView = _.isEmpty(this.collection), questView;

			// we use this for both a single or multiple quests
      if(!singleView) {
        data = this.collection.toJSON();
      } else if (!_.isEmpty(this.model)) {
        data = [this.model.toJSON()];
      }

      // set up base template
      $root.empty().before(this.template({Quests: data}));

      // multiple quests
      if(!singleView) {

				this.collection.each(function (quest) {

					questView = new QuestView({model: quest, singleView: false, newRow: (++ctr % 4 === 0) });

          $root.append(questView.render().$el);
        });

      } else {

        questView = new QuestView({model: this.model, singleView: true, lastPage: '#quests' });

        $root.append(questView.$el);

      }

      return this;
		}

	});


	return QuestsView;
});
