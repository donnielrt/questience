define(['backbone', 'views/app', 'views/quest', 'views/quests', 'models/quest', 'backbone-forms'],
  function(Backbone, AppView, QuestView, QuestsView, Quest, BF){

  "use strict";

	return Backbone.Router.extend({

		routes:{
      "quests": "quests",
      "quests/new": "questNew",
      "quests/:id": "questView"
		},

    initialize: function () {

      var appView = new AppView(); // load main window
      this.appView = appView;

      // handle internal links without navigating away from the page
      $("body").on("click", "a[data-internal]", function(e) {

        e.preventDefault();
        Backbone.history.navigate($(this).attr('href'), true);

      });

    },

    start: function () {
      Backbone.history.start();
    },

    quests: function () {
      this.appView.render();
    },

    questView: function (id) {

      var quest = new Quest({_id: id}),
        questsView = new QuestsView({collection: null, model: quest});

      quest.fetch();
      questsView.render();

    },

    questNew: function () {

      var quest = new Quest(),
        questView = new QuestView({model: quest});

      this.appView.$el.html(this.appView.template()).append(questView.newQuest().$el);

      return false;

    }

	});

});