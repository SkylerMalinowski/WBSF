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
	var size = getSize();
	var availableQuiz = [];
	for( quizNum = 1; quizNum <= size; quizNum++ ) {
		arr[i-1] = getQuiz(quizNum);
		if( arr[quizNum-1] == 1 )
			availableQuiz.push( quizNum );
	}
	
	// no available quizzes to retake
	if( availableQuiz.length == 0 )
		window.location.href = "../mainMenu.html";
	
	// give a requiz
	quizNum = getRandomInt(1,availableQuiz.length);
	quizNum = availableQuiz[quizNum-1];
	if( quizNum == 1 )
		window.location.href = "Quizzes/Quiz 1.html"
	else if( quizNum == 2 )
		window.location.href = "Quizzes/Quiz 2.html";
	else if( quizNum == 3 )
		window.location.href = "Quizzes/Quiz 3.html";
	else if( quizNum == 4 )
		window.location.href = "Quizzes/Quiz 4.html";
	else if( quizNum == 5 )
		window.location.href = "Quizzes/Quiz 5.html";
	else if( quizNum == 6 )
		window.location.href = "Quizzes/Quiz 6.html";
	else if( quizNum == 7 )
		window.location.href = "Quizzes/Quiz 7.html";
	else if( quizNum == 8 )
		window.location.href = "Quizzes/Quiz 8.html";
	else if( quizNum == 9 )
		window.location.href = "Quizzes/Quiz 9.html";
	else if( quizNum == 10 )
		window.location.href = "Quizzes/Quiz 10.html";
}

// checks all completed quizzes and then resets them so they can be retaken
function resetQuizzes() {
	var size = getSize();
	var flag = true;
	for( var i = 1; i <= size; i++ ) {
		// check if all passed quizes have been retaken
		if( getQuiz(i) == 1 ) {
			flag = false;
			break;
		}
	}
	if( flag == true ) {
		// reset each retaken quiz to taken state
		for( i = 1; i <= size; i++ ) {
			if( getQuiz(i) == 2 )
				setQuiz(i,1);
		}
	}
}

