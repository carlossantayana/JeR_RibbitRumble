"use strict";

export default class PlayerSelectionMenu extends Phaser.Scene {
    constructor() {
        super('PlayerSelectionMenu');

        //Variables auxiliares
        //Indica cuando los dos jugadores han escogido personaje
        this.playersReady = false;
        //Indica el turno del jugador para escoger personaje
        this.playerSelect = 1;
        //Boton para ir a seleccion de mapa
        this.mapSelection
    }

    create() {
        //Creacion del fondo


        //Creacion de los iconos de los personajes (400x400)
        var BullFrog = this.add.image(750, 330, 'retratoPrueba');
        var RainFrog = this.add.image(1170, 330, 'retratoPrueba');
        var PoisonFrog = this.add.image(750, 750, 'retratoPrueba');
        var TrepadoraFrog = this.add.image(1170, 750, 'retratoPrueba');

        //Creacion de los rectangulos donde saldra la seleccion de los personajes
        var playerOneImage = this.add.image(200, 540, 'retratoPrueba')
        var playerTwoImage = this.add.image(1720, 540, 'retratoPrueba')

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
        this.mapSelection = this.add.image(1710, 900, 'pruebaBoton').setScale(0.5, 0.25)
        this.mapSelection.setInteractive()
        this.mapSelection.on('pointerdown', () => this.onMapSelection());
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
        switch (frogName) {
            case 'BullFrog':
                console.log('Rana toro seleccionada');
                break;
            case 'RainFrog':
                console.log('Rana de lluvia seleccionada');
                break;
            case 'PoisonFrog':
                console.log('Rana punta de flecha seleccionada');
                break;
            case 'TrepadoraFrog':
                console.log('Rana trepadora seleccionada');
                break;
            default:
                console.log('El boton si funciona pero no entra en lso cases');
        }

        //Forma hortera de ver turno del personaje a elegir, todavia no esta la opcion de volver atras
        if (this.playerSelect == 1) {
            this.playerSelect = 2
        }
        else  
        {
            this.playersReady = true;
        }
    }

    //Encargada de llevar a la escena de seleccion de mapa
    onMapSelection() {
        this.scene.start('MapSelectionMenu'); //Cargar Escena de selección de mapa, hay que pasarle la id de personajes
    }
}