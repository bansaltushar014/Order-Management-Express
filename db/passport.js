var passport = require('passport');
var Models = require("./connection");
var LocalStrategy = require('passport-local').Strategy;
var RememberMeStrategy = require('passport-remember-me').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    
  },
    function (email, password, done) {

        Models.signup.findOne({
            email: email
          }, function (err, user) {
            if (err) {
              return done(err);
            }
      
            if (user) {
              console.log("user already exist");
              return done(null, false, { message: 'already exist email id' });
            }
            console.log("Creating The User");
            var newuser = new Models.signup();          
            newuser.email = email;
            newuser.password = password;
            console.log(newuser);
            newuser.save(function (err, result) {
              if (err) {
                return done(err);
              }
              return done(null, newuser);
            })
          });  
    }
  ));

 
  
  passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    
  },
    function (email, password, done) {

        Models.signup.findOne({
            email: email
          }, function (err, user) {
            if (err) {
              return done(err);
            }
            if (user) {
              console.log("user exist, can login");
              return done(null, user);
            }
          });  
    }
  ));

  passport.use('local.remember', new RememberMeStrategy(
    function(token, done) {
      Token.consume(token, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      });
    },
    function(user, done) {
      var token = utils.generateToken(64);
      Token.save(token, { userId: user.id }, function(err) {
        if (err) { return done(err); }
        return done(null, token);
      });
    }
  ));