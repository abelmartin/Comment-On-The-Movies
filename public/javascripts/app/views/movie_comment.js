var MovieCommentView = Backbone.View.extend({

  tagName: 'li',

  template: $('#TMPMovieComment').html(),

  initialize: function(){
    _.bindAll(this, 'render', 'deleteComment');
  },

  events: {
    'click .js-delete' : 'deleteComment'
  },

  deleteComment: function(e){
    e.preventDefault();
    this.model.destroy();
    this.close();
  },

  render: function(){
    this.$el.html( $.mustache( this.template, this.model ) );
    return this;
  }
});