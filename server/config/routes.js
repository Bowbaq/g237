exports.routes = function (map) {
  map.resources('users');
  
  map.namespace('api', function(api) {
    api.post('authenticate', 'auth#authenticate');
    api.get('logout', 'auth#logout');
    
    api.resources('projects', function(projects){
      projects.ressource('reviews');
    });
  });

  // Generic routes. Add all your routes below this line
  // feel free to remove generic routes
  map.all(':controller/:action');
  map.all(':controller/:action/:id');
};