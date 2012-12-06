exports.routes = function (map) {
  map.resources('users');
  
  map.namespace('api', function(api) {
    api.post('authenticate', 'auth#authenticate');
    api.get('logout', 'auth#logout');
    
    api.resources('projects', { except: [ 'new', 'edit', 'destroy' ] }, function(project){
      project.resources('reviews', { only: [ 'index', 'create', 'update', 'upvote', 'downvote' ] }, function(review) {
        review.put('upvote', "reviews#upvote");
        review.put('downvote', "reviews#downvote");
      });
      
      project.post('team/:user_id', 'team#request');
      project.put('team/:user_id', 'team#grant');
      project.delete('team/:user_id', 'team#deny');
    });
    
    api.resources('users', { except: [ 'new', 'edit', 'destroy' ]});
  });
};