var CommentOnTheMovies = Backbone.Controller.extend({
  movie_table_view: null,

  // We'll set the proxy URL in the controller.
  // This way we have one place to reference it.
  proxy_root: "/proxy",

  initialize: function(){
    // The app starts here.
    if(this.movie_table_view === null){
      this.movie_table_view = new MovieTableView();
    }
  },

  start: function(){
    //This kicks off the hash routing which really gives the app it's power.
    Backbone.history.start();

    return this;
  },

  routes: {
    ""                : "index",
    "movie/:movie_id" : "movie"
  },

  index: function(){
    // This lets us update the movie table view
    console.log("We hit the index action!");
    console.log( $("#MovieDateRange").val() );
    this.movie_table_view.collection.week = $("#MovieDateRange").val();
    this.movie_table_view.collection.fetch();
  },

  movie: function(movie_id){
    // code here
  }

});
