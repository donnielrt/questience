define(['backbone', 'text!templates/quests/list.html'], function(Backbone, questsTemplate){

  "use strict";

	var QuestsView = Backbone.View.extend({

    el: $("quests-list"),

		template: _.template(questsTemplate),

		events: {
		},

		initialize: function(options) {

      this.collection = options.collection || {};
      this.collection.limit = options.limit || -1;
	    this.collection.bind('change reset', this.render, this);

      this.$el = options.$el || this.$el;

		},

		render: function() {

      var Quests = this.collection.toJSON();
      this.$el.html(this.template({Quests: Quests}));

      console.log("Rendering ", this.$el);

      return this;
		}

	});


	return QuestsView;
});
