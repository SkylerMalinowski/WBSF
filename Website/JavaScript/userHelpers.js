/* Account Database */
function print(p) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/printTable/?p=" + p, false);
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

function dereg(u, p) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/remUser/?u=" + u + "&p=" + p, false);
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

function logout() {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/logout/?s=" + window.name, false);
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

/* Account Information */
function setLesson(index, val) {
	var s = window.name;
	
	var req = new XMLHttpRequest();
	req.onload = function(){
		return req.responseText;
	}
	
	req.open("GET", "/userDB/setLesson/?s=" + s + "&i=" + index + "&v=" + val, false);
	req.send();
	
	return req.responseText;
}

function getLesson(index) {
	var s = window.name;
	
	var req = new XMLHttpRequest();
	req.onload = function(){
		return req.responseText;
	}
	
	req.open("GET", "/userDB/getLesson/?s=" + s + "&i=" + index, false);
	req.send();
	
	return req.responseText;
}

function setQuiz(index, val) {
	alert( "setQuiz() 1" );		//* debug
	var s = window.name;
	
	var req = new XMLHttpRequest();
	req.onload = function() {
		return req.responseText;
	}
	alert( "setQuiz() 2" );		//* debug
	req.open("GET", "/userDB/setQuiz/?s=" + s + "&i=" + i + "&v=" + val, false);
	alert( "setQuiz() 3" );		//* debug
	req.send();
	alert( "setQuiz() 4" );		//* debug
	return req.responseText;
}

function getQuiz(index) {
	var s = window.name;
	
	var req = new XMLHttpRequest();
	req.onload = function() {
		return req.responseText;
	}
	
	req.open("GET", "/userDB/getQuiz/?s=" + s + "&i=" + index, false);
	req.send();
	
	return req.responseText;
}


function setPlacement(val) {
	var s = window.name;
	
	var req = new XMLHttpRequest();
	req.onload = function(){
		return req.responseText;
	}
	
	req.open("GET", "/userDB/setPlacement/?s=" + s + "&v=" + val, false);
	req.send();
	
	return req.responseText;
}

function getPlacement() {
	var s = window.name;
	
	var req = new XMLHttpRequest();
	req.onload = function(){
		return req.responseText;
	}
	
	req.open("GET", "/userDB/getPlacement/?s=" + s, false);
	req.send();
	
	return req.responseText;
}

function setMode(val) {
	var s = window.name;
	
	var req = new XMLHttpRequest();
	req.onload = function(){
		return req.responseText;
	}
	
	req.open("GET", "/userDB/setMode/?s=" + s + "&v=" + val, false);
	req.send();
	
	return req.responseText;
}

function getMode() {
	var s = window.name;
	
	var req = new XMLHttpRequest();
	req.onload = function(){
		return req.responseText;
	}
	
	req.open("GET", "/userDB/getMode/?s=" + s, false);
	req.send();
	
	return req.responseText;
}

function addPort(stock) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/addPortfolio/?s=" + window.name + "&v=" + stock, false);
	req.send();
	return req.responseText;
}

function remPort(stock) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/remPortfolio/?s=" + window.name + "&v=" + stock, false);
	req.send();
	return req.responseText;
}

function getPort(index) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/getPortfolio/?s=" + window.name + "&i=" + index, false);
	req.send();
	return req.responseText;
}
