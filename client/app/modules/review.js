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
      project: null,
      
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
      this.comparator = this.sortByLastPosted.bind(this);
    },
    
    url: function() {
      return app.api_root + 'api/projects/' + this.project_id + '/reviews';
    },
    
    sortByLastPosted: function(first, second) {
      return (new Date(first.get('posted_at'))) < (new Date(second.get('posted_at'))) ? 1 : -1;
    }
  });
  
  
  // Review list
  Review.Views.List = Backbone.View.extend({
    tagName: 'ul',
    
    className: 'review-list nav nav-tabs nav-stacked',
    
    beforeRender: function() {
      this.$el.children().remove();
      this.collection.each(function(review){
        this.insertView(new Review.Views.Item({
          model: review,
          show_author: this.show_author
        }));
      }, this);
    },
    
    initialize: function(options) {
      this.show_author = options.show_author;
      
      this.collection.on('reset', this.render, this);
      
      this.collection.on("add", function(review) {
        this.insertView(new Review.Views.Item({
          model: review,
          show_author: this.show_author
        })).render();
      }, this);
    }
  });
  
  // Review list item
  Review.Views.Item = Backbone.View.extend({
    template: "review/item",
    
    tagName: 'li',
    
    className: 'review-item',
    
    initialize: function(options) {
      this.show_author = options.show_author;
    },
    
    data: function() {
      return {
        review: this.model,
        show_author: this.show_author
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
    template: "review/new",
    
    events: {
      'submit #review-create-form': 'addReview'
    },
    
    initialize: function(options) {
      this.user = options.user;
      this.project = options.project;
    },
    
    addReview: function(e){
      e.preventDefault();
      
      this.collection.create({
        author: this.user._id,
        project: this.project.id,
        
        body: this.$el.find('#review').val()
      }, {
        wait: true,
        error: function(err) {
          console.log(err);
        },
        success: this.afterAddReview.bind(this)
      });
            
      return false;
    },
    
    afterAddReview: function(){
      this.$el.find('#review').val('');
    }
  });
  
  // Return the module for AMD compliance.
  return Review;

});
