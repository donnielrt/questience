define([
	'backbone',
  'questience',
	'collections/quests',
	'models/quest',
	'text!templates/quests/single.html',
	'text!templates/quests/_item.html',
	'text!templates/quests/form.html',
  'rangepicker',
  'moment'],
  function(
    Backbone,
    Questience,
    Quests,
    Quest,
    singleQuestTemplate,
    questItemTemplate,
    questFormTemplate,
    rangePicker,
    moment){

  "use strict";

	return Backbone.View.extend({

		tagName:  "form",
    className: "well form-horizontal",

		events: {
      "change input": "changeField",
      "click .btn-save": "saveQuest"
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
          presets: [],
          onChange: function() {
            that.model.emit('change');
          }

        });

      });
      this.$el.html($(_.template(questFormTemplate)(templateData)));

      return this;
		},

    changeField: function(e) {
      
      var target = e.target, $target = $(e.target);

      console.log("Target is ", $target);

    },

    saveQuest: function() {

      var result, 
        deadlineDate = this.$("input[name='deadline']").data('machine-date'); // we show a human-friendly string in the actual value field

      this.model.set({
        name: this.$("input[name='name']").val(),
        description: this.$("textarea[name='description']").val(),
        deadline: deadlineDate,
        status: this.$("select[name='status']").val()
      });

      this.collection = new Quests();

      if (this.model.isNew()) {

        result = this.collection.create(this.model, {
          error: function() {
            $(".alert").html("There was an error saving the quest! Please try again later.").removeClass().addClass('alert alert-error').alert('close');
          }
        });

      } else {

        result = this.model.save(this.model.toJSON(), {
          error: function () {
            $(".alert").html("There was an error saving the quest! Please try again later.").removeClass().addClass('alert alert-error').alert('close');
          }
        });

      }

      if(result) {
        console.log(this.model);
        Questience.appRouter.navigate('#quests/' + this.model.id, {trigger: true});
      }


    }

	});

});
