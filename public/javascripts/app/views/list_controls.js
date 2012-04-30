var ListControlsView = Backbone.View.extend({
  id: "SearchControls",
  template: $("#TMPSearchControls").html(),

  initialize: function(opts){
    _.bindAll(this, 
              'render', 
              'listChanged'); 
    this.collection = window.COTM.movies;
    $("#MovieTableContainer").append(this.$el);
  },

  events: {
    "change #MovieList" : "listChanged"
  },

  listChanged: function(e){
    //We'll simply change trigger a routing action.
    //This gives us bookmarkable urls and simplifies our code. 
    var new_list = $(e.target).val();
    window.COTM.navigate("!list/" + new_list, {trigger: true, replace: true});
    window.COTM.logEvent("The Movie List changed.  We called for new data from the API: " + new_list);
  },

  render: function(){
    this.$el.html( $.mustache( this.template ) );
    return this;
  }
});
