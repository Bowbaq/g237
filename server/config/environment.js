var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../app/models/user')
;

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.configure(function() {
    var cwd = process.cwd();

    app.use(express.static(cwd + '/public', {
        maxAge: 86400000
    }));
    app.set('view engine', 'ejs');
    app.set('view options', {
        complexNames: true
    });
    app.set('jsDirectory', '/javascripts/');
    app.set('cssDirectory', '/stylesheets/');
    
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(allowCrossDomain);
    
    app.use(express.cookieParser('Eg8v4vQnHry2Yvj7WQyKXv6VwPw3Z8baoWfVvE27J8aHJM1zqZ'));
    app.use(express.session({
        secret: 'Eg8v4vQnHry2Yvj7WQyKXv6VwPw3Z8baoWfVvE27J8aHJM1zqZ',
        maxAge: new Date(Date.now() + (90 * 86400 * 1000))
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(app.router);
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

