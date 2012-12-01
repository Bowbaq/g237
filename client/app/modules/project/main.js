define([
  "app",
  
  "modules/project/model",
  "modules/project/collection",
  "modules/project/views"
],

function(app, Model, Collection, Views) {
  // Create a new module.
  var Project = app.module();
  
  // Project model
  Project.Model = Model;
  
  // Project collection
  Project.Collection = Collection;
  app.Projects = new Project.Collection();
  
  Project.Views = Views;
  
  // The gallery page
  Project.gallery = function() {
    var header = app.helpers.Header
      .create("Gallery")
      .add({
        side: 'right',
        text: 'Add',
        link: 'projects/create',
        icon: 'plus'
      })
    ;
    
    var footer = app.helpers.Footer.create({index: 1});
    
    return new Backbone.Layout({
      template: "layout/page",
    
      views: {
        '#header': header,
        '#content': new Backbone.Layout({
          template: "project/gallery",
          
          views: {
            '#controls' : new Project.Views.GalleryControls({
              collection: app.Projects
            }),
            '#gallery' : new Project.Views.Gallery({
              collection: app.Projects
            })
          }
        }),
        '#footer': footer
      }
    });
  };
  
  // The project creation page
  Project.form = function() {
    var header = new app.helpers.Header
      .create('New Project')
      .addBack()
    ;
    
    return new Backbone.Layout({
      template: "layout/page",
      
      views: {
        '#header': header,
        '[data-role="content"]': new Project.Views.Form({
          collection: app.Projects
        })
      }
    });
  };
  
  return Project;
});