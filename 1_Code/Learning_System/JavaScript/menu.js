window.onload = function () {
	if( getMode() == "1" )
		setMode(0);	// take out of requiz mode
	var LI = document.getElementById("LoginID");
	var LO = document.getElementById("LogoutID");
	if( window.name == '' )
		LO.innerHTML='';
	else
		LI.innerHTML='';
};
/*
// Catch a closing tab or tab reload
window.addEventListener("beforeunload", function (e) {
	var confirmationMessage = "\o/";
	(e || window.event).returnValue = confirmationMessage;	//Gecko + IE
	return confirmationMessage;	//Webkit, Safari, Chrome
});
*/
// Generates a random integer number on [min,max]
function getRandomInt( min, max ) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Determines a random quiz to give based upon completed quizes
// that have not been retaken already
function giveRequiz() {
	// determine which quizzes are available to be retaken
	var quizNum;
	var availableQuiz = [];
	for( quizNum = 1; quizNum <= 6; quizNum++ ) {
		if( getQuiz(quizNum) == "1" )
			availableQuiz.push( quizNum );
	}
	
	alert( "availableQuiz.length = " + availableQuiz.length );
	// no available quizzes to retake
	if( availableQuiz.length === 0 ) {
		location.reload();
	}
	else {
		// give a requiz
		quizNum = getRandomInt(1,availableQuiz.length);
		alert( "Random Num = " + quizNum );		//* debug
		quizNum = availableQuiz[quizNum-1];
		alert( "quizNum = " + quizNum );		//* debug
		if( quizNum == 1 )
			window.location.href = "/WBSF-master/1_Code/Learning_System/Quizzes/Quiz 1.html";
		else if( quizNum == 2 )
			window.location.href = "/WBSF-master/1_Code/Learning_System/Quizzes/Quiz 2.html";
		else if( quizNum == 3 )
			window.location.href = "/WBSF-master/1_Code/Learning_System/Quizzes/Quiz 3.html";
		else if( quizNum == 4 )
			window.location.href = "/WBSF-master/1_Code/Learning_System/Quizzes/Quiz 4.html";
		else if( quizNum == 5 )
			window.location.href = "/WBSF-master/1_Code/Learning_System/Quizzes/Quiz 5.html";
		else if( quizNum == 6 )
			window.location.href = "/WBSF-master/1_Code/Learning_System/Quizzes/Quiz 6.html";
		}
}

// checks all completed quizzes and then resets them so they can be retaken
function resetQuizzes() {
	var flag = true;
	for( var i = 1; i <= 6; i++ ) {
		// check if all passed quizes have been retaken
		if( getQuiz(i) == "1" ) {
			flag = false;
			break;
		}
	}
	if( flag == true ) {
		// reset each retaken quiz to taken state
		for( i = 1; i <= size; i++ ) {
			if( getQuiz(i) == "2" )
				setQuiz(i,1);
		}
	}
}

// serves a quiz to user
function spotCheck() {
	setMode(1);	// put in requiz mode
	alert( "getPlacement() = " + getPlacement() );
	if( getPlacement() == "0" ) {
		window.location.href = "/WBSF-master/1_Code/Learning_System/Quizzes/Placement Quiz.html";
	}
	else {
		giveRequiz();
	}
}

// removes stored strings in input cells
function clear() {
	document.getElementById('name').value = '';
	document.getElementById('password').value = '';
}

// login user
function mLogin() {
	var name = document.getElementById('name').value;
	var pass = document.getElementById('password').value;
	var ret = login(name,pass);
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
function mLogout() {
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
		if ( reg( name, pass ) == "true"  ) {
			alert( "Registration Successful" );
			mLogin();
		}
		else {
			alert( "Username Already Exists" );
		}
	}
	clear();
}

function quizLock( quizNum ) {
	if( getLesson(quizNum) == "1" ) {
		switch( quizNum ) {
			case 1:
				window.location.href = "/WBSF-master/1_Code/Learning_System/Quizzes/Quiz 1.html";
				break;
			case 2:
				window.location.href = "/WBSF-master/1_Code/Learning_System/Quizzes/Quiz 2.html";
				break;
			case 3:
				window.location.href = "/WBSF-master/1_Code/Learning_System/Quizzes/Quiz 3.html";
				break;
			case 4:
				window.location.href = "/WBSF-master/1_Code/Learning_System/Quizzes/Quiz 4.html";
				break;
			case 5:
				window.location.href = "/WBSF-master/1_Code/Learning_System/Quizzes/Quiz 5.html";
				break;
			case 6:
				window.location.href = "/WBSF-master/1_Code/Learning_System/Quizzes/Quiz 6.html";
				break;
		}
	}
	else {
		alert("Please complete the required reading first.");
	}
}
