/*	*************************************
Obtained online as part of the js-vine visual novel engine, meant to be used in
	conjunction with js-vine.js and the corresponding html file to play a visual novel.
script variable written by: Jack Aquino
tested by: Jack Aquino
integrated by: Jack Aquino
debugged by: Jack Aquino
****************************************** */
/* Declare variables for characters, positions, and text blocks here */
var script; // this variable will hold your script
var tyler;
var gavin;
var ellen;
var kyouya;
var n; // short for "narrator"
var photo;
var textBlock;

var leftSide;
var rightSide;
var upperCenter;
var rightTop;

/*
    This function must exist, and must have this name
*/
function prepareNovel()
{
    novel.imagePath = "images/"; // path to your image directory
    novel.audioPath = "audio/"; // path to your audio directory
    
    // initialize your characters, positions, and text blocks here
	anon = new Character("???", {color: "#f600ff"});
	westley = new Character("Westley",{color:"427af4"});
    n = new Character("");
    
    leftSide = new Position(0, .75, 0, 1);
    rightSide = new Position(750, 450, 1, 1);
    upperCenter = new Position(0.5, 0.3, 0.5, 0.5);
    rightTop = new Position(1, 0.1, 1, 0);
    
    photo = new Character("");  
    lionText = new TextBlock("myText");
    
    // and put your script commands into this array
	
	/*
		The script variable is a list, consisting of commands and strings, that define the behavior of the Visual Novel.
		The commands are as follows: 
		label : used for denoting a section of the code
		jump : used to run the script from a specific label
		scene : used to change the background image presentations
		<character>, {image: <string>, position: right side} : used to draw a character at a given position.  In this lesson, westley is the only character
		menu: present choices to the player.  Each choice is associated with its own command (i.e. jump to a label)
	*/
	
	script = [
		label, "start",
		scene, "ClassroomInterior.jpg",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Alright class.  And by class, I mean you, my only student.",
		westley, "Today we're going to answer the question: What Stocks are Valuable?",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Well, technically speaking, all stocks are worth something.  However, in this sense, we're going to figure out if a stock is worth investing in!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "First, let's examine what determine's a stock's worth.",
		label, "todokete",
		westley, "In general, the price of a stock is determined by the same factors that determine the price of just about anything else: the law of Supply and Demand.",
		westley, "In the case of stock, demand is modeled by the amount of motivated buyers of a stock; the number of people who wish to buy it.",
		westley, "On the other hand, supply is modeled by the number of motivated sellers, the number of people who wish to sell their stocks.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "If there are more people motivated to purchasing a stock, the price will go up, and if there are more people motivated to selling a stock, the price will go down!  Congratulations, you've mastered High School Economics 101!", 
		westley, {image: "westley_normal.png", position: rightSide}, 
		westley, "All joking aside, the price of a stock help determines the value of a corporation.", 
		westley, "At its most basic level, the value of a stock is determined by dividing the dollar value of the company, known as the Market Capitalization, with the number of Shares Outstanding, the number of shares that exist.",
		westley, "Market Capitalization is the sum of the assets that a company has, such as buildings, machinery, patents, and other capital, and the sum of its Future Cash Flows.", 
		westley, {image: "westley_smile.png", position: rightSide}, 
		westley, "Most companies, especially companies with public stocks, exist for one reason alone: to make a lot of money.  The money that a company is expecting to earn referred to as a Future Cash Flow.",
		westley, {image: "westley_sad.png", position: rightSide}, 
		westley, "Unfortunately, while the present capital of a company, or its book value, is easy to calculate, the Future Cash Flows of a company are a bit tough to pinpoint.", 
		westley, "In fact, the unpredictability of the Future Cash Flows of a company is what causes fluctuations in a stock's price!",
		westley, {image: "westley_normal.png", position: rightSide}, 
		westley, "The long and short of it is: if people think that the future cash flows of a company are substantial, then there will be more motivated buyers of that stock.  If the future cash flows are underwhelming, there will be more motivated sellers.",
		westley, "Do you understand the relationship between future cash flows and stock price?",
		menu, [
			"Do you understand future cash flows and stock price?",
			"Yeah, I got it", [jump, "nico"],
			"Nah, I don't got it", [jump, "nozomi"]
		],
		label, "nozomi",
		westley, "Alright, I'll repeat that section one more time for you.  Pay attention!",
		jump, "todokete",
		
		label, "nico", 
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Great!  Now, let's get to work on determining how to enumerate future cash flows.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "In order to do that, you have to understand the phrase 'time is money.'",
		westley, "It's more than just a phrase that people say in order to emphasize that time shouldn't be wasted.  A dollar today is not the same as a dollar in the future!",
		westley, "You see, any profits that a company will obtain in the future has to be Discounted into today's monetary terms.  This is due to factors such as inflation affecting the buying power of a dollar!",
		westley, {image: "westley_sad.png", position: rightSide},
		westley, "On that note, I have to apologize to any international individuals using this app.  My creators only programmed me to reference the currency of the United States of America.",
		westley, "In this context, feel free to replace 'dollar' with any currency you see fit.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Anyway, back to the topic at hand.  In order to convert a future dollar amount to a modern value, we must choose a Discount Rate, or a rate at which we estimate a future dollar equates to a modern one.",
		westley, "The discount rate is determined by a variety of factors, such as the cost of capital, the riskiness of the business in general, and how much money an investor could make if they did not invest at all, such as placing that money into a bank account and letting interest accrue over time!",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Although, here's a fun fact!  Let's say you choose not to invest in stocks, and instead place your money in your bank account.  The bank is still using your money to invest; your bank account is how a bank obtains its capital!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Of course, the bank always pays you back the money that they use, plus interest.  It's all in the terms and conditions of your bank account.  I won't go into too much detail about it here, but all you need to know is that money in a bank account is being invested as we speak.",
		westley, "Anyway, once an appropriate Discount Factor has been decided on, the hard part now arises: How much money will a company make within a certain time frame?",
		westley, {image: "westley_sad.png", position: rightSide},
		westley, "Again, there's no easy way to do this; estimating future cash flows is determined almost by sentiment and expectations, rather than by any logical rules or equations.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Fortunately, there's an easy-to-compute value that can help determine the future cash flows of a company: the Price to Earnings Ratio, or the P/E ratio!",
		westley, "The Price to Earnings ratio is the ratio of a Stock's Price vs the Earnings of the company, divided by the number of shares outstanding.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "For example, if the P/E ratio of a stock is 10x, that means that a company is currently valued at 10 times its current earnings.  Likewise, a company with a P/E ratio of 20x means that the company is valued at 20 times its current earnings.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "The higher the P/E ratio of a company, the more Future Cash Flow that company is expected to have!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Of course, the P/E value isn't the only method that analysts use to determine Future Cash Flows, but at least you know one of them now!",
		
		westley, "Did that all make sense to you?",
		menu,[
			"Did that all make sense to you?",
			"Yeah it did",[jump, "dr dre"],
			"No, can you repeat that please?", [jump, "snoop dogg"]
		],
		label, "snoop dogg",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "sure thing!",
		jump, "nico",
		label, "dr dre",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Great!  Now, to leave you with a few key notes to take away from this.",
		label, "mm",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "One: At the most fundamental level, the price of a stock is determined by the law of supply and demand.",
		westley, "Two: The value of a company isn't determined by stock price alone.  It's determined by stock price multiplied by the number of shares outstanding.",
		westley, "Three: While theoretically, only the future cash flows of a company should be affecting the price of a stock, in reality, a multitude of other factors, such as an investor's sentiment or attitudes, play a role in determining a stock's price.",
		westley, "And finally, four: While there are many theories that try to explain the price of a stock, there is no theory that explains everyting.",
		
		westley, "Would you like me to repeat those takeaways?",
		menu, [
			"Do you want to hear it again?",
			"Yes",[jump,"mm"],
			"No",[jump, "yeah"]
		],
		label, "yeah",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Great!  That concludes this lesson.",
		westley, "Hopefully it gives you enough info to make some wise decisions on which stocks to invest in.  Don't forget to take the quiz at the end in order to see how you did!",
		westley, "Take care now!"
		];
	
	/*
	script = [
		label, "start",
		scene, "ClassroomCorridor.png",
		audio, {src: "Class",format:["ogg"],loop:true,action: "play"},
		n, "...",
		n, "Where am I?",
		n, "The last thing I remember is that I was trying to learn about Stocks and Investing.",
		n, "All of a sudden, I found myself in some kind of school area.",
		anon, "It looks like I have a new student today!",
		anon, "Well, don't be shy; please, walk into my classroom.",
		scene, "ClassroomInterior.jpg",
		ellen, {image: "EllenBaker.png", position: leftSide},
		ellen, "So you must be the new student, am I correct?",
		
		label, "menu1",
		menu, [
			"What do you say?",
			"I guess I am", [jump, "great"],
			"Can someone explain where I am?", [jump, "explain"],
			"You look like an English teacher for some reason.", [jump, "newHorizon"]
		],
		
		label,"newHorizon",
		ellen, "Now whatever gave you that impression?",
		ellen, "While it's true that I did teach English, a lot of my students had trouble focusing on the material.",
		ellen, "Eventually, I got offered a higher paying job here, where I can teach stocks to people like yourself.",
		ellen, "Of course, it's only a temporary job.  My employers are looking for a better teacher right now.  Think of me like a substitute teacher!",
		jump, "next",
		
		label,"explain",
		ellen, "Why, look around you!  There's a chalkboard, a bunch of desks, and a teacher here.  Where else could you be but the academy!",
		jump, "next",
		
		label,"great",
		ellen,"Perfect, welcome to my classroom!  I'm sure you'll fit right in perfectly!",
		
		label, "next",
		ellen, "Anyway, since you're here, I might as well teach you everything I can about Stocks and Investing!",
		
		label, "menu2",
		menu, [
			"Now, What lesson would you like me to teach you?",
			"Lesson 1: What are Stocks?",[jump, "temp"],
			"Lesson 2: What Kinds of Stocks?",[jump,"temp"],
			"Lesson 3: How do stocks trade?",[jump,"temp"],
			"Lesson 4: What types of markets?",[jump,"temp"],
			"Lesson 5: How do I read Stock Tables?",[jump,"temp"],
			"Lesson 6: What Stocks are Valuable?",[jump, "temp"]
		],
		
		label, "temp",
		n, "This section of the code is to be completed later.  This is only a proof of concept, to show that a VN format could work for this project.",
		n, "We will update this later, as we see fit"
	
	
	];
	*/
	
	
	
	/*
    script = [
        label, "start",
        scene, "hills1.jpg",
        n, "It&rsquo;s a beautiful day at Montgomery Hill Park, where we meet Tyler the tourist, who is looking for Gavin the Guide.",
        tyler, {image: "worried1.png", position: leftSide},
        tyler, "Hey, Gavin, where are you?",
        gavin, {position: rightTop, image: "simple2.png"},
        tyler, {image: "simple1.png"},
        gavin, "Up here in the hills, Tyler!",
        tyler, "Please come down here. It&rsquo;s easier to talk with you.",
        gavin, {position: rightSide},
        gavin, "OK. That better?",
        tyler, "Much better, thanks!",
        
        label, "menu1",
        menu, [
            "So, what would you like to see?",
            "Dangerous animals", [jump, "wild"],
            "Not-so-dangerous animals", [jump, "tame"],
        ],
        
        label, "wild",
        scene, "hills2.jpg",
        tyler, {position: leftSide},
        gavin, {position: rightSide},
        photo, {image: "coyote.jpg", position: upperCenter},
        gavin, "There&rsquo;s a reason this area is called Coyote Valley.",
        tyler, "That is one mangy-looking coyote.",
        gavin, "Not what you expected from seeing the cartoons, is it?",
        gavin, "But his coloration does help camouflage him in summer.",
        photo, {visibility: "hidden"},
        lionText, {text: "Mountain Lion picture goes here",
            width: 0.5, color: "white", border: "1px solid black",
            backgroundColor: "#800",
            position: new Position(0.25, 0.3), align: "center"},
        tyler, "How come all I see is a bunch of words?",
        gavin, "Do <em>you</em> want to be close enough to a mountain lion to get a picture?",
        tyler, "Um, I guess not.",
        lionText, {visibility: "hidden"},
        gavin, "Mountain lions and coyotes are the two wildest animals out here.",
        jump, "The End",
        
        label, "tame",
        scene, "hills2.jpg",
        tyler, {position: leftSide},
        gavin, {position: rightSide},
        photo, {image: "cat_1988.jpg", position: upperCenter},
        tyler, "That&rsquo;s just a housecat!",
        gavin, "Yes, but there are plenty of them living here.",
        tyler, "Did they just wander away from home?",
        gavin, {image: "sad2.png"},
        gavin, "Some of them, yes. Others have been dumped in the hills by their owners, who don&rsquo;t want them any more.",
        tyler, {image: "angry1.png", say:
        "That&rsquo;s horrible!"},
        gavin, "I know. I don&rsquo;t see how people can be so heartless.",
        
        photo, {visibility: "hidden"},
        tyler, {image: "worried1.png"},
        gavin, {image: "simple2.png",
        say: "There&rsquo;s another animal you will find in the hills."},
        gavin, {image: "silence2.png"},
        photo, {image: "deer.jpg", visibility: "visible"},  
        gavin, "But be quiet, or you&rsquo;ll scare it away.",

        tyler, {image: "loving1.png",
        say: "Aww, that&rsquo;s really nice."},
        
        label, "The End",
        scene, {image: "hills1.jpg"},
        tyler, {image: "simple1.png", position: leftSide},
        gavin, {image: "simple2.png", position: rightSide},
        photo, {visibility: "hidden"},
        lionText, {
            width: 0.5, color: "white", border: "1px solid black",
            backgroundColor: "#800",
            position: new Position(0.25, 0.3), align: "center",
            visibility: "visible",
        text: "Gavin and Tyler images by Nicu Buculei, from <a href='http://openclipart.org' style='color:white'>OpenClipart.org</a>"},

        gavin, "That&rsquo;s it for the tour.",
        tyler, "Thanks, Gavin. I really enjoyed it."
    ];*/
}

