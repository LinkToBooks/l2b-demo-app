define(["jquery", "backbone", "models", "backbone.marionette"], function ($, Backbone, models) {
  "use strict";
  
  var L2BDemoApp = new Backbone.Marionette.Application();

  L2BDemoApp.on("initialize:after", function () {
    Backbone.history.start();
  });


  // VIEWS

  var CountryView = Backbone.Marionette.ItemView.extend({
    template: "#country-box-template",

    initialize: function () {
      this.listenTo(this.model, "change", this.render);
    }
  });


  var BookView = Backbone.Marionette.ItemView.extend({
    template: "#book-box-template",

    initialize: function () {
      this.listenTo(this.model, "change", this.render);
    }
  });

  
  var PriceView  = Backbone.Marionette.ItemView.extend({
    template: "#price-template"
  });


  var PriceEmptyView  = Backbone.Marionette.ItemView.extend({
    template: "#price-none-template"
  });

  
  var PriceListView = Backbone.Marionette.CollectionView.extend({
    itemView: PriceView,
    emptyView: PriceEmptyView,
    
    render: function () {
      console.log("PriceListView#render");
      return this;
    }
  });
  
  
  var SearchView = Backbone.Marionette.ItemView.extend({
    template: "#search-box-template",

    events : {
      "submit form": "doSearch"
    },
    
    ui: {
      isbnInput: "input[name=isbn]"
    },
    
    doSearch: function (e) {
      e.preventDefault();
  
      var isbn = this.ui.isbnInput.val();
  
      appRouter.navigate("isbn/" + isbn, {trigger: true});
    }
  });
  





  L2BDemoApp.addInitializer(function () {
    var app = this;
    
    // load the current country from API
    var country = new models.country({
      id: "determineFromIPAddress"
    });
    app.country = country;
    country.fetch();
    
    country.on("change", function () {
      app.trigger("preReqChanged", "country", this);
    });
    
    app.on("preReqChanged", function (what, object) {
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
  
  L2BDemoApp.addInitializer(function () {
    L2BDemoApp.layout = new Layout();
    L2BDemoApp.layout.render();
  });
  
  
  L2BDemoApp.addInitializer(function () {
    var view = new CountryView({ model: this.country });
    L2BDemoApp.layout.countryBox.show(view);
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
      L2BDemoApp.layout.bookBox.show(
        new BookView({ model: book })
      );

      // Get the prices
      var prices = new models.prices({ book: book, country: L2BDemoApp.country });
      prices.fetch();
      L2BDemoApp.layout.pricesBox.show(
        new PriceListView({ collection: prices })
      );

    }
  });
  

  var appRouter = new Router();
  

  L2BDemoApp.addInitializer(function () {
    var view = new SearchView();
    L2BDemoApp.layout.searchBox.show(view);
    view.render();
  });
  

  $(function () {
    L2BDemoApp.start();
  });

  return L2BDemoApp;
});

