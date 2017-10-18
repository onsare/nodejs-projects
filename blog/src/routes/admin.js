var express = require('express');
var router =  express.Router();
var config = require('../config/config');
var db = require('monk')(config.DB_URI);

var posts = db.get('posts');

router.get('/', function(req, res){
	res.render('admin', {
		title: 'Admin Area',
		
	})
})





module.exports = router;