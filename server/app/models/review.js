var Mongoose = require('mongoose');

var ObjectId = Mongoose.Schema.Types.ObjectId;

var ReviewSchema = new Mongoose.Schema({
  author: { type: ObjectId, ref: 'User' }, 
  body: String,
  
  posted_at: { type: Date, default: Date.now },
  
  up_vote: { type: Number, default: 0 }, 
  lo_vote: { type: Number, default: 0 }
});

var Review = Mongoose.Model('Review', ReviewSchema);
Review.modelName = 'Review';

module.exports = Review;