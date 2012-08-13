define(['backbone', 'collections/quests', 'text!templates/quest.html', 'common'], function(Backbone, Quests, questsTemplate, Common){

  "use strict";

	var QuestView = Backbone.View.extend({

		tagName:  "li",
    className: "span4",

		template: _.template(questsTemplate),

		events: {
      "change input": "change",
      "click .save": "saveQuest",
      "click .delete": "deleteQuest"
		},

		initialize: function(model) {
      this.model.bind('change', this.render, this);
		},

		render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
		},

    change: function(e) {
      var target = e.target;
      console.log("Changing ", target.id, " from ", target.defaultValue, " to ", target.value);
    },

    saveQuest: function() {

      var status = this.model.isNew ? "new" : "pending";

      this.model.set({
        name: $("#name").val(),
        description: $("#description").val(),
        deadline: $("#deadline").val(),
        status: status
      });

      if (this.model.isNew()) {
        Quests.create(this.model);
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
