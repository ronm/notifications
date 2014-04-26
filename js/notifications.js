(function($) { $(function() {

	// handle no support better
	if (!window.Notification) return false;
	
	var notify = function(message) {
			if ( Notification.permission === "granted" ) { 
				new Notification(message);
			}
		};
	
	var statuses = Drupal.settings.notifications.messages,
		messagesSelector = Drupal.settings.notifications.selector;
	
	if ( Notification.permission === "granted" ) { $(messagesSelector).css({ display: "none" }); }
	
	for(status in statuses) {
		if ( Object.prototype.toString.call( statuses[status] ) === '[object Array]' ) {
			for(message in statuses[status]) {
				notify(statuses[status][message]);
			}
		} else {
			notify(statuses[status]);
		}
	}

}) })(jQuery);