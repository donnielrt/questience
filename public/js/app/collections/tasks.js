define(['backbone', 'models/task', 'views/tasks/single'], function (Backbone, Task, TaskView) {

  "use strict";

  return Backbone.Collection.extend({

    url:"/api/tasks",

    model:Task,

    initialize:function (options) {

      options = options || {};
      this.limit = options.limit || -1;

      // used when fetching a limited number of results
      if (this.limit > 0) {
        this.url = this.url + "/limit/" + this.limit;
      }

    }

  });

});
