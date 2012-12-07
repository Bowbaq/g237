var _ = require('lodash');

load('application');

layout(false);

action(function index(){
  Project.helpers.findAll(sendDataOrNotFound);
});

action(function show(){
  Project.helpers.find(params.id, sendDataOrNotFound);
});

action(function create(){
  req.body.updated_at = Date.now();
  Project.helpers.create(req.body, sendDataOrNotFound);
});

action(function update(){
  req.body.updated_at = Date.now();
  Project.helpers.update(params.id, req.body, sendDataOrNotFound);
});

function sendDataOrNotFound(err, user) {
  if (err) {
    send(404);
  } else {
    send(user);
  }
}
