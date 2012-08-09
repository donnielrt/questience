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

  app.set('port', process.env.PORT || 3000);
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

/* Models */
mongoose.connect('mongodb://localhost/questience');

/**
 * Routes
 */
router.setRoutes(app, mongoose);
l

/**
 * Initialize server
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
