define([
	'backbone',
  'questience',
	'collections/tasks',
	'models/task',
	'text!templates/tasks/single.html',
	'text!templates/tasks/_item.html',
	'text!templates/tasks/form.html',
  'rangepicker'],
  function(
    Backbone,
    Questience,
    Tasks,
    Task,
    singleTaskTemplate,
    taskItemTemplate,
    taskFormTemplate,
    daterangepicker){

  "use strict";

	return Backbone.View.extend({

		tagName:  "form",
    className: "well form-horizontal",

		events: {
      "change input": "changeField",
      "click .btn-save": "saveTask"
		},

		initialize: function(options) {

			this.model.bind('reset change', this.render, this);
      //Backbone.Validation.bind(this);

		},

		render: function() {

			var templateData = this.model.toJSON(), that = this;

      templateData.formEditMode = this.model.isNew() ? "Create " : "Edit ";

      // loading immediately seems to have some issues, so we defer to load safe
      _.defer(function() {

        // datepicker

        that.$("input[name='deadline']").daterangepicker({
          presetRanges: [
            {text: 'Tomorrow', dateStart: 'Tomorrow', dateEnd: 'Tomorrow' },
            {text: 'This week', dateStart: 'Today+7', dateEnd: 'Today+7' },
            {text: 'Next 30 Days', dateStart: 'Today+30', dateEnd: 'Today+30' }
          ],
          presets: {
            specificDate: 'Specific Date'
          }
        });

      });
      this.$el.html($(_.template(taskFormTemplate)(templateData)));

      return this;
		},

    changeField: function(e) {
      
      var target = e.target, $target = $(e.target);

    },

    saveTask: function() {

      var result;

      this.model.set({
        name: this.$("input[name='name']").val(),
        points: this.$("input[name='points']").val(),
        description: this.$("textarea[name='description']").val(),
        deadline: this.$("input[name='deadline']").val(),
        status: this.$("select[name='status']").val()
      });

      this.collection = new Tasks();

      if (this.model.isNew()) {

        result = this.collection.create(this.model, {
          error: function() {
            $(".alert").html("There was an error saving the task! Please try again later.").removeClass().addClass('alert alert-error').alert('close');
          }
        });

      } else {

        result = this.model.save(this.model.toJSON(), {
          error: function () {
            $(".alert").html("There was an error saving the task! Please try again later.").removeClass().addClass('alert alert-error').alert('close');
          }
        });

      }

      if(result) {
        Questience.appRouter.navigate('#tasks/' + this.model.id, {trigger: true});
      }


    }

	});

});
