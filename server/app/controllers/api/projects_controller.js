var _ = require('lodash');

load('application');

layout(false);

action(function index(){
  Project.find().populate('join_requests').populate('team').populate('reviews')
  .exec(function (err, projects) {
    send(_.map(projects, Project.sanitize));
  });
});

action(function show(){
  Project.findById(params.id, function(err, project) {
    if (!err) {
      Project.populate(project, function(err, project) {
        if(err) {
          send(404);
        } else {
          send(project);
        }
      });
    } else {
      send(404);
    }
  });
});

action(function create(){
  req.body.updated_at = Date.now();
  var project = new Project(req.body);
  
  project.save(function(err) {
    if (!err) {
      Project.populate(project, function(err, project) {
        if(err) {
          send(404);
        } else {
          send(project);
        }
      });
    } else {
      send(404);
    }
  });
});

action(function update(){
  req.body.updated_at = Date.now();
  Project.findByIdAndUpdate(params.id, req.body, function(err, project) {
    if(!err) {
      Project.populate(project, function(err, project) {
        if(err) {
          send(404);
        } else {
          send(project);
        }
      });
    } else {
      send(404);
    }
  }.bind(this));
});