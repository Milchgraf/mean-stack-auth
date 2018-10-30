const passport = require('passport');
const localSrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const user = mongoose.model('User');

passport.use(new localSrategy({
    usernameField: 'email'
  },
    (username, password, done) => {
      user.findOne({ email: username }, (err, user) => {
        if(err) { return done(err) }

        // return if user not found in database
        if(!user) {
          return done(null, false, {
            message: 'User not found!'
          });
        }

        // return if password is wrong
        if(!user.validPassword(password)) {
          return done(null, false, {
            message: 'Wrong password!'
          });
        }

        // if credetials are correct, return user object!
        return done(null, user);
      });
    }
  )
);
