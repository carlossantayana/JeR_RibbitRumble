"use strict";

export default class Game extends Phaser.Scene
{
    constructor ()
    {
        super('Game');
    }

    init (player1ID,player2ID,mapID,winsPlayer1,winsPlayer2) //Esto se ejecuta al iniciar la escena, devería recivir los personajes elegidos y el mapa seleccionado (y el número de rondas ganadas por cada uno)
    {
        
    }

    create ()
    {
        //La carga de la pantalla de resultados o le siguiente ronda puede llamarla la escena o el jugador derrotado.
        //La siguiente ronda se puede hacer recargando la escena con el número de victorias actualizado
    }
}