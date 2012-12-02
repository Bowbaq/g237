define(["app", "backbone", "modules/project/model", "plugins/backbone-localstorage"], function(app, Backbone, Model) {
  // Project collection
  var Collection = Backbone.Collection.extend({
    model: Model,
    
    url: app.api_root + 'api/projects',
            
    next: function() {
      if(!this.length) {
        return 1;
      }
      return this.last().get('order') + 1;
    },
    
    comparator: function( todo ) {
      return todo.get('order');
    }
  });
  
  return Collection;
});