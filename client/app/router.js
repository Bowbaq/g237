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
      "project/show/:id":   "showProject"
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
        Auth.logout();
        this.navigate('/login', { trigger: true });
      }
    },

    checkAuthentication: function(){
      if(!Auth.authenticated()) {
        console.log('Redirecting to the login page');
        this.navigate('/login', {trigger: true});
        return false;
      }
    },

    showGallery: function() {
      app.useLayout('layout/page').setViews({
        '.header': new Layout.Views.Header({
          model: new Layout.Models.Header({
            title: "Gallery",
            right: {
              link: '/project/new',
              text: 'Add',
              iconName: 'icon-plus icon-white'
            }
          })
        }),
        '.content': new Backbone.Layout({
          template: "project/gallery",
          
          views: {
            '.controls': new Project.Views.ListControls({
              collection: this.projects
            }),
            '.list': new Project.Views.List({
              collection: this.projects
            })
          }
        })
      }).render();
      
      // Fetch the data
      this.projects.fetch();
    },
    
    showProject: function(id) {
      this.projects.fetch({
        success: function(){          
          app.useLayout("layout/page").setViews({
            ".header": new Layout.Views.Header({
              model: new Layout.Models.Header({
                back: true,
                back_to: '/',
                title: this.projects.get(id).get('name')
              })
            }),
            ".content" : new Project.Views.Detail({
              model: this.projects.get(id)
            })
          }).render();
        }.bind(this)
      });
    },
    
    newProject: function(){
      app.useLayout("layout/page").setViews({
        ".header": new Layout.Views.Header({
          model: new Layout.Models.Header({
            back: true,
            title: "New project"
          })
        }),
        ".content" : new Project.Views.NewForm({
          collection: this.projects,
          user: this.user
        })
      }).render();
    }
  });

  return Router;

});
