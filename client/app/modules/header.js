// Header module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Header = app.module();

  // Default Model.
  Header.Model = Backbone.Model.extend({
    defaults: {
      title: ''
    }
  });

  // Default View.
  Header.Views.Layout = Backbone.Layout.extend({
    template: "header",
    
    initialize: function(){
      console.log("Initialized header view", this.model.toJSON());
    },
    
    serialize: function() {
      return this.model.toJSON();
    }
  });

  // Return the module for AMD compliance.
  return Header;
});
