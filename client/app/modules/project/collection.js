define(["app", "backbone", "modules/project/model", "plugins/backbone-localstorage"], function(app, Backbone, Model) {
  // Project collection
  var Collection = Backbone.Collection.extend({
    model: Model,
    
    localStorage: new Backbone.LocalStorage('g237-projects'),
    
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