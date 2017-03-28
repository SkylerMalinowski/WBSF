(function() {
  var questions = [{
    question: "What happens when one person buys a stock on the stock market?",
    choices: ["The person is buying a stock directly from the company","The person is buying a stock from another person who wishes to sell the stock","Nothing; the stock market is strictly for selling stocks, not buying","The person is buying a stock from a pool of existing stocks"],
    correctAnswer: 1	// index in choices[]
  }, {
    question: "What is a stock market?",
    choices: ["A venue where buyers and sellers of shares meet to trade","A place where companies post their stock prices","A general location to buy and sell anything at all","A website with pertinent information regarding stock prices"],
    correctAnswer: 0
  }, {
    question: "The stock market is a secondary market.  Does that mean that there is a fixed number of stocks in circulation?  Why or Why not?",
    choices: ["Yes. A secondary market means trades are done between shareholders who already own the stocks.","No.  A shareholder can split his shares into multiple ones of lesser value, creating new shares in circulation","Yes, stocks cannot be created or destroyed","No, a company can add or remove some of their own stocks from circulation engaging in stock buybacks or issuing new shares"],
    correctAnswer: 3
  }, {
    question: "What are traits of a good stock market?",
    choices: ["Large bid-ask spreads, Low liquidity","Small bid-ask spreads, Low liquidity","Small bid-ask spreads, high liquidity","Large bid-ask spreads, high liquidity"],
    correctAnswer: 2 
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  var konamiBool = false;
  var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
  $(document).keydown(function(e){
	  kkeys.push(e.keyCode);
	  if(kkeys.toString().indexOf(konami)>=0){
		  //$(document).unbind('keydown',arguments.callee);
		  $('#question').remove();
		  konamiBool = true;
		  kkeys = [];
		  var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
		$('#menu').show();
	  }
  });
  
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
	$('#menu').hide();
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
		$('#menu').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>', {
      id: 'question'
    });

	if(konamiBool){
		konamiBool = false;
		score.append('This is a debug message, intended to show a sample ending screen without taking the time to complete the quiz.  As a result, no results are able to be displayed.');
		return score;
	}
	
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
	score.append('Unfortunately, you got a score of '+percentCorrect+'%.  Please re-do this Lesson.');
    /*score.append('You got ' + numCorrect + ' questions out of ' +
      questions.length + ' right!!!');*/
    return score;
  }
})();
