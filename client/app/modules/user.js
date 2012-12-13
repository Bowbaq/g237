// User module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var User = app.module();

  // Default Model.
  User.Model = Backbone.Model.extend({
  
  });

  // Default Collection.
  User.Collection = Backbone.Collection.extend({
    model: User.Model
  });

  // Default View.
  User.Views.Layout = Backbone.Layout.extend({
    template: "user"
  });

  // Return the module for AMD compliance.
  return User;

});
