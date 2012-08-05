/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { body: '', title: 'Home' });
};
exports.about = function(req, res){
  res.render('about', { body: '', title: 'About Questience' });
};