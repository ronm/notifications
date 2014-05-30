(function($) { $(function() {

	// handle no support better
	if ( !window.Notification && !window.webkitNotifications && !navigator.mozNotification ) return false;
	
	var settings = Drupal.settings.notifications;

	if ( typeof settings && typeof settings.messages !== "undefined" ) {
	    var notify = function(title, options) {
	    		if ( Notification.permission === "granted" ) {
	    			if (window.Notification) {
		    			new Notification(title, options);
		    		} else if (window.webkitNotifications) {
			    		window.webkitNotifications.createNotification(options.icon, title, options.body);
		    		} else {
			    		navigator.mozNotification.createNotification(title, options.body, options.icon);
		    		}
	    		}
	    	},
	    	settings = Drupal.settings.notifications,
	    	statuses = settings.messages,
	    	messagesSelector = settings.selector,
	    	path = settings.path
	    	statusColors = { status: '/' + path + '/images/green.png', 
	    					 warning: '/' + path + '/images/blue.png', 
	    					 error: '/' + path + '/images/red.png' };
	    	
	    if ( Notification.permission !== "granted" ) { $(messagesSelector).css({ display: "block" }); }

	    for(status in statuses) {
	    	if ( Object.prototype.toString.call( statuses[status] ) === '[object Array]' ) {
	    		for(message in statuses[status]) {
	    			notify(status, { body : statuses[status][message], icon : statusColors[status] });
	    		}
	    	}
	    }
	}

}) })(jQuery);