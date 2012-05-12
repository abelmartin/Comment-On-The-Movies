var MovieTableView = Backbone.View.extend({
  // Here we bind our view to the ID in the markup. 
  id: "MovieTable",
  tagName: "table",
  template: $("#TMPMovieTable").html(),

  initialize: function(options){
    _.bindAll(this, 
              'render', 
              'changeSortAndDirection', 
              'applyNewSort');

    this.collection = window.COTM.movies;
    this.collection.bind('reset', this.render);

    //We'll create a property that's also a Backbone Model.
    //This way we'll get the events when we change the table's sort.
    //This is the SECOND action bound to the "sort_man" change event
    this.collection.sort_man.bind('change', this.applyNewSort);

    $("#MovieTableContainer").append(this.$el);
  },

  events: {
    "click th a"        : "changeSortAndDirection"
  },

  changeSortAndDirection: function(e){
    var parent_header, parent_column;
    e.preventDefault();
    parent_header = $(e.target).parents("th");
    COTM.logEvent("Clicked a header", parent_header);
    parent_column = parent_header.attr('class'); 
    COTM.logEvent( parent_column );
    parent_column = $.trim( parent_column.replace(/asc|dsec/, '') );
    this.collection.sort_man.set({column: parent_column});
  },

  applyNewSort: function(){
    this.collection.sort();
  },

  render: function(){
    var that = this;
    var sman = this.collection.sort_man;

    //This resets the contents of the movie table
    this.$el.html( $.mustache( this.template ) );

    COTM.logEvent('SMAN COLUMN: ' + sman.get('column') + ' SMAN DIRECTION: ' + sman.get('direction'));

    $("th", this.$el).each(function(idx){
      if($(this).hasClass(sman.get('column'))){
        $(this).addClass(sman.get('direction'));
      }
    });

    var row_holder = this.make('div');

    if( this.collection.isEmpty() ){
      $("#MovieTable").hide();
      $("#EmptyMessage").show();
      var movie_date_label = $("#MovieDateRange :selected").html();
      COTM.logEvent("There was no data from the last API call");
    }
    else{
      $("#MovieTable").show();
      $("#EmptyMessage").hide();
      COTM.logEvent("We received data from the last API call");
      // We instantiate a new instance of the MovieRowView for each row.
      // You never want to append nodes to the DOM iteratively.
      // It's always best to insert them as one action.
      _.each(that.collection.models, function(movie){
        var row = new MovieTableRowView({model: movie});
        $(row_holder).append( $( row.render().$el ) );
      });
      that.$el.append( $(row_holder).children() );
    }

    // Now we'll hide loading image.
    $("#LoadingImage").hide();

    return this;
  }
});
