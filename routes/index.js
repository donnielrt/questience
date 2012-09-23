var mongoose = require('mongoose'),
	models = require('../models'),
	Users = models.Users(),
	Status = models.Statuses(),
	Attributes = models.Attributes(),
	Tasks = models.Tasks(),
	Quests = models.Quests();

exports.setRoutes = function (app, mongoose) {

	/* CREATEs */
	app.post('/api/quests', function (req, res) {

		var quest, now = new Date();
		console.log("Creating Quest");

		quest = new Quests({
			name: req.body.name,
      description: req.body.description,
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

  /* RETRIEVEs */
  app.get('/', function (req, res) {
    res.render('index', { title:'Home' });
  });

  app.get('/about', function (req, res) {
    res.render('about', { title:'About Questience' });
  });

  app.get('/api/quests', function (req, res) {

    Quests.find().execFind(function (error, quests) {

      if (!error) {
        console.log("Quests found: ", quests.length);
        res.send(quests);
      } else {
        console.log("Error", error);
      }

    });

  });

  app.get('/api/quests/:id', function (req, res) {

    Quests.findById(req.params.id, function (error, quest) {

      if (!error && quest) {
        res.send(quest);
      } else {
        res.send(null);
      }

    });

  });

  /* UPDATEs */

  app.put('/api/quests/:id', function (req, res) {

    var quest, now = new Date();
    console.log("Updating Quest");

    quest = Quests.findById(req.params.id, function(err, quest) {

      quest.name = req.body.name;
      quest.description = req.body.description;
      quest.deadline = req.body.deadline;
      quest.updated = now;

      console.log("Description: ", req.body.description);

      quest.save(function (error) {
        if (!error) {
          console.log("Saved");
        } else {
          console.log("Error saving quest");
        }
      });

    });

    return res.send(quest);
  });

  /* DELETEs */

  app.delete('/api/quests/:id', function(req, res){

    console.log("Deleting quest");

    return Quests.findById(req.params.id, function(err, quest) {
      if (quest !== null) {
        return quest.remove(function(err) {
          if (!err) {
            console.log("removed");
            return res.send('');
          }
        });
      } else {
        return res.send('', 404);
      }
    });
  });

  app.all('*', function(req, res) {
    res.redirect('/');
  });

};