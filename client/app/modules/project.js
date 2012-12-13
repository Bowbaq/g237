// Project module
define([
  // Application.
  "app",
  
  // Modules
  "modules/review"
],

// Map dependencies from above array.
function(app, Review) {

  // Create a new module.
  var Project = app.module();

  // Default Model.
  Project.Model = Backbone.Model.extend({
    idAttribute: "_id",
    
    defaults: {
      name: '',
      description: '',
      link: {
        ios: '',
        android: ''
      },
      version: '',
      
      team: [],
      join_requests: [],
      
      updated_at: ''
    },
    
    initialize: function() {
      this.reviews = new Review.Collection({
        project_id: this.id
      });
      
      this.reviews.fetch();
    }
  });

  // Default Collection.
  Project.Collection = Backbone.Collection.extend({
    model: Project.Model,
    
    url: app.api_root + 'api/projects'
  });

  // List view
  Project.Views.List = Backbone.View.extend({
    tagName: 'ul',
    
    className: 'project-list',
    
    beforeRender: function() {
      this.$el.children().remove();
      this.collection.each(function(project){
        this.insertView(new Project.Views.Item({
          model: project
        }));
      }, this);
    },
    
    initialize: function() {
      this.collection.on('reset', this.render, this);
    }
  });
  
  // List item view
  Project.Views.Item = Backbone.View.extend({
    template: "project/item",
    
    tagName: 'li',
    
    className: 'project-item',
    
    data: function() {
      return {
        project: this.model
      };
    }
  });
  
  // Detail view
  Project.Views.Detail = Backbone.View.extend({
    template: "project/detail",
    
    initialize: function(options) {
      this.model = options.model;
      
      var reviewList = new Review.Views.List({
        collection: this.model.reviews
      });
            
      this.setViews({
        '#reviews': reviewList
      });
    },
    
    data: function() {
      return {
        project: this.model,
        show_join_requests: false
      };
    }
  });

  // Return the module for AMD compliance.
  return Project;

});
