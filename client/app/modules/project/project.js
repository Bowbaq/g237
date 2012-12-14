// Project module
define([
  // Application.
  "app",
  
  // Modules
  "modules/project/model",
  "modules/project/collection",
  "modules/project/views",
  
  "modules/layout"
],

// Map dependencies from above array.
function(app, Model, Collection, Views, Layout) {

  // Create a new module.
  var Project = app.module();

  // Project Model
  Project.Model = Model;
  
  // Project Views
  Project.Views = Views;

  // Project Collection.
  Project.Collection = Collection;
  
  Project.galleryViews = function(projects) {
    return {
      '.header': new Layout.Views.Header({
        model: new Layout.Models.Header({
          title: "Gallery",
          right: {
            link: '/project/new',
            text: 'Add',
            className: 'right btn btn-primary',
            iconName: 'icon-plus icon-white'
          }
        })
      }),
      '.content': new Backbone.Layout({
        template: "project/gallery",
        
        views: {
          '.controls': new Project.Views.ListControls({
            collection: projects
          }),
          '.list': new Project.Views.List({
            collection: projects
          })
        }
      })
    };
  };
  
  Project.detailViews = function(project, user) {
    var views = {
      ".content" : new Project.Views.Detail({
        model: project,
        user: user
      })
    };
    
    var config = {
      back: true,
      title: project.get('name')
    };
    
    if(project.isTeamMember(user)) {
      config.right = {
        link: '/project/edit/' + project.id,
        text: 'Edit',
        className: 'right btn btn-primary',
        iconName: 'icon-edit icon-white'
      };
    }
    
    views[".header"] = new Layout.Views.Header({
      model: new Layout.Models.Header(config)
    });
    
    return views;
  };
  
  Project.createViews = function(projects, user) {
    return {
      ".header": new Layout.Views.Header({
        model: new Layout.Models.Header({
          back: true,
          title: "New project"
        })
      }),
      ".content" : new Project.Views.NewForm({
        collection: projects,
        user: user
      })
    };
  };
  
  Project.editViews = function(project) {
    return {
      ".header": new Layout.Views.Header({
        model: new Layout.Models.Header({
          back: true,
          title: "Edit"
        })
      }),
      ".content" : new Project.Views.EditForm({
        model: project
      })
    };
  };

  // Return the module for AMD compliance.
  return Project;

});
