var BookModel = Backbone.Model.extend({
  urlRoot: "http://api.127.0.0.1.xip.io/api/books/",
});


var BookView = Backbone.View.extend({
  el: function () {
    return $('#book-view');
  },
  
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function () {
    console.log('BookView render');

    console.log( this.model.url() );

    var data = this.model ? this.model.toJSON() : {};

    var content = _.template( $('#book-view-template').text(), data );
    this.$el.html( content );

    return this;
  }
});

var Router = Backbone.Router.extend({
  routes: {
    'isbn/:isbn': 'isbnDisplay',
  },
  
  isbnDisplay: function (isbn) {
    console.log('isbn router: ' + isbn);

    var model = new BookModel({ id: isbn });

    var view = new BookView({ model: model });
    view.render();
    model.fetch();
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
