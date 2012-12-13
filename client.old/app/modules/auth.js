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
    id: 'token',
        
    defaults: {
      authenticated: false,
      user: null
    },
    
    localStorage: new Backbone.LocalStorage("g237-auth"),
    
    initialize: function() {
      this.bind('change:user', this.onUserChange, this);
      if(this.localStorage.find(this)) {
        this.fetch();
      }
      if(this.get('authenticated')) {
        console.log('User is logged in', this.get('user'));
      }
    },
    
    onUserChange: function(status, user) {
      this.set({
        'authenticated': user && !!user.id
      });
    },
    
    setUser: function(user) {
      this.save({
        'user': user
      });
    }
  });

  // Default View.
  Auth.Views.Form = Backbone.Layout.extend({
    template: "login",
    
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
    },
    
    onLogout: function() {
      Auth.logout();
    }
  });
  
  Auth.login = function(username, password) {
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
        app.account.setUser(user);
        app.router.navigate('/', {trigger: true});
      }
    });
  };
  
  Auth.logout = function() {
    if(!app.account.get('authenticated')) {
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
        app.account.setUser(null);
      }
    });
  };
  
  Auth.page = function() {
    return new Backbone.Layout({
      template: "layout/page",
    
      views: {
        '#header': app.helpers.Header.create("Authenticate"),
        '#content': new Auth.Views.Form({
          model: app.account
        })
      }
    });
  };

  // Return the module for AMD compliance.
  return Auth;
});
