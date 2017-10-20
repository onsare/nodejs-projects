var express = require('express');
var router =  express.Router();
var config = require('../config/config');
var db = require('monk')(config.DB_URI);

var posts = db.get('posts');
var categories = db.get('categories');

router.get('/', function(req, res){
	res.render('admin', {
		title: 'Admin Area',

	});
});


posts.find({},{}, function(err, posts){
	if(err) throw "Erro occured while retriving posts";
	var countPosts = function(){
		return posts.length;
	}

	categories.find({}, function(err, categories){
		if (err) throw "could not get categories";
		var countCat = function(){
			return categories.length;
		}
		console.log("counting categories in db", countCat());

		router.get('/dashboard', function(req, res){
			res.render('dashboard', {
				title: 'Dashboard',
				posts: posts,
				numOfPosts: countPosts(),
				numOfCategories: countCat()
			
			});
		});
	
	});
	
    
})



router.get('/posts', function(req, res){
	res.render('posts', {
		title: 'Posts',
		
	});
});

router.get('/posts/new', function(req, res){
	res.render('new-post', {
		title: 'Add Post',
		
	});
});

router.post('/posts', function(req, res){
	//TODO
});

router.get('/categories', function(req, res){
	res.render('categories', {
		title: 'Categories',
		
	});
});

router.get('/media', function(req, res){
	res.render('media', {
		title: 'Media',
		
	});
});


router.get('/settings', function(req, res){
	res.render('settings', {
		title: 'Settings',
		
	});
});




module.exports = router;