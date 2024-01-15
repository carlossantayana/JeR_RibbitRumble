"use strict";
$(document).ready(function () {
    //WebSocket
    console.log(serverIP);
	    var connection = new WebSocket('ws://'+ serverIP+'/ribbits');
		
		connection.onopen = function () {
			connection.send('Hi');
	}
		connection.onerror = function(e) {
			console.log("WS error: " + e);
	}
		connection.onmessage = function(msg) {
			console.log("WS message: " + msg.data);
	}
});