(function() {
  var questions = [{
	question: "How is the price of a share of a company evaluated?",
    choices: ["Value of the company / Number of shares outstanding","Value of the company / Number of motivated buyers of the stock","Value of the company / Number of motivated sellers of the stock","None of the above"],
    correctAnswer: 0,
	topic: "Sixth"
  },{
    question: "What has a higher risk: Common Stock or Preferred Stock?",
    choices: ["Preferred Stock.  It's preferred to have due to the higher risk and higher rewards","They're both equally risky","Common Stock.  If the company goes out of business, the investor could lose the entire invested amount"],
    correctAnswer: 2,	// index in choices[]
	topic: "Second"
  },{
	question: "What happens when one person buys a stock on the stock market?",
    choices: ["The person is buying a stock directly from the company","The person is buying a stock from another person who wishes to sell the stock","Nothing; the stock market is strictly for selling stocks, not buying","The person is buying a stock from a pool of existing stocks"],
    correctAnswer: 1 ,
	topic: "Third"
  },{
	question: "What do the 52-week high and low refer to?",
    choices: ["The biggest change in price over the course of the last year","The index of stocks that have had large changes in their prices over the course of a year","The highest and lowest prices at which a stock has been traded over the last year","The highest and lowest values of the country's GDP over the course of a year"],
    correctAnswer: 2,
	topic: "Fifth"
  }, {
    question: "What benefits do shareholders have from owning shares?",
    choices: ["Owning a share of a company means they are owners of the company, complete with the benefits and risks that the company has","They can vote in shareholder meetings and obtain a part of the company's profits","Shareholders are entitled to the assets of the corporation, such as building space, furniture, and office supplies","Owning shares of a company will guarantee a job with said company"],
    correctAnswer: 1,
	topic: "First"
  }, {
    question: "What is an IPO?  What does it stand for, and what is it?",
    choices: ["Individual Partial Ownership.  Refers to how much of a company's shares one owns","Initial Public Offering: refers to the first time a company sells its stock to the general public","Individual Private Ownership: refers to when one person owns the whole company"],
    correctAnswer: 1,
	topic: "Second"
  }, {
    question: "What is the difference between the primary and secondary markets?",
    choices: ["The primary market refers to the group of people who wish to buy a stock, while the secondary market refers to the group of people selling the stock", "Primary market is when you buy a stock online, while secondary is when you buy in person", "Primary market is when you buy a stock in person, while secondary is where you buy online", "The Primary market is buying shares directly from the company, while the Secondary market is buying shares from another shareholder"],
    correctAnswer: 3,
	topic: 'First'
  }, {
    question: "What is a Bear Market?",
    choices: ["A market where technology plays little to no part in facilitating","A market where too much money is invested in foreign companies","A market that is doing objectively poorly","Another name for a bull market"],
    correctAnswer: 2,
	topic: 'Fourth'
  }, {
	question: "What does Marsellus Wallace Look like?",
	choices: ["What","What","A Bitch","What","What"],
	correctAnswer: 2,
	topic: 'PopCulture'
  },{
	  question: "What is a stock market?",
    choices: ["A venue where buyers and sellers of shares meet to trade","A place where companies post their stock prices","A general location to buy and sell anything at all","A website with pertinent information regarding stock prices"],
    correctAnswer: 0,
	  topic: 'Third'
  },{
	  question: "What is the Trading Volume of a Stock?",
    choices: ["Trading volume is the number of those stocks in circulation in total","The total number of shares traded for the day","The number of stocks remaining that can be bought by an investor","The limit of the number of stocks that can be traded that day"],
    correctAnswer: 1,
	  topic: 'Fifth'
  },{
	  question: "In relation to the stock market, what does a Bubble refer to?",
    choices: ["The instance where one company's stock value dominates the index of its industry","A highly exaggerated bull market where stocks are traded for more than the value that they're actually worth","A desired instance where the prices of stocks are highly likely to increase","An instance where a small company is kicked out of the market because it has not grown enough."],
    correctAnswer: 1,
	topic: 'Fourth'
  },{
	  question: "Under what circumstance will a stock's price be likely to increase?",
    choices: ["When more people are looking to buy the stock than sell it","When the total value of a company increases","When a company has recieved particularly good business","All of the above"],
    correctAnswer: 3,
	topic: "Sixth"
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
	}
	else{
		score.append('you should look at Lesson 1, ');
	}
	
	percentage = numCorrectSecond/totalSecond;
	if(percentage == 1){
		score.append('you can skip Lesson 2, ');
	}
	else{
		score.append('you should look at Lesson 2, ');
	}
	
	percentage = numCorrectThird/totalThird;
	if(percentage == 1){
		score.append('you can skip Lesson 3, ');
	}
	else{
		score.append('you should look at Lesson 3, ');
	}
	
	percentage = numCorrectFourth/totalFourth;
	if(percentage == 1){
		score.append('you can skip Lesson 4, ');
	}
	else{
		score.append('you should look at Lesson 4, ');
	}
	
	percentage = numCorrectFifth/totalFifth;
	if(percentage == 1){
		score.append('you can skip Lesson 5, ');
	}
	else{
		score.append('you should look at Lesson 5, ');
	}
	
	percentage = numCorrectSixth/totalSixth;
	if(percentage == 1){
		score.append('and you can skip Lesson 6. ');
	}
	else{
		score.append('and you should look at Lesson 6. ');
	}
	return score;
  }
})();
