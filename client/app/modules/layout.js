// Layout module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Layout = app.module();
  
  Layout.Models = {};

  // Default Model.
  Layout.Models.Header = Backbone.Model.extend({
    defaults: {
      back: false,
      back_to: '',
      
      title: '',
      
      right: {
        link: '',
        text: '',
        className: 'right btn btn-inverse',
        iconName: ''
      }
    },
    
    initialize: function(model) {
      if(model.right && !model.right.className) {
        model.right.className = this.defaults.right.className;
      }
    }
  });

  // Default View.
  Layout.Views.Header = Backbone.Layout.extend({
    template: "layout/header",
    
    className: 'container-fluid',
    
    data: function() {
      return {
        header: this.model
      };
    },
    
    initialize: function(options){
      this.model = options.model;
    },
    
    afterRender: function(){
      if (this.model.get('back') && !this.model.get('back_to')) {
        this.$el.find('.back').on('click', function(e){
          e.preventDefault();
          window.history.back();
          return false;
        });
      }
    }
  });

  // Return the module for AMD compliance.
  return Layout;

});
