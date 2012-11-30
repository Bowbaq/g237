// Auth module
define([
  // Application.
  "app",
  
  // Plugins
  "plugins/backbone-localstorage"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Auth = app.module();

  // Default Model.
  Auth.Model = Backbone.Model.extend({
        
    defaults: {
      authenticated: false,
      api_key: null
    },
    
    localStorage: new Backbone.LocalStorage("g237-auth"),
    
    initialize: function() {
      console.log("Initializing Login Model");
      this.bind('change:api_key', this.onKeyChange, this);
      this.set({'api_key': localStorage.getItem('api_key')});
    },
    
    onKeyChange: function(status, key) {
      console.log("Key changed to", key);
      this.set({'authenticated': !!key});
    },
    
    setKey: function(key) {
      console.log("Changing key to", key);
      this.save({
        'api_key': key
      });
    }
  });

  // Default View.
  Auth.Views.Login = Backbone.Layout.extend({
    template: "login",
    
    events: {
      'submit #login-form': 'authenticate'
    },
    
    initialize:function () {
      console.log('Initializing Login View');
    },
    
    authenticate: function(e) {
      // Prevent the form from submitting
      e.preventDefault();
      
      var login = $('#login');
      var password = $('#password');
    }
  });

  // Return the module for AMD compliance.
  return Auth;

});
