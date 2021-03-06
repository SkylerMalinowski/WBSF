/* ************************************************************************** */
// Written by: 		Gregory Leonberg
// Tested by: 		Skyler Malinowski, Gregory Leonberg
// Debugged by: 	Gregory Leonberg, Skyler Malinowski
// Integrated by: 	Skyler Malinowski
/* ************************************************************************** */

// Description: prints user database via HTTP get request
// Input: password (type: string)
// Output: response (type: string)
function print(p) {
	var req = new XMLHttpRequest();
	req.onload = function()
	{	return req.responseText;	}
	
	req.open("GET", "/userDB/printTable/?p=" + p, false);
	req.send();
	return req.responseText;
}

// Description: registers user account to user database via HTTP get request
// Input: ussername and password (type: string)
// Output: response (type: string)
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
	var s = window.name;
	
	var req = new XMLHttpRequest();
	req.onload = function() {
		return req.responseText;
	}
	
	req.open("GET", "/userDB/setQuiz/?s=" + s + "&i=" + index + "&v=" + val, false);
	req.send();
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
