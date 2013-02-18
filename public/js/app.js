define(["initial-config", "models", "backbone", "backbone.marionette"], function (initialConfig, models, Backbone) {
  "use strict";
  
  var app = new Backbone.Marionette.Application();

  app.country  = new models.country(initialConfig.country);
  app.currency = new models.currency(initialConfig.currency);

  

  return app;

});
