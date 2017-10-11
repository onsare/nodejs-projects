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
