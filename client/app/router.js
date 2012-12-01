define([
  // Application.
  "app",
  
  "modules/project",
  
  "plugins/backbone-filter"
],

function(app, Project) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    before: {
      ".*": function() {
        this.checkAuthentication();
      }
    },
    
    routes: {
      "login":        "login",
      "logout":       "logout",
      "":             "projects"
    },
    
    initialize: function () {
      // Handle back button throughout the application
      // $('.back-button').on('click', function(event) {
      //     window.history.back();
      //     return false;
      // });
      
      this.first = true;
    },

    projects: function() {
      this.changePage(Project.gallery());
    },
    
    login: function() {
      if(app.account.get('authenticated')) {
        this.navigate('/', {trigger: true});
      }
      this.changePage(app.Auth.page(), 'none');
    },
    
    logout: function() {
      if(app.account.get('authenticated')) {
        app.Auth.logout();
      }
      this.changePage(app.Auth.page(), 'none');
    },
    
    checkAuthentication: function() {
      if(!app.account.get('authenticated')) {
        this.navigate('/login', {trigger: true});
      }
    },
    
    changePage:function (page, transition) {
      page.$el.attr('data-role', 'page');
      page.render().done(function() {
        $('body').append(page.el);
        $.mobile.changePage(page.$el, {
          changeHash:false, 
          transition: this.first ? 'none' : transition || $.mobile.defaultPageTransition
        });
        this.first = false; 
      }.bind(this));
    }
  });

  return Router;
});
