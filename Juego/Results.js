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
        this.parameters.p1CharacterID=data.player1CharacterID;
        this.parameters.p2CharacterID=data.player2CharacterID;
        this.parameters.winnerId=data.winnerId;
    }

    create ()
    {
        this.add.image(940, 534.5, 'menuFondo').setScale(0.5);
        switch(this.parameters.p1CharacterID){
            case 0:
                this.p1Sprite= this.add.sprite(940,500,"ToroIdle");
                break;
            case 1:
                this.p1Sprite=this.add.sprite(940,500,"LluviaIdle");
                break;
            case 2:
                this.p1Sprite=this.add.sprite(940,500,"FlechaIdle");
                break;
            case 3:
                this.p1Sprite=this.add.sprite(940,500,"TrepadoraIdle");
                break;
        }
        switch(this.parameters.p2CharacterID){
            case 0:
                this.p2Sprite=this.add.sprite(940,500,"ToroIdle");
                break;
            case 1:
                this.p2Sprite=this.add.sprite(940,500,"LluviaIdle");
                break;
            case 2:
                this.p2Sprite=this.add.sprite(940,500,"FlechaIdle");
                break;
            case 3:
                this.p2Sprite=this.add.sprite(940,500,"TrepadoraIdle");
                break;
        }
        
        if(this.parameters.winnerId===1){
            this.p1Sprite.setPosition(400,800);
            switch(this.parameters.p1CharacterID){
                case 0:
                    this.p1Sprite.setScale(2);
                    break;
                case 1:
                    this.p1Sprite.setScale(0.4);
                    break;
                case 2:
                    this.p1Sprite.setScale(2.5);
                    this.p1Sprite.y-=30;
                    break;
                case 3:
                    this.p1Sprite.setScale(2);
                    break;
            }
            this.p2Sprite.setPosition(1410,800);
            switch(this.parameters.p2CharacterID){
                case 0:
                    this.p2Sprite.setScale(0.75);
                    break;
                case 1:
                    this.p2Sprite.setScale(0.1);
                    break;
                case 2:
                    this.p2Sprite.setScale(0.75);
                    break;
                case 3:
                    this.p2Sprite.setScale(0.75);
                    break;
            }
            this.p2Sprite.flipX=true;
        }
        else if(this.parameters.winnerId===2){
            this.p2Sprite.setPosition(400,800);
            switch(this.parameters.p2CharacterID){
                case 0:
                    this.p2Sprite.setScale(2);
                    break;
                case 1:
                    this.p2Sprite.setScale(0.4);
                    break;
                case 2:
                    this.p2Sprite.setScale(2.5);
                    break;
                case 3:
                    this.p2Sprite.setScale(2);
                    break;
            }
            this.p1Sprite.setPosition(1410,800);
            switch(this.parameters.p1CharacterID){
                case 0:
                    this.p1Sprite.setScale(0.75);
                    break;
                case 1:
                    this.p1Sprite.setScale(0.1);
                    break;
                case 2:
                    this.p1Sprite.setScale(0.75);
                    break;
                case 3:
                    this.p1Sprite.setScale(0.75);
                    break;
            }
            this.p1Sprite.flipX=true;
        }
        
    }
}