/* ************************************************************************** */
// Written by: Skyler Malinowski
// Tested by: Skyler Malinowski
// Debugged by: Skyler Malinowski
// Integrated by: Skyler Malinowski
/* ************************************************************************** */

// Description: resets Mode status in userDB and removes either
//   login or logout divs by tag depending on session id.
// Input: none (type: void)
// Output: none (type: void)
window.onload = function() {
	// checks user database for mode bit then sets it
	if( getMode() == "1" ) {
		setMode(0);	// take out of requiz mode
	}
	// get element data by id
	var LI = document.getElementById("LoginID");
	var LO = document.getElementById("LogoutID");
	// checks session id and sets div by id to blank
	if( window.name != '' ) {
		LI.innerHTML='';
	}
	else {
		LO.innerHTML='';
	}
}

// Description: resets the usrename and password input boxes to blank strings
// Input: none (type: void)
// Output: none (type: void)
function clear() {
	document.getElementById('name').value = '';
	document.getElementById('password').value = '';
}

// Description: user login to user database with error handling.
// Input: none (type: void)
// Output: none (type: void)
function myLogin() {
	// gets data from input fields by id
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

// Description: user logouts from user database with error handling.
// Input: none (type: void)
// Output: none (type: void)
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

// Description: user registers an account to the user database then logs-in
//   on success, with error handling
// Input: none (type: void)
// Output: none (type: void)
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

// Description: moderates user access to a given quiz via checking
//   user database for certain flags, with error handling
// Input: none (type: void)
// Output: none (type: void)
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

