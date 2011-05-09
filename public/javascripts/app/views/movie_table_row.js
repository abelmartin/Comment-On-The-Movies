var MovieTableRowView = Backbone.View.extend({
  tagName: "tr",

  className: "movie_row",

  rowTemplate: $("#TMPMovieRows").template(),

  initialize: function(){
    _.bindAll(this, 'render');
    this.model.bind('all', this.render);
    return this;
  },

  events:{ 
    "dblclick td" : "rowAction"
  },

  rowAction: function(e){
    alert("You Double-Clicked on the row for '" + this.model.get("display_title") + "'!");
  },

  render: function(){

    // This uses the compiled tempate for our rendering
    $(this.el).html( $.tmpl( this.rowTemplate, this.model ) );

    return this;
  }
});
