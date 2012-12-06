var _ = require('lodash');

load('application');

layout(false);

action(function index(){
  User.find().populate('projects').populate('join_requests').populate('reviews')
  .exec(function (err, users) {
    send(_.map(users, User.sanitize));
  });
});

action(function show(){
  User.findById(params.id).populate('projects').populate('join_requests').populate('reviews')
  .exec(function(err, user) {
    if (!err) {
      send(User.sanitize(user));
    } else {
      send(404);
    }
  });
});