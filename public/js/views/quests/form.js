define([
	'backbone',
	'collections/quests',
	'models/quest',
	'text!templates/quests/single.html',
	'text!templates/quests/_item.html',
	'text!templates/quests/form.html'],
  function(Backbone, Quests, Quest, singleQuestTemplate, questItemTemplate, questFormTemplate){

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

			var templateData = this.model.toJSON();

      this.$el.html($(_.template(questFormTemplate)(templateData)));

      return this;
		},

    changeField: function(e) {
      var target = e.target;
    },

    saveQuest: function() {

      var status = this.model.isNew ? "new" : this.model.status;

      console.log("Saving");

      this.model.set({
        name: $("#name").val(),
        description: $("#description").val(),
        deadline: $("#deadline").val(),
        status: status
      });

      this.collection = new Quests();

      if (this.model.isNew()) {
        this.collection.create(this.model);
      } else {
        this.model.save({
          success: function () {
            Backbone.navigate('/');
          },
          error: function () {
            $(".alert").html("There was an error saving the quest! Please try again later.").alert('close');
          }
        });
      }

    }

	});

});
