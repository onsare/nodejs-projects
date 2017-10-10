var express = require('express');
var router = express.Router();

var Book = require('../models/Book');
var Genre = require('../models/Genre');


////////////////////////////////
/////Documentaion and Guide////
//////////////////////////////
router.get('/', function(req, res){
	res.json("welcome to the books Api");
});

/////////////////////////
/////Books endpoint/////
///////////////////////
//Get all books endpoint
router.get('/books', function(req, res){
	Book.getBooks(function(err, books){
		if(err) throw err;
		res.json(books);
	});
});

//get book by id
router.get('/books/:id', function(req, res){
	var id = req.params.id;
	Book.getBookById(id, function(err, book){
		if(err) throw err;
		res.json(book);
	});
});
//create book
router.post('/books', function(req, res){
	var book = req.body;
	Book.createBook(book, function(err, book){
		if(err) throw err;
		res.json(book);
	});
});

//update book
router.put('/books/:id', function(req, res){
	var id = req.params.id;
	var book = req.body;
	var options = {}
	Book.updateBook(id, book, options, function(err, book){
		if(err) throw err;
		res.json(book);
	});
});

//delete book
router.delete('/books/:id', function(req, res){
	var id = req.params.id;
	Book.deleteBook(id, function(err, book){
		if(err) throw err;
		res.json(book);
	});
});

/////////////////////////
/////Genres endpoint////
///////////////////////


//get all Genres

router.get('/genre', function(req, res){
	Genre.getGenres(function(err, genres){
		if(err) throw err;
		res.json(genres);
	});
});
//get single genre
router.get('/genre/:id', function(req, res){
	var id = req.params.id;
	Genre.getGenreById(id, function(err, genre){
		if(err) throw err;
		res.json(genre);
	});
});

router.post('/genre', function(req, res){
	var genre = req.body;
	Genre.createGenre(genre, function(err, genre){
		if(err) throw err;
		res.json(genre);
	});
});
//update genre
router.put('/genre/:id', function(req, res){
	var id = req.params.id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, function(err, genre){
		if(err) throw err;
		res.json(genre);
	});
});
//delete genre
router.delete('/genre/:id', function(req, res){
	var id = req.params.id;
	Genre.deleteGenre(id, function(err, genre){
		if(err){
			res.status(400).send({message: "Cannot get this resourse at this time"});
		}
		res.json(genre);
	});
});

module.exports = router;