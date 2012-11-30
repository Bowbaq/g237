/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

customSchema(function () {

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
    var persister = require('passport-local-mongoose');
    
    mongoose.connect('mongodb://localhost/g237');
    
    var UserSchema = new Schema({
    });
    
    UserSchema.plugin(persister);

    var User = mongoose.model('User', UserSchema);
    User.modelName = 'User'; // this is for some features inside railway (helpers, etc)

    module.exports['User'] = User;
});