var MovieDetailView = Backbone.View.extend({
  template: $("#TMPMovieDetails").html(),

  initialize: function(){
    _.bindAll(this, 'render', 'close', 'closeDetails');
    this.model.bind('closeView',this.close);
    $("#MovieDetails").append(this.$el);
  },

  events:{ 
    "click a.close" : "closeDetails"
  },

  closeDetails: function(e){
    e.preventDefault();
    this.close();
  },

  beforeClose: function(){
    COTM.logEvent("ABOUT TO CLOSE movie detail view");
    this.model.off('closeView', this.close);
  },

  afterClose: function(){
    COTM.logEvent("CLOSED movie detail view");
  },

  render: function(){

    // This uses the compiled template for our rendering
    this.$el.html( $.mustache( this.template, this.model ) );

    return this;
  }
});
