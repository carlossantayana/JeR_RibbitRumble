"use strict";
var connection;

var paired = false;
var otherLogOut = false;

var otherCharacter = null;

var otherMap = null;

var finalMapSelection = null;
var isPlayer1Selection = null;

//Booleanos para el movimiento y ataque, sustituyen la comprobacion de la entrada, luego actualizan el valor de las variables this.player locales
var otherWalkLeft = false;
var otherWalkRight = false;
var otherJump = false;
var otherCrouching = false
var otherBlocking = false;
var otherAttack = false;
var otherLowAttack = false;

var Cifra1 = 6;
var Cifra2 = 0;

var otherUpAttack = false;
var otherDownAttack = false;
var playerUpAttack = false;
var playerDownAttack = false;

function CreateWebSocket() {
	connection = new WebSocket('ws://' + serverIP + '/ribbits');

	connection.onopen = function () {
		console.log("WS connection established");
	}

	connection.onerror = function (e) {
		console.log("WS error: " + e);
	}

	connection.onmessage = function (msg) {
		var jsonmsg = JSON.parse(msg.data);
		//console.log("WS message: " + jsonmsg);

		switch (jsonmsg.type) {
			case "pairing":
				if (jsonmsg.data === "true") {
					paired = true;
				}
				break;
			case "login":
				logedUser.player = jsonmsg.data;
				break;
			case "characterSelection":
				otherCharacter = parseInt(jsonmsg.data);
				break;
			case "mapSelection":
				otherMap = parseInt(jsonmsg.data);
				break;
			case "finalMapSelection":
				finalMapSelection = parseInt(jsonmsg.data);
				isPlayer1Selection = jsonmsg.isPlayer1;
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
				Cifra1 = parseInt(jsonmsg.data1);
				Cifra2 = parseInt(jsonmsg.data2);
				break;
			case "logout":
				otherLogOut = jsonmsg.data;
				break;
			case "syncAttack":
				if ((jsonmsg.data) === "upAttack") {
					otherUpAttack = true;
				}
				if ((jsonmsg.data) === "downAttack") {
					otherDownAttack = true;
				}
				break;
			case "syncAttack2":
				if ((jsonmsg.data) === "upAttack") {
					playerUpAttack = true;
				}
				if ((jsonmsg.data) === "downAttack") {
					playerDownAttack = true;
				}
				break;
		}
	}

	connection.onclose = function (e) {
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
		otherLogOut = false;
		otherUpAttack = false;
		otherDownAttack = false;
		playerUpAttack = false;
		playerDownAttack = false;

		console.log("WS connection closed")
	}
}