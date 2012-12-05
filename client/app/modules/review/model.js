define(["app", "backbone"], function(app, Backbone) {
  // Review model
  var Model = Backbone.Model.extend({
    idAttribute: "_id",
    
    defaults: {
      project: null,
      author: null,
      body: '',
      
      posted_at: '',
      
      up: 0,
      down: 0
    }
  });
  
  return Model;
});