var Movies = Backbone.Collection.extend({
  //We default to the 'box_office' list
  list: 'box_office',
  model: Movie,
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
