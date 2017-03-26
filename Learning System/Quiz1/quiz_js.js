(function() {
  var questions = [{
    question: "What benefits do shareholders have from owning shares?",
    choices: ["Owning a share of a company means they are owners of the company, complete with the benefits and risks that the company has","They can vote in shareholder meetings and obtain a part of the company's profits","Shareholders are entitled to the assets of the corporation, such as building space, furniture, and office supplies","Owning shares of a company will guarantee a job with said company"],
    correctAnswer: 1	// index in choices[]
  }, {
    question: "What benefits does a company have for selling stocks?",
    choices: ["It allows the company to raise money for starting new projects and growing the company", "The CEO and other executives get larger bonuses when stocks are sold", "The money earned from selling a stock is distributed among the employees of the company", "The company wishes to share its profits out of pure good will"],
    correctAnswer: 0
  }, {
    question: "What is the difference between the primary and secondary markets?",
    choices: ["The primary market refers to the group of people who wish to buy a stock, while the secondary market refers to the group of people selling the stock", "Primary market is when you buy a stock online, while secondary is when you buy in person", "Primary market is when you buy a stock in person, while secondary is where you buy online", "The Primary market is buying shares directly from the company, while the Secondary market is buying shares from another shareholder"],
    correctAnswer: 3
  }, {
    question: "True or False: if you own a majority of the shares of a company, your voting power at a shareholders meeting increases",
    choices: ["True","False"],
    correctAnswer: 0
  }, {
    question: "What makes a Bond different from a Stock?",
    choices: ["Bonds are just Stocks that are more expensive","Bonds are the physical certificates of the shares of a company","Bonds are a company's way of borrowing money, while Stocks are a company's way of selling partial ownership","Nothing: Stocks and Bonds are the same"],
    correctAnswer: 2
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
