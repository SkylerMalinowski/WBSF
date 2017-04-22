function getGraph(s) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/plot/graph/?s=" + s, false);
	req.send();
	return req.responseText;
}

function getAcc(s) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/plot/acc/?s=" + s, false);
	req.send();
	return req.responseText;
}

function getRelAcc(s) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/plot/relAcc/?s=" + s, false);
	req.send();
	return req.responseText;
}
