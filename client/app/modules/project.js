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
      
      this.reviews.fetch({
        success: function(){
          this.collection.sort();
        }.bind(this)
      });
    }
  });

  // Default Collection.
  Project.Collection = Backbone.Collection.extend({
    model: Project.Model,
    
    url: app.api_root + 'api/projects',
    
    comparator: function(first, second) {
      return first.reviews.length > second.reviews.length;
    }
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
      this.collection.on('reset', function(){
        this.render();
      }, this);
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
  
  Project.Views.ListControls = Backbone.View.extend({
    template: "project/list-controls",
    className: 'btn-group',
    
    onSortByLastUpdated: function() {
      this.$el.find('button').removeClass('active');
      this.$el.find('#sort-updated').addClass('active');
      
      this.collection.comparator = this.sortByLastUpdated;
      this.collection.sort();
    },
    
    sortByLastUpdated: function(first, second) {
      return first.get('updated_at') < second.get('updated_at');
    },
    
    onSortByLeastReviewed: function() {
      this.$el.find('button').removeClass('active');
      this.$el.find('#sort-reviewed').addClass('active');
      
      this.collection.comparator = this.sortByLeastReviewed;
      this.collection.sort();
    },
    
    sortByLeastReviewed: function(first, second) {
      return first.reviews.length > second.reviews.length;
    },
    
    afterRender: function() {
      this.$el.find('#sort-reviewed').on('click', this.onSortByLeastReviewed.bind(this));
      this.$el.find('#sort-updated').on('click', this.onSortByLastUpdated.bind(this));
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
