define(["app", "backbone", "modules/project/model"], function(app, Backbone, Model) {
  // Project collection
  var Collection = Backbone.Collection.extend({
    model: Model,
    
    url: app.api_root + 'api/projects'
  });
  
  return Collection;
});