require.config({
	paths: {
		"modernizr": "libs/modernizr.min",
		"bootstrap": "libs/bootstrap.min",
		"underscore": "libs/underscore.min",
		"backbone": "libs/backbone.min",
		"analytics": "//google-analytics.com/ga"
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

require(['modernizr', 'bootstrap', 'underscore', 'backbone', 'analytics'], function (modernizr, Bootstrap, _, Backbone, analytics) {
	"use strict";

	// after jQuery has loaded, we still need to ensure the DOM is ready
	$(function(){

		// Google analytics
		window._gaq = [['_setAccount','UA-XYZ-1'],['_trackPageview'],['_trackPageLoadTime']];

	});

});