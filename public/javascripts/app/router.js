var CommentOnTheMovies = Backbone.Router.extend({
  movie_table_view: null,
  // We'll set the proxy URL in the controller.
  // This way we have one place to reference it.
  proxy_root: "/proxy",

  debug: true,

  helper: {
    getCommentCount: function(movie_id){
      return 0;
    }
  },

  debugOn: function(){

    //We don't attempt to debug unless the app want to AND the broswer supports 'console' logging.
    return (this.debug && (typeof console  !== "undefined"));
  },

  logEvent: function(ev, obj){

    //Nothing happens unless debugging is turned on.
    if(this.debugOn()){

      // Every event logs it's datestamp
      if(typeof ev === 'string'){
        console.log( (new Date()).toTimeString() + " - CURRENT EVENT: " + ev);
      }

      if(obj){
        console.log( (new Date()).toTimeString() + " - LOGGING OBJECT");
        console.log(obj);
      }

      // Just a nice terminiating line.
      console.log("-----");
    }
  },

  start: function(){
    this.logEvent("EVENT: We loaded the BACKBONE APP::START FUNCTION");

    // We'll instantiate the MovieTableView that we'll need.
    this.movie_table_view = new MovieTableView();

    //This kicks off the hash routing which really gives the app it's power.
    Backbone.history.start();

    //It's always good to return the object in question when possible.
    return this;
  },

  routes: {
    ""                  : "index",
    "!"                 : "index",
    "!list/:list_name"  : "list",
    "!movie/:movie_id"  : "movie"
  },

  index: function(){
    //Let's redirect users to the box_office view if they hit the home view
    this.logEvent("EVENT: We loaded the INDEX view");
    this.logEvent("EVENT: We should load the following URL:" + window.location.host + "#!list/box_office");
    window.location = "http://" + window.location.host + "#!list/box_office";
  },

  list: function(list_name){
    // This lets us update the movie table view
    this.logEvent("EVENT: We loaded the LIST view");
    this.movie_table_view.collection.fetch();
  },

  movie: function(movie_id){
    // code here
  },

  toggleLoadingImage: function(){
    $("#LoadingImage").toggle();
  }

});
