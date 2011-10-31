var MovieTableView = Backbone.View.extend({
  // Here we bind our view to the ID in the markup. 
  el: $("#MovieTableContainer"),

  initialize: function(options){
    _.bindAll(this, 'render', 'listChanged');

    this.collection = new Movies();
    this.collection.bind('all', this.render);

    return this;
  },

  events: {
    "change #MovieList" : "listChanged"
  },

  listChanged: function(e){
    this.collection.list = $(e.target).val();
    this.collection.fetch();
    COTM.logEvent("The Movie List changed.  We called for new data from the API");
  },

  render: function(){
    var that = this;
    var row_holder = this.make('div');

    // Remove all the rows but the header
    this.el.find("tr.movie_row").remove();

    if( this.collection.isEmpty() ){
      $("#MovieTable").hide();
      $("#EmptyMessage").show();
      var movie_date_label = $("#MovieDateRange :selected").html();
      COTM.logEvent("There was no data from the last API call");
    }
    else{
      $("#MovieTable").show();
      $("#EmptyMessage").hide();
      COTM.logEvent("We recieved data from the last API call");
      // We instantiate a new instance of the MovieRowView for each row.
      // You never want to append nodes to the DOM iteratively.
      // It's always best to insert them as one action.
      _.each(that.collection.models, function(movie){
        var row = new MovieTableRowView({model: movie});
        $(row_holder).append( $( row.render().el ) );
      });
      that.el.find("#MovieTable").append( $(row_holder).html() );

    }

    // Now we'll hide loading image.
    $("#LoadingImage").hide();

    COTM.navigate("#!list/"+this.collection.list);

    return this;
  }
});
