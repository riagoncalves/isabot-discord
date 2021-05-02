const passport = require('passport');

module.exports = {
  new: passport.authenticate('discord', {
    failureRedirect: '/',
  }),

  create(req, res) {
    res.redirect('/');
  },

  destroy(req, res) {
    req.logout();
    res.redirect('/');
  },
};
