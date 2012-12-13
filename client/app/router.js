define([
  // Application.
  "app",
  
  // Modules
  "modules/layout",
  "modules/project"
],

function(app, Layout, Project) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    initialize: function() {
      var collections = {
        projects: new Project.Collection()
      };
      
      _.extend(this, collections);
    },
    
    
    routes: {
      "":               "showGallery",
      "project/:id":    "showProject"
    },

    showGallery: function() {
      app.useLayout("layout/page").setViews({
        ".header": new Layout.Views.Header({
          model: new Layout.Models.Header({
            title: "Gallery",
            right: {
              link: 'project/add',
              text: 'Add',
              iconName: 'icon-plus icon-white'
            }
          })
        }),
        ".content" : new Project.Views.List({
          collection: this.projects
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
                title: this.projects.get(id).get('name')
              })
            }),
            ".content" : new Project.Views.Detail({
              model: this.projects.get(id)
            })
          }).render();
        }.bind(this)
      });
    }
  });

  return Router;

});
