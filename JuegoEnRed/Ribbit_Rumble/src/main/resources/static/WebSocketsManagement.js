"use strict";
var connection;

var paired = false;

var otherCharacter=null;

var otherMap = null;

var finalMapSelection = null;

//Booleanos para el movimiento, sustituyen la comprobacion de la entrada, luego actualizan el valor de las variables this.player locales
var otherWalkLeft = false;	//Vale true si mantiene pulsado
var otherWalkRight = false;	//Vale true si mantiene pulsado

var otherJump = false;	//dudoso
var otherCrouching = false
//Bloquear, mantener pulsado
var otherBlocking = false;
//Atacar, solo pulsar
var otherAttack = false;
var otherLowAttack = false;

var otherHealth;
var otherCifra1;
var otherCifra2;

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
			case "pairing":
				if(jsonmsg.data === "true"){
					paired = true;
				}
				break;
			case "login":
				logedUser.player = jsonmsg.data;
				break;
			case "characterSelection":
				otherCharacter=parseInt(jsonmsg.data);
				console.log(otherCharacter);
				break;
			case "mapSelection":
				otherMap=parseInt(jsonmsg.data);
				console.log(otherMap);
				break;
			case "finalMapSelection":
				finalMapSelection = parseInt(jsonmsg.data);
				console.log(finalMapSelection);
				break;
			case "inputUpdate":
				otherWalkLeft = jsonmsg.walkLeft;	
				otherWalkRight = jsonmsg.walkRight;	
				otherJump = jsonmsg.jump;	
				otherCrouching = jsonmsg.crouching;
				otherBlocking = jsonmsg.blocking;
				otherAttack = jsonmsg.attack;
				otherLowAttack = jsonmsg.lowAttack;
				break;
			case "syncHealth":
				otherHealth=jsonmsg.health;
				break;
			case "syncTime":
				otherCifra1=parseInt(jsonmsg.cifra1);
				otherCifra2=parseInt(jsonmsg.cifra2);
				break;
		}
	}
}