// Project module
define([
  // Application.
  "app",
  
  // Modules
  "modules/project/model",
  "modules/project/collection",
  "modules/project/views"
],

// Map dependencies from above array.
function(app, Model, Collection, Views) {

  // Create a new module.
  var Project = app.module();

  // Project Model
  Project.Model = Model;
  
  // Project Views
  Project.Views = Views;

  // Project Collection.
  Project.Collection = Collection;

  // Return the module for AMD compliance.
  return Project;

});
