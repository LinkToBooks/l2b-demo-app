define(["backbone", "backbone.marionette"], function (Backbone) {
  "use strict";
  
  var app = new Backbone.Marionette.Application();

  app.on("initialize:after", function () {
    Backbone.history.start();
  });

  return app;

});