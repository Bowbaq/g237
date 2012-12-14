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
    },
    
    isTeamMember: function(user) {
      return _.chain(this.get('team'))
        .map(function(team_member){ return team_member._id; })
        .contains(user._id)
        .value()
      ; 
    },
    
    isRequesting: function(user) {
      return _.chain(this.get('join_requests'))
        .map(function(team_member){ return team_member._id; })
        .contains(user._id)
        .value()
      ;
    }
  });
  
  return Model;
});