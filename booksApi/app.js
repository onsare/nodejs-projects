var express = require('express');
mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//connect to mongo db
mongoose.connection.openUri('mongodb://localhost/bookstore');

//express instance
var app = express();

//middleware

app.use(bodyParser.json());

app.use('/api', require('./api/api'));


app.listen(3000);
console.log("App listening on Port http://localhost:3000");
