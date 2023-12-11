"use strict";

export default class Fighter extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, characterID, altSkin, playerID, texture) {
        super(scene, x, y, texture);
        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        if (characterID == 1) {
            this.setScale(0.2);
        }

        if (characterID == 3) {
            this.setScale(0.2);
        }

        if (playerID == 2) {
            this.setFlipX(true);
        }

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

        this.receivingDamage = false;

        this.touchingGround = false;

        this.assignAnimations();
    }

    takeDamage(quantity) {
        this.hp -= quantity;
        if (this.hp <= 0) {
            this.scene.roundEnd(this.playerID);
        }
    }

    playIdleAnim() {
        var currentAnimationKey = this.anims.currentAnim ? this.anims.currentAnim.key : '';

        if (currentAnimationKey === this.endDuckAnim || currentAnimationKey === this.endJumpAnim) {
            if (!this.anims.isPlaying) {
                this.anims.play(this.idleAnim, true);
            }
        } else {
            this.anims.play(this.idleAnim, true);
        }
    }

    playWalkAnim() {
        this.anims.play(this.walkAnim, true);
    }

    playBasicAttackAnim() {
        this.anims.play(this.attackAnim, true);
    }

    playDownAttackAnim() {
        this.anims.play(this.downAttackAnim, true);
    }

    playBeginJumpAnim() {
        this.anims.play(this.beginJumpAnim, true);
    }

    playJumpAnim() {
        if (this.anims.getProgress(this.beginJumpAnim) == 1) {
            this.anims.play(this.jumpAnim, true);
        }
    }

    playEndJumpAnim() {
        this.anims.play(this.endJumpAnim, true);
    }

    playBeginCrouchAnim() {
        this.anims.play(this.beginDuckAnim, true);
    }

    playCrouchAnim() {
        var currentAnimationKey = this.anims.currentAnim ? this.anims.currentAnim.key : '';

        if (currentAnimationKey === this.beginDuckAnim) {
            if (this.anims.getProgress(this.beginDuckAnim) == 1) {
                this.anims.play(this.duckAnim, true);
            }
        } else {
            this.anims.play(this.duckAnim, true);
        }
    }

    playEndCrouchAnim() {
        this.anims.play(this.endDuckAnim, true);
    }

    playBeginBlockAnim() {
        this.anims.play(this.beginBlockAnim, true);
    }

    playBlockAnim() {
        if (this.anims.getProgress(this.beginBlockAnim) == 1) {
            this.anims.play(this.blockAnim, true);
        }
    }

    playEndBlockAnim() {
        this.anims.play(this.endBlockAnim, true);
    }

    playHurtAnim() {
        this.receivingDamage = true;
        this.anims.play(this.hurtAnim, true);
    }

    checkInmuneStatus() {
        var currentAnimationKey = this.anims.currentAnim ? this.anims.currentAnim.key : '';

        if (currentAnimationKey === this.hurtAnim) {
            if (!this.anims.isPlaying) {
                this.receivingDamage = false;
            }
        }
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
                    this.hurtAnim = "ToroHurtAnim";
                    break;
                case 1:
                    this.idleAnim = "LluviaIdleAnim";
                    this.walkAnim = "LluviaWalkAnim";
                    this.beginBlockAnim = "LluviaBeginBlockAnim";
                    this.blockAnim = "LluviaBlockAnim";
                    this.endBlockAnim = "LluviaEndBlockAnim";
                    this.beginJumpAnim = "LluviaBeginJumpAnim";
                    this.jumpAnim = "LluviaJumpAnim";
                    this.endJumpAnim = "LluviaEndJumpAnim";
                    this.beginDuckAnim = "LluviaBeginCrouchAnim";
                    this.duckAnim = "LluviaCrouchAnim";
                    this.endDuckAnim = "LluviaEndCrouchAnim";
                    this.attackAnim = "LluviaBasicAttackAnim";
                    this.downAttackAnim = "LluviaDownAttackAnim";
                    this.hurtAnim = "LluviaHurtAnim";
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
                    this.hurtAnim = "FlechaHurtAnim";
                    break;
                case 3:
                    this.idleAnim = "TrepadoraIdleAnim";
                    this.walkAnim = "TrepadoraWalkAnim";
                    this.beginBlockAnim = "TrepadoraBeginBlockAnim";
                    this.blockAnim = "TrepadoraBlockAnim";
                    this.endBlockAnim = "TrepadoraEndBlockAnim";
                    this.beginJumpAnim = "TrepadoraBeginJumpAnim";
                    this.jumpAnim = "TrepadoraJumpAnim";
                    this.endJumpAnim = "TrepadoraEndJumpAnim";
                    this.beginDuckAnim = "TrepadoraBeginCrouchAnim";
                    this.duckAnim = "TrepadoraCrouchAnim";
                    this.endDuckAnim = "TrepadoraEndCrouchAnim";
                    this.attackAnim = "TrepadoraBasicAttackAnim";
                    this.downAttackAnim = "TrepadoraDownAttackAnim";
                    this.hurtAnim = "TrepadoraHurtAnim";
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