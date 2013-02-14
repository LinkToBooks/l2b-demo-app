define(["initial_config", "models", "backbone", "backbone.marionette"], function (initial_config, models, Backbone) {
  "use strict";
  
  var app = new Backbone.Marionette.Application();

  app.country = new models.country( initial_config.country );

  app.on("initialize:after", function () {
    Backbone.history.start();
  });

  return app;

});