"use strict";

export default class Results extends Phaser.Scene
{
    constructor ()
    {
        super('Results');
        this.parameters = {
            p1CharacterID: 0,
            p2CharacterID: 0,
            winnerId: 0
        }
    }

    init (data) //Esto se ejecuta al iniciar la escena, recibirá el personaje ganador y perdedor, además del número del jugador que haya ganado
    {
        this.parameters.p1CharacterID=data.p1CharacterID;
        this.parameters.p2CharacterID=data.p2CharacterID;
        this.parameters.winnerId=data.winnerId;
    }

    create ()
    {
        this.add.image(940, 534.5, 'menuFondo').setScale(0.5);
        switch(p1CharacterID){
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }
}