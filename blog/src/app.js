const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const flash = require('connect-flash');
const path = require('path');

const app = express();

//setup view engine
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

//setup middleware dependencies
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.listen(3000, () => {
	console.log('App listening on http://localhost:3000')
});
