define(['backbone', 'views/quest', 'text!templates/quests.html'], function(Backbone, QuestView, questsTemplate){

  "use strict";

	var QuestsView = Backbone.View.extend({

		id:  "quests-list",
    tagName: "ul",
    className: "list-plain",

		template: _.template(questsTemplate),

		events: {
		},

		initialize: function(options) {

      var $root = $(this.el);

      this.collection = options.collection || {};
      this.model = options.model || {};

      if (!_.isEmpty(options.collection)) {

        this.collection.bind('change reset', this.render, this);
        this.collection.bind("add", function (quest) {
          $root.append(new QuestView( { model:quest}).render().el);
        });
        this.collection.fetch();

      }

		},

    getRoot: function() {
      return $("#" + this.id);
    },

		render: function() {

      var $root = this.getRoot(),
        data = {};

      if(!_.isEmpty(this.collection)) {
        data = this.collection.toJSON();
      } else if (!_.isEmpty(this.model)) {
        data = [this.model.toJSON()];
      }

      // set up base template
      $root.html("").before(this.template({Quests: data}));

      // append each template
      if(this.collection.length > 1) {
        this.collection.each(function (quest) {
          var questView = new QuestView({model: quest});

          $root.append(questView.render().$el);
        });

      } else {

        var questView = new QuestView({model: this.model});

        $root.append(questView.$el);

      }

      return this;
		}

	});


	return QuestsView;
});
