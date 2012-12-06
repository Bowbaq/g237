load('application');

layout(false);

before(loadProject);

action(function index(){
  Project.populate(this.project, function(err, project) {
    if(err) {
      send(404);
    } else {
      send(project.reviews);
    }
  });
});

action(function create(){
  req.body.posted_at = Date.now();
  var review = new Review(req.body);
  console.log(review);
});

action(function update(){
  console.log('Not implemented');
});

function loadProject() {
  Project.findById(params.project_id, function(err, project) {
    if (!err) {
      this.project = project;
      next();
    } else {
      send(404);
    }
  });
}

