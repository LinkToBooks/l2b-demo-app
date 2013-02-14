define(["initial-config", "models", "backbone", "backbone.marionette"], function (initialConfig, models, Backbone) {
  "use strict";
  
  var app = new Backbone.Marionette.Application();

  app.country = new models.country( initialConfig.country );

  app.on("initialize:after", function () {
    Backbone.history.start();
  });

  return app;

});