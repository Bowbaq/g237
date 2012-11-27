// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file and the JamJS
    // generated configuration file.
    deps: ["../vendor/jam/require.config", "jqm", "main"],

    paths: {
        jquery: "../vendor/jam/jquery/jquery",
        'jqm.config': "../vendor/jqm/jqm.config",
        jqm: "../vendor/jqm/js/jqm"
    },

    shim: {
        // Put shims here.
        'jqm.config' : ["jquery"],
        jqm : {
            deps : [
                "jquery", 
                "jqm.config"
            ]
        }
    }
});
