define(
  ["jquery", "backbone", "app", "models", "views", "backbone.marionette"],
  function ($, Backbone, app, models, views) {
    "use strict";
    
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
    
    
    var Router = Backbone.Router.extend({
      routes: {
        "isbn/:isbn": "isbnDisplay"
      },
      
      isbnDisplay: function (isbn) {
    
        // Get the book details
        var book = new models.book({ id: isbn });
        book.fetch();
        app.layout.bookBox.show(
          new views.book({ model: book })
        );
    
        // Get the prices
        var prices = new models.prices({ book: book, country: app.country });
        prices.fetch();
        app.layout.pricesBox.show(
          new views.prices({ collection: prices })
        );
    
      }
    });
    
    
    var appRouter = new Router();
    
    
    app.addInitializer(function () {
      var view = new views.search();
      this.layout.searchBox.show(view);
      view.render();
    });
    
    
    $(function () {
      app.start();
    });

  return null;
});

