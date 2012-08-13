define(['backbone', 'collections/quests',	'views/quests'], function(Backbone, Quests, QuestsView) {

  "use strict";

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

      var questsView = new QuestsView({collection: Quests, model: null}); // render quests

      this.$el.append(this.template).append(questsView.el);

    }

  });

});
