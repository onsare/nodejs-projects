const mongoose = require('mongoose');

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
    User.create(user, callback);
}