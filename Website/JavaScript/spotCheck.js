// Generates a random integer number on [min,max]
function getRandomInt( min, max ) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Determines a random quiz to give based upon completed quizes
// that have not been retaken already
function giveRequiz() {
	alert( "giveRequiz()" );		//* debug
	// determine which quizzes are available to be retaken
	var quizNum;
	var availableQuiz = [];
	for( quizNum = 1; quizNum <= 10; quizNum++ ) {
		if( getQuiz(quizNum) == "1" ) {
			availableQuiz.push( quizNum );
		}
	}
	
	alert( "availableQuiz.length = " + availableQuiz.length );
	// no available quizzes to retake
	if( availableQuiz.length == 0 ) {
		location.reload();
	}
	else {
		// give a requiz
		quizNum = getRandomInt(1,availableQuiz.length);
		alert( "Random Num = " + quizNum );		//* debug
		quizNum = availableQuiz[quizNum-1];
		alert( "quizNum = " + quizNum );		//* debug
		if( quizNum == 1 ) {
			window.location.href = "/Website/Learning_System/Quizzes/Quiz 1.html";
		} else if( quizNum == 2 ) {
			window.location.href = "/Website/Learning_System/Quizzes/Quiz 2.html";
		} else if( quizNum == 3 ) {
			window.location.href = "/Website/Learning_System/Quizzes/Quiz 3.html";
		} else if( quizNum == 4 ) {
			window.location.href = "/Website/Learning_System/Quizzes/Quiz 4.html";
		} else if( quizNum == 5 ) {
			window.location.href = "/Website/Learning_System/Quizzes/Quiz 5.html";
		} else if( quizNum == 6 ) {
			window.location.href = "/Website/Learning_System/Quizzes/Quiz 6.html";
		}
}

// checks all completed quizzes and then resets them so they can be retaken
function resetQuizzes() {
	alert( "resetQuizzes()" );		//* debug
	var flag = "true";
	for( var i = 1; i <= 10; i++ ) {
		// check if all passed quizes have been retaken
		if( getQuiz(i) == "1" ) {
			flag = "false";
			break;
		}
	}
	if( flag == "true" ) {
		// reset each retaken quiz to taken state
		for( var i = 1; i <= 10; i++ ) {
			if( getQuiz(i) == "2" ) {
				alert("setQuiz(i,1)");		//* debug
				setQuiz(i,1);
			}
		}
	}
}

// serves a quiz to user
function spotCheck() {
	alert( "spotCheck()" );		//* debug
	setMode(1);	// put in requiz mode
	if( getPlacement() == "0" ) {
		window.location.href = "/Website/Learning_System/Quizzes/Placement Quiz.html";
	}
	else {
		giveRequiz();
	}
}

