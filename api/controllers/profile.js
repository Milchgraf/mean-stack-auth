const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.profileRead = (req, res) => {

  // if no ID exists in the JWT return a 401
  if(!req.payload._id) {
    res.status(401).json({
      'message': 'UnauthorizedError: private profile'
    });
  } else {
    // otherwise continue
    User.findById(req.payload._id).exec((err, user) => {
      res.status(200).json(user);
    });
  }
};

/* Naturally, this should be fleshed out
with some more error trapping — for example,
if the user isn’t found — but this snippet is
kept brief to demonstrate the key points of the approach. */
