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
  voted: [String],
  
  role: { type: String, default: 'USER' }
});
    
UserSchema.plugin(persister); // Adds username, hash, salt

var User = Mongoose.model('User', UserSchema);
User.modelName = 'User'; // this is for some features inside railway (helpers, etc)

User.helpers = _.extend(User.helpers || {}, {
  findAll: function findAll(callback) {
    User.find().populate('projects').populate('join_requests').populate('reviews')
    .exec(function (err, users) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, _.map(users, User.helpers.sanitize));
      }
    });
  },
  
  find: function(id, callback, raw) {
    User.findById(id).populate('projects').populate('join_requests').populate('reviews')
    .exec(function(err, user) {
      if(err) {
        callback(err, null);
      } else {
        if(raw) {
          callback(null, user);
        } else {
          callback(null, User.helpers.sanitize(user)); 
        }
      }
    })
  },
  
  create: function(data, callback) {
    User.findOne({username : data.username }, function(err, existingUser) {
      if (err || existingUser) {
        if (!err) {
          err = 'User already exists';
        }
        callback(err, null)
      } else {
        var user = new User(data);
        user.setPassword(data.password, function(err) {
          if(err) {
            callback(err, null)
          } else {
            user.save(function(err, user) {
              if(err) {
                callback(err, null)
              } else {
                User.helpers.find(user.id, callback);
              }
            });
          }
        });
      }
    });
  },
  
  update: function(id, data, callback) {
    User.findByIdAndUpdate(id, data, function(err, project) {
      if(err) {
        callback(err, null);
      } else {
        User.helpers.find(id, callback);
      }
    });
  },
  
  sanitize: function sanitize(user) {
    return _.omit(user.toObject(), 'hash', 'salt');
  }
});

module.exports = User;