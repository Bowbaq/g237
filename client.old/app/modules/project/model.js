define(["app", "backbone", "modules/review/main"], function(app, Backbone, Review) {
  // Project model
  var Model = Backbone.Model.extend({
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
      
      reviews: [],
      
      updated_at: ''
    }
  });
  
  return Model;
});