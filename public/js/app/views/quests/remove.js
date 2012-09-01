define([
	'backbone',
	'collections/quests',
	'models/quest',
	'text!templates/quests/remove.html'],
  function(Backbone, Quests, Quest, questDeleteTemplate){

  "use strict";

	return Backbone.View.extend({

		tagName:  "form",
    className: "well form-horizontal",

		events: {
      "click .btn-remove": "removeQuest"
		},

		initialize: function() {
      this.model.bind('reset change', this.render, this);
		},

		render: function() {

			var templateData = this.model.toJSON();

      this.$el.html($(_.template(questDeleteTemplate)(templateData)));

      return this;
		},

    removeQuest: function() {
      this.model.destroy({
        success: function() {
          Backbone.history.navigate('/quests');
        },
        error: function() {
          Backbone.history.navigate('/quests/' + this.model._id + '#delete-error');
        }
      });
    },

    close: function() {
      this.el.unbind();
      this.el.empty();
    }

	});

});
