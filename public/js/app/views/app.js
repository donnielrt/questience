define(['backbone', 'text!templates/index.html'], function(Backbone, indexTemplate) {

  "use strict";

  return Backbone.View.extend({

    el: $("#questience-app"),

    template: _.template(indexTemplate),

    events: {
    },

    initialize: function() {
    },

    render: function() {

			this.$el.html(this.template);
			return this;

    }

  });

});
