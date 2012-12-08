define(["app", "backbone", "modules/review/model"], function(app, Backbone, Model) {
  var Views = {};
  
  Views.Item = Backbone.Layout.extend({
    template: "review/item",
    tagName: 'li',
    
    initialize: function(){
      this.model.on('change', this.render, this);
    },
    
    afterRender: function(){
      this.$el.find('.upvote').on('click', this.upVote.bind(this));
      this.$el.find('.lovote').on('click', this.loVote.bind(this));
    },
    
    upVote: function(e) {
      e.preventDefault();
      this.model.save({
        'up_vote': this.model.get('up_vote') + 1
      });
    },
    
    loVote: function(e) {
      e.preventDefault();
      this.model.save({
        'lo_vote': this.model.get('lo_vote') + 1
      });
    },

    serialize: function() {
      return this.model.toJSON();
    }
  });
  
  Views.List = Backbone.Layout.extend({
    tagName: 'ul',

    beforeRender: function() {
      this.collection.each(function(review) {        
        this.insertView(new Views.Item({
          model: review
        }));
      }, this);
    },
    
    afterRender: function() {
      this.$form = this.$el.closest('#reviews').next();
      this.$submit = this.$form.find('#submit-review');
      this.$submit.on('click', this.addReview.bind(this));
    },

    initialize: function() {
      this.collection.on("reset", function test() {
        this.render();
      }, this);
      
      this.collection.on("add", function(review) {
        this.insertView(new Views.Item({
          model: review,
          project: this.project
        })).render();
      }, this);
      
      this.collection.fetch();
    },
    
    addReview: function(e){
      e.preventDefault();
      var review = new Model({
        author: app.account.get('user'),
        project: this.collection.project,
        body: this.$form.find('#comment').val()
      });
      
      review.save();
    }
  });
  
  return Views;
});