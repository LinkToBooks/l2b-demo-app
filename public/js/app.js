/*global Backbone:false, $:false, _:false */

(function () {
  "use strict";
  
  var L2BDemoApp = new Backbone.Marionette.Application();

  L2BDemoApp.on("initialize:after", function(options){
    Backbone.history.start();
  });
  
  var Layout = Backbone.Marionette.Layout.extend({
    
    el: "#content",
    
    template: "#layout-template",
  
    regions: {
      searchBox: "#search-box",
      bookBox:   "#book-box"
    }
    
  });
  
  L2BDemoApp.addInitializer(function (options) {
    L2BDemoApp.layout = new Layout();
    L2BDemoApp.layout.render();
  });
  
  var BookModel = Backbone.Model.extend({
    urlRoot: "http://api.127.0.0.1.xip.io:3000/books/",
    defaults: {
      title: '',
      isbn: '',
      author: ''
    }
  });
  
  
  var BookView = Backbone.Marionette.ItemView.extend({
    template: "#book-box-template",

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
      var view  = new BookView({ model: model });
      L2BDemoApp.layout.bookBox.show(view);
  
      model.fetch();

    }
  });
  
  var appRouter = new Router();
  
  var SearchView = Backbone.Marionette.ItemView.extend({
    template: "#search-box-template",

    events : {
      "submit form": "doSearch"
    },
    
    doSearch: function (e) {
      e.preventDefault();
  
      var isbn = this.$("input[name=isbn]").val();
  
      appRouter.navigate("isbn/" + isbn, {trigger: true});
    }
  });

  L2BDemoApp.addInitializer( function (options) {
    var view = new SearchView();
    L2BDemoApp.layout.searchBox.show( view );
    view.render();
  });
  
  $(function () {
    L2BDemoApp.start();
  });

})();

