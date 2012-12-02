define([
  // Application.
  "app",
  
  "modules/project/main",
  
  "plugins/backbone-filter"
],

function(app, Project) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    before: {
      "^(?!login$).*": function() {
        this.checkAuthentication();
      }
    },
    
    routes: {
      // Authentication routes
      "login":            "login",
      "logout":           "logout",
      
      // Project routes
      "":                 "listProjects",
      "projects/create":  "createProject",
      "projects/show/:id": "showProject"
    },
    
    initialize: function () {
    },

    listProjects: function() {
      this.changePage(Project.gallery());
    },
    
    createProject: function() {
      this.changePage(Project.form());
    },
    
    showProject: function(id) {
      this.changePage(Project.show(id));
    },
    
    login: function() {
      if(app.account.get('authenticated')) {
        this.navigate('/', {trigger: true});
      }
      this.changePage(app.Auth.page());
    },
    
    logout: function() {
      if(app.account.get('authenticated')) {
        app.Auth.logout();
      }
      this.navigate('/login');
    },
    
    checkAuthentication: function() {
      if(!app.account.get('authenticated')) {
        this.navigate('/login', {trigger: true});
      }
    },
    
    changePage:function (page) {
      $('#container').empty().append(page.el);
      page.render();
    }
  });

  return Router;
});
