var Movie = Backbone.Model.extend({

  initialize: function(){
    var that = this;
    this.set({
      comments: new Comments(),
      commentCount: function(){return that.get('comments').length}},
      {silent:true}
    );
  },

  freshness_class: function(){
    if( this.get('ratings').critics_rating.toLowerCase().match(/fresh/) ){
      return 'rt_icon_fresh';
    }
    else{
      return 'rt_icon_rotten';
    }
  },

  // commentCount: function(){
  //   return this.get('comments').length;
  // },

  has_score: function(){
    return (this.get('ratings').critics_score >= 0);
  }
});
