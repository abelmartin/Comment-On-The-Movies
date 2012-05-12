var MovieDetailView = Backbone.View.extend({
  id: "MovieDetails",

  template: $("#TMPMovieDetails").html(),

  initialize: function(){
    _.bindAll(this, 'render', 'closeDetails', 'selfDestruct');
    this.model.bind('change:show_details', this.selfDestruct);
    $("#MovieDetailContainer").append(this.$el);
    return this;
  },

  events:{ 
    "click a.close" : "closeDetails"
  },

  closeDetails: function(e){
    e.preventDefault();
    this.model.set({show_details: false});
  },

  selfDestruct: function(){
    if(this.model.get('show_details') === false){
      this.remove();
    }
  },

  render: function(){

    // This uses the compiled tempate for our rendering
    this.$el.html( $.mustache( this.template, this.model ) );

    return this;
  }
});
