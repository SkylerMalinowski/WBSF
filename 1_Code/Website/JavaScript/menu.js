window.onload = function() {
	if( getMode() == "1" ) {
		setMode(0);	// take out of requiz mode
	}
	var LI = document.getElementById("LoginID");
	var LO = document.getElementById("LogoutID");
	if( window.name != '' )
	{
		LI.innerHTML='';
	}
	else
	{
		LO.innerHTML='';
	}
}

/*
// Catch a closing tab or tab reload
window.addEventListener("beforeunload", function (e) {
	var confirmationMessage = "\o/";
	(e || window.event).returnValue = confirmationMessage;	//Gecko + IE
	return confirmationMessage;	//Webkit, Safari, Chrome
});
*/

// removes stored strings in input cells
function clear() {
	document.getElementById('name').value = '';
	document.getElementById('password').value = '';
}

// login user
function myLogin() {
	var uName = document.getElementById('name').value;
	var pass = document.getElementById('password').value;
	var ret = login(uName,pass);
	clear();
	if( ret != "User does not exist!" && ret != "Invalid password!" ) {
		alert( "Login Successful" );
		window.name = ret;
		spotCheck();
	}
	else {
		alert( ret );
		location.reload();
	}
}

// logout user
function myLogout() {
	if( logout() == "true" ) {
		window.name = "";
		location.reload();
		alert( "Logout Successful" );
	}
	else {
		alert( "Logout Failed" );
	}
}

// register user
function myReg() {
	var name = document.getElementById('name').value;
	var pass = document.getElementById('password').value;
	
	if( name == "" ) {
		alert( "Cannot leave username blank." );
	}
	else if( pass == "" ) {
		alert( "Cannot leave password blank." );
	}
	else {
		// Check user Database
		if ( reg( name, pass ) == "true"  ) {
			alert( "Registration Successful" );
			myLogin();
		}
		else {
			alert( "Username Already Exists" );
		}
	}
	clear();
}

function quizLock( quizNum ) {
	if( window.name != '' ) {
		if( getLesson(quizNum) == "1" ) {
			switch( quizNum ) {
				case 1:
					window.location.href = "/Website/Learning_System/Quizzes/Quiz1.html";
					break;
				case 2:
					window.location.href = "/Website/Learning_System/Quizzes/Quiz2.html";
					break;
				case 3:
					window.location.href = "/Website/Learning_System/Quizzes/Quiz3.html";
					break;
				case 4:
					window.location.href = "/Website/Learning_System/Quizzes/Quiz4.html";
					break;
				case 5:
					window.location.href = "/Website/Learning_System/Quizzes/Quiz5.html";
					break;
				case 6:
					window.location.href = "/Website/Learning_System/Quizzes/Quiz6.html";
					break;
				case 7:
					window.location.href = "/Website/Learning_System/Quizzes/Quiz7.html";
					break;
			}
		}
		else {
			alert("Please complete the required reading first.");
		}
	}
	else
	{
		alert("Please login first.");
	}
}

