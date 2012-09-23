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
      $("body").on("click", "a[data-internal]", function(e) {

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

      this.appView.render();
      this.quests(true);

      return this;

		},

    getHeader: function (title, description) {
      return _.template(HeaderView, { title: title, description: description } );
    },

    quests: function (append) {

      // list quests
			var questsView = new QuestsView({collection: new Quests(), model: null, ctr: 0}); // render quests

      if(append) {
        this.appView.render().$el.append(questsView.el);
      } else {
        this.appView.$el.html(this.getHeader("Quests", "Here are you current quests")).append(questsView.el);
      }


      return questsView.el;

    },

    questView: function (id) {

      var quest = new Quest({_id: id}),
        questsView,
        $root = this.appView.$el,
        that = this;

      questsView = new QuestView({model: quest, singleView: true});

      quest.fetch({
        success: function(model, response) {

          $root.html(that.getHeader(model.get('name'), model.get('description')));
          $root.append(questsView.$el);

        }
      });



      return this;

    },

    questNew: function () {

      var quest = new Quest(),
        questView = new QuestFormView({model: quest});

      this.appView.$el.html(this.getHeader("Create Quest", "Enter quest details here")).append(questView.render().$el);

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
          $root.html(that.getHeader(model.get('name'), model.get('description')));
          $root.append(questView.$el);
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
          $root.html(that.getHeader(model.get('name'), model.get('description')));
          $root.append(questView.$el);
        }
      });

      return this;

		}

	});

});