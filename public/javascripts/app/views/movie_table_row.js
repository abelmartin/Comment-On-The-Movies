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
    COTM.logEvent("Would have opened the detail view.");
    (new MovieDetailView({model:this.model})).render();
    this.model.set({show_details:false}, {silent:true});
  },

  setMovieDetailState: function(e){
    e.preventDefault();
    COTM.logEvent("Setting 'show_details'");
    if(this.model.get('show_details') === false){
      this.model.set({show_details: true});
    }
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
