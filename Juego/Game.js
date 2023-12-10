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

        this.parameters = {
            p1CharacterID: 0,
            p2CharacterID: 0,
            p1AltSkin: false,
            p2AltSkin: false,
            mapID: 0,
            p1WonRounds: 0,
            p2WonRounds: 0,
            winnerId: 0,
            loses:0
        }

        this.barraVidap1
        this.barraVidap2
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

        this.ground = this.physics.add.staticGroup();

        switch (this.parameters.mapID) {
            case 0:
                this.ground.create(960, 1070, '').setScale(1920, 4).refreshBody();
                this.add.image(960, 540, 'desiertoFondo');
                break;
            case 1:
                this.ground.create(960, 1070, '').setScale(1920, 4).refreshBody();
                this.add.image(960, 540, 'nenufarFondo');
                break;
            case 2:
                this.ground.create(960, 1070, '').setScale(1920, 6).refreshBody();
                this.add.image(960, 540, 'junglaFondo');
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

        this.player1 = new Fighter(this, 600, 600, this.parameters.p1CharacterID, this.parameters.p1AltSkin, 1, p1Texture);
        this.player2 = new Fighter(this, 900, 600, this.parameters.p2CharacterID, this.parameters.p2AltSkin, 2, p2Texture);

        this.physics.add.collider(this.player1, this.ground, () => this.player1.touchingGround = true);
        this.physics.add.collider(this.player2, this.ground, () => this.player2.touchingGround = true);
        this.physics.add.overlap(this.player1, this.player2, () => this.playerOverlap());

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

        //UI P1
        this.add.image(450, 150, 'UIGamePieza1').setScale(0.65, 0.65);
        this.barraVidaP1 = this.generarBarra(228, 37, 0xb82d3b)
        this.setValueBar1(this.barraVidaP1, 100);
        this.add.image(450, 150, 'UIGamePieza2').setScale(0.65, 0.65);

        if(this.parameters.p1WonRounds == 1){
            this.add.image(650, 210, 'Rondas').setScale(0.5, 0.5)
        }

        //UI P2
        this.add.image(1470, 150, 'UIGamePieza1').setScale(0.65, 0.65).setFlipX(true);
        this.barraVidaP2 = this.generarBarra(1145, 37, 0xb82d3b);
        this.setValueBar2(this.barraVidaP2, 100);
        this.add.image(1470, 150, 'UIGamePieza2').setScale(0.65, 0.65).setFlipX(true);

        if(this.parameters.p2WonRounds == 1){
            this.add.image(1270, 210, 'Rondas').setScale(0.5, 0.5)
        }

        //La carga de la pantalla de resultados o la siguiente ronda puede llamarla la escena o el jugador derrotado.
        //La siguiente ronda se puede hacer recargando la escena con el número de victorias actualizado
    }

    update() {
        /////////////////////////////////////////////////Player 1 Inputs//////////////////////////////////////////////////////////

        //Movimiento básico//
        if (this.keyD.isDown && !this.player1.crouching && !this.player1.blocking && !this.player1.attacking) {
            this.player1.setVelocityX(300);
            this.player1.setFlipX(false);

            if (!this.player1.jumping) {
                this.player1.playWalkAnim();
            }
        } else if (this.keyA.isDown && !this.player1.crouching && !this.player1.blocking && !this.player1.attacking) {
            this.player1.setVelocityX(-300);
            this.player1.setFlipX(true);

            if (!this.player1.jumping) {
                this.player1.playWalkAnim();
            }
        } else if (!this.player1.blocking && !this.player1.jumping && !this.player1.crouching && !this.player1.attacking) {
            this.player1.setVelocityX(0);
            this.player1.playIdleAnim();
        }

        //Atacar//
        if(!this.player1.crouching && Phaser.Input.Keyboard.JustDown(this.keyF) && !this.player1.blocking && !this.player1.jumping && !this.player1.attacking){
            this.player1.setVelocityX(0);
            this.player1.attacking = true;
            this.player1.justAttack = true;
            this.player1.playBasicAttackAnim();
        }else if(this.player1.crouching && Phaser.Input.Keyboard.JustDown(this.keyF) && !this.player1.blocking && !this.player1.jumping && !this.player1.attacking){
            this.player1.setVelocityX(0);
            this.player1.attacking = true;
            this.player1.justAttack = true;
            this.player1.playDownAttackAnim();
        }else if(this.player1.attacking && !this.player1.anims.isPlaying){
            this.player1.attacking = false;
        }
        
        if(this.player1.justAttack){
            this.player1.justAttack = false;
        }
        
        //Bloquear//
        if (this.keyG.isDown && !this.player1.crouching && !this.player1.jumping && !this.player1.blocking){
            this.player1.setVelocityX(0);
            this.player1.blocking = true;
            this.player1.playBeginBlockAnim();
        }else if (this.keyG.isDown && this.player1.blocking){
            this.player1.playBlockAnim();
        }else if (Phaser.Input.Keyboard.JustUp(this.keyG) && this.player1.blocking){
            this.player1.playEndBlockAnim();
            this.player1.blocking = false;
        }

        //Agacharse//
        if (this.keyS.isDown && !this.player1.crouching && !this.player1.jumping && !this.player1.blocking){
            this.player1.setVelocityX(0);
            this.player1.crouching = true;
            this.player1.playBeginCrouchAnim();
        }else if (this.keyS.isDown && this.player1.crouching){
            this.player1.playCrouchAnim();
        }else if (Phaser.Input.Keyboard.JustUp(this.keyS) && this.player1.crouching){
            this.player1.playEndCrouchAnim();
            this.player1.crouching = false;
        }

        //Saltar//
        if (this.keyW.isDown && !this.player1.jumping && this.player1.touchingGround && !this.player1.crouching && !this.player1.blocking) {
            this.player1.jumping = true;
            this.player1.touchingGround = false;
            this.player1.setVelocityY(-300);
            this.player1.playBeginJumpAnim();
        } else if (this.player1.jumping && !this.player1.touchingGround) {
            this.player1.playJumpAnim();
        } else if (this.player1.jumping && this.player1.touchingGround) {
            this.player1.playEndJumpAnim();
            this.player1.jumping = false;
        }

        /////////////////////////////////////////////////Player 2 Inputs//////////////////////////////////////////////////////////

        //Movimiento básico//
        if (this.cursors.right.isDown && !this.player2.crouching && !this.player2.attacking) {
            this.player2.setVelocityX(300);
            this.player2.setFlipX(false);

            if (!this.player2.jumping) {
                this.player2.playWalkAnim();
            }
        } else if (this.cursors.left.isDown && !this.player2.crouching && !this.player2.attacking) {
            this.player2.setVelocityX(-300);
            this.player2.setFlipX(true);

            if (!this.player2.jumping) {
                this.player2.playWalkAnim();
            }
        } else if (!this.player2.blocking && !this.player2.jumping && !this.player2.crouching && !this.player2.attacking) {
            this.player2.setVelocityX(0);
            this.player2.playIdleAnim();
        }

        //Atacar//
        if(!this.player2.crouching && Phaser.Input.Keyboard.JustDown(this.keyNumpad1) && !this.player2.blocking && !this.player2.jumping && !this.player2.attacking){
            this.player2.setVelocityX(0);
            this.player2.attacking = true;
            this.player2.justAttack = true;
            this.player2.playBasicAttackAnim();
        }else if(this.player2.crouching && Phaser.Input.Keyboard.JustDown(this.keyNumpad1) && !this.player2.blocking && !this.player2.jumping && !this.player2.attacking){
            this.player2.setVelocityX(0);
            this.player2.attacking = true;
            this.player2.justAttack = true;
            this.player2.playDownAttackAnim();
        }else if(this.player2.attacking && !this.player2.anims.isPlaying){
            this.player2.attacking = false;
        }
        
        if(this.player2.justAttack){
            this.player2.justAttack = false;
        }

        //Bloquear//
        if (this.keyNumpad2.isDown && !this.player2.crouching && !this.player2.jumping && !this.player2.blocking){
            this.player2.setVelocityX(0);
            this.player2.blocking = true;
            this.player2.playBeginBlockAnim();
        }else if (this.keyNumpad2.isDown && this.player2.blocking){
            this.player2.playBlockAnim();
        }else if (Phaser.Input.Keyboard.JustUp(this.keyNumpad2) && this.player2.blocking){
            this.player2.playEndBlockAnim();
            this.player2.blocking = false;
        }

        //Agacharse//
        if (this.cursors.down.isDown && !this.player2.crouching && !this.player2.jumping){
            this.player2.setVelocityX(0);
            this.player2.crouching = true;
            this.player2.playBeginCrouchAnim();
        }else if (this.cursors.down.isDown && this.player2.crouching){
            this.player2.playCrouchAnim();
        }else if (Phaser.Input.Keyboard.JustUp(this.cursors.down) && this.player2.crouching){
            this.player2.playEndCrouchAnim();
            this.player2.crouching = false;
        }

        //Saltar//
        if (this.cursors.up.isDown && !this.player2.jumping && this.player2.touchingGround && !this.player2.crouching) {
            this.player2.jumping = true;
            this.player2.touchingGround = false;
            this.player2.setVelocityY(-300);
            this.player2.playBeginJumpAnim();
        } else if (this.player2.jumping && !this.player2.touchingGround) {
            this.player2.playJumpAnim();
        } else if (this.player2.jumping && this.player2.touchingGround) {
            this.player2.playEndJumpAnim();
            this.player2.jumping = false;
        }
    }

    roundEnd(winnerId) {
        switch (winnerId) {
            case 1://Victoria P1
                this.parameters.p1WonRounds++;
                break;
            case 2://Victoria P2
                this.parameters.p2WonRounds++;
                break;
        }

        if (this.p1WonRounds >= 2) {
            this.parameters.winnerId=1;
            this.parameters.loses=this.p2WonRounds;
            //Cargar escena de resultados con P1 como ganador
            this.scene.start("Results",this.parameters);
        }
        else if (this.p2WonRounds >= 2) {
            this.parameters.winnerId=2;
            this.parameters.loses=this.p1WonRounds;
            //Cargar escena de resultados con P2 como ganador
            this.scene.start("Results",this.parameters);
        }
        else {
            //Recargar la escena de juego con los parametros necesarios
            this.scene.start("Game",this.parameters);
        }
    }

    playerOverlap() //Comprobación de los estados de cada jugador comprobando los parametros "attacking" y "blocking"
    {
        if (this.player1.justAttack && !this.player2.blocking) {
            this.player2.takeDamage(10);
            console.log('player 2 received damage!');
        }
        if (this.player2.justAttack && !this.player1.blocking) {
            this.player1.takeDamage(10);
            console.log('player 1 received damage!');
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

    setValueBar1(bar,percentage) {
        // Escala la barra
        bar.scaleX = percentage / 100;
    }

    setValueBar2(bar, percentage) {
        // Escala la barra
        bar.scaleX = (100 - percentage) / 100;
    }
}