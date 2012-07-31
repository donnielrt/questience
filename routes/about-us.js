/*
 * GET about us page.
 */

exports.aboutUs = function(req, res){
	res.render('about-us', { title: 'About Us | Questience', heading: 'About Questience', contents: 'Coming soon' }); // @todo save common parts of the URL to a function
};