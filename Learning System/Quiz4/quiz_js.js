(function() {
  var questions = [{
    question: "What is a Bull Market?",
    choices: ["A market where the economy is running objectively well","A market where agriculture is doing objectively well","A market where the market is doing poorly","A market where the fossil fuel industry is doing objectively poorly"],
    correctAnswer: 0	// index in choices[]
  }, {
    question: "In relation to the stock market, what does a Bubble refer to?",
    choices: ["The instance where one company's stock value dominates the index of its industry","A highly exaggerated bull market where stocks are traded for more than the value that they're actually worth","A desired instance where the prices of stocks are highly likely to increase","An instance where a small company is kicked out of the market because it has not grown enough."],
    correctAnswer: 1
  }, {
    question: "What is a Bear Market?",
    choices: ["A market where technology plays little to no part in facilitating","A market where too much money is invested in foreign companies","A market that is doing objectively poorly","Another name for a bull market"],
    correctAnswer: 2
  }, {
    question: "What is true about a Bear Market?",
    choices: ["Bear Markets are typically associated with stock market volatility","Bear Markets are a typically stable market","It is easier for investors to make money in a Bear Market due to predictable stock trends","A Bear Market will require the government to bail out banks and big businesses"],
    correctAnswer: 0 
  }, {
    question: "What is the measure for how well an economy is doing?",
    choices: ["Gross Foreign Product","Gross Domestic Project","Standard of Living","Gross Domestic Product"],
    correctAnswer: 3
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
