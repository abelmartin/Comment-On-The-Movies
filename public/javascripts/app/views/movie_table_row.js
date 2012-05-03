var MovieTableRowView = Backbone.View.extend({
  tagName: "tr",

  className: "movie_row",

  template: $("#TMPMovieRows").html(),

  initialize: function(){
    _.bindAll(this,
              'render',
              'setMovieDetailState',
              'openMovieDetails');
    // this.model.bind('all', this.render);
    this.model.bind('change:show_details', this.openMovieDetails);

    return this;
  },

  events:{
    "click a.display_comments" : "setMovieDetailState"
  },

  openMovieDetails: function(){
    var vc = this.model.get("v_counter");
    COTM.logEvent("Would have opened the detail view. VC:" + vc);
    this.model.set({show_details:false, v_counter: vc + 1}, {silent:true});
  },

  setMovieDetailState: function(e){
    e.preventDefault();
    COTM.logEvent("Setting 'show_details'");
    this.model.set({show_details: true});
  },

  render: function(){

    // This uses the compiled tempate for our rendering
    this.$el.html( $.mustache( this.template, this.model ) );

    if(COTM.movies.indexOf(this.model) % 2 === 1){
      this.$el.addClass('alt');
    }

    return this;
  }
});
