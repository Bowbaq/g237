var Mongoose = require('mongoose');
var ObjectId = Mongoose.Schema.Types.ObjectId;
var User = require('./user');

var _ = require('lodash');
    
var ProjectSchema = new Mongoose.Schema({
  name: String,
  description: String,
  link: {
    ios: String,
    android: String
  },
  version: String,
  
  team: [{ type: ObjectId, ref: 'User' }],
  join_requests: [{ type: ObjectId, ref: 'User' }],
  
  reviews: [{ type: ObjectId, ref: 'Review' }],
  
  updated_at: { type: Date, default: Date.now }
});

var Project = Mongoose.model('Project', ProjectSchema);
Project.modelName = 'Project'; // this is for some features inside railway (helpers, etc)

Project.sanitize = function sanitize(project) {
  var team = _.map(project.team, User.sanitize),
      join_requests = _.map(project.join_requests, User.sanitize)
  ;
  
  project = project.toObject();
  project.team = team;
  project.join_requests = join_requests
  
  return project;
}

Project.populate = function populate(project, fn) {
  Project.findById(project._id)
    .populate('join_requests')
    .populate('team')
    .populate('reviews')
    .exec(function(err, project) {
      if(err) {
        fn(err, null);
      } else {
        fn(null, Project.sanitize(project));
      }
    });
};

module.exports = Project;