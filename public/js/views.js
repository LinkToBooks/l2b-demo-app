define(["backbone", "backbone.marionette"], function (Backbone) {
  "use strict";

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
    emptyView: PriceEmptyView
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
  
  
  return {
    country: CountryView,
    book: BookView,
    price: PriceView,
    priceEmpty: PriceEmptyView,
    prices: PriceListView,
    search: SearchView
  };
  
  
});
