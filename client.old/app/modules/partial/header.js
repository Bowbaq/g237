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
      title: '',
      leftButton: null, rightButton: null
    }
  });

  // Default View.
  Header.Views.Layout = Backbone.Layout.extend({
    template: "layout/partial/header",
        
    serialize: function() {
      return this.model.toJSON();
    },
    
    add: function(button) {
      if(!button.data) {
        button.data = {};
      }
      
      if(button.side === 'right') {
        this.model.set({'rightButton': button });
      } else {
        this.model.set({'leftButton': button });
      }
      
      return this;
    },
    
    addBack: function() {
      return this.add({
        class: 'back-button',
        side: 'left',
        text: 'Back',
        link: '#'
      });
    }
  });
  
  Header.create = function(title) {
    return new Header.Views.Layout({
      model: new Header.Model({title: title})
    });
  };

  // Return the module for AMD compliance.
  return Header;
});
