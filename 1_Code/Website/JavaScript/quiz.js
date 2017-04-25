/* ************************************************************************** */
// Written by: 		Skyler Malinowski, Jack Aquino
// Tested by: 		Skyler Malinowski, Jack Aquino
// Debugged by: 	Skyler Malinowski, Jack Aquino
// Integrated by: 	Skyler Malinowski
/* ************************************************************************** */

// Description: handles question and answers served to the user.
// Input: none (type: void)
// Output: none (type: void)
(function() {
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  var mode = getMode();

  //konami
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
      $('#exit').hide();
      $('#menu').show();
      setQuiz(quizNum,1);
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
    $('#exit').hide();
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
          if(mode == "1")
            $('#exit').hide();
          else
            $('#exit').show();
        } else if (questionCounter === 0) {
          $('#prev').hide();
          $('#next').show();
          if(mode == "1")
            $('#exit').hide();
          else
            $('#exit').show();
          $('#menu').hide();
        }
      } else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
        $('#exit').hide();
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
    score.append('This is a debug message, intended to show a sample ending screen without taking the time to complete the quiz. Ergo, no results are able to be displayed but the account will reflect this quiz as passed.');
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
    if( mode == "1" ) {
      setQuiz(quizNum,2);
    }
    else {
      setQuiz(quizNum,1);
    }
    return score;
  }
  if(percentCorrect>50){
    score.append('You got a score of '+percentCorrect+'%.  While you did well enough, you may want to re-do this Lesson to get the concepts down.  ');
  switch(quizNum){
    case 1:
      score.append('When re-reading this section, try to think about what benefits a company has to selling parts of itself to investors, and what benefits an investor has for giving his money to a company.');
      break;
    case 2:
      score.append('When re-reading this section, pay more attention to the differences between Common Stock and Preferred Stock.');
      break;
    case 3:
      score.append('When re-reading this section, think about the history of Stock Markets, and how stock markets compare to marketplaces in general.');
      break;
    case 4:
      score.append('Here is a helpful hint for you: Bull Markets and Bear markets got their names from how a Bull swipes upwards to attack, and how a Bear swipes downwards to attack.  Think about what these actions could be a metaphor for in context to the Stock Market');
      break;
    case 5:
      score.append('Be sure to pay closer attention to the example Stock Table while reading what each number represents.');
      break;
    case 6:
      score.append('Keep in mind that stocks, just like any other item that is bought and sold, adhere to the Law of Supply and Demand.');
      break;
    case 7:
      score.append('When re-reading this section, keep in mind that a portfolio is built with both Time Horizon and Risk Tolerance in mind, and portfolios differ from investor to investor based on what they hope to accomplish.');
      break;
    default:
      score.append('');
  }
    return score;
  }
  score.append('Unfortunately, you got a score of '+percentCorrect+'%.  Please re-do this Lesson.');
  switch(quizNum){
    case 1:
      score.append('When re-reading this section, try to think about what benefits a company has to selling parts of itself to investors, and what benefits an investor has for giving his money to a company.');
      break;
    case 2:
      score.append('When re-reading this section, pay more attention to the differences between Common Stock and Preferred Stock.');
      break;
    case 3:
      score.append('When re-reading this section, think about the history of Stock Markets, and how stock markets compare to marketplaces in general.');
      break;
    case 4:
      score.append('Here is a helpful hint for you: Bull Markets and Bear markets got their names from how a Bull swipes upwards to attack, and how a Bear swipes downwards to attack.  Think about what these actions could be a metaphor for in context to the Stock Market');
      break;
    case 5:
      score.append('Be sure to pay closer attention to the example Stock Table while reading what each number represents.');
      break;
    case 6:
      score.append('Keep in mind that stocks, just like any other item that is bought and sold, adhere to the Law of Supply and Demand.');
      break;
    case 7:
      score.append('When re-reading this section, keep in mind that a portfolio is built with both Time Horizon and Risk Tolerance in mind, and portfolios differ from investor to investor based on what they hope to accomplish.');
      break;
    default:
      score.append('');
  }
    /*score.append('You got ' + numCorrect + ' questions out of ' +
      questions.length + ' right!!!');*/
    return score;
  }
})();
