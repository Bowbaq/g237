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
    
    beforeRender: function() {
      this.$el.attr('data-role', 'header').attr('data-id', 'header').attr('data-position', 'fixed');
    },
    
    add: function(button) {
      if(!button.swatch) {
        button.swatch = 'a';
      }
      
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
        side: 'left',
        text: 'Back',
        link: '#',
        icon: 'delete',
        data: {
          // rel: 'back',
          // back: 'true',
          // direction: 'reverse'
        }
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
