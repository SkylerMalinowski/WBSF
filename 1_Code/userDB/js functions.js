function getLessonState() {
				var s = window.name;
				
				var req = new XMLHttpRequest();
				req.onload = function(){
					var ret = req.responseText;
				}
				
				req.open("GET", "/userDB/getLessonState/?s=" + s, true);
				req.send();
				return ret;
			}

function setLessonState(l) {
				var s = window.name;
				
				var req = new XMLHttpRequest();
				req.onload = function(){
					var ret = req.responseText;
				}
				
				req.open("GET", "/userDB/setLessonState/?s=" + s + "&l=" + l, true);
				req.send();
				return ret;
			}

function setQuizTaken(q) {
				var s = window.name;
				
				var req = new XMLHttpRequest();
				req.onload = function(){
					var ret = req.responseText;
				}
				
				req.open("GET", "/userDB/setQuizTaken/?s=" + s + "&q=" + q, true);
				req.send();
				return ret;
			}

function getQuizTaken() {
				var s = window.name;
				
				var req = new XMLHttpRequest();
				req.onload = function(){
					var ret = req.responseText;
				}
				
				req.open("GET", "/userDB/getQuizTaken/?s=" + s, true);
				req.send();
			}
