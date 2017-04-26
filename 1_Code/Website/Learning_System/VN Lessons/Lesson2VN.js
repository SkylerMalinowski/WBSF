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
		westley, {image: "westley_surprised.png", position: rightSide},
		westley, "Hmm, let's see.  Today's lesson has to be on the different types of stocks available for purchase.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "You see, there are a variety of stock types that exist.  Different types of stocks provide different benefits, along with varying levels of risks.",
		westley, "To start, let's examine a few examples of companies, and the types of stocks that they have.  Just a moment.",
		label, "fast travel",
		scene, "startup_office.jpg",
		westley, {image: "westley_cry.png", position: rightSide},
		westley, "Achoo!  Augh, fast travel always gives me a bit of a sneeze.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Anyway, here we are at an office of a Startup company.  These companies are infants in the business world.",
		westley, "Startups like these are smaller ventures owned and operated by a small amount of individuals.  Their names may not be well known, but with enough hard work, they can expect to grow a large, successful business!",
		westley, {image: "westley_surprised.png",position: rightSide},
		westley, "At present, the projects that they undertake will be small, and will not need a lot of capital to complete.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "However, all companies have shares.  Even Startup ones.  However, Startup companies don't need to generate a lot of capital, so they see no need to sell shares of the company just yet.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Therefore, the founders and initial investors of a Startup often choose to not sell shares of the company!  This way, full ownership of the company stays with the Startup's founders!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "For example: let's assume that a startup, 'New Beginnings,' has two founders and one investor.  The founders are the people with the big ideas and the know-how, and the investor is the one with the money needed to make the idea happen.",
		westley, "In this case, 'New Beginnings' has three shareholders: the three people responsible for founding the company.  If the three of them choose to split ownership evenly, each person owns one third of the company's implicit shares.",
		westley, "The company should be able to function properly without requiring extra money if the founders keep their projects small and manageable.  Thus, they don't have to sell partial ownership to other investors.",
		westley, "During this stage, the company and its shares are considered private.  Private shares are not easily exchanged, and the number of shareholders is limited to a select handful of people",
		scene, "ClassroomInterior.jpg",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "However, small projects will not be enough to make the company grow substantially.  If the founders want the company to grow further, they need to undertake bigger and better projects!",
		westley, {image: "westley_worry.png", position: rightSide},
		westley, "That being said, large projects require a lot of capital.  The founders may not have enough to start them.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "This is where selling stocks come into play.  By selling stocks to the general public, the company can obtain more investment that is normally unobtainable from a limited number of investors.",
		westley, "It is at this point where the company makes an Initial Public Offering, or IPO for short.  When a company makes an IPO, they officially start selling shares of their company to the public.  At this point, they are considered a Public company, rather than a private one.",
		westley, {image: "westley_surprised.png", position: rightSide},
		westley, "However, after making an IPO, the founders of the company may have to be more careful with their company.  In general, it's a good idea for the founders to hold most of the shares of the company so that they can maintain the most voting power at shareholders meetings.",
		westley, "In fact, most companies offer different types of stocks, with different benefits and drawbacks for each type.  One type might have more voting power, and another type might be a safer investment, with the latter type being sold more often than the first one.",
		westley, "This way, they are able to maintain power within the company while still raising revenue for bigger projects!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Is this all making sense to you?",
		menu, [
			"Did that all make sense to you?",
			"Yes, what types of stocks are sold?", [jump, "waterloo"],
			"No, can you repeat that?",[jump, "repeatthat"]
		],
		
		label, "repeatthat",
		westley, "Sure thing, I'll repeat it one more time.",
		jump, "fast travel",
		
		label, "waterloo",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Alright, now lets start talking about the different types of stocks.  I'll go over two of the most common types of stocks that are traded: Common Stock and Preferred Stock.",
		label, "Please Understand",
		westley, {image: "westley_normal.png", position: rightSide},
		
		westley, "Common Stock, as the name implies, is what people usually refer to when they talk about stocks.  In fact, the great majority of stock is issued in this form.",
		westley, "Common Stocks represent a claim on the profits, or divdends, of the company.  Think of it like an investment, where the investor takes an active role in the company's development.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Due to the active role that common stock investors take, holders of common stock are allowed to vote in shareholders meetings.  The more common stock someone has, the more voting power they get!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "That is why many higher-ups of companies own, or at least try to own, a large amount of common stock for that company.  This way, they can maintain as much power as possible, by giving themselves a stronger vote in shareholders meetings",
		westley, {image: "westley_sad.png", position: rightSide},
		westley, "However, this increased benefit comes with an increased risk, as well.  Compared to Preferred Stock holders, common stock shareholders will lose a lot more if the company fails and goes out of business.",
		westley, "A company will sell its assets to covert its debts, and a common stock shareholder won't see any money from the company until its creditors, bondholders, and preferred stock shareholders are paid off first.  In fact, it's more common that, in the event of bankruptcy, common stock shareholders won't see any money out of it at all.",
		westley, "In the event of bankruptcy, a common stock shareholder will probably lose all the money that they invested with the company.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "That's why it's important to build a diverse stock portfolio, so that you don't get into too much trouble if one company fails!",
		
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "So, does the concept of a Common Stock make sense to you?",
		menu, [
			"Do you understand Common Stocks?",
			"Yes, I understand them", [jump, "notiwata"],
			"No, can you repeat that please?", [jump, "Watashiwa Understando"]
		],
		
		label, "notiwata",
		westley, {image: "westley_angry.png", position: rightSide},
		westley, "Alright, I'll explain it once more.  Please Understand.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Ahaha sorry, I was trying to quote an old meme just now!  Alright, so here's the stitch on Common Stocks again.",
		jump, "Please Understand",
		
		label, "Watashiwa Understando",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Ok, so the last type of Stock that I'm going to cover is Preferred Stocks!",
		label, "Best Girl",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Preferred Stock carries a smaller risk than Common Stocks.  They work similar to bonds, in that they don't confer the same voting rights that Common Stocks do.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Instead, Preferred Stock Shareholders are usually guaranteed a fixed divident in perpetuity.  This means that a preferred shareholder will periodicaly recieve a sum of money from the corporation just for holding Preferred Stocks!",
		westley, "In the event of liquidation, preferred shareholders get another perk: if there's any money in the company left over after paying any creditors and debtors, that money goes to preferred shareholders!  Even in a terrible case scenario, Preferred Stock holders don't have to risk as much!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "So in general, Preferred stocks have a smaller risk associated with them.  It's also worth noting that in some cases, preferred shares may be 'callable.'",
		westley, "This basically means that the company has the right to re-purchase these stocks from their holders.  However, this is usually for a premium, or a price above what it's normal traded for.",
		westley, "This is useful for when the company no longer needs to raise money by selling of partial ownershp of itself.  In essence, the company is able to buy itself back from its preferred shareholders!",
		westley, "The best way to think of a preferred share as an investment that is not as risky as a Common Stock, but with a slightly higher payout than a Bond.  If you don't remember what bonds are, feel free to drop by Lesson 1 for a refresher on it!",
		westley, "Do Preferred Stocks make sense to you now?",
		
		menu, [
			"Do you understand preferred stocks?",
			"Yes, I do", [jump, "Ram"],
			"No, can you repeat that?", [jump, "Rem"]
		],
		
		label, "Rem",
		westley, "Alright, I'll explain Preferred stocks once more for you.  Pay attention!",
		jump, "Best Girl",
		label, "Ram",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Great!  Then that concludes Lesson 2!  Be sure to take the quiz to see how well you were able to learn this information!",
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

