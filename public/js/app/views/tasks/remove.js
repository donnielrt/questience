define([
	'backbone',
	'collections/tasks',
	'models/task',
	'text!templates/tasks/remove.html',
  'questience'],
  function(Backbone, Tasks, Task, taskDeleteTemplate, Questience){

  "use strict";

	return Backbone.View.extend({

		tagName:  "form",
    className: "well form-horizontal",

		events: {
      "click .btn-remove": "removeTask"
		},

		initialize: function() {
      this.model.bind('reset change', this.render, this);
		},

		render: function() {

			var templateData = this.model.toJSON();

      this.$el.html($(_.template(taskDeleteTemplate)(templateData)));

      return this;
		},

    removeTask: function() {
      this.model.destroy({
        success: function() {
          console.log("Deleted");
          Questience.appRouter.navigate('/tasks', {trigger: true});
        },
        error: function() {
          Questience.appRouter.navigate('/tasks/' + this.model._id + '#delete-error', {trigger: true});
        }
      });
    },

    close: function() {
      this.el.unbind();
      this.el.empty();
    }

	});

});
