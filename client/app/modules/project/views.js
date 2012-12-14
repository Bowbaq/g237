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
      this.user = options.user;
      
      this.model.on('change', this.render, this);
    },
    
    beforeRender: function() {
      // Remove old views if any (is there a cleaner way?)      
      this.getView(function(view){
        view.remove();
      });
      
      var views = {
        '#reviews': new Review.Views.List({
          collection: this.model.reviews
        }),
        '#add-review': new Review.Views.NewForm({
          collection: this.model.reviews,
          user: this.user,
          project: this.model
        })
      };
      
      if(this.model.isTeamMember(this.user)) {
        if(this.model.get('join_requests').length > 0) {
          views['#join-requests'] = new Views.JoinRequests({
            model: this.model
          });
        }
      } else if(!this.model.isRequesting(this.user)) {
        views['#join-button'] = new Views.JoinTeam({
          model: this.model,
          user: this.user
        });
      }
                  
      this.setViews(views);
    },
    
    data: function() {
      return {  project: this.model };
    }
  });
  
  Views.JoinTeam = Backbone.View.extend({
    template: "project/join-button",
    
    events: {
      'submit #join-team-form': 'joinTeamRequest'
    },
    
    initialize: function(options) {
      this.model = options.model;
      this.user = options.user;
    },
    
    joinTeamRequest: function(e) {
      e.preventDefault();
      
      $.ajax({
        type: "POST",
        url: app.api_root + 'api/projects/' + this.model.id + '/team/' + this.user._id,
        data: {},
        error: function(xhr, status, err) {
          console.log(xhr, status, err);
        },
        success: function(data) {
          this.model.fetch();
        }.bind(this)
      });
      
      return false;
    }
  });
  
  Views.JoinRequests = Backbone.View.extend({
    template: "project/join-requests",
    
    events: {
      'click #grant': 'grantRequest',
      'click #deny': 'denyRequest'
    },
    
    initialize: function(options) {
      this.model = options.model;
    },
    
    data: function() {
      return { project: this.model };
    },
    
    grantRequest: function(e) {
      e.preventDefault();
      
      $.ajax({
        type: "PUT",
        url: app.api_root + 'api/projects/' + this.model.id + '/team/' + this.$el.find('#grant').attr('data-user-id'),
        data: {},
        error: function(xhr, status, err) {
          console.log(xhr, status, err);
        },
        success: function(data) {
          this.model.fetch();
        }.bind(this)
      });
      
      return false;
    },
    
    denyRequest: function(e) {
      e.preventDefault();
            
      $.ajax({
        type: "DELETE",
        url: app.api_root + 'api/projects/' + this.model.id + '/team/' + this.$el.find('#deny').attr('data-user-id'),
        data: {},
        error: function(xhr, status, err) {
          console.log(xhr, status, err);
        },
        success: function(data) {
          this.model.fetch();
        }.bind(this)
      });
      
      return false;
    }
  });
  
  // New project form
  Views.NewForm = Backbone.View.extend({
    template: "project/create-edit-form",
    
    events: {
      'submit #project-form' : 'create'
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
        
        team: [ this.user._id ],
        
        updated_at: new Date()
      };
    }
  });
  
  return Views;
});