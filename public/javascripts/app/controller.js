var CommentOnTheMovies = Backbone.Controller.extend({
  movie_table_view: null,

  initalize: function(){
    // The app starts here.
    if(this.movie_table_view === null){
    }
  },

  start: function(){
    // code here
    $("#MovieDateRange").change(function(){
      console.log( $(this).val() );
      $.ajax({
        url: "/proxy?year_month="+$(this).val()
      });
    });
    Backbone.history.start();
  },

  routes: {
    ""                : "index",
    "movie/:movie_id" : "movie"
  },

  index: function(){
    // code here
  },

  movie: function(movie_id){
    // code here
  }

});
