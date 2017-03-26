(function() {
  var questions = [{
    question: "What do the 52-week high and low refer to?",
    choices: ["The biggest change in price over the course of the last year","The index of stocks that have had large changes in their prices over the course of a year","The highest and lowest prices at which a stock has been traded over the last year","The highest and lowest values of the country's GDP over the course of a year"],
    correctAnswer: 2	// index in choices[]
  }, {
    question: "What is the relationship between a company name and a ticker symbol?",
    choices: ["A ticker symbol is a unique alphabetic name which identifies the stock of a company","The ticker symbol is the name that the company uses on all of its legal documents to refer to itself","The ticker symbol is the current price of a company's stock","There is no relationship between a company and a ticker symbol"],
    correctAnswer: 0 
  }, {
    question: "What does it mean if a company doesn't have a value printed under 'Dividends per Share' in a stock table?",
    choices: ["Every stock should have a value printed.  It's a typo","It means that the stock does not offer dividends","The stock offers dividends per share but does not wish to disclose that information","The company is participating in illegal embezzlment of funds"],
    correctAnswer: 1
  }, {
    question: "What is the Trading Volume of a Stock?",
    choices: ["Trading volume is the number of those stocks in circulation in total","The total number of shares traded for the day","The number of stocks remaining that can be bought by an investor","The limit of the number of stocks that can be traded that day"],
    correctAnswer: 1
  }, {
    question: "What does it mean for a stock to be 'up for the day'?",
    choices: ["Over the course of the day, the stock's price rose","Over the course of the day, the stock's price did not fall","Over the course of the day, The stock's price fell","Over the course of the day, the stock's price remained the same"],
    correctAnswer: 1
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function(e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if (quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function(e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function(e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function() {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function() {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if (questionCounter < questions.length) {
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if (questionCounter === 1) {
          $('#prev').show();
        } else if (questionCounter === 0) {

          $('#prev').hide();
          $('#next').show();
        }
      } else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>', {
      id: 'question'
    });

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
	
	var percentCorrect = numCorrect*100/questions.length;
	
	if(percentCorrect>90){
		score.append('You got a score of '+percentCorrect+'%!  Consider this Lesson cleared!');
		return score;
	}
	if(percentCorrect>50){
		score.append('You got a score of '+percentCorrect+'%.  While you did well enough, you may want to re-do this Lesson to get the concepts down');
		return score;
	}
	score.append('Aww geez, you got a score of '+percentCorrect+'%.  Please re-do this Lesson.');
    /*score.append('You got ' + numCorrect + ' questions out of ' +
      questions.length + ' right!!!');*/
    return score;
  }
})();
