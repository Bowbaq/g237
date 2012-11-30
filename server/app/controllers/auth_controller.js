var passport = require('passport');

load('application');

layout(false);

action(function authenticate() {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      res.status(401).send({
        msg: "An exception occured"
      });
      return;
    }
    
    if (!user) {
      res.status(401).send({
        msg: "Unauthorized user"
      });
      return; 
    }
    
    // Everything is fine, log the user in
    req.login(user, function(err) {
      if (err) {
        res.status(401).send({
          msg: "Unable to establish session"
        });
        return;
      }
      
      res.status(200).send({
        id: user.id
      });
    });
  })(req, res, next);
});

action(function logout() {
  req.logout();
  res.status(200).send();
});

// $.ajax({
//     type: "POST",
//     url: "http://localhost:8888/api/authenticate",
//     data: {
//         username: "Max",
//         password: "abcdef",
//     },
//     error: function(xhr, status, err) {
//         console.log(xhr, status, err);
//     },
//     success: function(data) {
//         console.log(data);
//     }
// });
// 
// $.ajax({
//     type: "GET",
//     url: "http://localhost:8888/api/logout",
//     error: function(xhr, status, err) {
//         console.log(xhr, status, err);
//     },
//     success: function(data) {
//         console.log(data);
//     }
// });