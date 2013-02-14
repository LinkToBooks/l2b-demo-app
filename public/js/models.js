define(["require", "backbone"], function (require, Backbone) {
  "use strict";
  
  var apiRoot = require.toUrl("api/");
  
  // MODELS and COllECTIONS

  var CountryModel = Backbone.Model.extend({
    urlRoot: apiRoot + "country/",
    defaults: {
      id: "",
      code: "",
      name: ""
    }
  });


  var CurrencyModel = Backbone.Model.extend({
    urlRoot: apiRoot + "currency/", // FIXME - does not axist in api yet
    defaults: {
      id: "",
      code: "",
      name: ""
    }
  });


  var BookModel = Backbone.Model.extend({
    urlRoot: apiRoot + "books/",
    defaults: {
      title: "",
      isbn: "",
      author: ""
    }
  });


  var PriceModel = Backbone.Model.extend({
    defaults: {
      price: ""
    }
  });

  var PriceCollection = Backbone.Collection.extend({
    initialize: function (options) {
      this.book     = options.book;
      this.country  = options.country;
      this.currency = options.currency;
    },
    model: PriceModel,
    url: function () {
      var url = this.book.url() + "/prices";
      url += "/" + this.country.get("code");
      url += "/" + this.currency.get("code");
      return url;
    },
    comparator: "price"
  });

  return {
    country:  CountryModel,
    currency: CurrencyModel,
    book:     BookModel,
    price:    PriceModel,
    prices:   PriceCollection
  };

});