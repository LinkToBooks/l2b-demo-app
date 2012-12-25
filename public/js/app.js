/*global Backbone:false, $:false */

(function () {
  "use strict";
  
  var L2BDemoApp = new Backbone.Marionette.Application();

  L2BDemoApp.on("initialize:after", function () {
    Backbone.history.start();
  });
  
  var Layout = Backbone.Marionette.Layout.extend({
    
    el: "#content",
    
    template: "#layout-template",
  
    regions: {
      searchBox: "#search-box",
      bookBox:   "#book-box",
      pricesBox: "#prices-box"
    }
    
  });
  
  L2BDemoApp.addInitializer(function () {
    L2BDemoApp.layout = new Layout();
    L2BDemoApp.layout.render();
  });
  
  var BookModel = Backbone.Model.extend({
    urlRoot: "http://api.127.0.0.1.xip.io:3000/books/",
    defaults: {
      title: "",
      isbn: "",
      author: ""
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
  
  var PricesView = Backbone.Marionette.CollectionView.extend({
    itemView: PriceView,
    emptyView: PriceEmptyView
  });
  
  var PriceModel = Backbone.Model.extend({
    defaults: {
      price: ""
    }
  });
  
  var PriceCollection = Backbone.Collection.extend({
    model: PriceModel,
    comparator: "price"
  });
  
  var Router = Backbone.Router.extend({
    routes: {
      "isbn/:isbn": "isbnDisplay"
    },
    
    isbnDisplay: function (isbn) {

      // Get the book details
      var book = new BookModel({ id: isbn });
      book.fetch();
      L2BDemoApp.layout.bookBox.show(
        new BookView({ model: book })
      );

      // Get the prices
      var prices = new PriceCollection();
      prices.url = book.url() + "/prices";
      prices.fetch();
      L2BDemoApp.layout.pricesBox.show(
        new PricesView({ collection: prices })
      );

    }
  });
  
  var appRouter = new Router();
  
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
    var view = new SearchView();
    L2BDemoApp.layout.searchBox.show(view);
    view.render();
  });
  
  $(function () {
    L2BDemoApp.start();
  });

})();

