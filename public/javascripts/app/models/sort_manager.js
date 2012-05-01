var SortManager = Backbone.Model.extend({
  //Sorting in backbone apps is a little annoying
  //To deal with that, we have this handy sort manager
  defaults: {
    direction: null,
    column: null,
    old_column: null
  },

  initialize: function(){
    //This is the FIRST action bound to the "sort_man" change event
    this.bind('change', this.applyNewSort);
  },

  applyNewSort: function(){
    var old_col, srt_dir, ret_val, cur_col;
    cur_col = this.get('column');
    old_col = this.get('old_column');
    srt_dir = this.get('direction');

    //Set the direction of the sort.
    if(cur_col === old_col){
      //If we've clicked on the same column twice, toggle the direction
      srt_dir = (srt_dir === 'asc') ? 'desc': 'asc';
    }
    else{
      //Otherwise, set the initial direction
      srt_dir = 'asc';
    }

    //Now we'll preserve the currently clicked column.
    this.set({direction: srt_dir}, {silent:true});
  },

  reverse_comp_value: function(val) {
    switch(typeof val){
      case 'number':
        return val * -1;
      case 'boolean':
        return !val;
      case 'string':
        //Reversing a string algorithm.
        //http://stackoverflow.com/q/5639070/36308
        return String.fromCharCode.apply(String,
            _.map(val.split(""), function (c) {
                return 0xffff - c.charCodeAt();
            })
        );
      default:
        //In the event that the value is NULL, you're get back an object.
        //Our best bet in that case is to simply return the value.
        /*throw "We can't reverse this value";*/
        return val;
    }
  },

  comp_value: function(film){
    var cur_col, srt_dir, ret_val; 
    cur_col = this.get('column');
    srt_dir = this.get('direction');

    switch( cur_col ){
      case 'freshness':
        ret_val = film.get('ratings').critics_score;
      break;
      case 'title':
        ret_val = film.get('title');
      break;
      case 'comment_count':
        ret_val = film.get('comment_count');
      break;
      default:
        ret_val = film.get('release_dates').theater;
      break;
    }
    
    //If our direction is 'desc', then we need to reverse the direction.
    if(srt_dir === 'desc'){
      ret_val = this.reverse_comp_value(ret_val);
    }

    this.set({old_column: cur_col}, {silent:true});

    //Finally, we'll return the correct value for comparison.
    return ret_val;
  }
});
