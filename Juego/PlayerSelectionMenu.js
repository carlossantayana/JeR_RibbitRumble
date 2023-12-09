"use strict";

export default class PlayerSelectionMenu extends Phaser.Scene {
    constructor() {
        super('PlayerSelectionMenu');

        //Variables auxiliares
        //Indica cuando los dos jugadores han escogido personaje
        this.playersReady = false;
        //Indica el turno del jugador para escoger personaje
        this.playerSelect = 1;     
        
        this.parameters= {
            player1CharacterID: null,
            player2CharacterID: null
        }
    }

    create() {
        //Creacion del fondo

        this.add.image(940, 534.5, 'menuFondo').setScale(0.5);

        //Creacion de los iconos de los personajes (400x400)
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

        //Creacion de los rectangulos donde saldra la seleccion de los personajes



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

        //Creacion del boton de ir a seleccion de mapa
        this.mapSelection = this.add.image(960, 960, 'botonContinuar').setScale(0.5);
        
        this.mapSelection.setInteractive()
        this.mapSelection.on('pointerdown', () => this.onMapSelection());
        this.mapSelection.on('pointerover', function(){this.setScale(0.55)});
        this.mapSelection.on('pointerout', function(){this.setScale(0.5)});
        this.mapSelection.setVisible(false)
    }

    update() {
        //Si los dos jugadores han escogido personaje, se pone visible el boton para ir a seleccion de mapa
        if (this.playersReady == true) {
            this.mapSelection.setVisible(true)
        }
        else {  //En el caso contrario, lo deja oculto
            this.mapSelection.setVisible(false)
        }
    }

    //Encargada de indicar el personaje elegido y de mostrar la imagen del rectangulo
    onFrogSelected(frogName) {
        if (!this.playersReady) {
            var scale = 0.5;
            switch (frogName) {
                case 'BullFrog':
                    if (this.playerSelect == 1) {
                        this.add.image(200, 700, 'ranaToroSelect').setScale(scale);
                        this.parameters.player1CharacterID = 0;
                    }
                    else if (this.playerSelect == 2) {
                        this.add.image(1720, 700, 'ranaToroSelect').setScale(scale).setFlipX(true);
                        this.parameters.player2CharacterID = 0;
                    }
                    console.log('Rana toro seleccionada');
                    break;
                case 'RainFrog':
                    if (this.playerSelect == 1) {
                        this.add.image(200, 700, 'ranaLLuviaSelect').setScale(scale);
                        this.parameters.player1CharacterID = 1;
                    }
                    else if (this.playerSelect == 2) {
                        this.add.image(1720, 700, 'ranaLLuviaSelect').setScale(scale).setFlipX(true);
                        this.parameters.player2CharacterID = 1;
                    }
                    console.log('Rana de lluvia seleccionada');
                    break;
                case 'PoisonFrog':
                    if (this.playerSelect == 1) {
                        this.add.image(200, 700, 'ranaFlechaSelect').setScale(scale);
                        this.parameters.player1CharacterID = 2;
                    }
                    else if (this.playerSelect == 2) {
                        this.add.image(1720, 700, 'ranaFlechaSelect').setScale(scale).setFlipX(true);
                        this.parameters.player2CharacterID = 2;
                    }
                    console.log('Rana punta de flecha seleccionada');
                    break;
                case 'TrepadoraFrog':
                    if (this.playerSelect == 1) {
                        this.add.image(200, 700, 'ranaTrepadoraSelect').setScale(scale);
                        this.parameters.player1CharacterID = 3;
                    }
                    else if (this.playerSelect == 2) {
                        this.add.image(1720, 700, 'ranaTrepadoraSelect').setScale(scale).setFlipX(true);
                        this.parameters.player2CharacterID = 3;
                    }
                    console.log('Rana trepadora seleccionada');
                    break;
                default:
                    console.log('El boton si funciona pero no entra en los casos');
            }


            //Forma hortera de ver turno del personaje a elegir, todavia no esta la opcion de volver atras
            if (this.playerSelect == 1) {
                this.playerSelect = 2;
            }
            else if (this.playerSelect == 2) {
                this.playerSelect == 0;
                this.playersReady = true;
            }
        }
    }

    //Encargada de llevar a la escena de seleccion de mapa
    onMapSelection() {
        this.scene.start('MapSelectionMenu', this.parameters); //Cargar Escena de selección de mapa, hay que pasarle la id de personajes
    }
}