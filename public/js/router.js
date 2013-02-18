define(
  ["app", "models", "views", "backbone", "backbone.marionette"],
  function (app, models, views, Backbone) {
    "use strict";

    return Backbone.Marionette.AppRouter.extend({

      appRoutes: {
        "isbn/:isbn": "isbnDisplay"
      },

      controller: {
        isbnDisplay : function (isbn) {
    
          // Get the book details
          var book = new models.book({ id: isbn });
          
          book.fetch();
          
          app.layout.bookBox.show(
            new views.book({ model: book })
          );
          
          // Get the prices
          var prices = new models.prices({
            book: book,
            country: app.country,
            currency: app.currency
          });
          
          prices.fetch();
          
          app.layout.pricesBox.show(
            new views.prices({ collection: prices })
          );
        }
      }
      
    });
  }
);
