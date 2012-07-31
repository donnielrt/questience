/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Welcome | Questience', heading: 'Welcome to Questience', contents: 'Coming soon' }); // @todo save common parts of the URL to a function
};