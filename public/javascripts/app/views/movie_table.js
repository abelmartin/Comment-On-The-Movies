var MovieTableView = Backbone.View.extend({
  // Here we bind our view to the ID in the markup. 
  el: $("#MovieTableContainer"),

  initialize: function(options){
    _.bindAll(this, 
              'render', 
              'listChanged', 
              'changeSortAndDirection', 
              'applyNewSort');

    this.collection = new Movies();
    this.collection.bind('all', this.render);

    //We'll create a property that's also a Backbone Model.
    //This way we'll get the events when we change the table's sort.
    this.collection.sort_man.bind('change', this.applyNewSort);

    return this;
  },

  events: {
    "change #MovieList" : "listChanged",
    "click th a"        : "changeSortAndDirection"
  },

  changeSortAndDirection: function(e){
    var parent_header;
    parent_header = $(e.target).parent();
    COTM.logEvent("Clicked a header", parent_header);
    this.collection.sort_man.set({column: $(parent_header).attr('class')});
  },

  applyNewSort: function(){
    this.collection.sort();
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
        //Let's set the comment count on the model silently.
          /*movie.set({comment_count: COTM.helper.getCommentCount(movie.id)},*/
        /*{silent:true});*/
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
