"use strict";

export default class MapSelectionMenu extends Phaser.Scene
{
    constructor ()
    {
        super('MapSelectionMenu');
    }

    init (player1ID,player2ID) //Esto se ejecuta al iniciar la escena, para recivir los personajes elegidos
    {

    }

    create ()
    {
        this.add.image(940, 534.5, 'menuFondo').setScale(0.5);
        //Se tiene que cargar la escena de juego, pasándole los personajes elegidos y el mapa seleccionado
        
    }
}