"use strict";
var connection;

var paired = false;

var otherCharacter=null;

function CreateWebSocket(){
	connection = new WebSocket('ws://'+ serverIP+'/ribbits');

	connection.onopen = function () {
		console.log("WS connection established");
		//connection.send(JSON.stringify(logedUser));
	}

	connection.onerror = function(e) {
		console.log("WS error: " + e);
	}

	connection.onmessage = function(msg) {
		var jsonmsg = JSON.parse(msg.data);
		console.log("WS message: " + jsonmsg);

		switch(jsonmsg.type){
			case "pair":
				if(jsonmsg.data === "true"){
					paired = true;
				}
				break;
			case "login":
				logedUser.player = jsonmsg.data;
				break;
			case "playerSelect":
				
				otherCharacter=jsonmsg.data;
				console.log(otherCharacter);
				break;
		}
	}
}