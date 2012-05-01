var MovieTableRowView = Backbone.View.extend({
  tagName: "tr",

  className: "movie_row",

  rowTemplate: $("#TMPMovieRows").html(),

  initialize: function(){
    _.bindAll(this, 'render', 'rowAction');
    this.model.bind('all', this.render);

    return this;
  },

  events:{ 
    "click td" : "rowAction"
  },

  rowAction: function(e){
    alert("You Double-Clicked on the row for '" + 
          this.model.get("title") + "'!");
  },

  render: function(){

    // This uses the compiled tempate for our rendering
    this.$el.html( $.mustache( this.rowTemplate, this.model ) );

    if(COTM.movies.indexOf(this.model) % 2 === 1){
      this.$el.addClass('alt');
    }

    return this;
  }
});
