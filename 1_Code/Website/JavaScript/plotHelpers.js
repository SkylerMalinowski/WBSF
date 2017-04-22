/* Ticker */
function price(s) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/plot/ticker/?s=" + s, false);
	req.send();
	return req.responseText
}

/* News */
function news(s) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/plot/news/?s=" + s, false);
	req.send();
	return req.responseText;
}

/* Plotly Graph */
function getGraph(s) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/plot/graph/?s=" + s, false);
	req.send();
	return req.responseText;
}

/* Prediction */
function getAcc(s) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/plot/acc/?s=" + s, false);
	req.send();
	return req.responseText;
}

/* Slope Matching */
function getRelAcc(s) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/plot/relAcc/?s=" + s, false);
	req.send();
	return req.responseText;
}

