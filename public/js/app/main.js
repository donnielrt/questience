require.config({
	paths: {
		"modernizr": "../libs/modernizr.min",
		"bootstrap": "../libs/bootstrap.min",
		"underscore": "../libs/underscore",
		"backbone": "../libs/backbone",
    "backbone-forms": "../libs/backbone-forms",
		"analytics": "//google-analytics.com/ga",
    "text": "../libs/text"
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
    'backbone-forms': {
      deps: ['underscore', 'backbone'],
      exports: 'BackboneForms'
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

	});

});