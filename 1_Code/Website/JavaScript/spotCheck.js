// Generates a random integer number on [min,max]
function getRandomInt( min, max )
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Determines a random quiz to give based upon completed quizes
// that have not been retaken already
function giveRequiz()
{
	// determine which quizzes are available to be retaken
	var quizNum;
	var availableQuiz = [];
	
	for( quizNum = 1; quizNum <= 7; quizNum++ )
	{
		if( getQuiz(quizNum) == "1" )
		{
			availableQuiz.push( quizNum );
		}
	};
	
	// no available quizzes to retake
	if( availableQuiz.length == 0 )
	{
		location.reload();
	}
	else {
		// give a requiz
		quizNum = getRandomInt(1,availableQuiz.length);
		quizNum = availableQuiz[quizNum-1];
		switch( quizNum ) {
			case 1:
				window.location="/Website/Learning_System/Quizzes/Quiz1.html";
				window.reload();
				break;
			case 2:
				window.location="/Website/Learning_System/Quizzes/Quiz2.html";
				window.reload();
				break;
			case 3:
				window.location="/Website/Learning_System/Quizzes/Quiz3.html";
				window.reload();
				break;
			case 4:
				window.location="/Website/Learning_System/Quizzes/Quiz4.html";
				window.reload();
				break;
			case 5:
				window.location="/Website/Learning_System/Quizzes/Quiz5.html";
				window.reload();
				break;
			case 6:
				window.location="/Website/Learning_System/Quizzes/Quiz6.html";
				window.reload();
				break;
			case 7:
				window.location="/Website/Learning_System/Quizzes/Quiz7.html";
				window.reload();
				break;
		}
	}
}

// checks all completed quizzes and then resets them so they can be retaken
function resetQuizzes()
{
	var flag = "true";
	
	for( var i = 1; i <= 7; i++ )
	{
		// check if all passed quizes have been retaken
		if( getQuiz(i) == "1" )
		{
			flag = "false";
			break;
		}
	};
	
	if( flag == "true" ) {
		// reset each retaken quiz to taken state
		for( var i = 1; i <= 7; i++ )
		{
			if( getQuiz(i) == "2" )
			{
				setQuiz(i,1);
			}
		};
	}
}

// serves a quiz to user
function spotCheck()
{
	setMode(1);	// put in requiz mode
	if( getPlacement() == "0" )
	{
		window.location="/Website/Learning_System/Quizzes/PlacementQuiz.html";
		window.reload();
	}
	else {
		giveRequiz();
	}
}

