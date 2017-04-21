(function() {
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
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
      $('#menu').show();
      setPlacement(1);
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
    selections[questionCounter] = + $('input[name="answer"]:checked').val();
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
  var numCorrectFirst = 0;
  var numCorrectSecond = 0;
  var numCorrectThird = 0;
  var numCorrectFourth = 0;
  var numCorrectFifth = 0;
  var numCorrectSixth = 0;
  var totalFirst = 0;
  var totalSecond = 0;
  var totalThird = 0;
  var totalFourth = 0;
  var totalFifth = 0;
  var totalSixth = 0;
  
  for(var i = 0; i < selections.length; i++){
    if(questions[i].topic === "First"){
      totalFirst++;
      if(selections[i] === questions[i].correctAnswer){
        numCorrectFirst++;
      }
    }
    if(questions[i].topic === "Second"){
      totalSecond++;
      if(selections[i] === questions[i].correctAnswer){
        numCorrectSecond++;
      }
    }
    if(questions[i].topic === "Third"){
      totalThird++;
      if(selections[i] === questions[i].correctAnswer){
        numCorrectThird++;
      }
    }
    if(questions[i].topic === "Fourth"){
      totalFourth++;
      if(selections[i] === questions[i].correctAnswer){
        numCorrectFourth++;
      }
    }
    if(questions[i].topic === "Fifth"){
      totalFifth++;
      if(selections[i] === questions[i].correctAnswer){
        numCorrectFifth++;
      }
    }
    if(questions[i].topic === "Sixth"){
      totalSixth++;
      if(selections[i] === questions[i].correctAnswer){
        numCorrectSixth++;
      }
    }
  }
  
/*
  
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        if(questions[i].topic === "Math"){
      numCorrectMath++;
    }
    if(questions[i].topic === "PopCulture"){
      numCorrectPopCulture++;
    }
    if(questions[i].topic === "History"){
      numCorrectHistory++;
    }
      }
    }
*/
    //score.append('You got ' + numCorrectMath + ' out of ' + totalMath + ' Math questions right, ' + numCorrectPopCulture + ' out of ' + totalPopCulture + ' Pop Culture references right, and ' + numCorrectHistory + ' out of ' + totalHistory + ' History questions right!!');
    score.append('Based on how you did on the placement tests, ');
  var percentage;
  
  percentage = numCorrectFirst/totalFirst;
  if(percentage == 1){
    score.append('you can skip Lesson 1, ');
    if( getMode() == "1" ) {
      setLesson(1,1);
      setQuiz(1,1);
    }
  }
  else{
    score.append('you should look at Lesson 1, ');
  }
  
  percentage = numCorrectSecond/totalSecond;
  if(percentage == 1){
    score.append('you can skip Lesson 2, ');
    if( getMode() == "1" ) {
      setLesson(2,1);
      setQuiz(2,1);
    }
  }
  else{
    score.append('you should look at Lesson 2, ');
  }
  
  percentage = numCorrectThird/totalThird;
  if(percentage == 1){
    score.append('you can skip Lesson 3, ');
    if( getMode() == "1" ) {
      setLesson(3,1);
      setQuiz(3,1);
    }
  }
  else {
    score.append('you should look at Lesson 3, ');
  }
  
  percentage = numCorrectFourth/totalFourth;
  if(percentage == 1){
    score.append('you can skip Lesson 4, ');
    if( getMode() == "1" ) {
      setLesson(4,1);
      setQuiz(4,1);
    }
  }
  else {
    score.append('you should look at Lesson 4, ');
  }
  
  percentage = numCorrectFifth/totalFifth;
  if(percentage == 1){
    score.append('you can skip Lesson 5, ');
    if( getMode() == "1" ) {
      setLesson(5,1);
      setQuiz(5,1);
    }
  }
  else {
    score.append('you should look at Lesson 5, ');
  }
  
  percentage = numCorrectSixth/totalSixth;
  if(percentage == 1){
    score.append('and you can skip Lesson 6. ');
    if( getMode() == "1" ) {
      setLesson(6,1);
      setQuiz(6,1);
    }
  }
  else {
    score.append('and you should look at Lesson 6. ');
  }
  if( getPlacement() == "0" ) {
    setPlacement(1);
  }
  return score;
  }
})();
