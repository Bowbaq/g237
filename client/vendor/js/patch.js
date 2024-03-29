require([], function() {
  if (Function.prototype.bind === undefined){
     Function.prototype.bind = function (bind) {
          var self = this;
          return function () {
              var args = Array.prototype.slice.call(arguments);
              return self.apply(bind || null, args);
          };
      };
  }
});