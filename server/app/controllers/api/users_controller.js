var _ = require('lodash');

load('application');

layout(false);

action(function index(){
  User.helpers.findAll(sendDataOrNotFound);
});

action(function show(){
  User.helpers.find(params.id, sendDataOrNotFound);
});

action(function create(){
  if (req.body.role !== 'USER') {
    delete req.body.role;
  }
  
  User.helpers.create(req.body, sendDataOrNotFound);
});

action(function update(){
  if (req.body.role !== 'USER') {
    delete req.body.role;
  }
  
  User.helpers.update(params.id, req.body, sendDataOrNotFound);
});

function sendDataOrNotFound(err, user) {
  if (err) {
    send(404);
  } else {
    send(user);
  }
}

