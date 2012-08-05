/**
 * Module dependencies.
 */
var applicationRoot = __dirname,
	express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require("path"),
	mongoose = require('mongoose'),
	bootstrap = require('bootstrap-stylus'),
	stylus = require('stylus'),
	nib = require('nib'),
  hbs = require('hbs');

var app = express();

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.set('compress', true)
		.use(nib());
}
/**
 * Models
 */
mongoose.connect('mongodb://localhost/questience');

var users = require('./models/users');

/**
 * Configuration
 */

app.configure(function()
{

	app.use(express.favicon());

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

  app.set('view engine', 'html');
  app.engine('html', require('hbs').__express);

  app.set('port', process.env.PORT || 3000);
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

/**
 * Routes
 */
app.get('/', routes.index);
app.get('/about', routes.about);


/**
 * Initialize server
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
