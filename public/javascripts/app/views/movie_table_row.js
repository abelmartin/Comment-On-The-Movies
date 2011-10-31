var MovieTableRowView = Backbone.View.extend({
  tagName: "tr",

  className: "movie_row",

  rowTemplate: $("#TMPMovieRows").template(),

  initialize: function(){
    _.bindAll(this, 'render');
    this.model.bind('all', this.render);

    // It is handy to reference the view the model is in.
    // It's also important to pass the 'silent:true' option
    // otherwise you'll be stuck in an endless loop
    this.model.set({view: this},{silent: true});
    return this;
  },

  events:{ 
    "dblclick td" : "rowAction"
  },

  rowAction: function(e){
    alert("You Double-Clicked on the row for '" + 
          this.model.get("title") + "'!");
  },

  render: function(){

    // This uses the compiled tempate for our rendering
    $(this.el).html( $.tmpl( this.rowTemplate, this.model ) );

    return this;
  }
});
