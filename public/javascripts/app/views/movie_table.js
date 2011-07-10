var MovieTableView = Backbone.View.extend({
  // Here we bind our view to the ID in the markup. 
  el: $("#MovieTable"),

  initialize: function(options){
    _.bindAll(this, 'render');

    this.collection = new Movies();
    this.collection.bind('all', this.render);

    return this;
  },

  events: {
    "change #MovieDateRange" : "dateRangeChanged"
  },

  dateRangeChanged: function(e){
      /*console.log( this );*/
      /*console.log( e );*/
      console.log( $(e.target).val() );
      this.collection.week = $(e.target).val();
      this.collection.fetch();
  },

  render: function(){
    var vw = this;

    // Remove all the rows but the header
    this.el.find("tr.movie_row").remove();

    // We instantiate a new instance of the MovieRowView for each row.
    _.each(vw.collection.models, function(movie){
      var row = new MovieTableRowView({model: movie});
      var filled_row = $( row.render().el );
      vw.el.append( filled_row );
    });
    
    return this;
  }
});
