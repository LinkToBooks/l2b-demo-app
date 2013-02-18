define(
  ["jquery", "backbone", "app", "models", "views", "router", "backbone.marionette"],
  function ($, Backbone, app, models, views, Router) {
    "use strict";
    
    app.on("initialize:after", function () {

      // Configure all the route urls here, for ease
      app.router = new Router();

      Backbone.history.start();
    });
    
    app.addInitializer(function () {
      
      this.country.on("change", function () {
        app.trigger("preReqChanged", "country", this);
      });
      
      this.on("preReqChanged", function (what, object) {
        console.log(what, object);
      });
      
    });
    
    var Layout = Backbone.Marionette.Layout.extend({
      
      el: "#content",
      
      template: "#layout-template",
    
      regions: {
        countryBox: "#country-box",
        searchBox:  "#search-box",
        bookBox:    "#book-box",
        pricesBox:  "#prices-box"
      }
      
    });
    
    app.addInitializer(function () {
      this.layout = new Layout();
      this.layout.render();
    });
    
    
    app.addInitializer(function () {
      var view = new views.country({ model: this.country });
      this.layout.countryBox.show(view);
      view.render();
    });
    
    
    
    
    app.addInitializer(function () {
      var view = new views.search();
      this.layout.searchBox.show(view);
      view.render();
    });
    
    
    $(function () {
      app.start();
    });

    return null;

  }
);

