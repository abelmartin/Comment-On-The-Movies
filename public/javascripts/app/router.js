var CommentOnTheMovies = Backbone.Router.extend({
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
    //We don't attempt to debug unless the app want to AND the browser supports 'console' logging.
    return (this.debug && (typeof console  !== "undefined"));
  },

  logEvent: function(ev, obj){

    //Nothing happens unless debugging is turned on.
    if(this.debugOn()){

      // Every event logs it's date stamp
      if(typeof ev === 'string'){
        console.log( (new Date()).toTimeString() + " - CURRENT EVENT: " + ev);
      }

      if(obj){
        console.log( (new Date()).toTimeString() + " - LOGGING OBJECT");
        console.log(obj);
      }

      // Just a nice terminating line.
      console.log("-----");
    }
  },

  closeAllDetails: function(){
    COTM.movies.each(function(mov){
      mov.trigger("closeView");
    });
    this.logEvent("We cleared out the view states");
  },

  start: function(){
    this.logEvent("EVENT: We loaded the BACKBONE APP::START FUNCTION");

    // We'll instantiate the collections of movies that we'll be binding events to.
    this.movies = new Movies();

    // We instantiate & call render() because the controls view only gets rendered once.
    this.list_controls_view = new ListControlsView().render();

    // The bound events will hand the rendering for us so we can simply instantiate.
    this.movie_table_view = new MovieTableView();

    //This kicks off the hash routing which really gives the app it's power.
    Backbone.history.start();
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
    this.navigate("!list/box_office", {trigger: true, replace: true});
  },

  list: function(list_name){
    // This lets us update the movie table view
    COTM.closeAllDetails();
    this.logEvent("EVENT: We're loading a new list: " + list_name);
    this.movies.list = list_name;
    this.movies.fetch();
  },

  movie: function(movie_id){
    // code here
  },

  toggleLoadingImage: function(){
    $("#LoadingImage").toggle();
  }

});
