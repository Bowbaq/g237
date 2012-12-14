define([
  // Application.
  "app",
  
  // Modules
  "modules/layout",
  "modules/auth",
  "modules/project/project",
  
  // Plugins
  "plugins/backbone-filter"
],

function(app, Layout, Auth, Project) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    initialize: function() {
      Auth.init();
      
      var collections = {
        user: Auth.user(),
        projects: new Project.Collection()
      };
      
      Auth.account().on('change', function(){
        this.user = Auth.user();
      }.bind(this));
      
      _.extend(this, collections);
    },
    
    before: {
      "^(?!login$).*": function() {
        return this.checkAuthentication();
      }
    },
    
    routes: {
      // Authentication routes
      "login": "login",
      "logout": "logout",
      
      // Project routes
      "":                   "showGallery",
      "project/new":        "newProject",
      "project/show/:id":   "showProject",
      "project/edit/:id":   "editProject"
    },
    
    login: function(){
      if(Auth.authenticated()) {
        this.navigate('/', {trigger: true});
        return;
      }
      
      app.useLayout('layout/page').setViews({
        '.header': new Layout.Views.Header({
          model: new Layout.Models.Header({ title: "Authenticate" })
        }),
        '.content': new Auth.Views.LoginForm()
      }).render();
    },
    
    logout: function() {
      if(Auth.authenticated()) {
        Auth.logout(function(){
          console.log('Navigating to /login');
          this.navigate('/login', { trigger: true });
        }.bind(this));
      }
    },

    checkAuthentication: function(){
      if(!Auth.authenticated()) {
        this.navigate('/login', {trigger: true});
        return false;
      }
    },

    showGallery: function() {
      app.useLayout('layout/page').setViews(
        Project.galleryViews(this.projects)
      ).render();
      
      // Fetch the data
      this.projects.fetch();
    },
    
    showProject: function(id) {           
      this.projects.fetch({
        success: function(){   
          app.useLayout("layout/page").setViews(
            Project.detailViews(this.projects.get(id), this.user)
          ).render();
        }.bind(this)
      });
    },
    
    newProject: function(){
      app.useLayout("layout/page").setViews(
        Project.createViews(this.projects, this.user)
      ).render();
    },
    
    editProject: function(id) {
      this.projects.fetch({
        success: function(){   
          app.useLayout("layout/page").setViews(
            Project.editViews(this.projects.get(id))
          ).render();
        }.bind(this)
      });
    }
  });

  return Router;

});
