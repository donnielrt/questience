var mongoose = require('mongoose'),
	models = require('../models'),
	Users = models.Users(),
	Status = models.Statuses(),
	Attributes = models.Attributes(),
	Tasks = models.Tasks(),
	Quests = models.Quests();

console.log("Models: ", models);

exports.setRoutes = function (app, mongoose) {

	/* GETs */
	app.get('/', function (req, res) {
		res.render('index', { title:'Home' });
	});
	app.get('/about', function (req, res) {
		res.render('about', { title:'About Questience' });
	});

/*	app.get('/quests', function (req, res) {

		Quests.find().execFind(function (error, results) {

			if (!error) {
				console.log("Quests found: ", results.length);
				res.render('quests', { title:'Quests', quests:results });
			} else {
				console.log("Error", error);
			}

		});

	});*/

	app.get('/api/quests/:id', function (req, res) {

		Quests.findById(req.params.id, function (error, quest) {

			if (!error && quest) {
				res.send(quest);
			} else {
				res.send(null);
			}

		});

	});

	/* POSTs */
	app.post('/api/quests/new', function (req, res) {

		var quest, now = new Date();
		console.log("Creating Quest");

		quest = new Quests({
			name: req.body.name,
			created: now,
			updated: now
		});

		quest.save(function (error) {
			if (!error) {
				console.log("Saved");
			} else {
				console.log("Error saving quest");
			}
		});

		return res.send(quest);
	});

};