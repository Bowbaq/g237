define(["app", "modules/project/model"], function(app, ProjectModel) {
  var Collection = Backbone.Collection.extend({
    model: ProjectModel,
    
    url: app.api_root + 'api/projects',
    
    initialize: function() {
      this.comparator = this.sortByLeastReviewed.bind(this);
    },
    
    sortByLastUpdated: function(first, second) {
      return (new Date(first.get('updated_at'))) < (new Date(second.get('updated_at'))) ? 1 : -1;
    },
    
    sortByLeastReviewed: function(first, second) {
      if(first.reviews.length > second.reviews.length) {
        return 1;
      } else if(first.reviews.length < second.reviews.length){
        return -1;
      } else {
        return this.sortByLastUpdated(first, second);
      }
    }
  });
  
  return Collection;
});