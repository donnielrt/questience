define(['backbone', 'collections/quests',	'views/quests', 'text!templates/index.html'], function(Backbone, Quests, QuestsView, indexTemplate) {

  "use strict";

  return Backbone.View.extend({

    el: $("#questience-app"),

    template: _.template(indexTemplate),

    events: {
    },

    initialize: function() {

      console.log("App View initialized!", this.el);
      this.render();

    },

    render: function() {

      var questsView = new QuestsView({collection: Quests, model: null}); // render quests

      this.$el.html(this.template).append(questsView.el);

    }

  });

});
