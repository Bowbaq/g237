define(["app", "backbone"], function(app, Backbone) {
  // Project model
  var Model = Backbone.Model.extend({
    idAttribute: "_id",
    
    defaults: {
      name: '',
      description: '',
      link: '',
      
      viewed: 0,
      reviewed: 0,
      
      created_at: '',
      updated_at: ''
    }
  });
  
  return Model;
});