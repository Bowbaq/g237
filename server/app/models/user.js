var mongoose = require('mongoose');
var persister = require('passport-local-mongoose');
    
var UserSchema = new mongoose.Schema({
  name: String,
  semester: String,
  
  projects: [{ type: ObjectId, ref: 'Project' }],
  
  reviews: [{ type: ObjectId, ref: 'Review' }],
  
  role: { type: String, default: 'USER' }
});
    
UserSchema.plugin(persister); // Adds username, hash, salt

var User = mongoose.model('User', UserSchema);
User.modelName = 'User'; // this is for some features inside railway (helpers, etc)

module.exports = User;