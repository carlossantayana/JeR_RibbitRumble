"use strict";
var transitionTimer = 0;

var transition = false

export default class PlayerSelectionMenuNet extends Phaser.Scene {
	constructor() {
		super('PlayerSelectionMenuNet');

		//Variables auxiliares
		//Indica cuando los dos jugadores han escogido personaje
		this.playersReady = false;
		this.selected1 = false;

		this.parameters = {
			player1CharacterID: null,
			player2CharacterID: null,
		}

		this.turnoTexto = null;
		this.turnoNum = null;
	}

	create() {
		//Creacion del fondo

		this.add.image(960, 534.5, 'menuFondo').setScale(0.5);

		//Creacion de los iconos de los personajes 
		this.add.rectangle(800, 380, 250, 250, 0x606060);
		var BullFrog = this.add.rectangle(800, 380, 230, 230, 0x808080);
		this.add.image(800, 380, 'logoRanaToro').setScale(0.2);

		this.add.rectangle(1120, 380, 250, 250, 0x606060);
		var RainFrog = this.add.rectangle(1120, 380, 230, 230, 0x808080);
		this.add.image(1120, 380, 'logoRanaDeLluvia').setScale(0.2);

		this.add.rectangle(800, 700, 250, 250, 0x606060);
		var PoisonFrog = this.add.rectangle(800, 700, 230, 230, 0x808080);
		this.add.image(800, 700, 'logoRanaPuntaDeFlecha').setScale(0.2);

		this.add.rectangle(1120, 700, 250, 250, 0x606060);
		var TrepadoraFrog = this.add.rectangle(1120, 700, 230, 230, 0x808080);
		this.add.image(1120, 700, 'logoRanaTrepadora').setScale(0.2);

		//Texto superior "Selecciona un personaje:"
		if (logedUser.player == 1) {
			this.add.text(60, 40, "Eres el jugador 1", { fontSize: '40px' });
		}

		if (logedUser.player == 2) {
			this.add.text(60, 40, "Eres el jugador 2", { fontSize: '40px' });
		}

		this.turnoTexto = this.add.text(740, 40, "Turno del jugador 1", { fontSize: '40px' });

		//Texto de los jugadores
		this.add.rectangle(212, 250, 380, 110, 0x606060);
		this.add.rectangle(212, 250, 365, 95, 0x808080);
		this.add.rectangle(1698, 250, 390, 110, 0x606060);
		this.add.rectangle(1698, 250, 375, 95, 0x808080);

		this.add.image(220, 250, 'Player1Text').setScale(0.7);
		this.add.image(1698, 250, 'Player2Text').setScale(0.7);

		//Creacion de la interaccion de los botones
		BullFrog.setInteractive();
		RainFrog.setInteractive();
		PoisonFrog.setInteractive();
		TrepadoraFrog.setInteractive();

		//Despues de definirlos como interactuables, se crea el evento del click y la funcion a la que llama
		BullFrog.on('pointerdown', () => this.onFrogSelected('BullFrog'));
		RainFrog.on('pointerdown', () => this.onFrogSelected('RainFrog'));
		PoisonFrog.on('pointerdown', () => this.onFrogSelected('PoisonFrog'));
		TrepadoraFrog.on('pointerdown', () => this.onFrogSelected('TrepadoraFrog'));

	}

	SetOtherCharacter() {
		var scale = 0.5;
		if (logedUser.player == 1 && (otherCharacter != null) && this.parameters.player2CharacterID == null) {	//Para mostrar la rana del jugador 2 al jugador 1
			switch (otherCharacter) {
				case "0": //Rana toro
					this.add.image(1720, 700, 'ranaToroSelect').setScale(scale).setFlipX(true);
					this.parameters.player2CharacterID = 0;
					break;
				case "1": //Rana lluvia
					this.add.image(1720, 700, 'ranaLLuviaSelect').setScale(scale).setFlipX(true);
					this.parameters.player2CharacterID = 1;
					break;
				case "2": //Rana punta
					this.add.image(1720, 700, 'ranaFlechaSelect').setScale(scale).setFlipX(true);
					this.parameters.player2CharacterID = 2;
					break;
				case "3": //Rana trepadora
					this.add.image(1720, 700, 'ranaTrepadoraSelect').setScale(scale).setFlipX(true);
					this.parameters.player2CharacterID = 3;
					break;
			}
		}

		if (logedUser.player == 2 && (otherCharacter != null) && this.parameters.player1CharacterID == null) { // Para que el jugador 2 vea que selecciono el jugador 1
			switch (otherCharacter) {
				case "0": //Rana toro
					this.add.image(200, 700, 'ranaToroSelect').setScale(scale);
					this.parameters.player1CharacterID = 0;

					break;
				case "1": //Rana lluvia
					this.add.image(200, 700, 'ranaLLuviaSelect').setScale(scale);
					this.parameters.player1CharacterID = 1;
					break;
				case "2": //Rana punta
					this.add.image(200, 700, 'ranaFlechaSelect').setScale(scale);
					this.parameters.player1CharacterID = 2;
					break;
				case "3": //Rana trepadora
					this.add.image(200, 700, 'ranaTrepadoraSelect').setScale(scale);
					this.parameters.player1CharacterID = 3;
					break;

			}
			this.turnoTexto.destroy();
			this.turnoTexto = this.add.text(740, 40, "Turno del jugador 2", { fontSize: '40px' });
		}
	}

