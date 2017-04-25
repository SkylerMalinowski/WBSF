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
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Now, it's time for a lesson about the Bulls and the Bears!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Relax, I'm not going to make you learn about those animals.  Instead, we're going to learn about two states of the market named after those animals!",
		westley, "you see, investors have differing opinions and expectations about the market.  Optimistic investors believe that a stock's value will increase, and they are willing to buy more of a stock at a higher price in order to benefit from it.",
		westley, {image: "westley_sad.png", position: rightSide},
		westley, "On the other hand, pessimistic investors believe that a stock price will go down, and will sell their stocks in order to minimize their losses.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "As differring as these opinions may be, there is no 'right' way to interpret the market.  The market has its ups and downs; sometimes the optimists are right, and the stock will do well.  Other times, the pessimists are right, and the stock will fall.",
		westley, "The difference between optimists and pessimists is what defines a Bull Market and a Bear Market.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Let's start off by examining a bull market.",
		label, "chicago",
		scene, "Charging_Bull.jpg", //http://c8.alamy.com/comp/DACF1C/charging-bull-by-arturo-di-modica-wall-street-bull-manhattan-nyc-usa-DACF1C.jpg
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Aah, the statue of the charging bull in the Financial District in NYC.  The perfect place for me to explain a bull market.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "A bull market occurs when optimists dominate, and are looking to buy more stocks because they believe that the stock prices will go up.",
		westley, "When there are a lot more people willing to buy a stock, the demand for that stock increases, causing the price to go up!",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "You see, the law of supply and demand dictates that as demand increases, price will go up!  So in a way, the optimists themselves are helping the stock price go up!",
		westley, "In a bull market, the economy is running objectively well; people are finding jobs, unemployment is low, and the economy, measured by the country's Gross Domestic Product (GDP), is growing.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Picking stocks is a bit easier during a bull market, because everything seems like a good investment.",
		westley, {image: "westley_sad.png", position: rightSide},
		westley, "However, a bull market cannot last forever.  A bull market that lasts too long can cause a stock price to be overvalued.",
		westley, "In other words, the optimists will have too high expectations for the stock, and are willing to pay more than how much the stock will actually be worth.",
		westley, "A severe form of a Bull Market is known as a Bubble, where a stock price rises not because of the success of the company, but through the optimistic sentiment that the stock price will increase.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Bubbles aren't exclusive to stocks; they occur simply when something becomes overvalued because people want them.",
		westley, "A drastic example of a bubble can date all the way back to Dutch Tulipmania of the 1600s, where the price of a tulip bulb costed more than a house!",
		westley, "The housing bubble of 2008 is a more recent bubble, where houses were priced higher than they were actually worth.",
		westley, "If you want a more tangible example of a bubble, look at a video game release; in general, a new video game costs upwards of $59, but if the game is bad, it's price drops down to around $30 secondhand from Gamestop!",
		westley, {image: "westley_angry.png", position: rightSide},
		westley, "Yes, bubbles exist in the Video Game indutry, too.  Word of advice: wait a few months before buying a single player game for the Wii-U.  The price will go down eventually.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "The important part is that a bubble will eventually pop, which is not a fun event for anyone.",
		westley, "Bubbles pop when reality catches up with overinflated stock prices.  People will rush to sell their stocks, which causes the price to plummet.",
		westley, {image: "westley_sad.png", position: rightSide},
		westley, "In some cases, people may feel too cautious to invest in that company again, so the company will suffer as well.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "The moral of this story is to be cautious of an investment that seems too much like a good deal.", 
		westley, "So, do you understand bull markets and bubbles now?",
		menu, [
			"Do you understand bear markets and bubbles?",
			"Yes, I understand them just fine, thanks.", [jump, "thumper"],
			"No, can you repeat this section for me again?", [jump, "olaf"]
		],
		label, "olaf",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Sure thing!  I know it's a lot of information to take in, so try to take it slow, maybe time your mouse clicks a little slower to read through it all!",
		jump, "chicago",
		label, "thumper",
		westley, "Good!  Now, let's move onto the Bear Markets!  Back to the classroom for this one!",
		label, "imposter",
		scene, "ClassroomInterior.jpg",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "A bear market is the opposite of a bull market.  In this case, pessimists dominate, and the massive amount of people selling their shares causes the prices to drop.",
		westley, "All the people trying to sell their stocks causes the supply of that stock to increase.  The law of Supply and Demand causes the price of something with a large supply to drop in price.",
		westley, "Informally, a Bear Market is defined as a 20% drop in broad indexes.  In a Bear Market, the economy might be close to a recession.  Unemployment rises, corporate profits fall, and GDP drops as well.",
		westley, {image: "westley_sad.png", position: rightSide}, 
		westley, "Stocks are harder to choose in a Bear Market because everything seems like a bad investment.  A lot of people would rather sit on the sidelines until they feel as if the bear market is wearing off, and a bull market is starting.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Bear markets are usually associated with stock market volatility.  Investors fear the losses from investments more than they appreciate the potential gains from it.",
		westley, "This makes investors act less rationally, and may panic-sell their stocks in an attempt to minimize their losses.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "On the other hand, some people may try to benefit from a Bear Market, as the massive amount of people selling their stocks means that stocks are cheaper to purchase.",
		westley, "Think of it like buying a used video game; you're willing to buy it when its price is lower.  However, instead of buying a game, you're buying a stock!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Rational investors, the ones who can determine which stocks are being undervalued in a bear market, are the ones who can make a lot of money over long time horizons.",
		
		westley, "Do you understand the general gist of what a Bear Market is now?",
		menu, [
			"Do you understand what a bear market is?",
			"Yeah, I understand it", [jump, "ivysaur"],
			"No, I don't understand it, can you repeat it?", [jump, "ditto"],
			"Yeah, I understand, but where did they get the names 'bull' and 'bear' from?", [jump, "bulbasaur"]
		],
		label, "ditto",
		westley, "sure, I'll repeat that last section for you.",
		jump, "imposter",
		label, "bulbasaur",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Haha, I wondered that too!  It didn't seem too important at the time, but I found a neat tidbit of trivia about it that you might like",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "It may have to do with the way that bulls and bears attack their foes.",
		westley, "You see, a bull will attack by thrusting its horns up.  This reflects a bull market being a rise in the economy.",
		westley, "Meanwhile a bear attacks by swiping down, which symbolizes the fall of an economy.",
		westley, "I honestly don't have the answer to that question, but I'm sure it's out there on Google somewhere!",
		
		label, "ivysaur", 
		westley, "With that, this lesson is now complete!  It's a bit of a shorter lesson than the rest of them, but that's really all the lesson plan had for me!",
		westley, "Don't forget to take the lesson quiz to see if you understood these concepts!  Take care now!"
		
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

