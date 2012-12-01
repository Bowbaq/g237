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
  Header.Views.Title = Backbone.Layout.extend({
    template: "partial/header/header-title",
        
    serialize: function() {
      return this.model.toJSON();
    },
    
    beforeRender: function() {
      this.$el.attr('data-role', 'header').attr('data-id', 'header').attr('data-position', 'fixed');
    }
  });

  // Return the module for AMD compliance.
  return Header;
});
