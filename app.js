var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var projects = require('./routes/projects');

var app = express();

//mongo
var mongoose = require('mongoose');
var config = require('./config/globalVars');
mongoose.connect(config.db);

//passport config
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var localStrategy = require('passport-local').Strategy;

//enable app to use the passport classes
app.use(flash());

//configure sessions
app.use(session( {
  secret: config.secret,
  resave: true,
  saveUnitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
//connect passport t Account model
var Account = require('./models/account');
passport.use(Account.createStrategy());
// facebook auth configuration
var facebookStrategy = require('passport-facebook').Strategy;

passport.use(new facebookStrategy({
      clientID: config.ids.facebook.clientID,
      clientSecret: config.ids.facebook.clientSecret,
      callbackURL: config.ids.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, cb)
    {
      // check if mongodb already has this user
      Account.findOne({ oauthID: profile.id }, function(err, user) {
        if (err) {
          console.log(err);
        }
        else {
          if (user !== null) {
            // this user has already registered via facebook, so continue
            cb(null, user);
          }
          else {
            // user is new to us, so save them to accounts collection
            user = new Account({
              oauthID: profile.id,
              username: profile.displayName,
              created: Date.now()
            });

            user.save(function(err) {
              if (err) {
                console.log(err);
              }
              else {
                cb(null, user);
              }
            });
          }
        }
      });
    }));

// github auth configuration
var githubStrategy = require('passport-github').Strategy;

passport.use(new githubStrategy({
      clientID: config.ids.github.clientID,
      clientSecret: config.ids.github.clientSecret,
      callbackURL: config.ids.github.callbackURL
    },
    function(accessToken, refreshToken, profile, cb)
    {
      // check if mongodb already has this user
      Account.findOne({ oauthID: profile.id }, function(err, user) {
        if (err) {
          console.log(err);
        }
        else {
          if (user !== null) {
            // this user has already registered via github, so continue
            cb(null, user);
          }
          else {
            // user is new to us, so save them to accounts collection
            user = new Account({
              oauthID: profile.id,
              username: profile.username,
              created: Date.now()
            });

            user.save(function(err) {
              if (err) {
                console.log(err);
              }
              else {
                cb(null, user);
              }
            });
          }
        }
      });
    }));

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// google auth config
passport.use(new GoogleStrategy({
      clientID        : config.ids.google.clientID,
      clientSecret    : config.ids.google.clientSecret,
      callbackURL     : config.ids.google.callbackURL,

    },
    function(token, refreshToken, profile, done) {

      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Google
      process.nextTick(function() {

        // try to find the user based on their google id
        Account.findOne({ 'google.id' : profile.id }, function(err, user) {
          if (err)
            return done(err);

          if (user) {

            // if a user is found, log them in
            return done(null, user);
          } else {
            // if the user isnt in our database, create a new user
            var newUser = new Account({
              oauthID: profile.id,
              username: profile.displayName,
              created: Date.now()
            });

            // set all of the relevant information


            // save the user
            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });

    }));

//manage sessions
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/projects', projects);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
