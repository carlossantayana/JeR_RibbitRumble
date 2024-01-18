"use strict";

export default class MapSelectionMenuNet extends Phaser.Scene {
	constructor() {
		super('MapSelectionMenuNet');
		//Indica cuando los dos jugadores han escogido mapa
		this.playersReady = false;
		//Indica el turno del jugador para escoger mapa
		this.playerSelect = 1;
		//Indica si se ha confirmado la seleccion de mapas
		this.gameStarting = 0;
		//Imagenes de los mapas elegidos
		this.mapOneImage;
		this.mapTwoImage;
		//Indican las selecciones de cada jugador y el mapa resultante
		this.player1Selection;
		this.player2Selection;
		this.finalSelection;
		//Para hacer comprobaciones
		this.p1;
		this.selected1 = false;
		//Timers para hacer efectos
		this.timer = 0;
		this.timerFinal = 0;
		this.timerChangeScene = 0;

		this.parameters = {
			player1CharacterID: null,
			player2CharacterID: null,
			mapID: null
		}
	}

	init(data) {
		this.parameters.player1CharacterID = data.player1CharacterID;
		this.parameters.player2CharacterID = data.player2CharacterID;
	}

	create() {
		//Fondo del menu de seleccion de mapas
		this.add.image(960, 534.5, 'menuFondo').setScale(0.5);




		//Texto superior "Selecciona un escenario:"
		this.add.text(400, 40, "Selecciona un escenario", { fontSize: '80px' });

		//Fondo para los mapas a seleccionar
		this.add.rectangle(960, 280, 1670, 300, 0x606060);
		this.add.rectangle(960, 280, 1650, 280, 0x808080);
		this.add.rectangle(360, 280, 394, 225, 0x606060);
		this.add.rectangle(760, 280, 394, 225, 0x606060);
		this.add.rectangle(1160, 280, 394, 225, 0x606060);
		this.add.rectangle(1560, 280, 394, 225, 0x606060);

		//Botones de los mapas a seleccionar
		var desierto = this.add.image(360, 280, 'desiertoFondo').setScale(0.2).setInteractive();
		var nenufar = this.add.image(760, 280, 'nenufarFondo').setScale(0.2).setInteractive();
		var selva = this.add.image(1160, 280, 'junglaFondo').setScale(0.2).setInteractive();
		var random = this.add.image(1560, 280, 'randomFondo').setScale(0.1).setInteractive();

		//Despues de definirlos como interactuables, se crea el evento del click y la funcion a la que llama
		desierto.on('pointerdown', () => this.onMapSelected('desierto'));
		nenufar.on('pointerdown', () => this.onMapSelected('nenufar'));
		selva.on('pointerdown', () => this.onMapSelected('selva'));
		random.on('pointerdown', () => this.onMapSelected('random'));

		//Texto de los jugadores
		this.add.rectangle(212, 1020, 380, 110, 0x606060);
		this.add.rectangle(212, 1020, 365, 95, 0x808080);
		this.add.rectangle(1698, 1020, 390, 110, 0x606060);
		this.add.rectangle(1698, 1020, 375, 95, 0x808080);
		this.add.image(220, 1020, 'Player1Text').setScale(0.7);
		this.add.image(1698, 1020, 'Player2Text').setScale(0.7);

	}
	update(time, delta) {
		
		this.SetOtherMap();
		//If al que entra el update una vez cuando se pulsa el boton, dentro se elige de forma aleatoria el mapa entre los dos mapas elegidos por los jugadores
		if (logedUser.player == 2) {
			if (this.gameStarting == 1) {
				this.gameStarting++;
				var a = Math.floor(Math.random() * 2)

				if (a == 0) {
					this.finalSelection = this.player1Selection;
					this.p1 = true;
					console.log('Player 1');
				}
				else {
					this.finalSelection = this.player2Selection;
					this.p1 = false;
					console.log('Player 2');
				}
				if (this.finalSelection == 3) {
					a = Math.floor(Math.random() * 3);
					this.finalSelection = a;
				}
				var mapSelected = {
					type: "mapSelected",
					data: this.finalSelection
				};
				console.log("Enviando el mapa final al servidor: " + mapSelected)
				connection.send(JSON.stringify(mapSelected));
			}
		}

		if (logedUser.player == 1) {
			if (this.gameStarting == 1) {
				if (finalMap != null) {
					console.log("Player 1 entró con num de mapa: " + finalMap );
					if(this.player1Selection == finalMap){
						this.p1 = true;
					}
					else{
						this.p1 = false;
					}
					this.finalSelection = finalMap;
					console.log(this.finalSelection);
					finalMap = null
					this.gameStarting++;
				}
			}
		}
		//Una vez elegido el mapa internamente, se le muestra a los jugadores un efecto de ruleta aleatoria entre los mapas elegidos
		if (this.gameStarting == 2) {
			this.timer += delta / 1000;
			this.timerFinal += delta / 1000;

			if (this.timer < 0.25) {
				this.mapOneImage.setTint(0x808080);
				this.mapTwoImage.clearTint();
			}
			else if (this.timer >= 0.25 && this.timer < 0.5) {
				this.mapTwoImage.setTint(0x808080);
				this.mapOneImage.clearTint();
			}
			else {
				this.timer = 0;
			}
			//Entonces se resalta el mapa elegido anteriormente
			if (this.timerFinal > 3) {
				if (this.p1 == true) {
					this.mapTwoImage.setTint(0x808080);
					this.mapOneImage.clearTint();
				}
				else {
					this.mapOneImage.setTint(0x808080);
					this.mapTwoImage.clearTint();
				}
				this.gameStarting++;
			}
		}
		if (this.gameStarting == 3) {
			this.gameStarting++;
			if (this.player1Selection == 3) {
				if (this.p1 == true) {
					var scale = 0.4;
					var posY = 720;
					var posX1 = 420;
					switch (this.finalSelection) {
						case 0:
							this.mapOneImage = this.add.image(posX1, posY, 'desiertoFondo').setScale(scale);
							break;
						case 1:
							this.mapOneImage = this.add.image(posX1, posY, 'nenufarFondo').setScale(scale);
							break;
						case 2:
							this.mapOneImage = this.add.image(posX1, posY, 'junglaFondo').setScale(scale);
							break;
						default:
							console.log('Error')
							break;
					}
					this.mapTwoImage.setTint(0x808080);
				}
			}
			if (this.player2Selection == 3) {
				if (this.p1 == false) {
					var scale = 0.4;
					var posY = 720;
					var posX2 = 1500;
					switch (this.finalSelection) {
						case 0:
							this.mapTwoImage = this.add.image(posX2, posY, 'desiertoFondo').setScale(scale);
							break;
						case 1:
							this.mapTwoImage = this.add.image(posX2, posY, 'nenufarFondo').setScale(scale);
							break;
						case 2:
							this.mapTwoImage = this.add.image(posX2, posY, 'junglaFondo').setScale(scale);
							break;
						default:
							console.log('Error');
							break;
					}
					this.mapOneImage.setTint(0x808080);
				}
			}
		}



		if (this.gameStarting == 4) {
			console.log("SELECCION DE MAPA FINAL: " + this.finalSelection);
			this.parameters.mapID = this.finalSelection;
			this.timerChangeScene += delta / 1000;

			if (this.timerChangeScene >= 3) {
				this.playersReady = false;
				this.gameStarting = 0;
				this.mapOneImage = undefined;
				this.mapTwoImage = undefined;
				this.player1Selection = undefined;
				this.player2Selection = undefined;
				this.finalSelection = undefined;
				this.p1 = undefined;
				this.timer = 0;
				this.timerFinal = 0;
				this.timerChangeScene = 0;
				this.changeTrackMaps(this.parameters.mapID + 1);
				console.log("GAME START")
				console.log("Player 1: " + this.parameters.player1CharacterID);
				console.log("Player 2: " + this.parameters.player2CharacterID);
				console.log("MapID: " + this.parameters.mapID);
				this.scene.start('GameNet', this.parameters);
				this.scene.stop();
			}
		}

	}

