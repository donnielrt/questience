var mongoose = require('mongoose'),
  models = require('../models'),
  Users = models.Users(),
  Status = models.Status(),
  Attributes = models.Attributes(),
  Tasks = models.Tasks(),
  Quests = models.Quests();

console.log("Models: ", models);

exports.setRoutes = function(app, mongoose) {

  /* GETs */
  app.get('/', function (req, res) {
    res.render('index', { body: '', title: 'Home' });
  });
  app.get('/about', function(req, res) {
    res.render('about', { body: '', title: 'About Questience' });
  });

  app.get('/quests', function(req, res) {

    console.log("Getting quests", Quests);

    var quest = new Quests;
    quest.save(function (err) {
      if(!err) {
        return console.log("Error saving quest");
      }
    });

    Quests.find().execFind(function (err, results) {
      console.log("Quests found");
      res.render('quests', { body: '', title: 'Quests', quests: results });
    });

  });

  /* POSTs *//*
  app.post('/api/quests', function(req, res){

    var quest, userId = 1, today = new Date();
    console.log("Creating Quest");

    quest = new Quest({
      name: "test",
      author: userId,
      status: "pending",
      created: today,
      updated: today
    });
    quest.save(function(err) {
      if (!err) {
        return console.log("created");
      }
    });
    return res.send(quest);
  });*/

};