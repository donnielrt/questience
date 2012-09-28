require.config({
	paths: {

    "modernizr": "../libs/modernizr.min",
    "text": "../libs/require/text",
    "underscore": "../libs/underscore",

    "bootstrap": "../libs/bootstrap/bootstrap.min",

		"backbone": "../libs/backbone/backbone",
    "backbone-validate": "../libs/backbone/backbone.validation.min",

    "analytics": "//google-analytics.com/ga",
    "jquery-ui": "../libs/plugins/jquery-ui",
    "rangepicker": "../libs/plugins/rangepicker.min",
    "moment": "../libs/plugins/moment"
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
    'backbone-forms': {
      deps: ['underscore', 'backbone'],
      exports: 'BackboneForms'
    },
    'backbone-validate': {
      deps: ['backbone'],
      exports: 'BackboneValidate'
    },
    'rangepicker': {
      deps: ['jquery', 'jquery-ui'],
      exports: 'rangePicker'
    }
	}
});

require(['modernizr', 'bootstrap', 'analytics', 'routes/router', 'questience'], function (modernizr, Bootstrap, analytics, AppRouter, Questience) {

	"use strict";

	// after jQuery has loaded, we still need to ensure the DOM is ready
	$(function(){

    Questience.appRouter = new AppRouter();
    Questience.appRouter.start();

		// Google analytics
		window._gaq = [['_setAccount','UA-XYZ-1'],['_trackPageview'],['_trackPageLoadTime']];

    _.extend(Backbone.Validation.validators, {
      dateValidator: function(value, attr, customValue, model) {
        if(value !== customValue){
          return 'error';
        }
      }
    });

	});

});