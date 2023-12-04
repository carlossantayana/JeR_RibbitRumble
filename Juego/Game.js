"use strict";

import Fighter from './Fighter.js';

export default class Game extends Phaser.Scene
{
    constructor ()
    {
        super('Game');
        this.player1;
        this.player2;
        this.p1ID=0;
        this.p2ID=0;
        this.p1Alt=false;
        this.p2Alt=false;
        this.mapID=0;
        this.p1Wins=0;
        this.p2Wins=0;
    }

    init (player1ID,player2ID,player1Alt,player2Alt,mapID,winsPlayer1,winsPlayer2) //Esto se ejecuta al iniciar la escena, devería recivir los personajes elegidos y el mapa seleccionado (y el número de rondas ganadas por cada uno)
    {
        this.p1ID=player1ID;
        this.p2ID=player2ID;
        this.p1Alt=player1Alt;
        this.p2Alt=player2Alt;
        this.mapID=mapID;
        this.p1Wins=winsPlayer1;
        this.p2Wins=winsPlayer2;
    }

    create ()
    {
        this.player1=new Fighter(this,30,60,this.p1ID,this.p1Alt,1);
        this.player2=new Fighter(this,30,60,this.p2ID,this.p2Alt,2);
        this.physics.add.overlap(this.player1,this.player2,() => this.playerOverlap());
        //La carga de la pantalla de resultados o la siguiente ronda puede llamarla la escena o el jugador derrotado.
        //La siguiente ronda se puede hacer recargando la escena con el número de victorias actualizado
    }
    
    update()
    {
        this.player1.playerUpdate();
        this.player2.playerUpdate();
    }

    roundEnd(winerId)
    {
        switch(winerId){
            case 1://Victoria P1
            p1Wins++;
                break;
            case 2://Victoria P2
            p2Wins++;
                break;
        }

        if(this.p1Wins>=2){
            //Cargar escena de resultados con P1 como ganador
        }
        else if(this.p1Wins>=2){
            //Cargar escena de resultados con P2 como ganador
        }
        else{
            //Recargar la escena de juego con los parametros necesarios
        }
    }

    playerOverlap() //Comprobación de los estados de cada jugador comprobando los parametros "attacking" y "blocking"
    {
        if(this.player1.attacking && !this.player2.blocking){
            this.player2.takeDamage(10);
        }
        if(this.player2.attacking && !this.player1.blocking){
            this.player1.takeDamage(10);
        }
    }
}