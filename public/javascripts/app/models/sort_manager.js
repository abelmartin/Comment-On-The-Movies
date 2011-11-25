var SortManager = Backbone.Model.extend({
  defaults: {
    direction: null,
    colunm: null
  },

  comp_value: function(film){
    switch( this.colunm ){
      case 'freshness':
        return film.get('ratings').critics_score;
      case 'title':
        return film.get('title');
      case 'comment_count':
        return film.get('comment_count');
      default:
        return film.get('release_dates').theater;
    }
  }
});
