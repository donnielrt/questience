define([
  'backbone',
  'views/app',
  'views/quests/single',
  'views/quests/form',
  'views/quests/remove',
  'views/quests/list',
  'text!templates/common/header.html',
  'models/quest',
  'collections/quests',
  'questience'],
  function(
    Backbone,
    AppView,
    QuestView,
    QuestFormView,
    QuestDeleteView,
    QuestsView,
    HeaderView,
    Quest,
    Quests,
    Questience){

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
      $("body").on("click", "a:not([data-bypass])", function(e) {

        e.preventDefault();

        Questience.appRouter.navigate($(this).attr('href'), true);

      });

    },

    /* routes we don't want backbone to handle */
    noop: function() { },

    start: function () {
      Backbone.history.start({pushState: true});
    },

		home: function () {

      var collection = new Quests({limit: 6}), questsView; // render quests      

      this.appView.render();

      questsView = new QuestsView({collection: collection, $el: $("#quests-container")});

      collection.fetch();

      return this;

		},

    quests: function () {

      // list quests
			var collection = new Quests(), questsView = new QuestsView({collection: collection, $el: $("#questience-app")}); // render quests

      collection.fetch();

      return this;

    },

    questView: function (id) {

      var quest = new Quest({_id: id}),
        questsView,
        $root = this.appView.$el,
        that = this;

      questsView = new QuestView({model: quest, singleView: true});

      quest.fetch({
        success: function(model, response) {

          $root.html(questsView.$el);

        }
      });

      return this;

    },

    questNew: function () {

      var quest = new Quest(),
        questView = new QuestFormView({model: quest});

      this.appView.$el.html(questView.render().$el);

      return this;

    },

		questEdit: function (id) {

			var quest = new Quest({_id: id}),
        questView,
        $root = this.appView.$el,
        that = this;

      questView = new QuestFormView({model: quest});
			quest.fetch({
        success: function(model, response) {
          $root.html(questView.$el);
        }
      });

      return this;

		},

		questRemove: function (id) {

      var quest = new Quest({_id: id}),
        questView,
        $root = this.appView.$el,
        that = this;

      questView = new QuestDeleteView({model: quest});
      quest.fetch({
        success: function(model, response) {
          $root.html(questView.$el);
        }
      });

      return this;

		}

	});

});