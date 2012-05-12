var MovieTableRowView = Backbone.View.extend({
  tagName: "tr",

  className: "movie_row",

  template: $("#TMPMovieRows").html(),

  initialize: function(){
    this.model.off(); //Kills any previously bound callbacks
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
    if(this.model.get("show_details")){
      COTM.logEvent("SHOULD open the detail view.");
      (new MovieDetailView({model:this.model})).render();
      //this.model.set({show_details:false}, {silent:true});
    }
  },

  setMovieDetailState: function(e){
    e.preventDefault();
    COTM.logEvent("Setting 'show_details'");
    if(this.model.get('show_details') === false){
      COTM.logEvent("Current Movie Row Model", this.model);
      this.model.set({show_details: true});
    }
  },

  render: function(){

    // This uses the compiled template for our rendering
    this.$el.html( $.mustache( this.template, this.model ) );

    if(COTM.movies.indexOf(this.model) % 2 === 1){
      this.$el.addClass('alt');
    }

    return this;
  }
});
