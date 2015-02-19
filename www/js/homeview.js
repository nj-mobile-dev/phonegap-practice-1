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
	
	this.changePicture = function(event) {
	    event.preventDefault();
	    if (!navigator.camera) {
	        app.showAlert("Camera API not supported", "Error");
	        return;
	    }
	    var options =   {   quality: 50,
	                        destinationType: Camera.DestinationType.DATA_URL,
	                        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
	                        encodingType: 0     // 0=JPG 1=PNG
	                    };
	 
	    navigator.camera.getPicture(
	        function(imageData) {
	            $('.employee-image', this.el).attr('src', "data:image/jpeg;base64," + imageData);
	        },
	        function() {
	            app.showAlert('Error taking picture', 'Error');
	        },
	        options);
	 
	    return false;
	};
 
    this.initialize();
 
}
 
HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());