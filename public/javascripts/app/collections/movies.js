var Movies = Backbone.Collection.extend({
  url: function(){
    // We build the proxy url to accomodate any proxy URL you may need.
    return COTM.proxy_root + "?year_month="+this.year_month;
  },
  year_month: "2011-05",
  model: Movie,
  parse: function(resp){
    return resp.results;
  }
});
