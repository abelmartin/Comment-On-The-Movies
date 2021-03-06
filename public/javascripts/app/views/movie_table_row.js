var MovieTableRowView = Backbone.View.extend({

  tagName: "tr",

  className: "movie_row",

  template: $("#TMPMovieRows").html(),

  freshnessTemplate: $("#TMPFreshness").html(),

  initialize: function(){
    //Kills any previously bound callbacks
    this.model.off();

    //We'll maintain the context of "this" in the following methods
    _.bindAll(this,
              'render',
              'openMovieDetails');
    this.model.on('openView', this.openMovieDetails);
    this.model.get('comments').on('add', this.render);
    this.model.get('comments').on('remove', this.render);
  },

  events:{
    "click a.js-display_comments" : "openMovieDetails"
  },

  openMovieDetails: function(e){
    var that = this;
    if (e) {
      e.preventDefault();
    }
    COTM.logEvent("CLOSING all possible views");
    COTM.closeAllDetails();

    COTM.logEvent("SHOULD open the detail view.");
    (new MovieDetailView({model:this.model})).render();

    //We need to display the div before we call the lightbox.
    $('#MovieDetails').show();

    $.colorbox({
      // transition: "none",
      speed: 500,
      inline:true, href:'#MovieDetails',
      innerWidth: '700px', onCleanup: function(){
      that.model.trigger('closeView');
    }});
  },

  render: function(){

    // This uses the compiled template for our rendering
    this.$el.html( $.mustache( this.template, this.model ) );

    if(COTM.movies.indexOf(this.model) % 2 === 1){
      this.$el.addClass('alt');
    }

    $("td.freshness", this.$el).append( $.mustache( this.freshnessTemplate, this.model ) );
    // td.freshness

    return this;
  }
});
