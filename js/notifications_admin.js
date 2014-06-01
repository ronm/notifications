(function($) { $(function() {

	// handle no support better
	if (!window.Notification) {
		
		// handle no support
		
		return false;
	}
	
	var $notificationsForm = $( "#notifications-admin"),
		$notificationsTouched = $( "#notifications-grant-access-touched" ),
		$permissionButton = $("#edit-notifications-grant-access"),
		NotificationAuthorize = function() {
			Notification.requestPermission(function (permission) {
			
			if(!('permission' in Notification)) { Notification.permission = permission; }
			if (permission === "granted") { 
				successPerms();
				return true;
			} else { 
				failedPerms();
				return false;
			}
		});
	},
	successPerms = function () { 
		$permissionButton.addClass('success').html('Notifications On').prop('disabled', true);
		$notificationsTouched.val( 1 );
	},
	failedPerms = function () { $permissionButton.addClass('warning').html('Notifications Off'); };
	
	$notificationsTouched.val( 0 );
	
	if ( Notification.permission === "granted" ) { successPerms(); }
	else if ( Notification.permission === "denied" ) { failedPerms(); }
	else { $permissionButton.on("click", NotificationAuthorize); }
	
	
}) })(jQuery);