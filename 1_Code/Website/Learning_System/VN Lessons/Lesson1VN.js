/*
    Fill this array with a list of names of images
    to be pre-loaded.
*/
var preload = [
  "ClassroomCorridor.png","EllenBaker.png",
  "ClassroomInterior.jpg","kyouya_neutral.png",
  "kyouya_happy.png"
];

/*
    This section pre-loads your images.
    Don't change it unless you know what you're doing.
*/
var preloadObj = new Array(preload.length);
for (var i = 0; i < preload.length; i++)
{
    preloadObj[i] = new Image();
    preloadObj[i].src = "images/" + preload[i];
}

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
	
		A NOTE FROM JACK:
		When writing the script, be mindful of commas.  you'll need them
	
	*/
	
	script = [
		label, "start",
		scene, "ClassroomInterior.jpg",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Hello!  Welcome to my classroom.  My name is Westley, and I'm going to teach you some of the basics about the stock market!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "For this Lesson, we'll be discussing what Stocks are, as well as dismantling any misconceptions that you might have about them.",
		westley, "Before we start, let me ask you something: what do you think a Stock is?",
		
		label, "question1",
		menu, [
			"What do you think a Stock is?",
			"Ownership of a Company", [jump, "partial"],
			"A claim on a company's assets and earnings",[jump,"partial"],
			"I have no idea what a Stock is",[jump,"clueless"]
		],
		
		label, "clueless",
		westley, {image: "westley_sad.png",position: rightSide},
		westley, "No idea, huh?  That's a shame.",
		westley, {image: "westley_smile.png",position:rightSide},
		westley, "But that's okay!  We're all here to learn!",
		jump, "continue1",
		
		label,"partial",
		westley, {image: "westley_surprised.png",position: rightSide},
		westley, "I see.  Well, technically, you're not wrong, but you're not 100% right either.  There's a little bit more to it than that.",
		jump, "continue1",
		
		label,"continue1",
		westley, {image: "westley_normal.png",position: rightSide},
		westley,"A Share of a company can be thought of as partial ownership of a company.  The word 'partial' is key here, as that is what separates a shareholder from an owner.",
		westley,"You see, if a company were to go bankrupt, all of its assets will be sold to pay off any debts that the company has.  If those assets aren't enough to pay back all debts, the assets of the owner are sold until all debts have been paid off.",
		westley, {image: "westley_worry.png",position: rightSide},
		westley, "If owning a share made you an owner of a company, then you would be partially responsible for a company's debts.",
		westley, {image: "westley_cry.png",position: rightSide},
		westley, "If the company goes bankrupt, your personal property might be siezed to help pay it off!",
		westley, {image: "westley_normal.png",position: rightSide},
		westley, "Luckily, that's not the case.  Legally speaking, shareholders are separate from owners.  The only thing they risk when investing is the initial amount of money that they spent on the stocks!",
		westley, "Does this all make sense to you?",
		label, "question2",
		menu, [
			"Does this all make sense to you?",
			"Yeah, I think I got it",[jump, "next"],
			"No, can you please explain it once more?",[jump, "text1"]
		],
		
		label, "text1",
		westley, "Sure thing.  I'll be happy to repeat it!",
		jump, "continue1",
		
		label,"next",
		westley, {image: "westley_smile.png",position: rightSide},
		westley, "Great!  Just remember, a share is only partial ownership of a company!",
		westley, {image: "westley_normal.png",position: rightSide},
		westley, "A company will sell shares of itself in order to generate revenue, which they can then use to fund their projects and growth.",
		westley, "In practice, it's important to think of a share as an investment into the company.  When you buy a share, you give a sum of money to a company, which they will use for their own projects and development.",
		westley, "The hope is that as the company grows, so will the value of its shares.",
		westley, "If a lot of a company's capital, or its money and resources available for use, comes in the form of sold shares, it's important for a company to pay attention to the wants and concerns of shareholders",
		westley, "Every now and then, a company hosts what are known as Shareholder Meetings, where company executives update their shareholders on any progress.",
		westley, {image: "westley_surprised.png", position: rightSide},
		westley, "Sometimes, shareholders may even get to vote on major company decisions, such as who the next comapny executives will be!  They can get very exciting",
		westley, "Remember how I mentioned that a share is an investment in the company?  That comes into play at these Shareholders meetings.  The more shares you have, the more invested you are, and therefore, the more power your voice will hold at these meetings.",
		westley, {image: "westley_normal.png",position: rightSide},
		westley, "Lets take a look at one now.",
		scene, "WalmartShareholder.jpg",
		westley, {image: "westley_smile.png",position: rightSide},
		westley, "Aah, a shareholder meeting for WalMart, one of the largest superstores in North America!  I've gotta admit, this is my kind of scene!",
		westley, {image: "westley_surprised.png",position: rightSide},
		westley, "What's that?  This seems a lot like a bit much for a shareholders meeting?",
		westley, "Well, different corporations hold their meetings differently.  WalMart, for example, hosts elaborate parties for anyone that owns its stock.  If you want an invite, just invest in a stock!",
		westley, {image: "westley_normal.png",position: rightSide},
		westley, "Most companies, on the other hand, host more private shareholders meetings, where only the investors with a significant amount of shares are invited.",
		westley, "Something along the lines of...",
		scene, "Boring_Shareholder.jpg",
		westley, {image: "westley_normal.png",position: rightSide},
		westley, "A scene like this.  Most shareholders meetings are like these, more similar to business presentations than parties.",
		westley, "The shareholders that go to these meetings are the ones with a significant investment in the company.  They want to ensure that the company succeeds, so they come to these meetings to get updates on how things are going.",
		westley, "We should probably head back to the classroom now.",
		scene, "ClassroomInterior.jpg",
		westley, {image: "westley_normal.png",position: rightSide},
		westley, "So, do you understand how being a shareholder works?",

		menu,[
			"Do you understand how being a shareholder works?",
			"Yeah, I got it", [jump, "primarysecondary"],
			"No, can you repeat that", [jump, "text2"],
		],
		label, "text2",
		westley, "Sure thing.  I'll be happy to repeat it!",
		jump, "next",
		
		label, "primarysecondary",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Great!  Onto the next topic!  We're making some really good progress here.",
		label, "uhh",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Now, I have to explain an important distinction between Primary and Secondary Markets.",
		westley, "You see, when a company issues a stock in order to raise money, they sell that stock to an investor.",
		westley, "However, it's common for stocks to trade hands frequently; this investor can sell that same stock to another investor, if she wishes to.",
		westley, "Thus, it's important to distinguish between a stock being sold when the company sells it to an investor, and when an investor sells it to another investor.  This is the difference between Primary and Secondary markets.",
		westley, "The Primary market is where the investor purchases the stock directly from the company issuing the stock.",
		westley, "On the other hand, the Secondary Market is where the investor purchases a stock from another investor.",
		westley, "Most stock trades are done on the secondary market.  However, I'll save that information for another lesson.",
		westley, "So, do you understand the difference between primary and secondary markets?",
		menu, [
			"Do you understand the difference between primary and secondary markets?",
			"Yes", [jump, "bonds"],
			"No, can you repeat it for me, senpai?", [jump, "argh"]
		],
		label, "argh",
		westley, {image: "westley_blush.png", position: rightSide},
		westley, "Senpai?  Geez, who wrote this dialogue.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Just kidding, we know its some guy who's really into anime.  Anyway, let me repeat that last section for you!",
		jump, "uhh",
		
		label, "bonds",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Great!  Now time for the last thing that I wanna go over this lesson: Bonds.",
		label,"jamesbond2",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "As it turns out, stocks aren't the only things that you can invest your money in.",
		westley, "Bonds are a bit different than stocks; rather than an ivnestment, a bond can be thought of as a loan to a company.",
		westley, "When you buy a bond, you are entitled to the amount that the bond was worth, plus a little bit of interest, similar to loans offered by banks.",
		westley, {image: "westley_sad.png", position: rightSide},
		westley, "If the company in question goes bankrupt, any bonds issued by the company are considered a part of its debts.",
		westley, "Remember how I mentioned that a company will sell its assets to pay off its debts?  In the event of bankrupcy, the companys assets will be sold in order to pay off all issued bonds.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "So bondholders don't have to worry about losing much if the company goes out of business!  Bonds are a lot less risky than Stocks are!",
		westley, {image: "westley_angry.png", position: rightSide},
		westley, "If only the bonds had a higher payout.  You see, since there's less risk involved in Bonds, there's a smaller reward associated with them as well.",
		westley, {image: "westley_normal.png",position: rightSide},
		westley, "If you want to make a lot of money through investing, you have to be willing to take risks.  If you're careful with your investments, you should be able to come out ahead in the stock market!",
		westley, "So, did you understand everything okay?",
		menu, 
		[
			"Do you understand?",
			"Yeah, thanks a bunch!",[jump, "ending"],
			"I still don't get bonds.",[jump, "jamesbond"]
		],
		label,"jamesbond",
		westley, "Alright, let me explain bonds one more time.",
		jump, "jamesbond2",
		label,"ending",
		westley, {image: "westley_smile.png",position: rightSide},
		westley, "In that case, that just about wraps up this lesson!  I'll still be here if you ever want me to explain this stuff again.",
		westley, {image: "westley_normal.png",position: rightSide},
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, "Take care now!",
		westley, {image: "westley_surprised.png",position: rightSide},
		westley, "Oh?  You're still here?  Looks like you had the patience to click on an unchanging screen a bunch of times, huh?",
		westley, {image: "westley_blush.png",position: rightSide},
		westley, "Well, there's really not much else I can say on this page.  Click on the button to return to the main menu."
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

