define([
  "app",
  
  "modules/project/model",
  "modules/project/collection",
  "modules/project/views",
  "modules/review/main"
],

function(app, Model, Collection, Views, Review) {
  // Create a new module.
  var Project = app.module();
  
  // Project model
  Project.Model = Model;
  
  // Project collection
  Project.Collection = Collection;
  app.Projects = new Project.Collection();
  app.Projects.fetch();
  
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
        '#content': new Project.Views.Form({
          collection: app.Projects
        })
      }
    });
  };
  
  
  Project.show = function(id) {
    var project = new Project.Model({id: id});
    project.fetch();
        
    var header = new app.helpers.Header
      .create(project.get('name'))
      .addBack()
    ;
        
    return new Backbone.Layout({
      template: "layout/page",
      
      views: {
        '#header': header,
        '#content': new Project.Views.Details({
          model: project,
          
          views: {
            '#reviews': new Review.Views.List({
              collection: project.reviews
            })
          }
        })
      }
    });
  };
  
  return Project;
});