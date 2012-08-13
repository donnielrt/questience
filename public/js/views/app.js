define([
	'jquery',
	'backbone',
  'collections/quests',
	'views/quests',
	'common'
], function($, Backbone, Quests, QuestsView, questsTemplate, Common) {

  return Backbone.View.extend({

    el: $("#questience-app"),

    template: _.template(""),

    events: {
    },

    initialize: function() {

      console.log("App View initialized!", this.el);
      this.render();

    },

    render: function() {

      var questsView;

      this.$el.append(this.template);

      questsView = new QuestsView({collection: Quests, model: null}); // render quests

      this.$el.append(questsView.el);

    }

  });

});
