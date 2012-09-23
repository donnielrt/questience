define([
	'backbone',
	'collections/quests',
	'models/quest',
	'text!templates/quests/remove.html',
  'questience'],
  function(Backbone, Quests, Quest, questDeleteTemplate, Questience){

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
          console.log("Deleted");
          Questience.appRouter.navigate('/quests', {trigger: true});
        },
        error: function() {
          Questience.appRouter.navigate('/quests/' + this.model._id + '#delete-error', {trigger: true});
        }
      });
    },

    close: function() {
      this.el.unbind();
      this.el.empty();
    }

	});

});
