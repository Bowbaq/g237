define(["app", "backbone"], function(app, Backbone) {
  var Views = {};
  
  // Item view
  Views.Item = Backbone.Layout.extend({
    template: "project/gallery-item",
    tagName: 'li',

    serialize: function() {
      return this.model.toJSON();
    }
  });
  
  // Galery view
  Views.Gallery = Backbone.Layout.extend({
    tagName: 'ul',

    beforeRender: function() {
      this.collection.each(function(project) {
        this.insertView(new Views.Item({
          model: project
        }));
      }, this);
    },

    initialize: function() {
      this.collection.on("reset", function test() {
        this.render();
      }, this);
      
      this.collection.on("add", function(project) {
        this.insertView(new Views.Item({
          model: project
        })).render();
      }, this);
    }
  });
  
  // Gallery controls
  Views.GalleryControls = Backbone.Layout.extend({
    template: 'project/gallery-controls',

    events: {
      'click #reviewed' : 'orderByReviews',
      'click #updated' : 'orderByLastUpdated'
    },

    orderByReviews: function() {
      $('#updated').removeClass('active');
      $('#reviewed').addClass('active');
    },

    orderByLastUpdated: function() {
      $('#reviewed').removeClass('active');
      $('#updated').addClass('active');
    }
  });
  
  // Creation form
  Views.Form = Backbone.Layout.extend({
    template: "project/create-form",

    events: {
      'submit #create-project-form' : 'create'
    },

    create: function(e) {
      e.preventDefault();
      var project = this.collection.create(this.serializeForm(), {wait: true, success: this.afterCreate });
      this.resetForm();
    },
    
    afterCreate: function(project, response) {
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
    },
    
    resetForm: function() {
      $('#name').val('');
      $('#desc').val('');
      $('#link').val('');
    }
  });
  
  Views.Details = Backbone.Layout.extend({
    template: "project/show",
    
    serialize: function() {
      return this.model.toJSON();
    },
    
    initialize: function() {
      this.model.on('change', this.pullReviews);
      // 
      // this._form = $('#review-create')
      // this._form.on('submit', this.onSubmitReview)
    },
    
    pullReviews: function(){
      console.log('change');
      this.reviews.fetch();
    }
  });
  
  return Views;
});