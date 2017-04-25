function myTicker() {
	alert( "myTicker()" );		//* debug
	var query = document.getElementById('search').value;
	var price = price(query);
	document.getElementById('ticker-box').innerHTML = price;
}

function myNews() {
	alert( "myNews()" );		//* debug
	var query = document.getElementById('search').value;
	var news = news(query);
	document.getElementById('search').innerHTML = graph;
}

function myGetGraph() {
	alert( "myGetGraph()" );		//* debug
	var query = document.getElementById('search').value;
	var graph = getGraph(query);
	document.getElementById('graph-box').innerHTML = graph;
}

function myAcc() {
	alert( "myAcc()" );		//* debug
	var query = document.getElementById('search').value;
	var acc = getAcc(query);
	document.getElementById('acc-box').innerHTML = acc;
}

function myRealAcc() {
	alert( "Search()" );		//* debug
	var query = document.getElementById('search').value;
	var realAcc = getRealAcc(query);
	document.getElementById('realAcc-box').innerHTML = realAcc;
}

function Search() {
	alert( "Search()" );		//* debug
}

