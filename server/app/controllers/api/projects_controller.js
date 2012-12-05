load('application');

layout(false);

action(function index(){
  Project.find(function (err, projects) {
    res.send(projects);
  });
});

action(function show(){
  Project.findById(req.params.id, function(err, project) {
    if (!err) {
      res.send(project);
    }
  });
});

action(function create(){
  var project = new Project(req.body);
  
  project.save(function(err) {
    if (!err) {
      return console.log('Created ', project);
    }
  });
  
  res.send(project);
});