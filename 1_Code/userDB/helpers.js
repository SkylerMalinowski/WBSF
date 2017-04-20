function dereg(u, p) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/remUser/?u=" + u + "&p=" + p, false);
	req.send();
	return req.responseText;
}

function reg(u, p) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/addUser/?u=" + u + "&p=" + p, false);
	req.send();
	return req.responseText;
}

function print(p) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/printTable/?p=" + p, false);
	req.send();
	return req.responseText;
}

function logout() {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/logout/?s=" + window.name, false);
	req.send();
	return req.responseText;
}

function login(u, p) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/login/?u=" + u + "&p=" + p, false);
	req.send();
	return req.responseText;
}

function price(s) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/ticker/?s=" + s, false);
	req.send();
	return req.responseText
}

function news(s) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/news/?s=" + s, false);
	req.send();
	return req.responseText;
}

function isAdmin(p) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/isAdmin/?p=" + p, false);
	req.send();
	return req.responseText;
}

function setAdmin(o, n) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/isAdmin/?o=" + o + "&n=" + n, false);
	req.send();
	return req.responseText;
}
