"use strict";

export default class Fighter extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, characterID, altSkin, playerID, texture) {
        super(scene, x, y, texture);
        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.hp = 100;
        this.characterID = characterID;
        this.altSkin = altSkin;
        this.playerID = playerID;

        //Estos parámetros se utilizan para la comprobación de overlap de jugadores
        this.attacking = false;
        this.blocking = false;
        
        this.justAttack = false;

        this.crouching = false;
        this.jumping = false;

        this.touchingGround = false;

        this.assignAnimations();
    }

    takeDamage(quantity) {
        this.hp -= quantity;
        if (this.hp <= 0) {
            this.scene.roundEnd(this.player);
        }
    }

    playIdleAnim(){
        if(!this.anims.isPlaying){
            this.anims.play(this.idleAnim, true);
        }
    }

    playWalkAnim(){
        this.anims.play(this.walkAnim, true);
    }

    playBasicAttackAnim(){
        this.anims.play(this.attackAnim, true);
    }

    playDownAttackAnim(){
        this.anims.play(this.downAttackAnim, true);
    }

    playBeginJumpAnim(){
        this.anims.play(this.beginJumpAnim, true);
    }

    playJumpAnim(){
        if(this.anims.getProgress(this.beginJumpAnim) == 1){
            this.anims.play(this.jumpAnim, true);
        }
    }

    playEndJumpAnim(){
        this.anims.play(this.endJumpAnim, true);
    }

    playBeginCrouchAnim(){
        this.anims.play(this.beginDuckAnim, true);
    }

    playCrouchAnim(){
        if(this.anims.getProgress(this.beginCrouchAnim) == 1){
            this.anims.play(this.duckAnim, true);
        }
    }

    playEndCrouchAnim(){
        this.anims.play(this.endDuckAnim, true);
    }

    playBeginBlockAnim(){
        this.anims.play(this.beginBlockAnim, true);
    }

    playBlockAnim(){
        if(this.anims.getProgress(this.beginBlockAnim) == 1){
            this.anims.play(this.blockAnim, true);
        }
    }

    playEndBlockAnim(){
        this.anims.play(this.endBlockAnim, true);
    }

    assignAnimations() {
        //Animaciones asignadas:
        if (!this.altSkin) {
            switch (this.characterID) {
                case 0: //Se asigna el nombre de las animaciones dependiendo del personaje
                    this.idleAnim = "ToroIdleAnim";
                    this.walkAnim = "ToroWalkAnim";
                    this.beginBlockAnim = "ToroBeginBlockAnim";
                    this.blockAnim = "ToroBlockAnim";
                    this.endBlockAnim = "ToroEndBlockAnim";
                    this.beginJumpAnim = "ToroBeginJumpAnim";
                    this.jumpAnim = "ToroJumpAnim";
                    this.endJumpAnim = "ToroEndJumpAnim";
                    this.beginDuckAnim = "ToroBeginCrouchAnim";
                    this.duckAnim = "ToroCrouchAnim";
                    this.endDuckAnim = "ToroEndCrouchAnim";
                    this.attackAnim = "ToroBasicAttackAnim";
                    this.downAttackAnim = "ToroDownAttackAnim";
                    break;
                case 1:
                    this.idleAnim = "";
                    this.walkAnim = "";
                    this.beginBlockAnim = "";
                    this.blockAnim = "";
                    this.endBlockAnim = "";
                    this.beginJumpAnim = "";
                    this.jumpAnim = "";
                    this.endJumpAnim = "";
                    this.beginDuckAnim = "";
                    this.duckAnim = "";
                    this.endDuckAnim = "";
                    this.attackAnim = "";
                    this.downAttackAnim = "";
                    break;
                case 2:
                    this.idleAnim = "FlechaIdleAnim";
                    this.walkAnim = "FlechaWalkAnim";
                    this.beginBlockAnim = "FlechaBeginBlockAnim";
                    this.blockAnim = "FlechaBlockAnim";
                    this.endBlockAnim = "FlechaEndBlockAnim";
                    this.beginJumpAnim = "FlechaBeginJumpAnim";
                    this.jumpAnim = "FlechaJumpAnim";
                    this.endJumpAnim = "FlechaEndJumpAnim";
                    this.beginDuckAnim = "FlechaBeginCrouchAnim";
                    this.duckAnim = "FlechaCrouchAnim";
                    this.endDuckAnim = "FlechaEndCrouchAnim";
                    this.attackAnim = "FlechaBasicAttackAnim";
                    this.downAttackAnim = "FlechaDownAttackAnim";
                    break;
                case 3:
                    this.idleAnim = "";
                    this.walkAnim = "";
                    this.beginBlockAnim = "";
                    this.blockAnim = "";
                    this.endBlockAnim = "";
                    this.beginJumpAnim = "";
                    this.jumpAnim = "";
                    this.endJumpAnim = "";
                    this.beginDuckAnim = "";
                    this.duckAnim = "";
                    this.endDuckAnim = "";
                    this.attackAnim = "";
                    this.downAttackAnim = "";
                    break;
            }

        }
        else {
            switch (this.characterID) {
                case 0: //Se asigna el nombre de las animaciones dependiendo del personaje con skin alternativa;
                    this.idleAnim = "";
                    this.walkAnim = "";
                    this.blockAnim = "";
                    this.jumpAnim = "";
                    this.duckAnim = "";
                    this.attackAnim = "";
                    this.downAttackAnim = "";
                    this.airAttackAnim = "";
                    break;
                case 1:
                    this.idleAnim = "";
                    this.walkAnim = "";
                    this.blockAnim = "";
                    this.jumpAnim = "";
                    this.duckAnim = "";
                    this.attackAnim = "";
                    this.downAttackAnim = "";
                    this.airAttackAnim = "";
                    break;
                case 2:
                    this.idleAnim = "";
                    this.walkAnim = "";
                    this.blockAnim = "";
                    this.jumpAnim = "";
                    this.duckAnim = "";
                    this.attackAnim = "";
                    this.downAttackAnim = "";
                    this.airAttackAnim = "";
                    break;
                case 3:
                    this.idleAnim = "";
                    this.walkAnim = "";
                    this.blockAnim = "";
                    this.jumpAnim = "";
                    this.duckAnim = "";
                    this.attackAnim = "";
                    this.downAttackAnim = "";
                    this.airAttackAnim = "";
                    break;
            }
        }
    }
}