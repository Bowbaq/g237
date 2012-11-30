exports.routes = function (map) {
  map.resources('users');
    
  map.post('api/authenticate', 'auth#authenticate');
  map.get('api/logout', 'auth#logout');

  // Generic routes. Add all your routes below this line
  // feel free to remove generic routes
  map.all(':controller/:action');
  map.all(':controller/:action/:id');
};