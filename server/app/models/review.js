var Mongoose = require('mongoose');
var ObjectId = Mongoose.Schema.Types.ObjectId;

var User = require('./user');

var ReviewSchema = new Mongoose.Schema({
  author: { type: ObjectId, ref: 'User' }, 
  body: String,
  
  posted_at: { type: Date, default: Date.now },
  
  up_vote: { type: Number, default: 0 }, 
  lo_vote: { type: Number, default: 0 }
});

var Review = Mongoose.model('Review', ReviewSchema);
Review.modelName = 'Review';

Review.sanitize = function sanitize(review) {
  var author = User.sanitize(author);
  review = review.toObject();
  review.author = author;
  
  return review;
}

module.exports = Review;