load('application');

layout(false);

before(loadProject);

action(function index(){
  Review.helpers.findAll(this.project, sendDataOrNotFound);
});

action(function create(){
  req.body.posted_at = Date.now();
  Review.helpers.create(this.project, req.body, sendDataOrNotFound);
});

action(function upvote(){
  Review.helpers.upvote(this.project, params.review_id, sendDataOrNotFound);
});

action(function lovote(){
  Review.helpers.lovote(this.project, params.review_id, sendDataOrNotFound);
});

function loadProject() {
  Project.helpers.find(params.project_id, function(err, project) {
    if(err) {
      send(404);
    } else {
      this.project = project;
      next();
    }
  }.bind(this), true);
}

function sendDataOrNotFound(err, data) {
  if(err) {
    send(404);
  } else {
    send(data);
  }
}



