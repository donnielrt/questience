require.config({
	paths: {
		"modernizr": "libs/modernizr.min",
		"bootstrap": "libs/bootstrap.min",
		"underscore": "libs/underscore",
		"backbone": "libs/backbone",
		"analytics": "//google-analytics.com/ga"
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

require(['modernizr', 'bootstrap', 'analytics', 'routes/router'], function (modernizr, Bootstrap, analytics, AppRouter) {

	"use strict";

	// after jQuery has loaded, we still need to ensure the DOM is ready
	$(function(){

    new AppRouter().start();

		// Google analytics
		window._gaq = [['_setAccount','UA-XYZ-1'],['_trackPageview'],['_trackPageLoadTime']];

	});

});