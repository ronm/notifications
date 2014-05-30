(function($) { $(function() {

	// handle no support better
	if (!window.Notification) {
		
		// handle no support
		
		return false;
	}
	
	var NotificationAuthorize = function() {
		Notification.requestPermission(function (permission) {
			if(!('permission' in Notification)) { Notification.permission = permission; }
			if (permission === "granted") { 
				successPerms();
				return true;
			} else { 
				failedPerms();
				return false;
			}
		})
	},
	$permissionButton = $("#edit-notifications-grant-access"),
	successPerms = function () { $permissionButton.addClass('success').html('Notifications On').prop('disabled', true); },
	failedPerms = function () { $permissionButton.addClass('warning').html('Notifications Off'); };
	
	if ( Notification.permission === "granted" ) { successPerms(); }
	else if ( Notification.permission === "denied" ) { failedPerms(); }
	else { $permissionButton.on("click", NotificationAuthorize); }
	
	
}) })(jQuery);