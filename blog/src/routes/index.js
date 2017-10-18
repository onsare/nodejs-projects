var express = require('express');
var router =  express.Router();
var config = require('../config/config');
var db = require('monk')(config.DB_URI);

var posts = db.get('posts');

posts.find({},{}, function(err, posts){
	if (err) throw "Connection to db failed";

		router.get('/', function(req, res, next){
			res.render('index', {
				title: 'Home',
				posts: posts
			});
	});

});

router.get('/blog/single/:id', function(req, res){
	posts.findOne({_id:req.params.id}, function(err, post){
		if (err) throw err;
		res.render('single', {
			title: post.title,
			post: post
		});

		console.log(post);
	});

});



router.get('/about', function(req, res, next){
	res.render('about', {title: 'About'});
});

router.get('/contact', function(req, res, next){
	res.render('contact', {title: 'Contact'});
});

router.get('/blog', function(req, res, next){
	posts.find({},{}, function(err, posts){
		if (err) throw "Oops! connection failed";
		res.render('blog', {
			title: "Blog",
			posts: posts
		})
	})
});

module.exports = router;
