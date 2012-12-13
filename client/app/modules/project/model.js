define(["app", "modules/review"], function(app, Review) {
  var Model = Backbone.Model.extend({
    idAttribute: "_id",
    
    defaults: {
      name: '',
      description: '',
      link: {
        ios: '',
        android: ''
      },
      version: '',
      
      team: [],
      join_requests: [],
      
      updated_at: ''
    },
    
    initialize: function() {
      this.reviews = new Review.Collection({
        project_id: this.id
      });
      
      if(this.id) {
        this.reviews.fetch({
          success: function(){
            this.collection.sort();
          }.bind(this)
        });
      }
    }
  });
  
  return Model;
});