"use strict";

import Fighter from './Fighter.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.player1;
        this.player2;

        this.ground;

        this.cursors;
        this.keyW;
        this.keyA;
        this.keyS;
        this.keyD;
        this.keyF;
        this.keyG;
        this.keyNumpad1;
        this.keyNumpad2;

        this.AttackHitboxUpP1;
        this.AttackHitboxDownP1;

        this.AttackHitboxUpP2;
        this.AttackHitboxDownP2;

        this.parameters = {
            p1CharacterID: 0,
            p2CharacterID: 0,
            p1AltSkin: false,
            p2AltSkin: false,
            mapID: 0,
            p1WonRounds: 0,
            p2WonRounds: 0,
            winnerId: 0,
            loses: 0
        }

        this.barraVidap1
        this.barraVidap2

        this.timer = 0;
        this.numeroUno;
        this.numeroDos;
        this.cifra1;
        this.cifra2;

        this.punteroP1;
        this.punteroP2;

    }

    init(data) //Esto se ejecuta al iniciar la escena, recibe los personajes elegidos y el mapa seleccionado 
    {
        this.parameters.p1CharacterID = data.player1CharacterID;
        this.parameters.p2CharacterID = data.player2CharacterID;
        this.parameters.p1AltSkin = false;
        this.parameters.p2AltSkin = false;
        this.parameters.mapID = data.mapID;
        this.parameters.p1WonRounds = 0;
        this.parameters.p2WonRounds = 0;
        
    }

    create() {
        this.physics.world.gravity.y = 900;

        this.ground = this.physics.add.staticGroup();

        switch (this.parameters.mapID) {
            case 0:
				console.log("Creando suelo desierto")
                this.ground.create(960, 1075, '').setScale(1920, 4).refreshBody();
                this.add.image(960, 540, 'desiertoFondo');
                break;
            case 1:
				console.log("Creando suelo nenufar")
                this.ground.create(960, 1080, '').setScale(1920, 4).refreshBody();
                this.add.image(960, 540, 'nenufarFondo');
                break;
            case 2:
				console.log("Creando suelo jungla")
                this.ground.create(960, 1030, '').setScale(1920, 6).refreshBody();
                this.add.image(960, 540, 'junglaFondo');
                break;
            default:
				console.log("No se ha podido crear el fondo y el suelo")
        }

        var p1Texture;
        var p2Texture;

        switch (this.parameters.p1CharacterID) {
            case 0:
                p1Texture = 'ToroIdle';
                break;
            case 1:
                p1Texture = 'LluviaIdle';
                break;
            case 2:
                p1Texture = 'FlechaIdle';
                break;
            case 3:
                p1Texture = 'TrepadoraIdle';
                break;
        }

        switch (this.parameters.p2CharacterID) {
            case 0:
                p2Texture = 'ToroIdle';
                break;
            case 1:
                p2Texture = 'LluviaIdle';
                break;
            case 2:
                p2Texture = 'FlechaIdle';
                break;
            case 3:
                p2Texture = 'TrepadoraIdle';
                break;
        }

        this.player1 = new Fighter(this, 190, 800, this.parameters.p1CharacterID, this.parameters.p1AltSkin, 1, p1Texture);
        this.player2 = new Fighter(this, 1730, 800, this.parameters.p2CharacterID, this.parameters.p2AltSkin, 2, p2Texture);

        this.player1.lookingRight = true;

        this.physics.add.collider(this.player1, this.ground, () => this.player1.touchingGround = true);
        this.physics.add.collider(this.player2, this.ground, () => this.player2.touchingGround = true);

        //Inputs
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.keyNumpad1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE);
        this.keyNumpad2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO);

        //Attack HitBoxes
        switch (this.parameters.p1CharacterID) {
            case 0:
                this.AttackHitboxUpP1 = this.physics.add.image(this.player1.x + 180, this.player1.y - 20, '');
                this.AttackHitboxUpP1.setAlpha(0);
                this.AttackHitboxUpP1.setSize(60, 120);

                this.AttackHitboxDownP1 = this.physics.add.image(this.player1.x + 215, this.player1.y, '');
                this.AttackHitboxDownP1.setAlpha(0);
                this.AttackHitboxDownP1.setSize(170, 25);
                break;
            case 1:
                this.AttackHitboxUpP1 = this.physics.add.image(this.player1.x + 130, this.player1.y - 20, '');
                this.AttackHitboxUpP1.setAlpha(0);
                this.AttackHitboxUpP1.setSize(45, 115);

                this.AttackHitboxDownP1 = this.physics.add.image(this.player1.x + 130, this.player1.y + 45, '');
                this.AttackHitboxDownP1.setAlpha(0);
                this.AttackHitboxDownP1.setSize(45, 70);
                break;
            case 2:
                this.AttackHitboxUpP1 = this.physics.add.image(this.player1.x + 100, this.player1.y + 78, '');
                this.AttackHitboxUpP1.setAlpha(0);
                this.AttackHitboxUpP1.setSize(50, 40);

                this.AttackHitboxDownP1 = this.physics.add.image(this.player1.x + 120, this.player1.y + 95, '');
                this.AttackHitboxDownP1.setAlpha(0);
                this.AttackHitboxDownP1.setSize(55, 30);
                break;
            case 3:
                this.AttackHitboxUpP1 = this.physics.add.image(this.player1.x + 170, this.player1.y - 35, '');
                this.AttackHitboxUpP1.setAlpha(0);
                this.AttackHitboxUpP1.setSize(210, 50);

                this.AttackHitboxDownP1 = this.physics.add.image(this.player1.x + 170, this.player1.y - 14, '');
                this.AttackHitboxDownP1.setAlpha(0);
                this.AttackHitboxDownP1.setSize(210, 50);
                break;
        }

        switch (this.parameters.p2CharacterID) {
            case 0:
                this.AttackHitboxUpP2 = this.physics.add.image(this.player2.x - 180, this.player2.y - 20, '');
                this.AttackHitboxUpP2.setAlpha(0);
                this.AttackHitboxUpP2.setSize(60, 120);

                this.AttackHitboxDownP2 = this.physics.add.image(this.player2.x - 215, this.player2.y, '');
                this.AttackHitboxDownP2.setAlpha(0);
                this.AttackHitboxDownP2.setSize(170, 25);
                break;
            case 1:
                this.AttackHitboxUpP2 = this.physics.add.image(this.player2.x - 130, this.player2.y - 20, '');
                this.AttackHitboxUpP2.setAlpha(0);
                this.AttackHitboxUpP2.setSize(45, 115);

                this.AttackHitboxDownP2 = this.physics.add.image(this.player2.x - 130, this.player2.y + 45, '');
                this.AttackHitboxDownP2.setAlpha(0);
                this.AttackHitboxDownP2.setSize(45, 70);
                break;
            case 2:
                this.AttackHitboxUpP2 = this.physics.add.image(this.player2.x - 100, this.player2.y + 78, '');
                this.AttackHitboxUpP2.setAlpha(0);
                this.AttackHitboxUpP2.setSize(50, 40);

                this.AttackHitboxDownP2 = this.physics.add.image(this.player2.x - 120, this.player2.y + 95, '');
                this.AttackHitboxDownP2.setAlpha(0);
                this.AttackHitboxDownP2.setSize(55, 30);
                break;
            case 3:
                this.AttackHitboxUpP2 = this.physics.add.image(this.player2.x - 170, this.player2.y - 35, '');
                this.AttackHitboxUpP2.setAlpha(0);
                this.AttackHitboxUpP2.setSize(210, 50);

                this.AttackHitboxDownP2 = this.physics.add.image(this.player2.x - 170, this.player2.y - 14, '');
                this.AttackHitboxDownP2.setAlpha(0);
                this.AttackHitboxDownP2.setSize(210, 50);
                break;
        }

        this.AttackHitboxUpP1.body.setAllowGravity(false);
        this.AttackHitboxDownP1.body.setAllowGravity(false);

        this.AttackHitboxUpP2.body.setAllowGravity(false);
        this.AttackHitboxDownP2.body.setAllowGravity(false);

        this.physics.add.overlap(this.AttackHitboxUpP1, this.player2, () => this.player1AttackUp());
        this.physics.add.overlap(this.AttackHitboxDownP1, this.player2, () => this.player1AttackDown());

        this.physics.add.overlap(this.player1, this.AttackHitboxUpP2, () => this.player2AttackUp());
        this.physics.add.overlap(this.player1, this.AttackHitboxDownP2, () => this.player2AttackDown());

        //UI P1
        this.add.image(450, 150, 'UIGamePieza1').setScale(0.65, 0.65);
        this.barraVidaP1 = this.generarBarra(228, 37, 0xb82d3b) //Se crea un rectangulo para la barra
        this.setValueBar1(this.player1.maxhp);               //Se pasa dicho rectangulo y el valor que tendrá la barra
        this.add.image(450, 150, 'UIGamePieza2').setScale(0.65, 0.65);

        switch (this.parameters.p1CharacterID) {
            case 0:
                this.add.image(130, 145, 'ranaToroUI').setScale(0.65, 0.65);

                this.punteroP1 = this.physics.add.image(this.player1.x, this.player1.y - 200, 'PunteroP1');
                break;
            case 1:
                this.add.image(130, 145, 'ranaLluviaUI').setScale(0.65, 0.65);

                this.punteroP1 = this.physics.add.image(this.player1.x, this.player1.y - 200, 'PunteroP1');
                break;
            case 2:
                this.add.image(130, 145, 'ranaFlechaUI').setScale(0.65, 0.65);

                this.punteroP1 = this.physics.add.image(this.player1.x, this.player1.y - 150, 'PunteroP1');
                break;
            case 3:
                this.add.image(130, 145, 'ranaTrepadoraUI').setScale(0.65, 0.65);

                this.punteroP1 = this.physics.add.image(this.player1.x, this.player1.y - 200, 'PunteroP1');
                break;
        }

        this.punteroP1.body.setAllowGravity(false);
        this.punteroP1.setScale(0.75, 0.75);
        this.punteroP1.setAlpha(1);



        //UI P2
        this.add.image(1470, 150, 'UIGamePieza1').setScale(0.65, 0.65).setFlipX(true);
        this.barraVidaP2 = this.generarBarra(1690, 37, 0xb82d3b); //Se crea un rectangulo para la barra
        this.setValueBar2(this.player2.maxhp);                 //Se pasa dicho rectangulo y el valor que tendrá la barra
        this.add.image(1470, 150, 'UIGamePieza2').setScale(0.65, 0.65).setFlipX(true);

        switch (this.parameters.p2CharacterID) {
            case 0:
                this.add.image(1790, 145, 'ranaToroUI').setScale(0.65, 0.65).setFlipX(true);

                this.punteroP2 = this.physics.add.image(this.player2.x, this.player2.y - 200, 'PunteroP2');
                break;
            case 1:
                this.add.image(1790, 145, 'ranaLluviaUI').setScale(0.65, 0.65).setFlipX(true);

                this.punteroP2 = this.physics.add.image(this.player2.x, this.player2.y - 3000, 'PunteroP2');
                break;
            case 2:
                this.add.image(1790, 145, 'ranaFlechaUI').setScale(0.65, 0.65).setFlipX(true);

                this.punteroP2 = this.physics.add.image(this.player2.x, this.player2.y - 200, 'PunteroP2');
                break;
            case 3:
                this.add.image(1790, 145, 'ranaTrepadoraUI').setScale(0.65, 0.65).setFlipX(true);

                this.punteroP2 = this.physics.add.image(this.player2.x, this.player2.y - 200, 'PunteroP2');
                break;
        }

        this.punteroP2.body.setAllowGravity(false);
        this.punteroP2.setScale(0.75, 0.75);
        this.punteroP2.setAlpha(1);


        this.cifra1 = 6;
        this.cifra2 = 0;
        this.numeroUno = this.add.image(900, 80, this.cifra1.toString()).setScale(0.65, 0.65);
        this.numeroDos = this.add.image(1020, 80, this.cifra2.toString()).setScale(0.65, 0.65);

    
    }

    update(timer, delta) {
        this.player1.checkInmuneStatus();
        this.player2.checkInmuneStatus();

        /////////////////////////////////////////////////Player 1 Inputs//////////////////////////////////////////////////////////

        //Movimiento básico//
        if (this.keyD.isDown && !this.player1.crouching && !this.player1.blocking && !this.player1.attacking && !this.player1.receivingDamage) {
            this.player1.setVelocityX(this.player1.speed);
            this.player1.setFlipX(false);

            this.player1.lookingRight = true;

            if (!this.player1.jumping) {
                this.player1.playWalkAnim();
            }
        } else if (this.keyA.isDown && !this.player1.crouching && !this.player1.blocking && !this.player1.attacking && !this.player1.receivingDamage) {
            this.player1.setVelocityX(-this.player1.speed);
            this.player1.setFlipX(true);

            this.player1.lookingRight = false;

            if (!this.player1.jumping) {
                this.player1.playWalkAnim();
            }
        } else if (!this.player1.blocking && !this.player1.jumping && !this.player1.crouching && !this.player1.attacking && !this.player1.receivingDamage) {
            this.player1.setVelocityX(0);
            this.player1.playIdleAnim();
        }

        //Atacar//
        if (!this.player1.crouching && Phaser.Input.Keyboard.JustDown(this.keyF) && !this.player1.blocking && !this.player1.jumping && !this.player1.attacking && !this.player1.receivingDamage) {
            this.player1.setVelocityX(0);
            this.player1.attacking = true;
            this.player1.justAttack = true;
            this.player1.playBasicAttackAnim();
            
        } else if (this.player1.crouching && Phaser.Input.Keyboard.JustDown(this.keyF) && !this.player1.blocking && !this.player1.jumping && !this.player1.attacking && !this.player1.receivingDamage) {
            this.player1.setVelocityX(0);
            this.player1.attacking = true;
            this.player1.justAttack = true;
            this.player1.playDownAttackAnim();
        } else if (this.player1.attacking && !this.player1.anims.isPlaying) {
            this.player1.attacking = false;
        }

        //Bloquear//
        if (this.keyG.isDown && !this.player1.crouching && !this.player1.jumping && !this.player1.blocking && !this.player1.attacking && !this.player1.receivingDamage) {
            this.player1.setVelocityX(0);
            this.player1.blocking = true;
            this.player1.playBeginBlockAnim();
        } else if (this.keyG.isDown && this.player1.blocking && !this.player1.receivingDamage) {
            this.player1.playBlockAnim();
        } else if (Phaser.Input.Keyboard.JustUp(this.keyG) && this.player1.blocking && !this.player1.receivingDamage) {
            this.player1.playEndBlockAnim();
        } else if (this.player1.blocking && !this.player1.anims.isPlaying && !this.player1.receivingDamage) {
            this.player1.blocking = false;
        }

        //Agacharse//
        if (this.keyS.isDown && !this.player1.crouching && !this.player1.jumping && !this.player1.blocking && !this.player1.attacking && !this.player1.receivingDamage) {
            this.player1.setVelocityX(0);
            this.player1.crouching = true;
            this.player1.playBeginCrouchAnim();
        } else if (this.keyS.isDown && this.player1.crouching && !this.player1.attacking && !this.player1.receivingDamage) {
            this.player1.playCrouchAnim();
        } else if (this.player1.crouching && !this.player1.attacking && (Phaser.Input.Keyboard.JustUp(this.keyS) || this.keyS.isUp) && !this.player1.receivingDamage) {
            this.player1.playEndCrouchAnim();
            this.player1.crouching = false;
        }

        //Saltar//
        if (this.keyW.isDown && !this.player1.jumping && this.player1.touchingGround && !this.player1.crouching && !this.player1.blocking && !this.player1.attacking && !this.player1.receivingDamage) {
            this.player1.jumping = true;
            this.player1.touchingGround = false;
            this.player1.setVelocityY(this.player1.jump);
            this.player1.playBeginJumpAnim();
            this.selectSound(0);
        } else if (this.player1.jumping && !this.player1.touchingGround && !this.player1.receivingDamage) {
            this.player1.playJumpAnim();
        } else if (this.player1.jumping && this.player1.touchingGround && !this.player1.receivingDamage) {
            this.player1.playEndJumpAnim();
            this.player1.jumping = false;
        }

        /////////////////////////////////////////////////Player 2 Inputs//////////////////////////////////////////////////////////

        //Movimiento básico//
        if (this.cursors.right.isDown && !this.player2.crouching && !this.player2.blocking && !this.player2.attacking && !this.player2.receivingDamage) {
            this.player2.setVelocityX(this.player2.speed);
            this.player2.setFlipX(false);

            this.player2.lookingRight = true;

            if (!this.player2.jumping) {
                this.player2.playWalkAnim();
            }
        } else if (this.cursors.left.isDown && !this.player2.crouching && !this.player2.blocking && !this.player2.attacking && !this.player2.receivingDamage) {
            this.player2.setVelocityX(-this.player2.speed);
            this.player2.setFlipX(true);

            this.player2.lookingRight = false;

            if (!this.player2.jumping) {
                this.player2.playWalkAnim();
            }
        } else if (!this.player2.blocking && !this.player2.jumping && !this.player2.crouching && !this.player2.attacking && !this.player2.receivingDamage) {
            this.player2.setVelocityX(0);
            this.player2.playIdleAnim();
        }

        //Atacar//
        if (!this.player2.crouching && Phaser.Input.Keyboard.JustDown(this.keyNumpad1) && !this.player2.blocking && !this.player2.jumping && !this.player2.attacking && !this.player2.receivingDamage) {
            this.player2.setVelocityX(0);
            this.player2.attacking = true;
            this.player2.justAttack = true;
            this.player2.playBasicAttackAnim();
        } else if (this.player2.crouching && Phaser.Input.Keyboard.JustDown(this.keyNumpad1) && !this.player2.blocking && !this.player2.jumping && !this.player2.attacking && !this.player2.receivingDamage) {
            this.player2.setVelocityX(0);
            this.player2.attacking = true;
            this.player2.justAttack = true;
            this.player2.playDownAttackAnim();
        } else if (this.player2.attacking && !this.player2.anims.isPlaying) {
            this.player2.attacking = false;
        }

        //Bloquear//
        if (this.keyNumpad2.isDown && !this.player2.crouching && !this.player2.jumping && !this.player2.blocking && !this.player2.attacking && !this.player2.receivingDamage) {
            this.player2.setVelocityX(0);
            this.player2.blocking = true;
            this.player2.playBeginBlockAnim();
        } else if (this.keyNumpad2.isDown && this.player2.blocking && !this.player2.receivingDamage) {
            this.player2.playBlockAnim();
        } else if (Phaser.Input.Keyboard.JustUp(this.keyNumpad2) && this.player2.blocking && !this.player2.receivingDamage) {
            this.player2.playEndBlockAnim();
        } else if (this.player2.blocking && !this.player2.anims.isPlaying && !this.player2.receivingDamage) {
            this.player2.blocking = false;
        }

        //Agacharse//
        if (this.cursors.down.isDown && !this.player2.crouching && !this.player2.jumping && !this.player2.blocking && !this.player2.attacking && !this.player2.receivingDamage) {
            this.player2.setVelocityX(0);
            this.player2.crouching = true;
            this.player2.playBeginCrouchAnim();
        } else if (this.cursors.down.isDown && this.player2.crouching && !this.player2.attacking && !this.player2.receivingDamage) {
            this.player2.playCrouchAnim();
        } else if (this.player2.crouching && !this.player2.attacking && (Phaser.Input.Keyboard.JustUp(this.cursors.down) || this.cursors.down.isUp) && !this.player2.receivingDamage) {
            this.player2.playEndCrouchAnim();
            this.player2.crouching = false;
        }

        //Saltar//
        if (this.cursors.up.isDown && !this.player2.jumping && this.player2.touchingGround && !this.player2.crouching && !this.player2.blocking && !this.player2.attacking && !this.player2.receivingDamage) {
            this.player2.jumping = true;
            this.player2.touchingGround = false;
            this.player2.setVelocityY(this.player2.jump);
            this.player2.playBeginJumpAnim();
            this.selectSound(0);
        } else if (this.player2.jumping && !this.player2.touchingGround && !this.player2.receivingDamage) {
            this.player2.playJumpAnim();
        } else if (this.player2.jumping && this.player2.touchingGround && !this.player2.receivingDamage) {
            this.player2.playEndJumpAnim();
            this.player2.jumping = false;
        }

        ///////////////////////////////////////////////////UPDATE ATTACK HITBOXES////////////////////////////////////////////////

        var directionP1;
        var directionP2;

        if (this.player1.lookingRight) {
            directionP1 = 1;
        } else {
            directionP1 = -1;
        }

        if (this.player2.lookingRight) {
            directionP2 = 1;
        } else {
            directionP2 = -1;
        }

        switch (this.parameters.p1CharacterID) {
            case 0:
                this.AttackHitboxUpP1.x = this.player1.x + 180 * directionP1;
                this.AttackHitboxUpP1.y = this.player1.y - 20;

                this.AttackHitboxDownP1.x = this.player1.x + 215 * directionP1;
                this.AttackHitboxDownP1.y = this.player1.y;
                break;
            case 1:
                this.AttackHitboxUpP1.x = this.player1.x + 130 * directionP1;
                this.AttackHitboxUpP1.y = this.player1.y - 20;

                this.AttackHitboxDownP1.x = this.player1.x + 130 * directionP1;
                this.AttackHitboxDownP1.y = this.player1.y + 45;
                break;
            case 2:
                this.AttackHitboxUpP1.x = this.player1.x + 100 * directionP1;
                this.AttackHitboxUpP1.y = this.player1.y + 78;

                this.AttackHitboxDownP1.x = this.player1.x + 120 * directionP1;
                this.AttackHitboxDownP1.y = this.player1.y + 95;
                break;
            case 3:
                this.AttackHitboxUpP1.x = this.player1.x + 170 * directionP1;
                this.AttackHitboxUpP1.y = this.player1.y - 35;

                this.AttackHitboxDownP1.x = this.player1.x + 170 * directionP1;
                this.AttackHitboxDownP1.y = this.player1.y - 14;
                break;
        }

        switch (this.parameters.p2CharacterID) {
            case 0:
                this.AttackHitboxUpP2.x = this.player2.x + 180 * directionP2;
                this.AttackHitboxUpP2.y = this.player2.y - 20;

                this.AttackHitboxDownP2.x = this.player2.x + 215 * directionP2;
                this.AttackHitboxDownP2.y = this.player2.y;
                break;
            case 1:
                this.AttackHitboxUpP2.x = this.player2.x + 130 * directionP2;
                this.AttackHitboxUpP2.y = this.player2.y - 20;

                this.AttackHitboxDownP2.x = this.player2.x + 130 * directionP2;
                this.AttackHitboxDownP2.y = this.player2.y + 45;
                break;
            case 2:
                this.AttackHitboxUpP2.x = this.player2.x + 100 * directionP2;
                this.AttackHitboxUpP2.y = this.player2.y + 78;

                this.AttackHitboxDownP2.x = this.player2.x + 120 * directionP2;
                this.AttackHitboxDownP2.y = this.player2.y + 95;
                break;
            case 3:
                this.AttackHitboxUpP2.x = this.player2.x + 170 * directionP2;
                this.AttackHitboxUpP2.y = this.player2.y - 35;

                this.AttackHitboxDownP2.x = this.player2.x + 170 * directionP2;
                this.AttackHitboxDownP2.y = this.player2.y - 14;
                break;
        }

        /////////////////////////////////////////////PUNTEROS PERSONAJES////////////////////////////////////////////////////////

        //Si la rana escogida es la toro, lluvia o trepadora, el puntero debe estar más arriba
        if (this.parameters.p1CharacterID == 0 || this.parameters.p1CharacterID == 3 || this.parameters.p1CharacterID == 1) {
            this.punteroP1.x = this.player1.x;
            this.punteroP1.y = this.player1.y - 200;
        } else {

            this.punteroP1.x = this.player1.x;
            this.punteroP1.y = this.player1.y - 100;
        }

        //Si la rana escogida es la toro, lluvia o trepadora, el puntero debe estar más arriba
        if (this.parameters.p2CharacterID == 0 || this.parameters.p2CharacterID == 3 ) {
            this.punteroP2.x = this.player2.x;
            this.punteroP2.y = this.player2.y - 200;
        } else if( this.parameters.p1CharacterID == 1) 
        {
            this.punteroP2.x = this.player2.x;
            this.punteroP2.y = this.player2.y - 225;
        }
        else {

            this.punteroP2.x = this.player2.x;
            this.punteroP2.y = this.player2.y - 100;
        }

        ///////////////////////////////////////////Gestion del tiempo////////////////////////////////////////////////////////////

        //Si ha pasado un segundo
        if (this.timer >= 1) {
            //Disminuimos la segunda cifra del temporizador
            this.cifra2--;
            if (this.cifra2 == -1) {  //Si la segunda cifra es negativa, le asignamos el valor 9 y reducimos la otra cifra
                this.cifra2 = 9;
                this.cifra1--
            }
            if (this.cifra1 != -1) {  //Mientras la primera cifra no valga -1, actualizamos las imágenes
                this.numeroUno.destroy();
                this.numeroDos.destroy();
                this.numeroUno = this.add.image(900, 80, this.cifra1.toString()).setScale(0.65, 0.65);
                this.numeroDos = this.add.image(1020, 80, this.cifra2.toString()).setScale(0.65, 0.65);
            }
            if (this.cifra1 === 0 && this.cifra2 === 0) {
                if (this.player1.hp >= this.player2.hp) {
                    this.roundEnd(2);
                }
                else {
                    this.roundEnd(1);
                }
            }

            this.timer = 0;
        }
        this.timer += delta / 1000;
    }

    roundEnd(looserId) {
        console.log("loser: "+ looserId);
        switch (looserId) {
            case 2://Victoria P1
                this.parameters.p1WonRounds += 1;
                this.updateWins(1);
                break;
            case 1://Victoria P2
                this.parameters.p2WonRounds += 1;
                this.updateWins(2);
                break;
        }
        console.log(this.parameters.p1WonRounds);
        console.log(this.parameters.p2WonRounds);
        if (this.parameters.p1WonRounds === 2) {
            this.parameters.winnerId = 1;
            this.parameters.loses = this.parameters.p2WonRounds;
            this.changeTrackResults();
            //Cargar escena de resultados con P1 como ganador
            console.log(this.parameters.winnerId);
            console.log("L "+this.parameters.loses);
            this.scene.start("Results", this.parameters);
            this.scene.stop();
        }
        else if (this.parameters.p2WonRounds === 2) {
            this.parameters.winnerId = 2;
            this.parameters.loses = this.parameters.p1WonRounds;
            this.changeTrackResults();
            //Cargar escena de resultados con P2 como ganador
            console.log(this.parameters.winnerId);
            console.log("L "+this.parameters.loses);
            this.scene.start("Results", this.parameters);
            this.scene.stop();
        }
        else {
            //Recargar la escena de juego con los parametros necesarios
            this.timer = 0;
            this.cifra1 = 6;
            this.cifra2 = 0;
            this.player1.hp = this.player1.maxhp;
            this.player2.hp = this.player2.maxhp;
            this.setValueBar1(this.player1.maxhp);
            this.setValueBar2(this.player2.maxhp);
            this.player1.x = 190;
            this.player1.y = 800;
            this.player2.x = 1730;
            this.player2.y = 800;
            this.player1.setFlipX(false);
            this.player2.setFlipX(true);

        }
    }

    player1AttackUp() //Comprobación de los estados de cada jugador comprobando los parametros "attacking" y "blocking"
    {
        if (this.player1.attacking && !this.player2.blocking && this.player1.justAttack && !this.player2.receivingDamage && !this.player1.crouching) {
            console.log("Ataque Alto");
            this.player2.takeDamage(10);
            switch (this.parameters.p1CharacterID) {
                case 0:
                    this.selectSound(3);
                    break;
                case 1:
                    this.selectSound(5);
                    break;
                case 2:
                    this.selectSound(9);
                    break;
                case 3:
                    this.selectSound(1);
                    break;
            }
            this.setValueBar2(this.player2.hp);
            this.player1.justAttack = false;
            console.log('player 2 received 10 damage after an UpAttack!');
        }

        if (this.player1.attacking && this.player2.blocking && this.player1.justAttack && !this.player2.receivingDamage && !this.player1.crouching) {
            console.log("Ataque Alto");
            this.player2.takeDamage(5);
            switch (this.parameters.p1CharacterID) {
                case 0:
                    this.selectSound(4);
                    break;
                case 1:
                    this.selectSound(6);
                    break;
                case 2:
                    this.selectSound(10);
                    break;
                case 3:
                    this.selectSound(2);
                    break;
            }
            this.setValueBar2(this.player2.hp);
            this.player1.justAttack = false;
            console.log('player 2 received 5 damage after an UpAttack!');
        }
    }

    player2AttackUp() {
        if (this.player2.attacking && !this.player1.blocking && this.player2.justAttack && !this.player1.receivingDamage && !this.player2.crouching) {
            this.player1.takeDamage(10);
            switch (this.parameters.p2CharacterID) {
                case 0:
                    this.selectSound(3);
                    break;
                case 1:
                    this.selectSound(5);
                    break;
                case 2:
                    this.selectSound(9);
                    break;
                case 3:
                    this.selectSound(1);
                    break;
            }
            this.setValueBar1(this.player1.hp);
            this.player2.justAttack = false;
            console.log('player 1 received 10 damage after an UpAttack!');
        }

        if (this.player2.attacking && this.player1.blocking && this.player2.justAttack && !this.player1.receivingDamage && !this.player2.crouching) {
            this.player1.takeDamage(5);
            switch (this.parameters.p2CharacterID) {
                case 0:
                    this.selectSound(4);
                    break;
                case 1:
                    this.selectSound(6);
                    break;
                case 2:
                    this.selectSound(10);
                    break;
                case 3:
                    this.selectSound(2);
                    break;
            }
            this.setValueBar1(this.player1.hp);
            this.player2.justAttack = false;
            console.log('player 1 received 5 damage after an UpAttack!');
        }
    }

    player1AttackDown() //Comprobación de los estados de cada jugador comprobando los parametros "attacking" y "blocking"
    {
        if (this.player1.attacking && !this.player2.blocking && this.player1.justAttack && !this.player2.receivingDamage && this.player1.crouching) {
            console.log("Ataque Bajo");
            this.player2.takeDamage(10);
            switch (this.parameters.p1CharacterID) {
                case 0:
                    this.selectSound(3);
                    break;
                case 1:
                    this.selectSound(7);
                    break;
                case 2:
                    this.selectSound(11);
                    break;
                case 3:
                    this.selectSound(1);
                    break;
            }
            this.setValueBar2(this.player2.hp);
            this.player1.justAttack = false;
            console.log('player 2 received 10 damage after a DownAttack!');
        }

        if (this.player1.attacking && this.player2.blocking && this.player1.justAttack && !this.player2.receivingDamage && this.player1.crouching) {
            console.log("Ataque Bajo");
            this.player2.takeDamage(5);
            switch (this.parameters.p1CharacterID) {
                case 0:
                    this.selectSound(4);
                    break;
                case 1:
                    this.selectSound(8);
                    break;
                case 2:
                    this.selectSound(12);
                    break;
                case 3:
                    this.selectSound(2);
                    break;
            }
            this.setValueBar2(this.player2.hp);
            this.player1.justAttack = false;
            console.log('player 2 received 5 damage after a DownAttack!');
        }
    }

    player2AttackDown() {
        if (this.player2.attacking && !this.player1.blocking && this.player2.justAttack && !this.player1.receivingDamage && this.player2.crouching) {
            this.player1.takeDamage(10);
            switch (this.parameters.p2CharacterID) {
                case 0:
                    this.selectSound(3);
                    break;
                case 1:
                    this.selectSound(7);
                    break;
                case 2:
                    this.selectSound(11);
                    break;
                case 3:
                    this.selectSound(1);
                    break;
            }
            this.setValueBar1(this.player1.hp);
            this.player2.justAttack = false;
            console.log('player 1 received 10 damage after a DownAttack!');
        }

        if (this.player2.attacking && this.player1.blocking && this.player2.justAttack && !this.player1.receivingDamage && this.player2.crouching) {
            this.player1.takeDamage(5);
            switch (this.parameters.p2CharacterID) {
                case 0:
                    this.selectSound(4);
                    break;
                case 1:
                    this.selectSound(8);
                    break;
                case 2:
                    this.selectSound(12);
                    break;
                case 3:
                    this.selectSound(2);
                    break;
            }
            this.setValueBar1(this.player1.hp);
            this.player2.justAttack = false;
            console.log('player 1 received 5 damage after a DownAttack!');
        }
    }

    generarBarra(x, y, color) {
        //Dibuja la barra 
        let barra = this.add.graphics();
        //Le da color a la barra
        barra.fillStyle(color, 1);
        //Rellena la barra en forma de rectangulo
        barra.fillRect(0, 0, 545, 86);
        //Posiciona la barra
        barra.x = x;
        barra.y = y;
        //Devuelve el objeto creado
        return barra;
    }

    setValueBar1(percentage) {
        // Escala la barra
        this.barraVidaP1.scaleX = percentage / this.player1.maxhp;
    }

    setValueBar2(percentage) {
        // Escala la barra
        this.barraVidaP2.scaleX = (percentage / this.player2.maxhp) * -1;
    }

    updateWins(winner) {
        switch (winner) {
            case 1:
                this.add.image(650, 210, 'Rondas').setScale(0.5, 0.5);
                break;
            case 2:
                this.add.image(1270, 210, 'Rondas').setScale(0.5, 0.5);
                break;
        }
    }
    changeTrackResults() {
        this.scene.get('AudioManager').events.emit('changeTrackResults')
    }
    selectSound(soundNum) {
        this.scene.get('AudioManager').events.emit('selectSound', soundNum)
    }
}