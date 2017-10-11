var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var User = require('../models/User');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*GET login page*/
router.get('/login', function(req, res, next){
  res.render('login', { title: 'Login' });
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findUserByUsername(username, function (err, user) {
      if (err) throw err;
      if (!user) {
        console.log('unknown user');
        return done(null, false, { message: 'Incorrect username.' });
      }
     User.comparePassword(password, user.password, function(err, isMatch){
        if (err) throw err;
        if (isMatch){
            return done(null, user);
        } else {
          console.log('Invalid password');
          return done(null, false, {message: 'Invalid password.'});
        }
     });
      
    });
  }
));

/*post login page*/
router.post('/login', passport.authenticate('local', {failureRedirect:'/users/login', failureFlash: 'Invalid username or password.'}), function(req, res, next){
  req.flash('success','Login successful');
  res.redirect('/users/members');
});

router.get('/register', function(req, res, next){
  res.render('register', { title: 'Register' });
});

router.post('/register',[
  check('email')
    .exists()
    .isEmail().withMessage('must be an email')
    .trim()
    .normalizeEmail(),
  check('username','should not be empty')
    .exists()
    .trim(),
  check('password', 'passwords must be at least 5 chars long and contain one number')
    .isLength({ min: 5 })
    .matches(/\d/),
  check('passwordConfirmation', 'passwords do not match')
    .exists()
    .custom((passwordConfirmation, { req }) => passwordConfirmation === req.body.password),
], (req, res, next) => {
  // Get the validation result whenever you want; see the Validation Result API for all options!
  const errors = validationResult(req);
  const user = matchedData(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
    res.render('register',{
      errors   : errors,
      email    : user.email,
      username : user.username
    });
  } else {
 
    console.log(user);
    User.createUser(user, function(err, user){
         if(err) throw err;
        console.log('New user created: ', user);
    });
  }

  req.flash('success','You have registered successfully')
  res.redirect('/users/login');
});

router.get('/members', function(req, res, next){
  res.render('members', { title: 'Members Area' });
});

router.get('/logout', function(req, res, next){
  req.logout();
  req.flash('success', 'Logout successfully');
  res.redirect('/users/login');
});

module.exports = router;
