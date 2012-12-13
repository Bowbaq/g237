define(["app", "modules/review" ], function(app, Review) {
  var Views = {};
  
  // List view
  Views.List = Backbone.View.extend({
    tagName: 'ul',
    
    className: 'project-list',
    
    beforeRender: function() {
      this.$el.children().remove();
      this.collection.each(function(project){
        this.insertView(new Views.Item({
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
  Views.Item = Backbone.View.extend({
    template: "project/item",
    
    tagName: 'li',
    
    className: 'project-item',
    
    data: function() {
      return {
        project: this.model
      };
    }
  });
  
  Views.ListControls = Backbone.View.extend({
    template: "project/list-controls",
    className: 'btn-group',
    
    onSortByLastUpdated: function() {
      this.$el.find('button').removeClass('active');
      this.$el.find('#sort-updated').addClass('active');
      
      this.collection.comparator = this.collection.sortByLastUpdated.bind(this);
      this.collection.sort();
    },
    
    onSortByLeastReviewed: function() {
      this.$el.find('button').removeClass('active');
      this.$el.find('#sort-reviewed').addClass('active');
      
      this.collection.comparator = this.collection.sortByLeastReviewed;
      this.collection.sort();
    },
    
    afterRender: function() {
      this.$el.find('#sort-reviewed').on('click', this.onSortByLeastReviewed.bind(this));
      this.$el.find('#sort-updated').on('click', this.onSortByLastUpdated.bind(this));
    }
  });
  
  // Detail view
  Views.Detail = Backbone.View.extend({
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
  
  // New project form
  Views.NewForm = Backbone.View.extend({
    template: "project/new",
    
    events: {
      'submit #project-create-form' : 'create'
    },
    
    initialize: function(options) {
      this.user = options.user;
    },
    
    create: function(e) {
      e.preventDefault();
      
      if(this.validateForm()) {
        this.collection.create(
          this.serializeForm(),
          {
            wait: true,
            success: this.createSuccess.bind(this),
            error: function(err) {
              console.log(err);
            }
          }
        );
      }
      
      return false;
    },
    
    createSuccess: function(project) {
      app.router.navigate('/project/show/' + project.id, {trigger: true});
    },
    
    validateForm: function(){
      // TODO: proper validation
      return true;
    },
    
    serializeForm: function(){
      return {
        name: this.$el.find('#name').val(),
        description: this.$el.find('#description').val(),
        version: this.$el.find('#version').val(),
        
        link: {
          ios: this.$el.find('#link-ios').val(),
          android: this.$el.find('#link-android').val()
        },
        
        team: [ this.user.id ],
        
        updated_at: new Date()
      };
    },
    
    resetForm: function() {
      // this.$el.find('input, textarea').val('');
    }
  });
  
  return Views;
});