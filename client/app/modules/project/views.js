define(["app", "backbone"], function(app, Backbone) {
  var Views = {};
  
  // Item view
  Views.Item = Backbone.Layout.extend({
    template: "project/item",

    tagName: 'li',

    serialize: function() {
      return this.model.toJSON();
    }
  });
  
  // Galery view
  Views.Gallery = Backbone.Layout.extend({
    tagName: 'ul',

    beforeRender: function() {
      this.$el.attr('data-role', 'listview');

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

      this.collection.fetch();
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
      $('#updated').removeClass('ui-btn-active');
      $('#reviewed').addClass('ui-btn-active');
    },

    orderByLastUpdated: function() {
      $('#reviewed').removeClass('ui-btn-active');
      $('#updated').addClass('ui-btn-active');
    }
  });
  
  // Creation form
  Views.Form = Backbone.Layout.extend({
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
  
  return Views;
});