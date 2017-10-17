const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const flash = require('connect-flash');
const path = require('path');

const config = require('./config/config');

const app = express();

//setup view engine
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

//setup middleware dependencies
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//routes

const index = require('./routes/index');

app.use('/', index);



app.listen(config.port, () => {
	console.log(`App listening on http://localhost:${config.port}`);
});
