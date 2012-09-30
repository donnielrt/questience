define(['backbone', 'text!templates/tasks/list.html'], function (Backbone, tasksTemplate) {

  "use strict";

  return Backbone.View.extend({

    el:$("tasks-list"),

    template:_.template(tasksTemplate),

    events:{
    },

    initialize:function (options) {

      this.collection = options.collection || {};
      this.collection.limit = options.limit || -1;
      this.collection.bind('change reset', this.render, this);

      this.$el = options.$el || this.$el;

    },

    render:function () {

      var Quests = this.collection.toJSON();
      this.$el.html(this.template({Tasks:Tasks}));

      return this;
    }

  });

});
