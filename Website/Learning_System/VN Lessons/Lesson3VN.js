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
		westley, "Now we can finally start getting to the good part; answering the question, 'What is a Stock Market?'",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "A Stock Market, simply put, is a place where buyers and sellers of Stocks meet and decide on a price at which to trade.",
		westley, "As I recall mentioning before, in lesson 1, the stock market is a Secondary market, where rather than buying a stock directly from the company, you're buying it from another shareholder who wishes to sell it.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Think of it like a big flea market, but instead of selling various goods, people are selling shares of a company!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Likewise, when you sell a stock, in most cases, you're selling it to a would-be investor, rather than back to the company that issued it.  Stocks, like money, circulate around between hands.",
		westley, "Historically, Stock Markets used to be physical locations, where trades are made on a trading floor.  However, Stock markets are rapidly becoming virtual locations, where the marktes consist of a network of computers that monitor transactions between users.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "This means that people don't have to dress up in a fancy suit to make a few stock trades!  Just trade them from home on the computer!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Anyway, back to the topic at hand.  Let's learn a little bit of history about the Stock Markets.",
		label, "pizza",
		scene, "Amsterdam.jpg",	//https://s-media-cache-ak0.pinimg.com/originals/a3/54/f8/a354f8c3c2089809663b5fd4af35c5c8.jpg
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Well, here we are in a 17th century painting of Amsterdam, a major port city.  Port cities like this one were major hubs of trade, with great numbers of goods being sold per day!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Trading hubs like Amsterdam, Antwerp, and London were also the locations of the earliest Stock Exchanges, or at least the precursors to modern ones.",
		westley, "A handful of companies required large sums of money to partake in their business ventures.  Thus, they had to take out large loans from a variety of investors.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "If this sounds familiar, it's because the same motivations that those older trading companies had for taking out loans are the same motivations that cause modern comanies to sell stocks!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "To raise that money, those companies issued bonds to investors, rather than sell shares of itself.  After a certain period of time, the company had to pay back those bonds to the investors, plus interest.",
		scene, "Buttonwood.jpg", //http://www.podles.org/dialogue/wp-content/uploads/Buttonwood-Tree.jpg
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "By the late 18th century, stock markets such as the New York Stock Exchange (NYSE) and the Philadelphia Stock Exchange (PHLX) began appearing in the United States.",
		westley, "It is here where equity shares, or partial ownerships of the company, were traded among investors.",
		westley, "In 1792, the NYSE was founded with the signing of the Buttonwood Agreement by 24 New York City Stockbrokers and Merchants.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Prior to this, buyers and sellers of stocks would meet unofficially at a table undernearth a buttonwood tree to trade.",
		westley, "Remember how I said that a stock market is like a big flea market?  These places to buy and sell stocks could've been anywhere at all!",
		scene, "NYSE.jpg", //https://aloypro.files.wordpress.com/2015/02/nyse.jpg
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "With the advent of modern stock markets, the stock exchanges are now regulated and professionalized to ensure that buyers and sellers can expect a fair price, and that the trades will go through quickly.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "A modern Stock Exchange, like this one, not only provides a place to trade, but other valualbe stock info, like the current price, whether that price has risen or fallen, and other news articles about it!",
		
		scene, "ClassroomInterior.jpg",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "So, what do you think about the history of the Stock Market?  Do you wanna hear me make that explanation again?",
		
		menu, [
			"Do you want to travel through history again?",
			"No thanks, I'm good",[jump, "frenchfry"],
			"Tell that story again", [jump, "repeet"]
		],
		
		label, "repeet",
		westley, "Alright, time for another field trip!  Hold on tight!",
		jump, "pizza",
		
		label, "frenchfry",
		westley, "Alright then.  Stock Exchanges can take many different forms, with modern stock exchanges being a mix of physical locations or networked computers.",
		
		westley, "The important thing about modern stock exchanges is that they're heavily regulated in order to ensure that trades are fair, and that prices are accurate.",
		westley, {image: "westley_worry.png", position: rightSide},
		westley, "However, due to the regulation of the stock market, there are certain criteria that must be met for a company to be listed within certain stock exchanges.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "But don't worry about that; the criteria for being listed under a certain Stock Exchange isn't relevant to you personally.  The main take-away that I want you to get is that there are some stocks that aren't listed under certain Stock Exchanges.",
		westley, "This makes you wonder: where can I buy a stock that isn't listed under a Stock Exchange?",
		westley, {image: "westley_surprised.png", position: rightSide},
		westley, "As it turns out, there exists a number of loosely regulated over-the-counter bulletin board exchanges, or OTCBBs, where these stocks can be exchanged.  Every company has stocks, and if they aren't traded on a regulated Stock Exchange, you could find them on an OTCBB.",
		westley, {image: "westley_worry.png", position: rightSide},
		westley, "However, OTCBBs tend to be risky, since they list companies that don't meet the standards required for being listed on major Stock Exchanges, which range from being in operation for a certain number of years to meeting certain conditions regarding profitability.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "In most developed countries, Stock Exchanges are Self Regulatory Organizations, or SROs, that have the power to create and regulate industry standards.  The goal of a Stock Exchange to protect investors by establishing rules and regulations that promote ethics and equality.",
		westley, "The TLDR of it is that a Stock Exchanges tries to make sure that a Stock is traded for the correct price.  That being said, what determine's a stock's price?",
		westley, "The price of a Stock can be determined by a variety of ways, but the most common way to do so is to find the common ground between how much a seller wishes to sell for, and how much a buyer is willing to buy for.",
		westley, "In other words, the stock price is determined by the buyers and sellers themselves.  The seller will attempt to sell a stock at a price called the 'ask price.'  The buyer, on the other hand, attempts to buy a stock at a 'bid price.'",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "If a bid price and ask price coincide with each other, this means that both parties are in agreement about what price a stock should be sold at, and a trade is made between the two.",
		westley, "It should be a win-win scenario for both parties involved!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "That being said, some stock markets rely on professional traders to maintain continuous bids and asks since it is difficult for buyers and sellers to find each other easily.  These traders are known as specialists, or market makers.",
		westley, "Furthermore, there are some traits present in a good market that can be visible from the bid and ask prices, as well as the number of stocks being traded.",
		westley, "In general, bid and ask prices tend to be different from each other; this difference in price is known as the Spread of that stock.",
		westley, "If a stock has a narrow spread, we say that it has a high Liquidity to it.  Liquidity, in general, refers to how easy it is to convert something to a cash value.",
		westley, "A stock is said to have good depth if there are a large number of buyers and sellers.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "In general, a high-quality stock tends to have narrow spreads, high liquidity, and good depth.",
		
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Does that make sense to you?",
		menu, [
			"Do you understand what makes a good stock?",
			"Yeah, I got it.  Onto the next topic please!", [jump, "foreverandever100years"],
			"No, can you repeat that once more?", [jump, "abbajss"]
		],
		
		label, "abbajss",
		westley, {image: "westley_surprised.png", position: rightSide},
		westley, "Sure thing, be sure to pay careful attention!",
		jump, "frenchfry",
		
		label, "foreverandever100years",
		westley, {image: "westley_smimle.png", position: rightSide},
		westley, "Great!  Now let's get on with a more interesting topic!",
		label, "rick and morty",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "In general, an investor would be interested in how their owned stocks are doing.  'Are they doing well?  Or should I sell them today?' are questions that they ask themselves daily.",
		westley, "However, a good investor would be interested in a wide variety of stocks, rather than just a small handful.  Thus, investors concern themselves with something called a stock index, commonly referred to as 'indexes' for brevity.",
		westley, "An index represents aggregated prices for a number of stocks, with the behavior of the index reflecting on the behavior of the individual stocks.",
		westley, {image: "westley_surprised.png", position: rightSide},
		westley, "The assumption with an index is that all (or at least most of) the stocks contained in an index will rise and fall at roughly the same times.",
		westley, "In fact, when people talk about the stock market, they are most likely referring to one of the major indices, such as the Dow Jones Industrial Average (DJIA) or the S&P 500.",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "The DJIA is a price-weighted index of 30 large American corporations.  Due to the weighting scheme, and the fact that it only uses 30 stocks (when there are thousands to choose from) means that it isn't a good indicatof for how the market is doing.",
		westley, "If you want an indicator for how the market is faring, you would want a broader index, such as the S&P500.  This index is a market-cap weighted index of the 500 largest companies in the US.",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "If you wanted to, you could even invest in an entire index!  It's like investing in all the companies within an industry all at once!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "You can invest in an index in one of two ways: indirectly, through a futures market, or via Exchange Traded Funds (ETF), which trade just like stocks on the stock exchange.",
		
		westley, "Do you understand what an index is now?",
		menu, 
			["Do you understand what an index is?",
			"Yes", [jump, "Xayah"],
			"No", [jump, "Rakan"]
		],
		label, "Rakan",
		westley, "That's no problem!  I'll repeat that section one more time for you!",
		jump, "rick and morty",
		
		label, "Xayah",
		westley, {image: "westley_smile.png", position: rightSide},
		westley, "Perfect!  In that case, that concludes this lesson!",
		westley, {image: "westley_normal.png", position: rightSide},
		westley, "Be sure to take the quiz on this lesson to see if you understood the concepts.",
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

