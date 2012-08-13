define(['jquery','backbone', 'views/app', 'views/quests', 'models/quest', 'common'],
  function($, Backbone, AppView, QuestsView, Quest, Common){

	var Workspace = Backbone.Router.extend({

		routes:{
      "": "home",
      "quests": "quests",
      "quests/:id": "questView"
		},

    initialize: function () {

      var appView = new AppView(); // load main window
      this.appView = appView;

      $("body").on("click", "a[data-internal]", function(e) {

        e.preventDefault();
        Backbone.history.navigate($(this).attr('href'), true);

      });

    },

    start: function() {
      Backbone.history.start({pushState: true});
    },

    quests: function() {
      this.appView.render();
    },

    questView: function(id) {

      var quest = new Quest({_id: id}),
        questsView = new QuestsView({collection: null, model: quest});

      quest.fetch();
      questsView.render();

    }

	});

	return Workspace;

});