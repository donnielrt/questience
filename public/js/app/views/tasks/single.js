define([
	'backbone',
	'collections/tasks',
	'models/task',
	'text!templates/tasks/single.html',
	'text!templates/tasks/_item.html',
	'text!templates/tasks/form.html'],
  function(Backbone, Tasks, Task, singleTaskTemplate, taskItemTemplate, taskFormTemplate){

  "use strict";

	return Backbone.View.extend({

		tagName:  "div",

		events: {
		},

		initialize: function(options) {

			this.model.bind('reset change', this.render, this);

			// settings
			this.singleView = options.singleView || false;
			this.newRow = options.newRow || false;

			if(this.singleView) {
				this.lastPage = options.lastPage || "#tasks";
			}

		},

		render: function() {

			var templateData = this.model.toJSON();

			if(this.newRow) {
				this.$el.addClass('list-row-new');
			}

      if(this.singleView) {
        templateData = _.extend(this.model.toJSON(), { lastPage: this.lastPage } );
        this.$el.html(_.template(singleTaskTemplate)(templateData));
      } else {
        this.$el.addClass("span4").html(_.template(taskItemTemplate)(templateData));
      }

      return this;
		}

	});

});
