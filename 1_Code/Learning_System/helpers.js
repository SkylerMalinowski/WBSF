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
	req.onload = function(){
		return req.responseText;
	}
	
	req.open("GET", "/userDB/setQuiz/?s=" + s + "&i=" + i + "&v=" + val, false);
	req.send();
	return req.responseText;
			}

function getQuiz(index) {
	var s = window.name;
	
	var req = new XMLHttpRequest();
	req.onload = function(){
		return req.responseText;
	}
	
	req.open("GET", "/userDB/getQuiz/?s=" + s + "&i=" + index, false);
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
