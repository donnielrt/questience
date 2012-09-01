/**
 * Module dependencies.
 */
var applicationRoot = __dirname,
	express = require('express'),
	router = require('./routes'),
	http = require('http'),
	path = require("path"),
	bootstrap = require('bootstrap-stylus'),
	stylus = require('stylus'),
	nib = require('nib'),
  hbs = require('hbs'),
  mongoose = require('mongoose');

var app = express();

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.set('compress', true)
		.use(nib());
}

/**
 * Configuration
 */

app.configure(function()
{

	app.use(express.favicon());

  app.set('view engine', 'html');
  app.engine('html', require('hbs').__express);
  app.set('views', __dirname + '/views');

	app.use(stylus.middleware({
		src: applicationRoot + '/public',
		compile: compile
	}));
	app.use(express.static(path.join(applicationRoot, 'public')));

	app.use(express.bodyParser());
  app.use(express.methodOverride());

	app.use(app.router);
	app.use(express.logger('dev'));

  app.set('port', process.env.PORT || 8080);
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  mongoose.connect('mongodb://localhost/questience');
});

/* DB */
application.configure('staging', function() {
  console.log('Configuring middleware for the production environment.');
  application.use(express.static(__dirname + '/public'));
  mongoose.connect('mongodb://heroku_app7204375:5bes70u23r9ucvje0m2frjhb89@ds037447-a.mongolab.com:37447/heroku_app7204375');
});

application.configure('staging', function() {
  console.log('Configuring middleware for the production environment.');
  application.use(express.static(__dirname + '/public'));
  mongoose.connect('mongodb://heroku_app7204375:5bes70u23r9ucvje0m2frjhb89@ds037447-a.mongolab.com:37447/heroku_app7204375');
});

/**
 * Routes
 */
router.setRoutes(app, mongoose);

/**
 * Initialize server
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
