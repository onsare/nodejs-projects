var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var User = require('../models/User');


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

     req.flash('success','You have registered successfully');
     res.redirect('/users/login');
    });

   
    
  }

});

router.get('/members', function(req, res, next){
  res.render('members', { title: 'Members Area' });
});
module.exports = router;
