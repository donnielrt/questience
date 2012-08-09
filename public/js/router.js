define([
  'jquery', 'mustache', 'backbone', 'views/app'
], function($, _, Backbone, AppView){
  var Router = Backbone.Router.extend({
    routes: {
      "": "home",
      "quests/new": "quest_new",
      "quests/:id": "quest_view"
    },
    start: function () {
      Backbone.history.start();
    },
    initialize: function () {
      this.appview = new AppView();
    },
    home: function () {
      this.appview.home();
    },
    poster_view: function (id) {
      this.appview.quest_view(id);
    },
    poster_new: function () {
      this.appview.quest_new();
    }
  });
  return new Router;
});