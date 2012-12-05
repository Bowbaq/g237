var Mongoose = require('mongoose');

var ObjectId = Mongoose.Schema.Types.ObjectId;
    
var ProjectSchema = new Mongoose.Schema({
  name: String,
  description: String,
  link: {
    ios: String,
    android: String
  },
  version: String,
  
  team: [{ type: ObjectId, ref: 'User' }],
  join_requests: [{ type: ObjectId, ref: 'User' }],
  
  reviews: [{ type: ObjectId, ref: 'Review' }],
  
  updated_at: { type: Date, default: Date.now }
});

var Project = Mongoose.model('Project', ProjectSchema);
Project.modelName = 'Project'; // this is for some features inside railway (helpers, etc)

module.exports = Project;