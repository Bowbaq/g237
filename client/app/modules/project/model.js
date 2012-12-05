define(["app", "backbone", "modules/review/main"], function(app, Backbone, Review) {
  // Project model
  var Model = Backbone.Model.extend({
    idAttribute: "_id",
    
    urlRoot: app.api_root + 'api/projects',
    
    defaults: {
      name: '',
      description: '',
      link: '',
      
      reviews: [],
      
      created_at: '',
      updated_at: ''
    },
    
    initialize: function(){
      var self = this;
      this.reviews = new Review.Collection({
        project: self
      });
    }
  });
  
  return Model;
});