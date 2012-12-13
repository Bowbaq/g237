define(["app", "backbone"], function(app, Backbone) {
  // Review model
  var Model = Backbone.Model.extend({
    idAttribute: "_id",
    
    defaults: {
      _id: '',
      author: null,
      project: '',
      
      body: '',
      
      posted_at: new Date(),
      
      up_vote: 0,
      lo_vote: 0
    },
    
    url: function() {
      return app.api_root + 'api/projects/' + this.get('project').id + '/reviews';
    }
  });
  
  return Model;
});