define(['backbone', 'views/app', 'views/quest', 'views/quests', 'models/quest', 'collections/quests'],
  function(Backbone, AppView, QuestView, QuestsView, Quest, Quests){

  "use strict";

	return Backbone.Router.extend({

		routes:{
			"": "home",
      "quests": "quests",
      "quests/new": "questNew",
      "quests/:id": "questView",
			"quests/:id/edit": "questEdit",
			"quests/:id/remove": "questRemove"
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

		home: function () {

			this.quests();

		},

    quests: function () {

		// list quests
			var questsView = new QuestsView({collection: new Quests, model: null, ctr: 0}); // render quests

			this.appView.render().$el.append(questsView.el);

    },

    questView: function (id) {

      var quest = new Quest({_id: id}),
        questsView = new QuestsView({collection: null, model: quest});

      quest.fetch();

      this.appView.render().$el.append(questsView.render().$el);

    },

    questNew: function () {

      var quest = new Quest(),
        questView = new QuestView({model: quest});

      this.appView.$el.html(this.appView.template()).append(questView.newQuest().$el);

      return false;

    },

		questEdit: function (id) {

			var quest = new Quest({_id: id}), questView;

			quest.fetch({silent: true});

			questView = new QuestView({collection: null, model: quest});

			this.appView.$el.html(this.appView.template()).append(questView.editQuest().$el);

			return false;

		},

		questRemove: function (id) {

			var quest = new Quest(),
				questView = new QuestView({model: quest});

			this.appView.$el.html(this.appView.template()).append(questView.newQuest().$el);

			return false;

		}

	});

});