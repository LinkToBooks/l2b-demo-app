var Router = Backbone.Router.extend({
  routes: {
    'isbn/:isbn': 'isbnDisplay',
  },
  
  isbnDisplay: function (isbn) {
    console.log('isbn router: ' + isbn);
  },
});

var appRouter = new Router();

var SearchView = Backbone.View.extend({
  events : {
    "submit form": "doSearch"
  },
  
  doSearch: function (e) {
    e.preventDefault();

    var isbn = this.$('input[name=isbn]').val();

    console.log("doing a search for " + isbn);
    
    appRouter.navigate('isbn/' + isbn, {trigger: true});
  },
});

$(function() {
  var searcher = new SearchView({el: $('#search-box')});
  Backbone.history.start();
});