	update(time, delta) {

		this.SetOtherCharacter();
		//Si los dos jugadores han escogido personaje, se va a la seleccion de mapa
		if (this.parameters.player1CharacterID != null && this.parameters.player2CharacterID != null) {
			transition = true;
		}
		if (transition) {
			transitionTimer += delta / 1000;
			if(transitionTimer >= 0 && transitionTimer < 1)
			{
				if(this.turnoNum != null){
				this.turnoNum.destroy();
				}
				this.turnoNum = this.add.image(960, 960, '3').setScale(0.65, 0.65);
			}
			if(transitionTimer >= 1 && transitionTimer < 2)
			{
				this.turnoNum.destroy();
				this.turnoNum = this.add.image(960, 960, '2').setScale(0.65, 0.65);
			}
			if(transitionTimer >= 2 && transitionTimer <= 3)
			{
				this.turnoNum.destroy();
				this.turnoNum = this.add.image(960, 960, '1').setScale(0.65, 0.65);
			}
			if (transitionTimer > 3) {
				//cambio de escena
				this.scene.start("MapSelectionMenuNet", this.parameters);
				this.scene.stop();
			}
		}

	}

	//Encargada de indicar el personaje elegido y de mostrar la imagen del rectangulo
	onFrogSelected(frogName) {
		if (!this.playersReady) {
			var scale = 0.5;
			if ((logedUser.player == 1 && !this.selected1) || (logedUser.player == 2 && otherCharacter != null && !this.selected1)) {
				var characterSelect = {
					type: "selectingCharacter",
					data: -1
				};
				console.log(this.selected1);
				switch (frogName) {
					case 'BullFrog':
						characterSelect.data = 0;
						if (logedUser.player == 1) {
							this.add.image(200, 700, 'ranaToroSelect').setScale(scale);
							this.selected1 = true;
							this.parameters.player1CharacterID = 0;
							connection.send(JSON.stringify(characterSelect));
							this.turnoTexto.destroy();
							this.turnoTexto = this.add.text(740, 40, "Turno del jugador 2", { fontSize: '40px' });
						}
						else if (logedUser.player == 2) {
							this.add.image(1720, 700, 'ranaToroSelect').setScale(scale).setFlipX(true);
							this.selected1 = true;
							this.parameters.player2CharacterID = 0;
							connection.send(JSON.stringify(characterSelect));
						}
						console.log('Rana toro seleccionada');
						break;
					case 'RainFrog':
						characterSelect.data = 1;
						if (logedUser.player == 1) {
							this.add.image(200, 700, 'ranaLLuviaSelect').setScale(scale);
							this.selected1 = true;
							this.parameters.player1CharacterID = 1;
							connection.send(JSON.stringify(characterSelect));
							this.turnoTexto.destroy();
							this.turnoTexto = this.add.text(740, 40, "Turno del jugador 2", { fontSize: '40px' });
						}
						else if (logedUser.player == 2) {
							this.add.image(1720, 700, 'ranaLLuviaSelect').setScale(scale).setFlipX(true);
							this.selected1 = true;
							this.parameters.player2CharacterID = 1;
							connection.send(JSON.stringify(characterSelect));
						}
						console.log('Rana de lluvia seleccionada');
						break;
					case 'PoisonFrog':
						characterSelect.data = 2;
						if (logedUser.player == 1) {
							this.add.image(200, 700, 'ranaFlechaSelect').setScale(scale);
							this.selected1 = true;
							this.parameters.player1CharacterID = 2;
							connection.send(JSON.stringify(characterSelect));
							this.turnoTexto.destroy();
							this.turnoTexto = this.add.text(740, 40, "Turno del jugador 2", { fontSize: '40px' });
						}
						else if (logedUser.player == 2) {
							this.add.image(1720, 700, 'ranaFlechaSelect').setScale(scale).setFlipX(true);
							this.selected1 = true;
							this.parameters.player2CharacterID = 2;
							connection.send(JSON.stringify(characterSelect));
						}
						console.log('Rana punta de flecha seleccionada');
						break;
					case 'TrepadoraFrog':
						characterSelect.data = 3;
						if (logedUser.player == 1) {
							this.add.image(200, 700, 'ranaTrepadoraSelect').setScale(scale);
							this.selected1 = true;
							this.parameters.player1CharacterID = 3;
							connection.send(JSON.stringify(characterSelect));
							this.turnoTexto.destroy();
							this.turnoTexto = this.add.text(740, 40, "Turno del jugador 2", { fontSize: '40px' });
						}
						else if (logedUser.player == 2) {
							this.add.image(1720, 700, 'ranaTrepadoraSelect').setScale(scale).setFlipX(true);
							this.selected1 = true;
							this.parameters.player2CharacterID = 3;
							connection.send(JSON.stringify(characterSelect));
						}
						console.log('Rana trepadora seleccionada');
						break;
					default:
						console.log('El boton si funciona pero no entra en los casos');
				}

			}
		}
	}
}