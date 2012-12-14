// User module
define([
  // Application.
  "app",
  
  // Modules
  "modules/project/project",
  "modules/review",
  
  "modules/layout"
],

// Map dependencies from above array.
function(app, Project, Review, Layout) {

  // Create a new module.
  var User = app.module();

  // Default Model.
  User.Model = Backbone.Model.extend({
    idAttribute: "_id",
    
    defaults: {
      name: '',
      username: '',
      
      projects: [],
      
      join_requests: [],
      
      reviews: []
    }
  });

  // Default Collection.
  User.Collection = Backbone.Collection.extend({
    model: User.Model,
    
    url: app.api_root + 'api/users',
    
    comparator: function(first, second) {
      var firstreviews = first.get('reviews').length;
      var secondreviews = second.get('reviews').length;
      
      if(firstreviews > secondreviews) {
        return -1;
      } else if (firstreviews < secondreviews) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  // Default View.
  User.Views.List = Backbone.View.extend({
    tagName: 'ul',
    
    className: 'user-list',
    
    beforeRender: function() {
      this.$el.children().remove();
      this.collection.each(function(user){
        this.insertView(new User.Views.Item({
          model: user
        }));
      }, this);
    },
    
    initialize: function() {
      this.collection.on('reset', function(){
        this.render();
      }, this);
    }
  });
  
  User.Views.Item = Backbone.View.extend({
    template: "user/item",
    
    tagName: 'li',
    
    className: 'user-item',
    
    data: function() {
      return {
        user: this.model
      };
    }
  });
  
  User.Views.Detail = Backbone.View.extend({
    template: "user/detail",
    
    initialize: function(options) {
      this.model = options.model;
      this.show_requests = options.show_requests;
    },
    
    data: function() {
      return {
        user: this.model,
        show_requests: this.show_requests
      };
    }
  });
  
  User.Views.EditForm = Backbone.View.extend({
    template: "user/edit-form",
    
    events: {
      'submit #user-form' : 'update'
    },
    
    initialize: function(options) {
      this.model = options.model;
    },
    
    update: function(e) {
      e.preventDefault();
      
      if(this.validateForm()) {
        this.model.save(
          this.serializeForm(),
          {
            wait: true,
            success: this.updateSuccess.bind(this),
            error: function(err) {
              console.log(err);
            }
          }
        );
      }
      
      return false;
    },
    
    updateSuccess: function(user) {
      app.router.navigate('/users/show/' + user.id, {trigger: true});
    },
    
    validateForm: function(){
      // TODO: proper validation
      return true;
    },
    
    serializeForm: function(){
      return {
        name: this.$el.find('#name').val()
      };
    },
    
    data: function() {
      return {
        user: this.model
      };
    }
  });
  
  User.listViews = function(users) {
    return {
      ".header": new Layout.Views.Header({
        model: new Layout.Models.Header({
          title: "Users"
        })
      }),
      '.content': new User.Views.List({
        collection: users
      })
    };
  };
  
  User.detailViews = function(user, current) {
    var config = {
      back: true,
      title: user.get('name') || user.get('username')
    };
        
    if(user.id == current._id) {
      config.right = {
        link: '/users/edit/' + user.id,
        text: 'Edit',
        className: 'right btn btn-primary',
        iconName: 'icon-edit icon-white'
      };
    }
    
    return {
      ".header": new Layout.Views.Header({
        model: new Layout.Models.Header(config)
      }),
      ".content": new User.Views.Detail({
        model: user,
        show_requests: user.id == current._id,
        
        views: {
          '#reviews': new Review.Views.List({
            collection: new Review.Collection(user.get('reviews')),
            user: current
          })
        }
      })
    };
  };
  
  User.editViews = function(user) {
    return {
      ".header": new Layout.Views.Header({
        model: new Layout.Models.Header({
          back: true,
          title: "Edit"
        })
      }),
      ".content": new User.Views.EditForm({
        model: user
      })
    };
  };

  // Return the module for AMD compliance.
  return User;

});
