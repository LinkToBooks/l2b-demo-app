/*global Backbone:false, $:false, _:false */

(function () {
  "use strict";
  
  var L2BDemoApp = new Backbone.Marionette.Application();

  var BookModel = Backbone.Model.extend({
    urlRoot: "http://api.127.0.0.1.xip.io:3000/books/"
  });
  
  
  var BookView = Backbone.Marionette.ItemView.extend({
    template: "#book-view-template",

    el: function () {
      return $("#book-view");
    },
    
    initialize: function () {
      this.listenTo(this.model, "change", this.render);
    }
  });
  
  var Router = Backbone.Router.extend({
    routes: {
      "isbn/:isbn": "isbnDisplay"
    },
    
    isbnDisplay: function (isbn) {

      var model = new BookModel({ id: isbn });
      var view = new BookView({ model: model });
  
      model.fetch();
    }
  });
  
  var appRouter = new Router();
  
  var SearchView = Backbone.View.extend({
    events : {
      "submit form": "doSearch"
    },
    
    doSearch: function (e) {
      e.preventDefault();
  
      var isbn = this.$("input[name=isbn]").val();
  
      appRouter.navigate("isbn/" + isbn, {trigger: true});
    }
  });
  
  $(function () {
    new SearchView({el: $("#search-box")});
    Backbone.history.start();
  });

})();

