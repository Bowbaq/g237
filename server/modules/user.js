var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var persister = require('passport-local-mongoose');

var User = new Schema({
});

User.plugin(persister);

module.exports = mongoose.model('User', User);