define(["app", "backbone"], function(app, Backbone) {
  // Project model
  var Model = Backbone.Model.extend({
    defaults: {
      name: '',
      description: '',
      viewed: 0,
      reviewed: 0
    }
  });
  
  return Model;
});