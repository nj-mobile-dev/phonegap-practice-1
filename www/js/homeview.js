var HomeView = function(store) {
 
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findByName);
        this.el.on('click', '.change-pic-btn', this.changePicture);
    };
    
    this.render = function() {
	    this.el.html(HomeView.template());
	    return this;
	};
	
	this.findByName = function() {
		store.findByName($('.search-key').val(), function(employees) {
		        $('.employee-list').html(HomeView.liTemplate(employees));
		        if (self.iscroll) {
		            console.log('Refresh iScroll');
		            self.iscroll.refresh();
		        } else {
		            console.log('New iScroll');
		            self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
		        }
		    });	
	};
	
	this.changePicture = function() {
	    navigator.camera.getPicture(uploadPhoto,null,{sourceType:1,quality:60});
	};
	
	this.uploadPhoto = function(data) {
		// this is where you would send the image file to server
		 
		//output image to screen
	    cameraPic.src = "data:image/jpeg;base64," + data;
	};
 
    this.initialize();
 
}
 
HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());