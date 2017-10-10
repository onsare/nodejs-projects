var mongoose = require('mongoose');

var Book = mongoose.model('Book',{
	title:{
		type: String,
		required: true
	},
	description:{
		type: String,
	},
	author:{
		type: String
	},
	genre:{
		type: String
	},
	publisher:{
		type: String
	},
	pages:{
		type:Number
	},
	date:{
		type: Date,
		default: Date.now
	}
});

module.exports = Book;
//get all books
module.exports.getBooks = function(callback, limit){
	Book.find(callback).limit(limit);
}
//get a single book
module.exports.getBookById = function(id, callback){
	Book.findById(id, callback);
}
//create book
module.exports.createBook = function(book, callback){
	Book.create(book, callback);
}
//update a book
module.exports.updateBook = function(id, book, options, callback){
	var query = {_id: id};
	var update = {
		title: book.title,
		descriptin: book.description,
		author: book.author,
		genre: book.genre,
		publisher: book.publisher,
		pages: book.pages,
		date: book.date
	};
	Book.findOneAndUpdate(query, update, options, callback);
}
//delete book

module.exports.deleteBook = function(id, callback){
	Book.remove(id, callback);
}









