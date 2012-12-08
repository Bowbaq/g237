define(["app", "backbone", "modules/review/model"], function(app, Backbone, Model) {
  // Project collection
  var Collection = Backbone.Collection.extend({
    model: Model,
    
    initialize: function(options) {
      this.project = options.project;
    },
    
    url: function() {
      return app.api_root + 'api/projects/' + this.project.id + '/reviews';
    }
  });
  
  return Collection;
});