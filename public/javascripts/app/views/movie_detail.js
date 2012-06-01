var MovieDetailView = Backbone.View.extend({

  template: $("#TMPMovieDetails").html(),

  freshnessTemplate: $("#TMPFreshness").html(),

  movieCommentFormTemplate: $("#TMPMovieCommentForm").html(),

  initialize: function(){
    _.bindAll(this, 'render', 'close', 'closeDetails', 'createComment');
    this.model.on('closeView',this.close);
    $("#MovieDetails").append(this.$el);
  },

  events:{
    "click .js-create-comment" : "createComment"
  },

  closeDetails: function(e){
    e.preventDefault();
    $("#MovieDetails").hide();
    this.close();
  },

  createComment: function(e){
    e.preventDefault();
    var formData = $('form#NewComment').serializeArray();
    var cmt = new Comment({
      //We need to relate the Comment to the movie
      movieId: this.model.id,
      //This lets us save boolean insetad of a string
      sawMovie: formData[0].value === '1',
      text: formData[1].value
    });
    cmt.save();
    COTM.logEvent("We created the comment");
    this.model.get('comments').add(cmt);
    COTM.logEvent("We ADDED the comment to this movie's comment array");
    $("ul.movie-comment-column", this.$el).append((new MovieCommentView({model:cmt})).render().$el);
    COTM.logEvent("We ADDED the comment to this movie's comment list");

    $("form#NewComment [name='sawMovie'][value='0']").attr('checked', 'checked');
    $('form#NewComment #commentText').val('');
    $('#commentText').focus();
    COTM.logEvent("We've RESET our form");
  },

  beforeClose: function(){
    COTM.logEvent("ABOUT TO CLOSE movie detail view");
    this.model.off('closeView', this.close);
  },

  afterClose: function(){
    COTM.logEvent("CLOSED movie detail view");
  },

  render: function(){
    var that = this;
    var row_holder = this.make('div');
    var arrComments;
    // This uses the compiled template for our rendering
    this.$el.html( $.mustache( this.template, this.model ) );
    $("h3.js-title", this.$el).after( $.mustache( this.freshnessTemplate, this.model ) );
    $("ul.movie-comment-column", this.$el).before( $.mustache( this.movieCommentFormTemplate ) );
    arrComments = this.model.get('comments');
    arrComments.each(function(cmt){
      // renderedComments.push( (new MovieCommentView({model:cmt})).render().$el );
      // $("ul.movie-comment-column", this.$el).append(().render().$el);
      var row = new MovieCommentView({model:cmt});
      $(row_holder).append( $( row.render().$el ) );
    });

    $("ul.movie-comment-column", this.$el).append($(row_holder).children());
    // fetch the comment collection from the local store
    // render the views
    // append them to the dom
    // $("ul.movie-comment-column", this.$el).append(commentLines);

    return this;
  }
});
