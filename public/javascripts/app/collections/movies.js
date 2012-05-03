var Movies = Backbone.Collection.extend({
  //We default to the 'box_office' list
  list: 'box_office',
  sort_man: null,
  model: Movie,

  initialize: function(){
    var that = this;
    this.sort_man = new SortManager();
    this.comparator = function(film){
      if (film){
        return that.sort_man.comp_value(film);
      }
    }
  },

  url: function(){
    // We build the proxy url to accomodate any proxy URL you may need.
    // Fire off the loading image
    COTM.toggleLoadingImage();

    // This way, we call our proxy to fill our movie collection
    return COTM.proxy_root + "?action="+this.list;
  },

  parse: function(resp){
    return resp.movies;
  }

});
