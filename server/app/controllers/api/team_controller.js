var _ = require("lodash");

load('application');

layout(false);

before(loadModels);

action(function request(){
  if(!(_.filter(this.project.join_requests, userEquals.bind(this)).length > 0 || _.filter(this.project.team, userEquals.bind(this)).length > 0)) {
    this.project.join_requests.push(this.user._id);
    this.user.join_requests.push(this.project._id);
    
    this.project.save(function(err, project){
      if(err) {
        send(404);
      } else {
        this.user.save(function(err, user) {
          if(err) {
            send(404);
          } else {
            Project.populate(project, function(err, project) {
              if(err) {
                send(404);
              } else {
                send(project);
              }
            });
          }
        });
      }
    }.bind(this));
  } else {
    send(404); 
  }
});

action(function grant(){
  if(_.filter(this.project.join_requests, userEquals.bind(this)).length > 0) {
    // Remove request
    this.project.join_requests = _.reject(this.project.join_requests, userEquals.bind(this));
    this.user.join_requests = _.reject(this.user.join_requests, projectEquals.bind(this));
    
    // Link models
    this.project.team.push(this.user._id);
    this.user.projects.push(this.project._id);

    this.project.save(function(err, project){
      if(err) {
        send(404);
      } else {
        this.user.save(function(err, user) {
          if(err) {
            send(404);
          } else {
            Project.populate(project, function(err, project) {
              if(err) {
                send(404);
              } else {
                send(project);
              }
            });
          }
        });
      }
    }.bind(this));
  } else {
    send(404);
  }
});

action(function deny(){
  if(_.filter(this.project.join_requests, userEquals.bind(this)).length > 0) {
    this.project.join_requests = _.reject(this.project.join_requests, userEquals.bind(this));
    this.user.join_requests = _.reject(this.user.join_requests, projectEquals.bind(this));

    this.project.save(function(err, project){
      if(err) {
        send(404);
      } else {
        this.user.save(function(err, user) {
          if(err) {
            send(404);
          } else {
            Project.populate(project, function(err, project) {
              if(err) {
                send(404);
              } else {
                send(project);
              }
            });
          }
        });
      }
    }.bind(this));
  } else {
    send(404);
  }
});

function loadModels() {
  Project.findById(params.project_id, function(err, project) {
    if(err || !project) {
      send(404);
    } else {
      this.project = project;

      User.findById(params['user_id'], function(err, user) {
        if(err || !user) {
          send(404);
        } else {
          this.user = user;
          next();
        }
      }.bind(this));
    }
  }.bind(this));
}

function userEquals(id) {
  return id.equals(this.user._id);
}

function projectEquals(id) {
  return id.equals(this.project._id);
}