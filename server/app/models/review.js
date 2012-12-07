var Mongoose = require('mongoose');
var ObjectId = Mongoose.Schema.Types.ObjectId;

var _ = require('lodash');

var User = require('./user');

var ReviewSchema = new Mongoose.Schema({
  author: { type: ObjectId, ref: 'User' },
  project: { type: ObjectId, ref: 'Project' },
  
  body: String,
  
  posted_at: { type: Date, default: Date.now },
  
  up_vote: { type: Number, default: 0 }, 
  lo_vote: { type: Number, default: 0 }
});

var Review = Mongoose.model('Review', ReviewSchema);
Review.modelName = 'Review';

Review.helpers = _.extend(Review.helpers || {}, {
  findAll: function findAll(project, callback) {
    Review.find({project: project._id}).populate('author')
    .exec(function(err, reviews) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, _.map(reviews, Review.helpers.sanitize));
      }
    })
  },
  
  find: function find(project, id, callback) {
    Review.findOne({project: project._id, _id: id}).populate('author')
    .exec(function(err, review){
      if(err) {
        callback(err, null);
      } else {
        callback(null, Review.helpers.sanitize(review));
      }
    });
  },
  
  create: function create(project, data, callback) {
    User.helpers.find(data.author, function(err, user) {
      if(err) {
        callback(err, null);
      } else {
        var review = new Review(_.omit(data, 'author', 'project'));
        review.author = user._id;
        review.project = project._id;
        
        review.save(function(err, new_review) {
          if (err) {
            callback(err, null);
          } else {
            user.reviews.push(new_review);
            user.save();
            
            project.reviews.push(new_review);
            project.save();
            
            Review.helpers.find(project, new_review.id, callback);
          }
        });
      }
    }, true);
  },
  
  sanitize: function sanitize(review) {
    var author = User.helpers.sanitize(review.author);
    review = review.toObject();
    review.author = author;

    return review;
  }
});

module.exports = Review;