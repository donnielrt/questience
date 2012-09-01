define([
  'backbone',
  'views/app',
  'views/quests/single',
  'views/quests/form',
  'views/quests/remove',
  'views/quests/list',
  'models/quest',
  'collections/quests'],
  function(
    Backbone,
    AppView,
    QuestView,
    QuestFormView,
    QuestDeleteView,
    QuestsView,
    Quest,
    Quests){

  "use strict";

	return Backbone.Router.extend({

		routes:{
			"": "home",
      "about": "noop",
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

    /* routes we don't want backbone to handle */
    noop: function() { },

    start: function () {
      Backbone.history.start({pushState: true});
    },

		home: function () {

      this.appView.render();
      this.quests(true);

      return this;

		},

    quests: function (append) {

      // list quests
			var questsView = new QuestsView({collection: new Quests(), model: null, ctr: 0}); // render quests

      if(append) {
        this.appView.render().$el.append(questsView.el);
      } else {
        this.appView.$el.html(questsView.el);
      }


      return questsView.el;

    },

    questView: function (id) {

      var quest = new Quest({_id: id}),
        questsView = new QuestsView({collection: null, model: quest});

      quest.fetch();

      this.appView.$el.html(questsView.render().$el);
      return this;

    },

    questNew: function () {

      var quest = new Quest(),
        questView = new QuestFormView({model: quest});

      this.appView.$el.html(questView.render().$el);

      return this;

    },

		questEdit: function (id) {

			var quest = new Quest({_id: id}), questView;

      questView = new QuestFormView({model: quest});
			quest.fetch();

			this.appView.$el.html(questView.render().$el);

      return this;

		},

		questRemove: function (id) {

      var quest = new Quest({_id: id}), questView;

      questView = new QuestDeleteView({model: quest});
      quest.fetch();

      this.appView.$el.html(questView.render().$el);

      return this;

		}

	});

});