(function() {
	// if user is logged in, hide login options
	// else, hide logout
})();

// Catch a closing tab or tab reload
window.addEventListener("beforeunload", function (e) {
	var confirmationMessage = "\o/";
	(e || window.event).returnValue = confirmationMessage; //Gecko + IE
	return confirmationMessage;                            //Webkit, Safari, Chrome
});

function clear() {
	document.getElementById('name').value = '';
	document.getElementById('password').value = '';
}

function mLogin() {
	var name = document.getElementById('name').value;
	var pass = document.getElementById('password').value;
	var ret = login(name,pass);
	
	if( ret == window.name ) {
		alert( "Login Successful" );
		$('#Login').addClass('hide');
		$('#Logout').removeClass('hide');
	}
	else
		alert( ret );
}

function mLogout() {
	if( logout() == true ) {
		alert( "Logout Successful" );
		$('#Logout').addClass('hide');
		$('#Login').removeClass('hide');
	}
	else {
		alert( "Logout Failed" );
	}
}

function mReg() {
	var name = document.getElementById('name').value;
	var pass = document.getElementById('password').value;
	
	if( name === "" ) {
		alert( "Cannot leave username blank." );
	}
	else if( pass === "" ) {
		alert( "Cannot leave password blank." );
	}
	else {
		// Check user Database
		if ( addUser( name, pass ) == true  ) {
			alert( "Registration Successful" );
		}
		else {
			alert( "Username Already Exists" );
		}
	}
	clear();
}

