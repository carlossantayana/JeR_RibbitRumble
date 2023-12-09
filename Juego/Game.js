"use strict";

import Fighter from './Fighter.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.player1;
        this.player2;

        this.parameters = {
            p1CharacterID: 0,
            p2CharacterID: 0,
            p1AltSkin: false,
            p2AltSkin: false,
            mapID: 0,
            p1WonRounds: 0,
            p2WonRounds: 0
        }
    }

    init(data) //Esto se ejecuta al iniciar la escena, debería recibir los personajes elegidos y el mapa seleccionado (y el número de rondas ganadas por cada uno)
    {
        this.parameters.p1CharacterID = data.player1CharacterID;
        this.parameters.p2CharacterID = data.player2CharacterID;
        this.parameters.p1AltSkin = false;
        this.parameters.p2AltSkin = false;
        this.parameters.mapID = data.mapID;
        this.parameters.p1WonRounds = data.wonRoundsPlayer1;
        this.parameters.p2WonRounds = data.wonRoundsPlayer2;
    }

    create() {
        this.physics.world.gravity.y = 300;

        switch(this.parameters.mapID){
            case 0:
                this.add.image(960, 540, 'desiertoFondo');
                break;
            case 1:
                this.add.image(960, 540, 'nenufarFondo');
                break;
            case 2:
                this.add.image(960, 540, 'junglaFondo');
        }

        var p1Texture;
        var p2Texture;

        switch(this.parameters.p1CharacterID){
            case 0:
                p1Texture = 'ToroIdle';
                break;
            case 1:
                p1Texture = '';
                break;
            case 2:
                p1Texture = '';
                break;
            case 3:
                p1Texture = '';
                break;
        }

        switch(this.parameters.p2CharacterID){
            case 0:
                p2Texture = 'ToroIdle';
                break;
            case 1:
                p2Texture = '';
                break;
            case 2:
                p2Texture = '';
                break;
            case 3:
                p2Texture = '';
                break;
        }

        this.player1 = new Fighter(this, 600, 600, this.parameters.p1CharacterID, this.parameters.p1AltSkin, 1, p1Texture);
        this.player2 = new Fighter(this, 900, 600, this.parameters.p2CharacterID, this.parameters.p2AltSkin, 2, p2Texture);
        this.physics.add.overlap(this.player1, this.player2, () => this.playerOverlap());
        //La carga de la pantalla de resultados o la siguiente ronda puede llamarla la escena o el jugador derrotado.
        //La siguiente ronda se puede hacer recargando la escena con el número de victorias actualizado
    }

    update() {
        this.player1.playerUpdate(this.player1);
        this.player2.playerUpdate(this.player2);
    }

    roundEnd(winnerId) {
        switch (winnerId) {
            case 1://Victoria P1
                this.p1WonRounds++;
                break;
            case 2://Victoria P2
                this.p2WonRounds++;
                break;
        }

        if (this.p1WonRounds >= 2) {
            //Cargar escena de resultados con P1 como ganador
        }
        else if (this.p2WonRounds >= 2) {
            //Cargar escena de resultados con P2 como ganador
        }
        else {
            //Recargar la escena de juego con los parametros necesarios
        }
    }

    playerOverlap() //Comprobación de los estados de cada jugador comprobando los parametros "attacking" y "blocking"
    {
        if (this.player1.attacking && !this.player2.blocking) {
            this.player2.takeDamage(10);
        }
        if (this.player2.attacking && !this.player1.blocking) {
            this.player1.takeDamage(10);
        }
    }
}