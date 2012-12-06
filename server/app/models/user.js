var Mongoose = require('mongoose');
var ObjectId = Mongoose.Schema.Types.ObjectId;

var persister = require('passport-local-mongoose');

var _ = require('lodash');
    
var UserSchema = new Mongoose.Schema({
  name: String,
  semester: String,
  
  projects: [{ type: ObjectId, ref: 'Project' }],
  join_requests: [{ type: ObjectId, ref: 'Project' }],
  
  reviews: [{ type: ObjectId, ref: 'Review' }],
  
  role: { type: String, default: 'USER' }
});
    
UserSchema.plugin(persister); // Adds username, hash, salt

var User = Mongoose.model('User', UserSchema);
User.modelName = 'User'; // this is for some features inside railway (helpers, etc)

User.sanitize = function sanitize(user) {
  return _.omit(user.toObject(), 'hash', 'salt');
}

User.populate = function populate(user, fn) {
  User.findById(user._id)
    .populate('projects')
    .populate('join_requests')
    .populate('reviews')
    .exec(function(err, project) {
      if(err) {
        fn(err, null);
      } else {
        fn(null, User.sanitize(user));
      }
    });
};

module.exports = User;