	SetOtherMap() {
		var scale = 0.4;
		var scaleRandom = 0.2;
		var posY = 720;
		var posX1 = 420;
		var posX2 = 1500;
		var rectWidth = 800;
		var rectHeight = 470;
		if (logedUser.player == 1 && (otherMap != null) && this.player2Selection == null) {	//Para mostrar la rana del jugador 2 al jugador 1
			switch (otherMap) {
				case "0": //Mapa Desierto
					this.add.rectangle(posX2, posY, rectWidth, rectHeight, 0x606060);
					this.add.rectangle(posX2, posY, rectWidth - 10, rectHeight - 10, 0x808080);
					this.mapTwoImage = this.add.image(posX2, posY, 'desiertoFondo').setScale(scale);
					this.player2Selection = 0;
					break;
				case "1": //Mapa Nenufar
					this.add.rectangle(posX2, posY, rectWidth, rectHeight, 0x606060);
					this.add.rectangle(posX2, posY, rectWidth - 10, rectHeight - 10, 0x808080);
					this.mapTwoImage = this.add.image(posX2, posY, 'nenufarFondo').setScale(scale);
					this.player2Selection = 1;
					break;
				case "2": //Mapa selva
					this.add.rectangle(posX2, posY, rectWidth, rectHeight, 0x606060);
					this.add.rectangle(posX2, posY, rectWidth - 10, rectHeight - 10, 0x808080);
					this.mapTwoImage = this.add.image(posX2, posY, 'junglaFondo').setScale(scale);
					this.player2Selection = 2;
					break;
				case "3": //Mapa aleatorio
					this.add.rectangle(posX2, posY, rectWidth, rectHeight, 0x606060);
					this.add.rectangle(posX2, posY, rectWidth - 10, rectHeight - 10, 0x808080);
					this.mapTwoImage = this.add.image(posX2, posY, 'randomFondo').setScale(scaleRandom);
					this.player2Selection = 3;
					break;
			}
			this.onGameStart();
		}

		if (logedUser.player == 2 && (otherMap != null) && this.player1Selection == null) { // Para que el jugador 2 vea que selecciono el jugador 1
			switch (otherMap) {
				case "0": //Mapa Desierto
					this.add.rectangle(posX1, posY, rectWidth, rectHeight, 0x606060);
					this.add.rectangle(posX1, posY, rectWidth - 10, rectHeight - 10, 0x808080);
					this.mapOneImage = this.add.image(posX1, posY, 'desiertoFondo').setScale(scale);
					this.player1Selection = 0;
					break;
				case "1": //Mapa Nenufar
					this.add.rectangle(posX1, posY, rectWidth, rectHeight, 0x606060);
					this.add.rectangle(posX1, posY, rectWidth - 10, rectHeight - 10, 0x808080);
					this.mapOneImage = this.add.image(posX1, posY, 'nenufarFondo').setScale(scale);
					this.player1Selection = 1;
					break;
				case "2": //Mapa selva
					this.add.rectangle(posX1, posY, rectWidth, rectHeight, 0x606060);
					this.add.rectangle(posX1, posY, rectWidth - 10, rectHeight - 10, 0x808080);
					this.mapOneImage = this.add.image(posX1, posY, 'junglaFondo').setScale(scale);
					this.player1Selection = 2;
					break;
				case "3": //Mapa aleatorio
					this.add.rectangle(posX1, posY, rectWidth, rectHeight, 0x606060);
					this.add.rectangle(posX1, posY, rectWidth - 10, rectHeight - 10, 0x808080);
					this.mapOneImage = this.add.image(posX1, posY, 'randomFondo').setScale(scaleRandom);
					this.player1Selection = 3;
					break;
			}
		}
	}

