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
	charlotte = new Character("Charlotte", {color: "#00ff00"});
	lucy = new Character("Lucy", {color: "#000000"});
	westley = new Character("Westley",{color:"427af4"});
    n = new Character("");
    
    leftSide = new Position(0, .75, 0, 1);
    rightSide = new Position(750, 450, 1, 1);
    Center = new Position(0.5, 0.490, 0.5, 0.5);
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
		<character>, {image: <string>, position: right side} : used to draw a character at a given position.  In this lesson, westley, charlotte, and lucy are all characters
		menu: present choices to the player.  Each choice is associated with its own command (i.e. jump to a label)
	*/
	
	script = [
		label, "start",
		scene, "ClassroomInterior.jpg",
		westley, {image: "westley_normal.png", position: rightSide},
		//charlotte, {image: "charlotte_normal.png", position: leftSide},
		//lucy, {image: "lucy_normal.png", position: Center},
		westley, "Ok, so far we've talked about stocks on an individual basis.  But, we never really touched on Portfolios, have we?",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "I guess we found our lesson for today!  Let's get started!",
		label, "wario",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "A portfolio is a term used to denote one's investments and financial assets.  These be anything, such as Stocks, Bonds, or other miscellaneous investments.",
		westley, "Think of it like a folder, where an investor keeps any information on the things that she invested in!",
		westley, "For the purposes of this lesson, we've limited our scope of a portfolio to mainly stocks and bonds.  However, an investment can be anything that can grow in value.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "In fact, a portfolio can contain things such as foreign currency, real estate, or precious metals!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Basically speaking, all things in a portfolio should be able to grow in value.",
		westley, "The act of buying and selling stocks is called Building a Portfolio.",
		westley, "Moreover, building a portfolio should be unique to each investor.  Different investors will have different financial goals and different timespans to complete those goals, so they will have varying portfolios between the two.",
		
		westley, "Are you following me so far?",
		menu,
			["Are you following me so far?",
			"Yes, I got it",[jump, "nozomi"],
			"No, can you repeat it?", [jump, "wtfman"]
		],
		label, "wtfman",
		westley, {image: "westley_surprised.png", position: rightSide},
		westley, "Alright then, I'll repeat this part once more.  Pay attention!",
		jump, "wario",
		
		
		label, "nozomi",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Okay, good!  The main takeaway that you should have is that investors will have varying ways of building their portfolios.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "The style with which ones builds his portfolio is primarily dependent on two main factors: the individual's own Risk Tolerance and Time Horizon.",
		westley, "These two terms are personal, intrinsic traits associated with the investor.  When people build their portfolios, they're subconsciously building them with these factors in mind, even if they don't know it!",
		westley, "We'll start by examining the definition of Risk Tolerance, and how it relates to investing.",
		westley, {image: "westley_surprised.png", position: rightSide},
		westley, "Risk Tolerance is defined as the amount of risk that an investor is willing to tolerate.",
		westley, ".....",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Just kidding!  Jokes aside, Risk Tolerance is defined as the amount of variability in investment returns that the investor is willing to withstand.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "If an investment has a high variability, that means that there is a very large difference between the profits that could be obtained and the losses that could be incurred.",
		westley, "Basically, an investment with high variability is a high-risk, high-return investment.  The investor could make a ton of money, but he also stands to lose a ton should things go poorly.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "An investor with a high Risk Tolerance is willing to invest in high-risk investments, in the hopes that she will turn a huge profit if everything goes well!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "To help demonstrate this trait, I've enlisted the help of two of my friends.",
		label, "skit",
		westley, {image: "westley_surprised.png", position: rightSide},
		westley, "Let's introduce two investors",
		westley, {image: "westley_normal.png", position: rightSide},
		charlotte, {image: "charlotte_normal.png", position: leftSide},
		lucy, {image: "lucy_normal.png", position: Center},
		westley, "My friend Charlotte here is an investor with a low risk tolerance.  She prefers to play things safe whenever possible.",
		charlotte, {image: "charlotte_smile.png", position: leftSide},
		charlotte, "Hi!  Nice to meet you!",
		charlotte, {image: "charlotte_normal.png", position: leftSide},
		westley, "On the other hand, her friend Lucy is an investor with a high risk tolerance.  She loves to take risks and get messy!",
		lucy, {image: "lucy_smile.png", position: Center},
		lucy, "Pleased to make your acquaintance.",
		lucy, {image: "lucy_normal.png", position: Center},
		westley, "Both Lucy and Charlotte invested in the same company, X, and I'm going to have them act out how they react to the news that a company's stock has dropped significantly.",
		westley, {image: "westley_surprised.png", position: rightSide},
		westley, "*Ahem*  Hey!  Did you two hear the news?  X's stock just dropped in price!",
		westley, {image: "westley_normal.png", position: rightSide},
		charlotte, {image: "charlotte_worry.png", position: leftSide},
		lucy, {image: "lucy_worry.png", position: Center},
		charlotte, "What?  How can that be?  It appears that I've lost almost half of my initial investment!",
		lucy, "This is troubling news.  However, the Stock Market tends to fluctuate.  Maybe this is only a minor setback.",
		charlotte, {image: "charlotte_cry.png", position: leftSide}, 
		charlotte, "I don't think this is a regular market fluctuation here, Lucy.  X is tanking, and I don't want to get caught up in its bankruptcy.  I'm going to cut my losses and sell my shares now!",
		lucy, {image: "lucy_angry.png", position: Center},
		lucy, "I think you might be overreacting a bit.  X isn't doing so bad, so I think I'll just hold onto my shares.  I'll wait and see what happens next before panicking.",
		charlotte, {image: "charlotte_normal.png", position: leftSide},
		lucy, {image: "lucy_normal.png", position: Center},
		westley, "As you can see, Charlotte, the investor with a lower risk tolerance, was quick to sell her shares because she was uncomfortable with the variation in the stock price.",
		westley, "Lucy, on the other hand, has a higher risk tolerance, and chose to hold onto her shares in hopes that the price will rise later.  She was comfortable with the risks associated with keeping her shares!",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Let's see what happens next, shall we?",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "I just finished checking the news again; X just made it big and managed to acquire it's competitor Y inc!  It's stock price just skyrocketed!",
		lucy, {image: "lucy_smile.png", position: Center},
		lucy, "Oh, sweet!  I knew keeping my shares was a good idea!  I made four grand from this investment!",
		charlotte, {image: "charlotte_cry.png", position: leftSide},
		charlotte, "Darn, I shouldn't have been too quick to sell my shares!",
		lucy, {image: "lucy_normal.png", position: Center},
		lucy, "You shouldn't have panic-sold your shares.  I told you, the market fluctuates, remember?",
		charlotte, {image: "charlotte_angry.png", position: leftSide},
		charlotte, "Listen, Lucy, of course the market fluctuates.  Everyone knows that.  It just so happens that I just fluctuated out of four thousand dollars!",
		lucy, {image: "lucy_worry.png", position: Center},
		westley, {image: "westley_worry.png", position: rightSide},
		lucy, ".....",
		westley, ".....",
		charlotte, ".....",
		charlotte, "What, nobody here's a fan of old Sienfeld?",
		charlotte, {image: "charlotte_normal.png", position: leftSide},
		lucy, {image: "lucy_normal.png", position: Center},
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "As my friends demonstrated, some investments are truly high risk and high return.  Investors with a high risk tolerance are willing to hold onto their stocks when things look bad because they know that they might be able to make some money!",
		westley, {image: "westley_sad.png", position: rightSide},
		westley, "However, keep in mind that it's not always the best idea to hold onto a stock.  If things had played out differently, and company X went bankrupt, Lucy could have lost her entire investment.",
		lucy, "Yeah, it's important to invest to your own comfort zones.  Investing is always a risk, and if the risk seems to high, there's no shame in cutting your losses by selling your stocks!",
		
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Did this little skit help you understand Risk Tolerance?  Or would you like them to do the skit again?",
		menu, [
			"Would you like them to do this skit again?",
			"Yes please!", [jump, "fanservice"],
			"No thanks, I want to learn about Time Horizons now.", [jump, "plot"]
		],
		label, "fanservice",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Alright, looks like we're doing this skit again.  Once more, girls, from the top!",
		jump, "skit",
		
		label, "plot", 
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Alright, alright.  Now let's talk about Time Horizons.",
		label, "watanabe",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "An investor's Time Horizon is how much time an investor has to play the Stock Market.  In other words, it's a measure of how long an investor has to meet her investment goals.",
		westley, "In general, Time Horizons and Risk Tolerances are directly proportional.  An investor with a short Time Horizon will have a smaller Risk Tolerance, because she wants to protect her existing investments.",
		westley, "On the other hand, an investor with a long Time Horizon can afford to take more risks; if something goes wrong with her investment, she has plenty of time to make new investments that recuperate her losses!",
		westley, "As another example of this...",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Charlotte!  You've been investing for a while; how many years do you have left until retirement!",
		charlotte, {image: "charlotte_smile.png", position: leftSide},
		charlotte, "Why, I have only five more years until I have enough money to comfortably retire!~",
		charlotte, "Back in the day, I used to invest in a large amount of common stocks and IPOs.",
		charlotte, {image: "charlotte_normal.png", position: leftSide},
		charlotte, "However, nowadays I choose to invest my money in safer assets, such as bonds.  I'd hate to have to start all over from scratch because of a bad investment.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Charlotte has a small Time Horizon, and therefore constructed her portfolio with a smaller Risk Tolerance.",
		westley, "How about you, Lucy?",
		lucy, {image: "lucy_smile.png", position: Center},
		lucy, "Well, I just recently graduated from college, and managed to land my first job.",
		lucy, "I've started to put aside a small portion of my paycheck into a portfolio, in hopes that my investments will pay off in the late future, when I retire.",
		lucy, {image: "lucy_sad.png", position: Center},
		lucy, "Ideally, I don't want to make any bad investments.  However, given my current living expenses, I won't need any of the money that I put into my portfolio immediately.",
		lucy, {image: "lucy_normal.png", position: Center},
		lucy, "Therefore, I can afford a bad investment or two for now; I have plenty of time to make better ones!",
		westley, "Lucy has a larger Time Horizon, and is able to build her portfolio with a larger Risk Tolerance in mind.",
		
		westley, "Do you understand the relationship between Time Horizon and Risk Tolerance?",
		menu, [
			"Do you understand the relationship between Time Horizon and Risk Tolerance?",
			"Yes, I understand it", [jump, "ruby"],
			"No, can you repeat it?", [jump, "you"]
		],
		
		label, "you",
		westley, "Sure thing!",
		jump, "watanabe",
		label, "ruby",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Great!  That concludes this lesson!  Be sure to take the quiz associated with this lesson in order to test your understanding of the material!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "And thank you, Charlotte and Lucy, for being able to come help me out on such short notice!",
		lucy, {image: "lucy_smile.png", position: Center},
		lucy, "It was my pleasure, happy to be of help!",
		lucy, {image: "lucy_normal.png", position: Center},
		charlotte, {image: "charlotte_smile.png", position: leftSide},
		charlotte, "Any time, Westley!",
		charlotte, {image: "charlotte_normal.png", position: leftSide},
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

