const User = require('../models/User');
const LocalStrategy = require("passport-local").Strategy;

const loginCheck = function(passport) {
    passport.use(
        new LocalStrategy(function (username, password, done) {
          User.findOne(
            { username: username, password: password },
            function (err, user) {
              if (err) {
                return done(err);
              }
              if (!user) {
                return done(null, false, { message: 'Invalid username or password' });
              }
              return done(null, user);
            }
          );
        })
      );
      
      passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
          done(err, user);
        });
      });
};

module.exports = loginCheck;

