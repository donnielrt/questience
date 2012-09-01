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

		tagName:  "div",

		events: {
		},

		initialize: function(options) {

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
        this.$el.html(_.template(singleQuestTemplate)(templateData));
      } else {
        this.$el.addClass("span4").html(_.template(questItemTemplate)(templateData));
      }

      return this;
		}

	});

});
