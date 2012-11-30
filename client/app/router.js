define([
  // Application.
  "app",
  
  "modules/auth",
  "modules/header"
],

function(app, Auth, Header) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },
    
    initialize: function () {
      // Handle back button throughout the application
      $('.back-button').on('click', function(event) {
          window.history.back();
          return false;
      });
      this.firstPage = true;
    },

    index: function () {
      var main = new Backbone.Layout({
        template: "layout/page",

        views: {
          '[data-role="header"]': new Header.Views.Layout({
            model: new Header.Model({title: "Login"}),
            el: "[data-id='header']"
          }),
          '[data-role="content"]': new Auth.Views.Login({
            model: new Auth.Model()
          })
        }
      });
      
      this.changePage(main);
    },
    
    changePage:function (page) {
      page.$el.attr('data-role', 'page');
      page.render().done(function() {
        $('body').append(page.el);
        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage(page.$el, {changeHash:false, transition: transition});
      }.bind(this));
    }
  });

  return Router;
});