	//Funcion encargada de indicar el mapa elegido por cada jugador 
	onMapSelected(mapName) {
		if (!this.playersReady) {
			//Algunas variables para facilitar la colocacion de las imagenes y los rectangulos
			var scale = 0.4;
			var scaleRandom = 0.2;
			var posY = 720;
			var posX1 = 420;
			var posX2 = 1500;
			var rectWidth = 800;
			var rectHeight = 470;
			var mapSelect = {
				type: "selectingMap",
				data: -1
			};
			if ((logedUser.player == 1 && !this.selected1) || (logedUser.player == 2 && otherMap != null && !this.selected1)) {
				switch (mapName) {
					case 'desierto':
						mapSelect.data = 0;
						if (logedUser.player == 1) {
							this.add.rectangle(posX1, posY, rectWidth, rectHeight, 0x606060);
							this.add.rectangle(posX1, posY, rectWidth - 10, rectHeight - 10, 0x808080);
							this.mapOneImage = this.add.image(posX1, posY, 'desiertoFondo').setScale(scale);
							this.player1Selection = 0;
							this.selected1 = true;
							connection.send(JSON.stringify(mapSelect));

						}
						else if (logedUser.player == 2) {
							this.add.rectangle(posX2, posY, rectWidth, rectHeight, 0x606060);
							this.add.rectangle(posX2, posY, rectWidth - 10, rectHeight - 10, 0x808080);
							this.mapTwoImage = this.add.image(posX2, posY, 'desiertoFondo').setScale(scale);
							this.player2Selection = 0;
							this.selected1 = true;
							connection.send(JSON.stringify(mapSelect));
							this.onGameStart();
						}
						console.log('Desierto seleccionado');
						break;
					case 'nenufar':
						mapSelect.data = 1;
						if (logedUser.player == 1) {
							this.add.rectangle(posX1, posY, rectWidth, rectHeight, 0x606060);
							this.add.rectangle(posX1, posY, rectWidth - 10, rectHeight - 10, 0x808080);
							this.mapOneImage = this.add.image(posX1, posY, 'nenufarFondo').setScale(scale);
							this.player1Selection = 1;
							this.selected1 = true;
							connection.send(JSON.stringify(mapSelect));
						}
						else if (logedUser.player == 2) {
							this.add.rectangle(posX2, posY, rectWidth, rectHeight, 0x606060);
							this.add.rectangle(posX2, posY, rectWidth - 10, rectHeight - 10, 0x808080);
							this.mapTwoImage = this.add.image(posX2, posY, 'nenufarFondo').setScale(scale);
							this.player2Selection = 1;
							this.selected1 = true;
							connection.send(JSON.stringify(mapSelect));
							this.onGameStart();
						}
						console.log('Nenufar seleccionado');
						break;
					case 'selva':
						mapSelect.data = 2;
						if (logedUser.player == 1) {
							this.add.rectangle(posX1, posY, rectWidth, rectHeight, 0x606060);
							this.add.rectangle(posX1, posY, rectWidth - 10, rectHeight - 10, 0x808080);
							this.mapOneImage = this.add.image(posX1, posY, 'junglaFondo').setScale(scale);
							this.player1Selection = 2;
							this.selected1 = true;
							connection.send(JSON.stringify(mapSelect));
						}
						else if (logedUser.player == 2) {
							this.add.rectangle(posX2, posY, rectWidth, rectHeight, 0x606060);
							this.add.rectangle(posX2, posY, rectWidth - 10, rectHeight - 10, 0x808080);
							this.mapTwoImage = this.add.image(posX2, posY, 'junglaFondo').setScale(scale);
							this.player2Selection = 2;
							this.selected1 = true;
							connection.send(JSON.stringify(mapSelect));
							this.onGameStart();
						}
						console.log('Selva seleccionada');
						break;
					case 'random':
						mapSelect.data = 3;
						if (logedUser.player == 1) {
							this.add.rectangle(posX1, posY, rectWidth, rectHeight, 0x606060);
							this.add.rectangle(posX1, posY, rectWidth - 10, rectHeight - 10, 0x808080);
							this.mapOneImage = this.add.image(posX1, posY, 'randomFondo').setScale(scaleRandom);
							this.player1Selection = 3;
							this.selected1 = true;
							connection.send(JSON.stringify(mapSelect));
						}
						else if (logedUser.player == 2) {
							this.add.rectangle(posX2, posY, rectWidth, rectHeight, 0x606060);
							this.add.rectangle(posX2, posY, rectWidth - 10, rectHeight - 10, 0x808080);
							this.mapTwoImage = this.add.image(posX2, posY, 'randomFondo').setScale(scaleRandom);
							this.player2Selection = 3;
							this.selected1 = true;
							connection.send(JSON.stringify(mapSelect));
							this.onGameStart();
						}
						console.log('Aleatorio seleccionado');
						break;
					default:
						console.log('El boton si funciona pero no entra en los casos');
				}
			}
		}
	}

	onGameStart() {
		this.gameStarting = 1;
	}

	changeTrackMaps(newTrack) {
		this.scene.get('AudioManager').events.emit('changeTrackMaps', newTrack)
	}
}
