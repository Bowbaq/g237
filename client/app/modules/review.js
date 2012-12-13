// Review module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Review = app.module();

  // Default Model.
  Review.Model = Backbone.Model.extend({
    idAttribute: "_id",
    
    defaults: {
      author: null,
      project: '',
      
      body: '',
      
      posted_at: new Date(),
      
      up_vote: 0,
      lo_vote: 0
    }
  });

  // Default Collection.
  Review.Collection = Backbone.Collection.extend({
    model: Review.Model,
    
    initialize: function(options) {
      this.project_id = options.project_id;
    },
    
    url: function() {
      return app.api_root + 'api/projects/' + this.project_id + '/reviews';
    }
  });
  
  
  // Review list
  Review.Views.List = Backbone.View.extend({
    tagName: 'ul',
    
    className: 'review-list',
    
    beforeRender: function() {
      this.$el.children().remove();
      this.collection.each(function(review){
        this.insertView(new Review.Views.Item({
          model: review
        }));
      }, this);
    },
    
    initialize: function() {
      this.collection.on('reset', this.render, this);
    }
  });
  
  // Review list item
  Review.Views.Item = Backbone.View.extend({
    template: "review/item",
    
    tagName: 'li',
    
    className: 'project-item',
    
    data: function() {
      return {
        review: this.model
      };
    },
    
    afterRender: function() {
      this.$el.find('.upvote').on('click', this.upvote);
      this.$el.find('.lovote').on('click', this.lovote);
    },
    
    upvote: function(e) {
      e.preventDefault();
      console.log('TODO: upvote');
    },
    
    lovote: function(e) {
      e.preventDefault();
      console.log('TODO: lovote');
    }
  });
  
  // Create form
  Review.Views.NewForm = Backbone.View.extend({
    template: "review/new"
  });
  
  // Return the module for AMD compliance.
  return Review;

});
