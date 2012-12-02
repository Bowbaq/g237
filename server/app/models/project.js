var mongoose = require('mongoose');
    
var ProjectSchema = new mongoose.Schema({
  name: String
});

var Project = mongoose.model('Project', ProjectSchema);
Project.modelName = 'Project'; // this is for some features inside railway (helpers, etc)

module.exports = Project;