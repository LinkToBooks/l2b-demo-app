var SearchView = Backbone.View.extend({
  events : {
    "submit form": "doSearch"
  },
  
  doSearch: function (e) {
    e.preventDefault();

    var isbn = this.$('input[name=isbn]').val();

    console.log("doing a search for " + isbn);
  },
});

$(function() {
  var searcher = new SearchView({el: $('#search-box')});
});
