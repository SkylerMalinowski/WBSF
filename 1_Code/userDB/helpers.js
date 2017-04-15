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
				
				return ret;
			}

function dereg(u, p) {
				var req = new XMLHttpRequest();
				
				req.onload = function(){
					var ret = req.responseText;
				}
				
				req.open("GET", "/userDB/remUser/?u=" + u + "&p=" + p, true);
				req.send();
				
				return ret;
			}

function reg(u, p) {
				var req = new XMLHttpRequest();
				
				req.onload = function(){
					var ret = req.responseText;
				}
				
				req.open("GET", "/userDB/addUser/?u=" + u + "&p=" + p, true);
				req.send();
				
				return ret;
			}

function print(p) {
				var req = new XMLHttpRequest();
				
				req.onload = function(){
					var ret = req.responseText;
				}
				
				req.open("GET", "/userDB/printTable/?p=" + p, true);
				req.send();
				
				return ret;
			}

function logout() {
				var req = new XMLHttpRequest();
				req.onload = function(){
					var ret = req.responseText;
				}
				
				req.open("GET", "/userDB/logout/?s=" + window.name, true);
				req.send();
				
				return ret;
			}

function login(u, p, callback) {
				var req = new XMLHttpRequest();
				req.onload = function(){
					var ret = req.responseText;
					window.name = req.responseText;
				}
				
				req.open("GET", "/userDB/login/?u=" + u + "&p=" + p, false);
				req.send();
				
				return ret;
			}
			
function price(s, callback) {
				var req = new XMLHttpRequest();
				req.onload = function(){
					callback(req.responseText);
				}
				
				req.open("GET", "/ticker/?s=" + s, false);
				req.send();
			}
			
function news(s) {
				var req = new XMLHttpRequest();
				req.onload = function(){
					var ret = req.responseText;
				}
				
				req.open("GET", "/news/?s=" + s, false);
				req.send();
				
				return ret;
			}
