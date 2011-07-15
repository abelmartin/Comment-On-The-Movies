var Movies = Backbone.Collection.extend({
  week: "",
  model: Movie,
  url: function(){
    // We build the proxy url to accomodate any proxy URL you may need.
    // console.log ("LOG: The movie collection has the following week:" + this.week);
    COTM.toggleLoadingImage();
    return COTM.proxy_root + "?week="+this.week;
  },
  parse: function(resp){
    return resp.results;
  }
});
