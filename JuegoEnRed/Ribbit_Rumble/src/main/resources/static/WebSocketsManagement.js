"use strict";
var connection;

var paired = false;
var otherLogOut = false;

var otherCharacter=null;

var otherMap = null;

var finalMapSelection = null;
var isPlayer1Selection = null;

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

var Cifra1 = null;
var Cifra2 = null;

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
		//console.log("WS message: " + jsonmsg);

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
				isPlayer1Selection = jsonmsg.isPlayer1;
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
			case "time":
				console.log("d1 "+jsonmsg.data1)
				console.log("d2 "+jsonmsg.data2)
				Cifra1=parseInt(jsonmsg.data1);
				Cifra2=parseInt(jsonmsg.data2);
				break;
			case "logout":
				otherLogOut = jsonmsg.data;
				break;
		}
	}
	
	connection.onclose = function (e){
		paired = false;
		otherCharacter = null;
		otherMap = null;
		finalMapSelection = null;
		otherWalkLeft = false;
		otherWalkRight = false;
		otherJump = false;
		otherCrouching = false;
		otherBlocking = false;
		otherAttack = false;
		otherLowAttack = false;
		otherCifra1 = null;
		otherCifra2 = null;
		otherLogOut = false;

		console.log("Conexion cerrada")
	}
}