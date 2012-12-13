var passport = require('passport');

load('application');

layout(false);

action(function authenticate() {
  passport.authenticate('local', function(err, user, info) {
    console.log(err, user, info);
    if (err) {
      console.log(err);
      return send(401);
    }
    
    if (!user) {
      console.log("User not found");
      return send(401);
    }
    
    // Everything is fine, log the user in
    req.login(user, function(err) {
      if (err) {
        console.log("Error logging in");
        return send(401);
      }
      
      User.helpers.find(user._id, function(err, user) {
        if(err) {
          req.logout();
          console.log("Error populating user");
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