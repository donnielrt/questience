define([
	'backbone',
  'questience',
	'collections/quests',
	'models/quest',
	'text!templates/quests/single.html',
	'text!templates/quests/_item.html',
	'text!templates/quests/form.html',
  'rangepicker'],
  function(
    Backbone,
    Questience,
    Quests,
    Quest,
    singleQuestTemplate,
    questItemTemplate,
    questFormTemplate,
    rangePicker){

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

		},

		render: function() {

			var templateData = this.model.toJSON(), that = this;

      templateData.formEditMode = this.model.isNew() ? "Create " : "Edit ";

      _.defer(function() {

        // datepicker

        that.$("input[name='deadline']").daterangepicker({
          presetRanges: [
            {text: 'Tomorrow', dateStart: 'Tomorrow', dateEnd: 'Tomorrow' },
            {text: 'This week', dateStart: 'Today+7', dateEnd: 'Today+7' },
            {text: 'Next 30 Days', dateStart: 'Today+30', dateEnd: 'Today+30' }
          ]
        });

      });
      this.$el.html($(_.template(questFormTemplate)(templateData)));

      return this;
		},

    changeField: function(e) {
      var target = e.target;
    },

    saveQuest: function() {

      var status = this.model.isNew ? "new" : this.model.status;

      console.log("Deadline: ", this.$("input[name='deadline']").val());

      this.model.set({
        name: this.$("input[name='name']").val(),
        description: this.$("textarea[name='description']").val(),
        deadline: this.$("input[name='deadline']").val(),
        status: status
      });

      this.collection = new Quests();

      if (this.model.isNew()) {
        this.collection.create(this.model);
      } else {
        this.model.save(this.model.toJSON(), {
          wait: true,
          success: function (model, response) {
            $(".alert").html("Your changes have been saved!").removeClass().addClass('alert alert-success').alert('close');
            Questience.appRouter.navigate('#quests', {trigger: true});
          },
          error: function () {
            alert("Not Saved");
            $(".alert").html("There was an error saving the quest! Please try again later.").removeClass().addClass('alert alert-error').alert('close');
          }
        });
      }

    }

	});

});
