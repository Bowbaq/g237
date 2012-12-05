exports.routes = function (map) {
  map.resources('users');
  
  map.namespace('api', function(api) {
    api.post('authenticate', 'auth#authenticate');
    api.get('logout', 'auth#logout');
    
    api.resources('projects', function(project){
      project.resources('reviews');
    });
  });
};