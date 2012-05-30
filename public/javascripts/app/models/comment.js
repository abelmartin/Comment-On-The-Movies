var Comment = Backbone.Model.extend({

  defaults: {
  	sawMovie: false
  },

  createGuid: function(){
    //  This is a useful function for creating
    //  Stack Overflow Link for creating GUID
    //- http://stackoverflow.com/a/105074/36308
    var S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  },

  initialize: function(options){
  	var newGuid = this.createGuid();
    var date = new Date();
  	//Set the date and movie id for this comment
  	this.set({
  	  date: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
  	});
  },

  sync: function(method, model, options){
	if (COTM.useIndexedDb){
	  // Using IndexedDb via IDBWrapper.js
	  // https://github.com/jensarps/IDBWrapper
	  switch (method) {
	    case "read":
	      resp = store.get(model.id);
	    break;
	    case "create":
	      resp = store.create(model);
	    break;
	    case "update":
	      resp = store.update(model);
	    break;
	    case "delete":
	      resp = store.destroy(model);
	    break;
	  }
	}
	else{
	  // Using LocalStorage via Store.js
	  // https://github.com/marcuswestin/store.js
	  switch (method) {
	    case "read":
	      resp = store.get(model.id);
	    break;
	    case "create":
        var newId = model.createGuid();
	      model.set({id: newId}, {silent:true} );
	      store.set(model.id, model);
	      resp = model;
	    break;
	    case "update":
	      store.set(model.id, model);
	      resp = model;
	    break;
	    case "delete":
	      resp = store.remove(model.id);
	    break;
	  }
	}
  }
});