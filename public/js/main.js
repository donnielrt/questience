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

require(['modernizr', 'bootstrap', 'analytics', 'views/app', 'routers/router'], function (modernizr, Bootstrap, analytics, AppView, Workspace) {

	"use strict";

	// after jQuery has loaded, we still need to ensure the DOM is ready
	$(function(){

		var QuestienceRouter = new Workspace,
			appView = new AppView;

		Backbone.history.start();

		// Google analytics
		window._gaq = [['_setAccount','UA-XYZ-1'],['_trackPageview'],['_trackPageLoadTime']];

	});

});