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
      name: ''
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
  app.Projects.create({'name': 'Some project name'});
  
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
        console.log('reset');
        this.render();
      }, this);

      this.collection.on("add", function(project) {
        console.log('add');
        this.insertView(new Project.Views.Item({
          model: project
        })).render();
      }, this);
      
      this.collection.fetch();
    }
  });
  
  Project.gallery = function() {
    var header = app.helpers.Header
      .create("Gallery")
      .add({
        side: 'right',
        text: 'Add',
        link: 'project/create',
        icon: 'plus'
      })
    ;
    
    return new Backbone.Layout({
      template: "layout/project-page",
      
      events: {
        'click #reviewed' : 'orderByReviews',
        'click #updated' : 'orderByLastUpdated'
      },
    
      views: {
        '#header': header,
        '#gallery': new Project.Views.Gallery({
          collection: app.Projects
        })
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
  };

  // Return the module for AMD compliance.
  return Project;

});
