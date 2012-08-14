define(['backbone', 'collections/quests', 'models/quest', 'text!templates/quest.html', 'text!templates/quest-new.html'],
  function(Backbone, Quests, Quest, questsTemplate, newQuestTemplate){

  "use strict";

	var QuestView = Backbone.View.extend({

		tagName:  "li",
    className: "span4",

		template: _.template(questsTemplate),

		events: {
      "change input": "change",
      "click .btn-save": "saveQuest",
      "click .btn-delete": "deleteQuest"
		},

		initialize: function() {
      this.model.bind('reset change', this.render, this);
		},

		render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
		},

    change: function(e) {
      var target = e.target;
      console.log("Changing ", target.id, " from ", target.defaultValue, " to ", target.value);
    },

    newQuest: function () {

      this.model = new Quest();

      console.log("New quest");
      this.$el.html(_.template(newQuestTemplate));
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

    deleteQuest: function() {
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
