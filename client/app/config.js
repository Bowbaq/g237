// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file and the JamJS
    // generated configuration file.
    deps: ["../vendor/jam/require.config", "patch", "main"],

    paths: {
        patch: "../vendor/js/patch",
        plugins: "../vendor/js/plugins"
    },

    shim: {
        // Backbone-localstorage depends on Backbone.
        "plugins/backbone-localstorage": ["backbone"],
        // Backbone-filter depends on Backbone.
        "plugins/backbone-filter": ["backbone"]
    }
});
