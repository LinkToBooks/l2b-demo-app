define(["backbone"], function (Backbone) {
  "use strict";
  
  // MODELS and COllECTIONS

  var CountryModel = Backbone.Model.extend({
    urlRoot: "http://api.127.0.0.1.xip.io:3000/country/",
    defaults: {
      id: "determineFromIPAddress",
      code: "",
      name: ""
    }
  });


  var BookModel = Backbone.Model.extend({
    urlRoot: "http://api.127.0.0.1.xip.io:3000/books/",
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
      this.book    = options.book;
      this.country = options.country;
    },
    model: PriceModel,
    url: function () {
      var url = this.book.url() + "/prices";
      url += "/" + this.country.get("code");
      console.log("PriceCollection#url", url);
      return url;
    },
    comparator: "price"
  });

  return {
    country: CountryModel,
    book:    BookModel,
    price:   PriceModel,
    prices:  PriceCollection
  };

});