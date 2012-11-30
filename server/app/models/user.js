var mongoose = require('mongoose');
var persister = require('passport-local-mongoose');
    
var UserSchema = new mongoose.Schema({
});
    
UserSchema.plugin(persister); // Adds username, hash, salt

var User = mongoose.model('User', UserSchema);
User.modelName = 'User'; // this is for some features inside railway (helpers, etc)

module.exports = User;