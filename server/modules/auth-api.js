var passport = require('passport');
var User = require('./user');

module.exports = function(app) {
  app.post('/authenticate', passport.authenticate('local'), function(req, res) {
    res.send({
      id: req.user.id
    });
  });
};