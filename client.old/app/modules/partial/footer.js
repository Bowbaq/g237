// Footer module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Footer = app.module();

  // Default Model.
  Footer.Model = Backbone.Model.extend({
    defaults: {
      active: 1
    }
  });

  // Default View.
  Footer.Views.Layout = Backbone.Layout.extend({
    template: "layout/partial/footer",
    
    serialize: function() {
      return this.model.toJSON();
    },
    
    beforeRender: function() {
      this.$el.attr('data-role', 'navbar');
    }
  });
  
  Footer.create = function(active) {
    return new Footer.Views.Layout({
      model: new Footer.Model({
        active: active.index
      })
    });
  };

  // Return the module for AMD compliance.
  return Footer;

});
