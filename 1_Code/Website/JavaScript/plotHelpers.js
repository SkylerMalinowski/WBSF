/* ************************************************************************** */
// Written by: 		Gregory Leonberg
// Tested by: 		Skyler Malinowski, Gregory Leonberg
// Debugged by: 	Gregory Leonberg, Skyler Malinowski
// Integrated by: 	Skyler Malinowski
/* ************************************************************************** */

// Description: gets ticker information via HTTP get request
// Input: ticker symbol (type: string)
// Output: response (type: string)
function price(s) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/plot/ticker/?s=" + s, false);

	req.send();
	return req.responseText
}

// Description: gets revelvant news titles and links via HTTP get request
// Input: ticker symbol (type: string)
// Output: response (type: string)
function news(s) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/plot/news/?s=" + s, false);

	req.send();
	return req.responseText
}

// Description: gets plotly graph and links via HTTP get request
// Input: ticker symbol (type: string)
// Output: response (type: string)
function getGraph(s) {

	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/plot/graph/?s=" + s, false);

	req.send();
	return req.responseText;
}

// Description: gets predicted accuracy of graph via HTTP get request
// Input: ticker symbol (type: string)
// Output: response (type: string)
function getAcc(s) {

	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}

	req.open("GET", "/plot/acc/?s=" + s, false);

	req.send();
	return req.responseText;
}

// Description: gets relative error (sloping error) of graph via HTTP get request
// Input: ticker symbol (type: string)
// Output: response (type: string)
function getRelAcc(s) {

	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}

	req.open("GET", "/plot/relAcc/?s=" + s, false);

	req.send();
	return req.responseText;
}

