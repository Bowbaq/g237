var Mongoose = require('mongoose');
var ObjectId = Mongoose.Schema.Types.ObjectId;
var Project = require('./user');

var _ = require('lodash');
    
var ProjectSchema = new Mongoose.Schema({
  name: String,
  description: String,
  link: {
    ios: String,
    android: String
  },
  version: String,
  
  team: [{ type: ObjectId, ref: 'Project' }],
  join_requests: [{ type: ObjectId, ref: 'Project' }],
  
  reviews: [{ type: ObjectId, ref: 'Review' }],
  
  updated_at: { type: Date, default: Date.now }
});

var Project = Mongoose.model('Project', ProjectSchema);
Project.modelName = 'Project'; // this is for some features inside railway (helpers, etc)

Project.helpers = _.extend(Project.helpers || {}, {
  findAll: function(callback) {
    Project.find().populate('join_requests').populate('team').populate('reviews')
    .exec(function (err, projects) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, _.map(projects, Project.helpers.sanitize))
      }
    });
  },
  
  find: function(id, callback, raw) {
    Project.findById(id).populate('join_requests').populate('team').populate('reviews')
    .exec(function(err, project) {
      if(err) {
        callback(err, null);
      } else {
        if(raw) {
          callback(null, project);
        } else {
          callback(null, Project.helpers.sanitize(project));
        }
      }
    })
  },
  
  create: function(data, callback) {
    delete data.team;
    delete data.join_requests;
    delete data.reviews;
    
    var project = new Project(data);
    
    project.save(function(err, created) {
      if (err) {
        callback(err, null);
      } else {
        Project.helpers.find(created.id, callback);
      }
    });
  },
  
  update: function(id, data, callback) {
    Project.findByIdAndUpdate(id, data, function(err, project) {
      if(err) {
        callback(err, null);
      } else {
        Project.helpers.find(id, callback);
      }
    });
  },
  
  sanitize: function sanitize(project) {
    var team = _.map(project.team, User.helpers.sanitize),
        join_requests = _.map(project.join_requests, User.helpers.sanitize)
    ;

    project = project.toObject();
    project.team = team;
    project.join_requests = join_requests

    return project;
  }
});

module.exports = Project;