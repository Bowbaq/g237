define([
  "app",
  
  "modules/review/model",
  "modules/review/collection",
  "modules/review/views"
], function(app, Model, Collection, Views) {
  var Review = app.module();
  
  Review.Model = Model;
  
  Review.Collection = Collection;
  
  Review.Views = Views;
  
  return Review;
});