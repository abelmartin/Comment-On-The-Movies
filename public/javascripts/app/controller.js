var CommentOnTheMovies = Backbone.Controller.extend({
  movie_table_view: null,

  // We'll set the proxy URL in the controller.
  // This way we have one place to reference it.
  proxy_root: "/proxy",

  initialize: function(){
    // The app starts here.
    if(this.movie_table_view === null){
      var movieCol = new Movies();
      this.movie_table_view = new MovieTableView({collection: movieCol});
    }
  },

  start: function(){
    // This lets us update the movie table view
    this.movie_table_view.collection.fetch();

    //This kicks off the hash routing which really gives the app it's power.
    Backbone.history.start();

    return this;
  },

  routes: {
    ""                : "index",
    "movie/:movie_id" : "movie"
  },

  index: function(){
  },

  movie: function(movie_id){
    // code here
  }

});
