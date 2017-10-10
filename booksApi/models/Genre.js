var mongoose = require('mongoose');

var Genre = mongoose.model('Genre',{
	name: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		default: Date.now
	}
});

module.exports = Genre;
//get all
module.exports.getGenres = function(callback, limit){
	Genre.find(callback).limit(limit);
}
//get single genre
module.exports.getGenreById = function(id, callback){
	Genre.findById(id, callback);
}

//update
module.exports.updateGenre = function(id, genre, update, options, callback){
	var id = {_id: id};
	var update = {name: genre.name};
	Genre.findOneAndUpdate(id, update, options, callback)
}
//create
module.exports.createGenre = function(genre, callback){
	Genre.create(genre, callback);
}
//delete
module.exports.deleteGenre = function(id, callback){
	var id = {_id: id}
	Genre.remove(id, callback);
}