var passport = require('passport');

load('application');

layout(false);

action(function authenticate() {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return send(401);
    }
    
    if (!user) {
      return send(401);
    }
    
    // Everything is fine, log the user in
    req.login(user, function(err) {
      if (err) {
        return send(401);
      }
      
      User.populate(user, function(err, user) {
        if(err) {
          req.logout();
          send(401);
        } else {
          send(user);
        }
      });
    });
  })(req, res, next);
});

action(function logout() {
  req.logout();
  send(200);
});