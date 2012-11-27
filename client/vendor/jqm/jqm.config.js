define(['jquery'], function ($) {
    $(document).on("mobileinit", function () {
      // console.log("JQM config");
        $.mobile.ajaxEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
        $.mobile.linkBindingEnabled = false; //-- works properly with jqm 1.1.1 rc1
        
        // Remove page from DOM when it's being replaced
        $('body').on({
          "pagehide": function (event, ui) {
            console.log("Removing ", event.currentTarget);
            $(event.currentTarget).remove();
          }
        }, 'div[data-role="page"]');

        $.mobile.defaultDialogTransition = "slidedown";
        $.mobile.defaultPageTransition = "slide";
        $.mobile.page.prototype.options.degradeInputs.date = true;
        $.mobile.page.prototype.options.domCache = false;
        // 
        // //enable flag to disable rendering
        // $.mobile.ignoreContentEnabled=true;
        // // enable loading page+icon
        // $.mobile.loader.prototype.options.text = "loading";
        // $.mobile.loader.prototype.options.textVisible = false;
        // $.mobile.loader.prototype.options.theme = "a";
        // $.mobile.loader.prototype.options.html = "";
    });
});