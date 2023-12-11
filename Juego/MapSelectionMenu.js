"use strict";

export default class MapSelectionMenu extends Phaser.Scene {
    constructor() {
        super('MapSelectionMenu');
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
        this.add.text(450, 40, "Selecciona un escenario", { fontSize: '80px' });

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
        this.add.rectangle(212, 1020, 340, 110, 0x606060);
        this.add.rectangle(212, 1020, 325, 95, 0x808080);
        this.add.rectangle(1698, 1020, 350, 110, 0x606060);
        this.add.rectangle(1698, 1020, 335, 95, 0x808080);
        this.add.image(220, 1020, 'Player1Text').setScale(0.7);
        this.add.image(1700, 1020, 'Player2Text').setScale(0.7);

        //Creacion del boton de ir al juego
        this.mapSelected = this.add.image(960, 1000, 'botonCombate').setScale(0.5);
        this.mapSelected.setInteractive()
        this.mapSelected.on('pointerdown', () => this.onGameStart());
        this.mapSelected.on('pointerover', function () { this.setScale(0.55) });
        this.mapSelected.on('pointerout', function () { this.setScale(0.5) });
        this.mapSelected.setVisible(false);

    }
    update(time, delta) {
        //Si los dos jugadores han escogido personaje, se pone visible el boton para ir a seleccion de mapa
        if (this.playersReady == true && this.gameStarting == 0) {
            this.mapSelected.setVisible(true);
        }
        else {  //En el caso contrario, lo deja oculto
            this.mapSelected.setVisible(false);
        }

        //If al que entra el update una vez cuando se pulsa el boton, dentro se elige de forma aleatoria el mapa entre los dos mapas elegidos por los jugadores
        if (this.gameStarting == 1) {
            this.mapSelected.setVisible(false);
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
        }
        //Una vez elegido el mapa internamente, se le muestra a los jugadores un efecto de ruleta aleatoria entre los mapas elegidos
        if (this.gameStarting == 2) {
            this.timer += delta/1000;
            this.timerFinal += delta/1000;
            console.log("Timer 1 = " + this.timer)
            console.log("Timer 2 = " + this.timerFinal)

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
            this.parameters.mapID = this.finalSelection;
            this.timerChangeScene+=delta/1000;
            console.log("Timer 3 = " + this.timerChangeScene)


            if (this.timerChangeScene >= 3) {
                this.playersReady = false;
                this.playerSelect = 1;
                this.gameStarting = 0;
                this.mapOneImage=undefined;
                this.mapTwoImage=undefined;
                this.player1Selection=undefined;
                this.player2Selection=undefined;
                this.finalSelection=undefined;
                this.p1=undefined;
                this.timer = 0;
                this.timerFinal = 0;
                this.timerChangeScene = 0;
                this.scene.start('Game', this.parameters);
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

            switch (mapName) {
                case 'desierto':
                    if (this.playerSelect == 1) {
                        this.add.rectangle(posX1, posY, rectWidth, rectHeight, 0x606060);
                        this.add.rectangle(posX1, posY, rectWidth - 10, rectHeight - 10, 0x808080);
                        this.mapOneImage = this.add.image(posX1, posY, 'desiertoFondo').setScale(scale);
                        this.player1Selection = 0;
                    }
                    else if (this.playerSelect == 2) {
                        this.add.rectangle(posX2, posY, rectWidth, rectHeight, 0x606060);
                        this.add.rectangle(posX2, posY, rectWidth - 10, rectHeight - 10, 0x808080);
                        this.mapTwoImage = this.add.image(posX2, posY, 'desiertoFondo').setScale(scale);
                        this.player2Selection = 0;
                    }
                    console.log('Desierto seleccionado');
                    break;
                case 'nenufar':
                    if (this.playerSelect == 1) {
                        this.add.rectangle(posX1, posY, rectWidth, rectHeight, 0x606060);
                        this.add.rectangle(posX1, posY, rectWidth - 10, rectHeight - 10, 0x808080);
                        this.mapOneImage = this.add.image(posX1, posY, 'nenufarFondo').setScale(scale);
                        this.player1Selection = 1;
                    }
                    else if (this.playerSelect == 2) {
                        this.add.rectangle(posX2, posY, rectWidth, rectHeight, 0x606060);
                        this.add.rectangle(posX2, posY, rectWidth - 10, rectHeight - 10, 0x808080);
                        this.mapTwoImage = this.add.image(posX2, posY, 'nenufarFondo').setScale(scale);
                        this.player2Selection = 1;
                    }
                    console.log('Nenufar seleccionado');
                    break;
                case 'selva':
                    if (this.playerSelect == 1) {
                        this.add.rectangle(posX1, posY, rectWidth, rectHeight, 0x606060);
                        this.add.rectangle(posX1, posY, rectWidth - 10, rectHeight - 10, 0x808080);
                        this.mapOneImage = this.add.image(posX1, posY, 'junglaFondo').setScale(scale);
                        this.player1Selection = 2;
                    }
                    else if (this.playerSelect == 2) {
                        this.add.rectangle(posX2, posY, rectWidth, rectHeight, 0x606060);
                        this.add.rectangle(posX2, posY, rectWidth - 10, rectHeight - 10, 0x808080);
                        this.mapTwoImage = this.add.image(posX2, posY, 'junglaFondo').setScale(scale);
                        this.player2Selection = 2;
                    }
                    console.log('Selva seleccionada');
                    break;
                case 'random':
                    if (this.playerSelect == 1) {
                        this.add.rectangle(posX1, posY, rectWidth, rectHeight, 0x606060);
                        this.add.rectangle(posX1, posY, rectWidth - 10, rectHeight - 10, 0x808080);
                        this.mapOneImage = this.add.image(posX1, posY, 'randomFondo').setScale(scaleRandom);
                        this.player1Selection = 3;
                    }
                    else if (this.playerSelect == 2) {
                        this.add.rectangle(posX2, posY, rectWidth, rectHeight, 0x606060);
                        this.add.rectangle(posX2, posY, rectWidth - 10, rectHeight - 10, 0x808080);
                        this.mapTwoImage = this.add.image(posX2, posY, 'randomFondo').setScale(scaleRandom);
                        this.player2Selection = 3;
                    }
                    console.log('Aleatorio seleccionado');
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

    onGameStart() {
        this.gameStarting = 1;
    }
}
