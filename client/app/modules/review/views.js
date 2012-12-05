define(["app", "backbone"], function(app, Backbone) {
  var Views = {};
  
  Views.Item = Backbone.Layout.extend({
    template: "review/item",
    tagName: 'li',

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

    initialize: function() {
      this.collection.on("reset", function test() {
        this.render();
      }, this);
      
      this.collection.on("add", function(review) {
        this.insertView(new Views.Item({
          model: review
        })).render();
      }, this);
    }
  });
  
  return Views;
});