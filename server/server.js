var express = require('express'),
    http = require('http'),
    
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    
    path = require('path'),
    flash = require("connect-flash"),
    
    mongoose = require('mongoose')
;

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

//======================================
//      init/main
//======================================
function init() {
  var app = express();
  
  // Setup express
  app.configure(function() {
    app.set('port', process.env.PORT || 8081);

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(allowCrossDomain);

    app.use(express.cookieParser());
    app.use(express.session({ secret: 'Eg8v4vQnHry2Yvj7WQyKXv6VwPw3Z8baoWfVvE27J8aHJM1zqZ' }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(app.router);
  });
  
  // Setup authentication
  var User = require('./modules/user');
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  
  // Setup mongoose
  var db = mongoose.createConnection('mongodb://localhost/g237');
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('ready!');
  });
  
  // Setup API
  require('./modules/auth-api')(app);
  
  // Error recovery
  app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

  app.configure('production', function() {
    app.use(express.errorHandler());
  });
  
  // Run server
  http.createServer(app).listen(app.get('port'), function() {
    console.log(
      "Express server listening on port %d in %s mode", 
      app.get('port'), 
      app.get('env')
    );
  });
}

init();