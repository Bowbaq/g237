define(["app", "backbone", "modules/review/model"], function(app, Backbone, Model) {
  // Project collection
  var Collection = Backbone.Collection.extend({
    model: Model,
    
    url: function() {
      console.log(this.project);
      return app.api_root + 'api/projects/' + this.project.get('id') + '/reviews';
    },
    
    initialize: function(data){
      this.project = data.project;
    }
  });
  
  return Collection;
});