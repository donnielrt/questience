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
      deadline: req.body.deadline,
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

    // fetch all records
    Quests.find().sort("updated", -1).execFind(function (error, quests) {

      if (!error) {
        console.log("Quests found: ", quests.length);
        res.send(quests);
      } else {
        console.log("Error", error);
      }

    });

  });

  app.get('/api/quests/limit/:num', function (req, res) {

    // fetch all records
    Quests.find().limit(req.params.num).sort("updated", -1).execFind(function (error, quests) {

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

    var quest, now = new Date(), status;

    quest = Quests.findById(req.params.id, function(err, quest) {

      quest.name = req.body.name;
      quest.description = req.body.description;
      quest.deadline = req.body.deadline;
      quest.updated = now;

      // status
      quest.status.remove();
      quest.status = { name: req.body.status };

      quest.save(function (error) {
        if (!error) {
          console.log("Saved");
        } else {
          console.log("Error saving quest", error);
        }
      });

    });

    return res.send(quest);
  });
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


  /* DELETEs */

  app.all('*', function(req, res) {
    res.redirect('/');
  });

};