var MovieTableView = Backbone.View.extend({
  // Here we bind our view to the ID in the markup. 
  el: $("#MovieTableContainer"),

  initialize: function(options){
    _.bindAll(this, 'render', 'loadNextWeek', 'loadPrevWeek');

    this.collection = new Movies();
    this.collection.bind('all', this.render);

    return this;
  },

  events: {
    "change #MovieDateRange" : "dateRangeChanged",
    "click .next_week_link"  : "loadNextWeek",
    "click .prev_week_link"  : "loadPrevWeek"
  },

  dateRangeChanged: function(e){
    this.collection.week = $(e.target).val();
    this.collection.fetch();
  },

  loadNextWeek: function(e){
    e.preventDefault();
  },

  loadPrevWeek: function(e){
    e.preventDefault();
  },

  render: function(){
    var vw = this;

    // Remove all the rows but the header
    this.el.find("tr.movie_row").remove();

    if( this.collection.isEmpty() ){
      $("#MovieTable").hide();
      $("#EmptyMessage").show();
      var movie_date_label = $("#MovieDateRange :selected").html();
      $("#DateSpan").html( movie_date_label );

      // Now we'll re-toggle loading image.
      COTM.toggleLoadingImage();
    }

    else{
      $("#MovieTable").show();
      $("#EmptyMessage").hide();
      // We instantiate a new instance of the MovieRowView for each row.
      _.each(vw.collection.models, function(movie){
        var row = new MovieTableRowView({model: movie});
        var filled_row = $( row.render().el );
        vw.el.find("#MovieTable").append( filled_row );
      });

      // Now we'll re-toggle loading image.
      COTM.toggleLoadingImage();
    }

  //porkloafking
  //
    COTM.navigate("/"+this.collection.week);

    // Update the links in the prev & next links.
    // Remove the preventDefault() from above.

    return this;
  }
});
