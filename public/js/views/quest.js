define([
	'backbone',
	'collections/quests',
	'models/quest',
	'text!templates/quests/single.html',
	'text!templates/quests/_item.html',
	'text!templates/quests/form.html'],
  function(Backbone, Quests, Quest, singleQuestTemplate, questItemTemplate, questFormTemplate){

  "use strict";

	var QuestView = Backbone.View.extend({

		tagName:  "li",

		events: {
      "change input": "changeField",
      "click .btn-save": "saveQuest",
      "click .btn-delete": "removeQuest"
		},

		initialize: function(options) {

			if(typeof this.model !== "undefined") {
				this.model = options.model;
				console.log("Init Model", this.model);
			}

			this.model.bind('reset change', this.render, this);

			// settings
			this.singleView = options.singleView || false;
			this.newRow = options.newRow || false;

			if(this.singleView) {
				this.lastPage = options.lastPage || "#quests";
			}

		},

		render: function() {

			var templateData = this.model.toJSON();

			if(this.newRow) {
				this.$el.addClass('list-row-new');
			}

			if(this.singleView) {
				templateData = _.extend(this.model.toJSON(), { lastPage: this.lastPage } );
				this.$el.addClass("span8").html(_.template(singleQuestTemplate)(templateData));
			} else {

				this.$el.addClass("span4").html(_.template(questItemTemplate)(templateData));

			}

      return this;
		},

    changeField: function(e) {
      var target = e.target;
    },

    newQuest: function () {

			var templateData = { newQuest: true };

      console.log("New quest");
      this.$el = _.template(questFormTemplate, templateData);
      return this;

    },

		editQuest: function() {

			var templateData = _.extend(this.model.attributes, { newQuest: false });

			console.log("Model: ", this.model, "Template Data: ", templateData);

			console.log(_.template(questFormTemplate, templateData));

			this.$el = $(_.template(questFormTemplate, templateData));
			return this;

		},

    saveQuest: function() {

      var status = this.model.isNew ? "new" : "pending";

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
        this.model.save();
      }

    },

    removeQuest: function() {
      this.model.destroy({
        success: function() {
          alert("Quest deleted successfully!");
          Backbone.history.navigate('/quests');
        }
      });
    },

    close: function() {
      this.el.unbind();
      this.el.empty();
    }

	});


	return QuestView;
});
