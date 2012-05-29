var MovieDetailView = Backbone.View.extend({
  template: $("#TMPMovieDetails").html(),

  freshnessTemplate: $("#TMPFreshness").html(),

  movieCommentFormTemplate: $("#TMPMovieCommentForm").html(),

  initialize: function(){
    _.bindAll(this, 'render', 'close', 'closeDetails', 'createComment');
    this.model.bind('closeView',this.close);
    $("#MovieDetails").append(this.$el);
  },

  events:{
    "click a.js-close" : "closeDetails",
    "click .js-create-comment" : "createComment"
  },

  closeDetails: function(e){
    e.preventDefault();
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
      //Let's escape the text that we're saving.
      text: escape(formData[1].value)
    });
    cmt.save();
    COTM.logEvent("We created the comment");
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
    $("h3.js-title", this.$el).after( $.mustache( this.freshnessTemplate, this.model ) );
    $("ul.movie-comment-column", this.$el).before( $.mustache( this.movieCommentFormTemplate ) );
    // fetch the comment collection from the local store
    // render the views
    // append them to the dom
    // $("ul.movie-comment-column", this.$el).append(commentLines);

    return this;
  }
});
