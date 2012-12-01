// Project module
define([
  // Application.
  "app",
  
  // Plugins
  "plugins/backbone-localstorage"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Project = app.module();

  // Default Model.
  Project.Model = Backbone.Model.extend({
    defaults: {
      name: '',
      description: '',
      viewed: 0,
      reviewed: 0
    }
  });

  // Default Collection.
  Project.Collection = Backbone.Collection.extend({
    model: Project.Model,
    
    localStorage: new Backbone.LocalStorage('g237-projects'),
    
    next: function() {
      if(!this.length) {
        return 1;
      }
      return this.last().get('order') + 1;
    },
    
    comparator: function( todo ) {
      return todo.get('order');
    }
  });
  
  app.Projects = new Project.Collection();
  
  // Item view
  Project.Views.Item = Backbone.Layout.extend({
    template: "project/item",
    
    tagName: 'li',
    
    serialize: function() {
      return this.model.toJSON();
    }
  });
  
  // Galery view
  Project.Views.Gallery = Backbone.Layout.extend({
    tagName: 'ul',
    
    beforeRender: function() {
      this.$el.attr('data-role', 'listview');
      
      this.collection.each(function(project) {
        this.insertView(new Project.Views.Item({
          model: project
        }));
      }, this);
    },
    
    initialize: function() {
      this.collection.on("reset", function test() {
        this.render();
      }, this);

      this.collection.on("add", function(project) {
        this.insertView(new Project.Views.Item({
          model: project
        })).render();
      }, this);
      
      this.collection.fetch();
    }
  });
  
  // Gallery controls
  Project.Views.GalleryControls = Backbone.Layout.extend({
    template: 'project/gallery-controls',
        
    events: {
      'click #reviewed' : 'orderByReviews',
      'click #updated' : 'orderByLastUpdated'
    },
    
    orderByReviews: function() {
      $('#updated').removeClass('ui-btn-active');
      $('#reviewed').addClass('ui-btn-active');
    },

    orderByLastUpdated: function() {
      $('#reviewed').removeClass('ui-btn-active');
      $('#updated').addClass('ui-btn-active');
    }
  });
  
  // Creation form
  Project.Views.Form = Backbone.Layout.extend({
    template: "project/form",
    
    events: {
      'submit #create-project-form' : 'create'
    },
    
    create: function(e) {
      e.preventDefault();
      var project = this.collection.create(this.serializeForm());
      app.router.navigate('/projects/show/' + project.id, {trigger: true});
    },
    
    serializeForm: function() {
      return {
        name: $('#name').val(),
        description: $('#desc').val(),
        link: $('#link').val(),
        created_at: new Date(),
        updated_at: new Date()
      };
    }
  });
  
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

  // Return the module for AMD compliance.
  return Project;

});
