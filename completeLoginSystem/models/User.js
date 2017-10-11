const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User',{
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = User;

module.exports.createUser = function(user, callback){
    bcrypt.hash(user.password, 10, function(err, hash){
        if (err) throw err;
        user.password = hash;
        User.create(user, callback);
    })
    
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch);
    });
}

module.exports.findUserByUsername = function(username, callback){
    var query = {username: username}
    User.findOne(query, callback);
}

module.exports.findUserById = function(id, callback){
    User.findById(id);
}
