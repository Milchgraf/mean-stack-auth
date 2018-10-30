const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = (req, res) => {
  const user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save((err) => {
    const token = user.generateJwt();
    res.status(200);
    res.json({
      'token': token
    });
  });
};

/* Don’t forget that, in reality, this code would have a
number of error traps, validating form inputs and catching
errors in the save function.
They’re omitted here to highlight the main
functionality of the code. */

module.exports.login = (req, res, info) => {
  passport.authenticate('local', (err, user, info) => {
    const token = null;

    // if passport throws/catches an error
    if(err) {
      res.status(404).json(err);
      return;
    }

    // if a user is found
    if(user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        'token': token
      });
    } else {
      // if user is not found
      res.status(400).json(info);
    }
  })(req, res);
}
