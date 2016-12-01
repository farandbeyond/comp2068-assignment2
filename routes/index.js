var express = require('express');
var router = express.Router();

// link to the Account model
var Account = require('../models/account');
var passport = require('passport');

// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    user: req.user,
    pageNum: 1
  });
});

//GET register page
router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register',
    user: req.user,
    pageNum: 4
  });
});

//POST register page
router.post('/register', function(req, res, next) {
  // use passport and the Account model to save the new user
  Account.register(new Account( { username: req.body.username }),
      req.body.password, function(err, account) {
        if (err) {
          console.log(err);
          res.render('error');
        }
        else {
          res.redirect('/login');
        }
      });
});


//GET login page
router.get('/login', function(req, res, next) {

  // get session messages if there are any
  var messages = req.session.messages || [];

  res.render('login', {
    title: 'Login',
    messages: messages,
    user: req.user,
    pageNum: 3
  });

  // clear the messages out of the session
  req.session.messages = null;
});

// POST login page
router.post('/login', passport.authenticate('local', {
  successRedirect: '/projects',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'  // message is stored in session.messages
}));

// GET logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/login');
});

// GET /facebook
router.get('/facebook', passport.authenticate('facebook'),
    function(req, res, next) {
    });

//GET /facebook/callback
router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}), function(req, res, next) {
  // show the games page
  res.redirect('/projects');
});

//GET /github
router.get('/github', passport.authenticate('github'),
    function(req, res, next) {
    });

//GET /github/callback
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}), function(req, res, next) {
  // show the games page
  res.redirect('/projects');
});

// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/google/callback',
    passport.authenticate('google', {
      successRedirect : '/',
      failureRedirect : '/login'
    }));



module.exports = router;
