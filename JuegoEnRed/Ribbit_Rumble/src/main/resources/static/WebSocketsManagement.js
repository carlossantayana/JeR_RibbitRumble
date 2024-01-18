"use strict";
var connection;

var paired = false;

var otherCharacter=null;

var otherMap = null;

var finalMap = null;

//Booleanos para el movimiento, sustituyen la comprobacion de la entrada, luego actualizan el valor de las variables this.player locales
var otherWalkLeft = false;	//Vale true si mantiene pulsado
var otherWalkRight = false;	//Vale true si mantiene pulsado

var otherJump = false;	//dudoso
var otherCrounching = false
//Bloquear, mantener pulsado
var otherBlocking = false;
//Atacar, solo pulsar
var otherAttack = false;
var otherLowAttack = false;

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
				
			case "mapSelect":
				
				otherMap=jsonmsg.data;
				console.log(otherMap);
				break;
				
			case "finalSelect":
				
				finalMap = jsonmsg.data;
				console.log(finalMap);
				break;
			case "inputUpdate":
				 otherWalkLeft = jsonmsg.walkLeft;	
				 otherWalkRight = jsonmsg.walkRight;	
				
				 //otherJump = false;	
				 //otherCrounching = false
				 //otherBlocking = false;
				 //otherAttack = false;
				 //otherLowAttack = false;
				break;
		}
	}
}