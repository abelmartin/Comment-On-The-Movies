var Movie = Backbone.Model.extend({

  defaults: {
    commentCount: 0
  },

  freshness_class: function(){
    if( this.get('ratings').critics_rating.toLowerCase().match(/fresh/) ){
      return 'rt_icon_fresh';
    }
    else{
      return 'rt_icon_rotten';
    }
  },

  has_score: function(){
    return (this.get('ratings').critics_score >= 0);
  }
});
