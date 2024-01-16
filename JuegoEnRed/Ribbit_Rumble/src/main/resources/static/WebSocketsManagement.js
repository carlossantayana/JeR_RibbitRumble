"use strict";
var connection

function CreateWebSocket(){
	connection = new WebSocket('ws://'+ serverIP+'/ribbits');

	connection.onopen = function () {
		console.log("WS connection established");
		connection.send(logedUser.username);
	}

	connection.onerror = function(e) {
		console.log("WS error: " + e);
	}

	connection.onmessage = function(msg) {
		console.log("WS message: " + msg.data);

		switch(msg.data.type){
			case "pair":
				if(msg.data.state){
					pairPlayers();
				}
				break;
		}
	}
}

function pairPlayers(){
	console.log("Se llamó a esta función");
	game.scenes.start("PlayerSelectionMenuNet");
	game.scenes.stop("Pairing");
}