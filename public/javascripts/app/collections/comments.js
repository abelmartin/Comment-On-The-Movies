var Comments = Backbone.Collection.extend({

  model: Comment,

  sync: function(method, model, options){
   if(COTM.useIndexedDb){
     // Using IndexedDb via IDBWrapper.js
     // https://github.com/jensarps/IDBWrapper
     switch (method) {
       case "read":
       break;

      // Collections really don't use the rest of these methods
       case "create":
       break;
       case "update":
       break;
       case "delete":
       break;
     }
    }
    else{
      // Using LocalStorage via Store.js
      // https://github.com/marcuswestin/store.js
      switch (method) {
       case "read":
      break;

      // Collections really don't use the rest of these methods
      case "create":
      break;
      case "update":
      break;
      case "delete":
      break;
      }
    }
  }
});