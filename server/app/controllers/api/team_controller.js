var _ = require("lodash");

load('application');

layout(false);

before(loadModels);

action(function request(){
  if(!userInTeam(this.project, this.user) && !userInRequests(this.project, this.user)) {
    this.project.join_requests.push(this.user);
    this.user.join_requests.push(this.project);
    
    this.user.save(function(err) {
      if(err) {
        send(404);
      } else {
        this.project.save(function(err){
          if(err) {
            send(404);
          } else {
            Project.helpers.find(this.project.id, sendDataOrNotFound);
          }
        }.bind(this));
      }
    }.bind(this));
  } else {
    send(this.project);
  }
});

action(function grant(){
  if(userInRequests(this.project, this.user)) {
    // Remove requests
    this.project.join_requests = _.reject(this.project.join_requests, userEquals(this.user));
    this.user.join_requests = _.reject(this.user.join_requests, projectEquals(this.project));
    
    // Link models
    this.project.team.push(this.user);
    this.user.projects.push(this.project);
    
    this.user.save(function(err) {
      if(err) {
        send(404);
      } else {
        this.project.save(function(err){
          if(err) {
            send(404);
          } else {
            Project.helpers.find(this.project.id, sendDataOrNotFound);
          }
        }.bind(this));
      }
    }.bind(this));
  } else {
    send(404);
  }
});

action(function deny(){
  if(userInRequests(this.project, this.user)) {
    // Remove requests
    this.project.join_requests = _.reject(this.project.join_requests, userEquals(this.user));
    this.user.join_requests = _.reject(this.user.join_requests, projectEquals(this.project));
    
    this.user.save(function(err) {
      if(err) {
        console.log('Error saving user :', err);
        send(404);
      } else {
        this.project.save(function(err){
          if(err) {
            console.log('Error saving project :', err);
            send(404);
          } else {
            Project.helpers.find(this.project.id, sendDataOrNotFound);
          }
        }.bind(this));
      }
    }.bind(this));
  } else {
    console.log('User not in requests');
    send(404);
  }
});

function loadModels() {
  Project.helpers.find(params.project_id, function(err, project) {
    if(err) {
      send(404);
    } else {
      this.project = project;
      User.helpers.find(params.user_id, function(err, user) {
        if(err) {
          send(404);
        } else {
          this.user = user;
          next();
        }
      }.bind(this), true);
    }
  }.bind(this), true);
}

function userInTeam(project, user) {
  return _.filter(project.team, userEquals(user)).length > 0;
}

function userInRequests(project, user) {
  return _.filter(project.join_requests, userEquals(user)).length > 0;
}

function userEquals(user_a) {
  return function(user_b) {
    return user_a.equals(user_b);
  };
}

function projectEquals(project_a) {
  return function(project_b) {
    return project_a.equals(project_b);
  };
}

function sendDataOrNotFound(err, data) {
  if(err) {
    send(404);
  } else {
    send(data);
  }
}