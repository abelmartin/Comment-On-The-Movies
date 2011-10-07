var CommentOnTheMovies = Backbone.Router.extend({
  movie_table_view: null,
  // We'll set the proxy URL in the controller.
  // This way we have one place to reference it.
  proxy_root: "/proxy",

  helper: {
    getCommentCount: function(movie_id){
      return 5;
    }
  },

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
    "search/:week"    : "index_with_week",
    "movie/:movie_id" : "movie"
  },

  index: function(){
    // This lets us update the movie table view
    this.movie_table_view.collection.week = $("#MovieDateRange").val();
    this.movie_table_view.collection.fetch();
  },

  index_with_week: function(week){
    this.movie_table_view.collection.week = week;
    this.movie_table_view.collection.fetch();
    $("#MovieDateRange").val( week );
  },

  movie: function(movie_id){
    // code here
  },

  toggleLoadingImage: function(){
    $("#LoadingImage").toggle();
  }

});
