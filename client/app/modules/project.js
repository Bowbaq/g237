// Project module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Project = app.module();

  // Default Model.
  Project.Model = Backbone.Model.extend({
  
  });

  // Default Collection.
  Project.Collection = Backbone.Collection.extend({
    model: Project.Model
  });

  // Default View.
  Project.Views.Layout = Backbone.Layout.extend({
    template: "project"
  });

  // Return the module for AMD compliance.
  return Project;

});
