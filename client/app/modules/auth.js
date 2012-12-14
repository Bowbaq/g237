// Auth module
define([
  // Application.
  "app",
  
  // Modules
  "modules/user",
  
  // Plugins
  "plugins/backbone-localstorage"
],

// Map dependencies from above array.
function(app, User) {

  // Create a new module.
  var Auth = app.module();
  
  var account;

  // Default Model.
  Auth.Model = Backbone.Model.extend({
    id: 'logged-in-user',
        
    defaults: {
      user: null
    },
    
    localStorage: new Backbone.LocalStorage("g237-auth")
  });

  // Default View.
  Auth.Views.LoginForm = Backbone.Layout.extend({
    template: "auth/login",
    
    events: {
      'submit #login-form': 'onAuthenticate'
    },
    
    onAuthenticate: function(e) {
      // Prevent the form from submitting
      e.preventDefault();
      
      var username = $('#username');
      var password = $('#password');
    
      Auth.login(username.val(), password.val());
      
      username.val('');
      password.val('');
    }
  });
  
  Auth.authenticated = function() {
    return !! account.get('user');
  };
  
  Auth.account = function() {
    return account;
  };
  
  Auth.user = function() {
    return Auth.authenticated() ? account.get('user') : null ;
  };
  
  Auth.init = function() {
    account = new Auth.Model();
    account.fetch({
      error: function(err){
        console.log("Auth init:", err);
      }
    });
  };
  
  Auth.login = function(username, password) {
    if(Auth.authenticated()) {
      console.log('User already logged in');
      return;
    }
    
    $.ajax({
      type: "POST",
      url: app.api_root + "api/authenticate",
      data: {
        username: username,
        password: password
      },
      error: function(xhr, status, err) {
        console.log(xhr, status, err);
      },
      success: function(user) {
        account.save({
          user: user
        }, {
          success: function() {  app.router.navigate('/', {trigger: true}); }
        });
      }
    });
  };
  
  Auth.logout = function(callback) {
    if(!Auth.authenticated()) {
      console.log('Aborting logout');
      return;
    }
    
    $.ajax({
      type: "GET",
      url: app.api_root + "api/logout",
      error: function(xhr, status, err) {
        console.log(xhr, status, err);
      },
      success: function() {
        account.save({
          user: null
        }, {
          success: callback
        });
      }
    });
  };

  // Return the module for AMD compliance.
  return Auth;
});
