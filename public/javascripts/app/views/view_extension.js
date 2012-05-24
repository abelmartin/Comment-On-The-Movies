// "close" isn't part of the core lib yet.  
// JIC, we should check BEFORE we attempt to add this close functionality
if(typeof Backbone.View.prototype.close === "undefined"){
	Backbone.View.prototype.close = function(){

	  // If you want to clean up anything before we start closing
	  if(this.beforeClose){
	  	this.beforeClose();
	  }

	  // Removes the elements added to the DOM
	  this.remove();

	  // Unbinds any other objects that might be bound to the view's actions
	  this.off();

	  // If you want to clean up anything after we're closed
	  if(this.afterClose){
	    this.afterClose();
	  }
	}
}