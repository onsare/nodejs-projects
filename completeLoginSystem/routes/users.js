var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*GET login page*/
router.get('/login', function(req, res, next){
  res.render('login', { title: 'Login' });
});

router.get('/register', function(req, res, next){
  res.render('register', { title: 'Register' });
});

router.post('/register', function(req, res, next){
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.psw;
  var password_repeat = req.body.psw-repeat;


  req.checkBody('email','Email is require').notEmpty();
  req.checkBody('username','Username is required').notEmpty();
  req.password('password','Password is required').notEmpty();
  password_repeat('password_repeat','Password did not match').isEqual(req.body.password);

  var errors = validationErrors();

  if (errors){
    res.render('register',{
      errors: errors,
      email: email,
      username: username
    })
  }else{
    var user = {
      email: email,
      username: username,
      password: password
    }

    User.createUser(user, function(err, user){
        if(err) throw err;
        console.log('New user created: ', user);
    });
  }
});

router.get('/members', function(req, res, next){
  res.render('members', { title: 'Members Area' });
});
module.exports = router;
