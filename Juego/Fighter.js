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

        this.assignAnimations();
    }

    takeDamage(quantity) {
        this.hp -= quantity;
        if (this.hp <= 0) {
            this.scene.roundEnd(this.player);
        }
    }

    assignAnimations() {
        //Animaciones asignadas:
        if (!this.alt) {
            switch (this.characterID) {
                case 0: //Se asigna el nombre de las animaciones dependiendo del personaje
                    this.idleAnim = "ToroIdleAnim";
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

    playerUpdate() { //Este será el update de cada jugador, donde se comprobarán los inputs correspodientes y se ejecutarán las animaciones. Se deberá llamar en el update de la escena
        if (this.playerID === 1) {//player1 comprobará inputs WASD y player2 los de las flechas
            this.anims.play(this.idleAnim, true);
        }
        else {
            this.anims.play(this.idleAnim, true);
        }
    }
}