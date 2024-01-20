"use strict";

import Fighter from './Fighter.js';

export default class GameNet extends Phaser.Scene {
    constructor() {
        super('GameNet');
        this.player;
        this.otherPlayer;

        this.ground;

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
		this.hitboxPosScale;
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
        
        //JSON que guarda el estado de los inputs del cliente actual para mandarlos al otro
        this.inputUpdates = {
				type: "inputUpdate",
				walkLeft: false,
				walkRight: false,
				jump: false,
				crouching: false,
				blocking: false,
				attack: false,
				lowAttack: false
				};

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

		//ASIGNACION DEL PERSONAJE SEGUN EL JUGADOR 1 O 2
		if(logedUser.player == 1){
			
	        this.player = new Fighter(this, 190, 800, this.parameters.p1CharacterID, this.parameters.p1AltSkin, 1, p1Texture);
	        this.otherPlayer = new Fighter(this, 1730, 800, this.parameters.p2CharacterID, this.parameters.p2AltSkin, 2, p2Texture);
			this.hitboxPosScale=1;
	        this.player.lookingRight = true;
	
	        this.physics.add.collider(this.player, this.ground, () => this.player.touchingGround = true);
	        this.physics.add.collider(this.otherPlayer, this.ground, () => this.otherPlayer.touchingGround = true);

		}
		
		if(logedUser.player == 2){
			
	        this.player = new Fighter(this, 1730, 800, this.parameters.p2CharacterID, this.parameters.p2AltSkin, 2, p2Texture);
	        this.otherPlayer = new Fighter(this, 190, 800, this.parameters.p1CharacterID, this.parameters.p1AltSkin, 1, p1Texture);
			this.hitboxPosScale=1;
	        this.otherPlayer.lookingRight = true;
	
	        this.physics.add.collider(this.player, this.ground, () => this.player.touchingGround = true);
	        this.physics.add.collider(this.otherPlayer, this.ground, () => this.otherPlayer.touchingGround = true);

		}
		
        //Inputs
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
                this.AttackHitboxUpP1 = this.physics.add.image(this.player.x + 180*this.hitboxPosScale, this.player.y - 20, '');
                this.AttackHitboxUpP1.setAlpha(0);
                this.AttackHitboxUpP1.setSize(60, 120);

                this.AttackHitboxDownP1 = this.physics.add.image(this.player.x + 215*this.hitboxPosScale, this.player.y, '');
                this.AttackHitboxDownP1.setAlpha(0);
                this.AttackHitboxDownP1.setSize(170, 25);
                break;
            case 1:
                this.AttackHitboxUpP1 = this.physics.add.image(this.player.x + 130*this.hitboxPosScale, this.player.y - 20, '');
                this.AttackHitboxUpP1.setAlpha(0);
                this.AttackHitboxUpP1.setSize(45, 115);

                this.AttackHitboxDownP1 = this.physics.add.image(this.player.x + 130*this.hitboxPosScale, this.player.y + 45, '');
                this.AttackHitboxDownP1.setAlpha(0);
                this.AttackHitboxDownP1.setSize(45, 70);
                break;
            case 2:
                this.AttackHitboxUpP1 = this.physics.add.image(this.player.x + 100*this.hitboxPosScale, this.player.y + 78, '');
                this.AttackHitboxUpP1.setAlpha(0);
                this.AttackHitboxUpP1.setSize(50, 40);

                this.AttackHitboxDownP1 = this.physics.add.image(this.player.x + 120*this.hitboxPosScale, this.player.y + 95, '');
                this.AttackHitboxDownP1.setAlpha(0);
                this.AttackHitboxDownP1.setSize(55, 30);
                break;
            case 3:
                this.AttackHitboxUpP1 = this.physics.add.image(this.player.x + 170*this.hitboxPosScale, this.player.y - 35, '');
                this.AttackHitboxUpP1.setAlpha(0);
                this.AttackHitboxUpP1.setSize(210, 50);

                this.AttackHitboxDownP1 = this.physics.add.image(this.player.x + 170*this.hitboxPosScale, this.player.y - 14, '');
                this.AttackHitboxDownP1.setAlpha(0);
                this.AttackHitboxDownP1.setSize(210, 50);
                break;
        }

        switch (this.parameters.p2CharacterID) {
            case 0:
                this.AttackHitboxUpP2 = this.physics.add.image(this.otherPlayer.x - 180*this.hitboxPosScale, this.otherPlayer.y - 20, '');
                this.AttackHitboxUpP2.setAlpha(0);
                this.AttackHitboxUpP2.setSize(60, 120);

                this.AttackHitboxDownP2 = this.physics.add.image(this.otherPlayer.x - 215*this.hitboxPosScale, this.otherPlayer.y, '');
                this.AttackHitboxDownP2.setAlpha(0);
                this.AttackHitboxDownP2.setSize(170, 25);
                break;
            case 1:
                this.AttackHitboxUpP2 = this.physics.add.image(this.otherPlayer.x - 130*this.hitboxPosScale, this.otherPlayer.y - 20, '');
                this.AttackHitboxUpP2.setAlpha(0);
                this.AttackHitboxUpP2.setSize(45, 115);

                this.AttackHitboxDownP2 = this.physics.add.image(this.otherPlayer.x - 130*this.hitboxPosScale, this.otherPlayer.y + 45, '');
                this.AttackHitboxDownP2.setAlpha(0);
                this.AttackHitboxDownP2.setSize(45, 70);
                break;
            case 2:
                this.AttackHitboxUpP2 = this.physics.add.image(this.otherPlayer.x - 100*this.hitboxPosScale, this.otherPlayer.y + 78, '');
                this.AttackHitboxUpP2.setAlpha(0);
                this.AttackHitboxUpP2.setSize(50, 40);

                this.AttackHitboxDownP2 = this.physics.add.image(this.otherPlayer.x - 120*this.hitboxPosScale, this.otherPlayer.y + 95, '');
                this.AttackHitboxDownP2.setAlpha(0);
                this.AttackHitboxDownP2.setSize(55, 30);
                break;
            case 3:
                this.AttackHitboxUpP2 = this.physics.add.image(this.otherPlayer.x - 170*this.hitboxPosScale, this.otherPlayer.y - 35, '');
                this.AttackHitboxUpP2.setAlpha(0);
                this.AttackHitboxUpP2.setSize(210, 50);

                this.AttackHitboxDownP2 = this.physics.add.image(this.otherPlayer.x - 170*this.hitboxPosScale, this.otherPlayer.y - 14, '');
                this.AttackHitboxDownP2.setAlpha(0);
                this.AttackHitboxDownP2.setSize(210, 50);
                break;
        }

        this.AttackHitboxUpP1.body.setAllowGravity(false);
        this.AttackHitboxDownP1.body.setAllowGravity(false);

        this.AttackHitboxUpP2.body.setAllowGravity(false);
        this.AttackHitboxDownP2.body.setAllowGravity(false);

        this.physics.add.overlap(this.AttackHitboxUpP1, this.otherPlayer, () => this.playerAttackUp());
        this.physics.add.overlap(this.AttackHitboxDownP1, this.otherPlayer, () => this.playerAttackDown());

        this.physics.add.overlap(this.player, this.AttackHitboxUpP2, () => this.otherPlayerAttackUp());
        this.physics.add.overlap(this.player, this.AttackHitboxDownP2, () => this.otherPlayerAttackDown());

        //UI P1
        this.add.image(450, 150, 'UIGamePieza1').setScale(0.65, 0.65);
        this.barraVidaP1 = this.generarBarra(228, 37, 0xb82d3b) //Se crea un rectangulo para la barra
        this.setValueBar1(1);               //Se pasa dicho rectangulo y el valor que tendrá la barra
        this.add.image(450, 150, 'UIGamePieza2').setScale(0.65, 0.65);

        switch (this.parameters.p1CharacterID) {
            case 0:
                this.add.image(130, 145, 'ranaToroUI').setScale(0.65, 0.65);

                this.punteroP1 = this.physics.add.image(this.player.x, this.player.y - 200, 'PunteroP1');
                break;
            case 1:
                this.add.image(130, 145, 'ranaLluviaUI').setScale(0.65, 0.65);

                this.punteroP1 = this.physics.add.image(this.player.x, this.player.y - 200, 'PunteroP1');
                break;
            case 2:
                this.add.image(130, 145, 'ranaFlechaUI').setScale(0.65, 0.65);

                this.punteroP1 = this.physics.add.image(this.player.x, this.player.y - 150, 'PunteroP1');
                break;
            case 3:
                this.add.image(130, 145, 'ranaTrepadoraUI').setScale(0.65, 0.65);

                this.punteroP1 = this.physics.add.image(this.player.x, this.player.y - 200, 'PunteroP1');
                break;
        }

        this.punteroP1.body.setAllowGravity(false);
        this.punteroP1.setScale(0.75, 0.75);
        this.punteroP1.setAlpha(1);



        //UI P2
        this.add.image(1470, 150, 'UIGamePieza1').setScale(0.65, 0.65).setFlipX(true);
        this.barraVidaP2 = this.generarBarra(1690, 37, 0xb82d3b); //Se crea un rectangulo para la barra
        this.setValueBar2(1);                 //Se pasa dicho rectangulo y el valor que tendrá la barra
        this.add.image(1470, 150, 'UIGamePieza2').setScale(0.65, 0.65).setFlipX(true);

        switch (this.parameters.p2CharacterID) {
            case 0:
                this.add.image(1790, 145, 'ranaToroUI').setScale(0.65, 0.65).setFlipX(true);

                this.punteroP2 = this.physics.add.image(this.otherPlayer.x, this.otherPlayer.y - 200, 'PunteroP2');
                break;
            case 1:
                this.add.image(1790, 145, 'ranaLluviaUI').setScale(0.65, 0.65).setFlipX(true);

                this.punteroP2 = this.physics.add.image(this.otherPlayer.x, this.otherPlayer.y - 3000, 'PunteroP2');
                break;
            case 2:
                this.add.image(1790, 145, 'ranaFlechaUI').setScale(0.65, 0.65).setFlipX(true);

                this.punteroP2 = this.physics.add.image(this.otherPlayer.x, this.otherPlayer.y - 200, 'PunteroP2');
                break;
            case 3:
                this.add.image(1790, 145, 'ranaTrepadoraUI').setScale(0.65, 0.65).setFlipX(true);

                this.punteroP2 = this.physics.add.image(this.otherPlayer.x, this.otherPlayer.y - 200, 'PunteroP2');
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
        this.player.checkInmuneStatus();
        this.otherPlayer.checkInmuneStatus();

        /////////////////////////////////////////////////Player Inputs//////////////////////////////////////////////////////////

        //Movimiento básico//
        if (this.keyD.isDown && !this.player.crouching && !this.player.blocking && !this.player.attacking && !this.player.receivingDamage) {
			if(this.inputUpdates.walkLeft){
				this.inputUpdates.walkLeft = false;
			}
			this.inputUpdates.walkRight = true;
			
            this.player.setVelocityX(this.player.speed);
            this.player.setFlipX(false);

            this.player.lookingRight = true;

            if (!this.player.jumping) {
                this.player.playWalkAnim();
            }
        } else if (this.keyA.isDown && !this.player.crouching && !this.player.blocking && !this.player.attacking && !this.player.receivingDamage) {
            if(this.inputUpdates.walkRight){
				this.inputUpdates.walkRight = false;
			}
            this.inputUpdates.walkLeft = true;
            
            this.player.setVelocityX(-this.player.speed);
            this.player.setFlipX(true);

            this.player.lookingRight = false;

            if (!this.player.jumping) {
                this.player.playWalkAnim();
            }
        } else if (!this.player.blocking && !this.player.jumping && !this.player.crouching && !this.player.attacking && !this.player.receivingDamage) {
            
            this.inputUpdates.walkRight = false
            this.inputUpdates.walkLeft = false
            
            this.player.setVelocityX(0);
            this.player.playIdleAnim();
        }

        //Atacar//
        if (!this.player.crouching && Phaser.Input.Keyboard.JustDown(this.keyF) && !this.player.blocking && !this.player.jumping && !this.player.attacking && !this.player.receivingDamage) {
            this.inputUpdates.attack = true;
            this.player.setVelocityX(0);
            this.player.attacking = true;
            this.player.justAttack = true;
            this.player.playBasicAttackAnim();
            
        } else if (this.player.crouching && Phaser.Input.Keyboard.JustDown(this.keyF) && !this.player.blocking && !this.player.jumping && !this.player.attacking && !this.player.receivingDamage) {
            this.inputUpdates.lowAttack = true;
            this.player.setVelocityX(0);
            this.player.attacking = true;
            this.player.justAttack = true;
            this.player.playDownAttackAnim();
        } else if (this.player.attacking && !this.player.anims.isPlaying) {
            this.inputUpdates.attack = false;
            this.inputUpdates.lowAttack = false;
            this.player.attacking = false;
        }

        //Bloquear//
        if (this.keyG.isDown && !this.player.crouching && !this.player.jumping && !this.player.blocking && !this.player.attacking && !this.player.receivingDamage) {
            this.inputUpdates.blocking = true;
            
            this.player.setVelocityX(0);
            this.player.blocking = true;
            this.player.playBeginBlockAnim();
        } else if (this.keyG.isDown && this.player.blocking && !this.player.receivingDamage) {
            this.player.playBlockAnim();
        } else if (Phaser.Input.Keyboard.JustUp(this.keyG) && this.player.blocking && !this.player.receivingDamage) {
            this.inputUpdates.blocking = false;
            this.player.playEndBlockAnim();
        } else if (this.player.blocking && !this.player.anims.isPlaying && !this.player.receivingDamage) {
            this.player.blocking = false;
        }

        //Agacharse//
        if (this.keyS.isDown && !this.player.crouching && !this.player.jumping && !this.player.blocking && !this.player.attacking && !this.player.receivingDamage) {
            this.inputUpdates.crouching = true;
            
            this.player.setVelocityX(0);
            this.player.crouching = true;
            this.player.playBeginCrouchAnim();
        } else if (this.keyS.isDown && this.player.crouching && !this.player.attacking && !this.player.receivingDamage) {
            this.player.playCrouchAnim();
        } else if (this.player.crouching && !this.player.attacking && (Phaser.Input.Keyboard.JustUp(this.keyS) || this.keyS.isUp) && !this.player.receivingDamage) {
            this.inputUpdates.crouching = false;
            
            this.player.playEndCrouchAnim();
            this.player.crouching = false;
        }

        //Saltar//
        if (this.keyW.isDown && !this.player.jumping && this.player.touchingGround && !this.player.crouching && !this.player.blocking && !this.player.attacking && !this.player.receivingDamage) {
            this.inputUpdates.jump = true;
            
            this.player.jumping = true;
            this.player.touchingGround = false;
            this.player.setVelocityY(this.player.jump);
            this.player.playBeginJumpAnim();
            this.selectSound(0);
        } else if (this.player.jumping && !this.player.touchingGround && !this.player.receivingDamage) {
            this.inputUpdates.jump = false;
            
            this.player.playJumpAnim();
        } else if (this.player.jumping && this.player.touchingGround && !this.player.receivingDamage) {
            this.inputUpdates.jump = false;

            this.player.playEndJumpAnim();
            this.player.jumping = false;
        }

        /////////////////////////////////////////////////other Player Inputs//////////////////////////////////////////////////////////

        //Movimiento básico//
        if (otherWalkRight && !this.otherPlayer.crouching && !this.otherPlayer.blocking && !this.otherPlayer.attacking && !this.otherPlayer.receivingDamage) {
            this.otherPlayer.setVelocityX(this.otherPlayer.speed);
            this.otherPlayer.setFlipX(false);

            this.otherPlayer.lookingRight = true;

            if (!this.otherPlayer.jumping) {
                this.otherPlayer.playWalkAnim();
            }
        } else if (otherWalkLeft && !this.otherPlayer.crouching && !this.otherPlayer.blocking && !this.otherPlayer.attacking && !this.otherPlayer.receivingDamage) {
            this.otherPlayer.setVelocityX(-this.otherPlayer.speed);
            this.otherPlayer.setFlipX(true);

            this.otherPlayer.lookingRight = false;

            if (!this.otherPlayer.jumping) {
                this.otherPlayer.playWalkAnim();
            }
        } else if (!this.otherPlayer.blocking && !this.otherPlayer.jumping && !this.otherPlayer.crouching && !this.otherPlayer.attacking && !this.otherPlayer.receivingDamage) {
            this.otherPlayer.setVelocityX(0);
            this.otherPlayer.playIdleAnim();
        }

        //Atacar//
        if (!this.otherPlayer.crouching && otherAttack && !this.otherPlayer.blocking && !this.otherPlayer.jumping && !this.otherPlayer.attacking && !this.otherPlayer.receivingDamage) {
            this.otherPlayer.setVelocityX(0);
            this.otherPlayer.attacking = true;
            this.otherPlayer.justAttack = true;
            this.otherPlayer.playBasicAttackAnim();
        } else if (this.otherPlayer.crouching && otherLowAttack && !this.otherPlayer.blocking && !this.otherPlayer.jumping && !this.otherPlayer.attacking && !this.otherPlayer.receivingDamage) {
            this.otherPlayer.setVelocityX(0);
            this.otherPlayer.attacking = true;
            this.otherPlayer.justAttack = true;
            this.otherPlayer.playDownAttackAnim();
        } else if (this.otherPlayer.attacking && !this.otherPlayer.anims.isPlaying) {
            this.otherPlayer.attacking = false;
        }

        //Bloquear//
        if (otherBlocking && !this.otherPlayer.crouching && !this.otherPlayer.jumping && !this.otherPlayer.blocking && !this.otherPlayer.attacking && !this.otherPlayer.receivingDamage) {
            this.otherPlayer.setVelocityX(0);
            this.otherPlayer.blocking = true;
            this.otherPlayer.playBeginBlockAnim();
        } else if (otherBlocking && this.otherPlayer.blocking && !this.otherPlayer.receivingDamage) {
            this.otherPlayer.playBlockAnim();
        } else if (Phaser.Input.Keyboard.JustUp(this.keyNumpad2) && this.otherPlayer.blocking && !this.otherPlayer.receivingDamage) {
            this.otherPlayer.playEndBlockAnim();
        } else if (this.otherPlayer.blocking && !this.otherPlayer.anims.isPlaying && !this.otherPlayer.receivingDamage) {
            this.otherPlayer.blocking = false;
        }

        //Agacharse//
        if (otherCrouching && !this.otherPlayer.crouching && !this.otherPlayer.jumping && !this.otherPlayer.blocking && !this.otherPlayer.attacking && !this.otherPlayer.receivingDamage) {
            this.otherPlayer.setVelocityX(0);
            this.otherPlayer.crouching = true;
            this.otherPlayer.playBeginCrouchAnim();
        } else if (otherCrouching && this.otherPlayer.crouching && !this.otherPlayer.attacking && !this.otherPlayer.receivingDamage) {
            this.otherPlayer.playCrouchAnim();
        } else if (this.otherPlayer.crouching && !this.otherPlayer.attacking && (!otherCrouching) && !this.otherPlayer.receivingDamage) {
            this.otherPlayer.playEndCrouchAnim();
            this.otherPlayer.crouching = false;
        }

        //Saltar//
        if (otherJump && !this.otherPlayer.jumping && this.otherPlayer.touchingGround && !this.otherPlayer.crouching && !this.otherPlayer.blocking && !this.otherPlayer.attacking && !this.otherPlayer.receivingDamage) {
            this.otherPlayer.jumping = true;
            this.otherPlayer.touchingGround = false;
            this.otherPlayer.setVelocityY(this.otherPlayer.jump);
            this.otherPlayer.playBeginJumpAnim();
            this.selectSound(0);
        } else if (this.otherPlayer.jumping && !this.otherPlayer.touchingGround && !this.otherPlayer.receivingDamage) {
            this.otherPlayer.playJumpAnim();
        } else if (this.otherPlayer.jumping && this.otherPlayer.touchingGround && !this.otherPlayer.receivingDamage) {
            this.otherPlayer.playEndJumpAnim();
            this.otherPlayer.jumping = false;
        }

        ///////////////////////////////////////////////////UPDATE ATTACK HITBOXES////////////////////////////////////////////////

        var directionP1;
        var directionP2;

        if (this.player.lookingRight) {
            directionP1 = 1;
        } else {
            directionP1 = -1;
        }

        if (this.otherPlayer.lookingRight) {
            directionP2 = 1;
        } else {
            directionP2 = -1;
        }

		if(logedUser.player==1)
		{
	        switch (this.parameters.p1CharacterID) {
	            case 0:
	                this.AttackHitboxUpP1.x = this.player.x + 180 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxUpP1.y = this.player.y - 20;
	
	                this.AttackHitboxDownP1.x = this.player.x + 215 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxDownP1.y = this.player.y;
	                break;
	            case 1:
	                this.AttackHitboxUpP1.x = this.player.x + 130 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxUpP1.y = this.player.y - 20;
	
	                this.AttackHitboxDownP1.x = this.player.x + 130 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxDownP1.y = this.player.y + 45;
	                break;
	            case 2:
	                this.AttackHitboxUpP1.x = this.player.x + 100 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxUpP1.y = this.player.y + 78;
	
	                this.AttackHitboxDownP1.x = this.player.x + 120 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxDownP1.y = this.player.y + 95;
	                break;
	            case 3:
	                this.AttackHitboxUpP1.x = this.player.x + 170 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxUpP1.y = this.player.y - 35;
	
	                this.AttackHitboxDownP1.x = this.player.x + 170 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxDownP1.y = this.player.y - 14;
	                break;
	        }
	        switch (this.parameters.p2CharacterID) {
	            case 0:
	                this.AttackHitboxUpP2.x = this.otherPlayer.x + 180 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxUpP2.y = this.otherPlayer.y - 20;
	
	                this.AttackHitboxDownP2.x = this.otherPlayer.x + 215 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxDownP2.y = this.otherPlayer.y;
	                break;
	            case 1:
	                this.AttackHitboxUpP2.x = this.otherPlayer.x + 130 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxUpP2.y = this.otherPlayer.y - 20;
	
	                this.AttackHitboxDownP2.x = this.otherPlayer.x + 130 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxDownP2.y = this.otherPlayer.y + 45;
	                break;
	            case 2:
	                this.AttackHitboxUpP2.x = this.otherPlayer.x + 100 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxUpP2.y = this.otherPlayer.y + 78;
	
	                this.AttackHitboxDownP2.x = this.otherPlayer.x + 120 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxDownP2.y = this.otherPlayer.y + 95;
	                break;
	            case 3:
	                this.AttackHitboxUpP2.x = this.otherPlayer.x + 170 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxUpP2.y = this.otherPlayer.y - 35;
	
	                this.AttackHitboxDownP2.x = this.otherPlayer.x + 170 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxDownP2.y = this.otherPlayer.y - 14;
	                break;
	        }
        }
        else if(logedUser.player)
        {
			 switch (this.parameters.p1CharacterID) {
	            case 0:
	                this.AttackHitboxUpP1.x = this.otherPlayer.x + 180 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxUpP1.y = this.otherPlayer.y - 20;
	
	                this.AttackHitboxDownP1.x = this.otherPlayer.x + 215 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxDownP1.y = this.otherPlayer.y;
	                break;
	            case 1:
	                this.AttackHitboxUpP1.x = this.otherPlayer.x + 130 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxUpP1.y = this.otherPlayer.y - 20;
	
	                this.AttackHitboxDownP1.x = this.otherPlayer.x + 130 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxDownP1.y = this.otherPlayer.y + 45;
	                break;
	            case 2:
	                this.AttackHitboxUpP1.x = this.otherPlayer.x + 100 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxUpP1.y = this.otherPlayer.y + 78;
	
	                this.AttackHitboxDownP1.x = this.otherPlayer.x + 120 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxDownP1.y = this.otherPlayer.y + 95;
	                break;
	            case 3:
	                this.AttackHitboxUpP1.x = this.otherPlayer.x + 170 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxUpP1.y = this.otherPlayer.y - 35;
	
	                this.AttackHitboxDownP1.x = this.otherPlayer.x + 170 * directionP2*this.hitboxPosScale;
	                this.AttackHitboxDownP1.y = this.otherPlayer.y - 14;
	                break;
	        }
	        switch (this.parameters.p2CharacterID) {
	            case 0:
	                this.AttackHitboxUpP2.x = this.player.x + 180 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxUpP2.y = this.player.y - 20;
	
	                this.AttackHitboxDownP2.x = this.player.x + 215 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxDownP2.y = this.player.y;
	                break;
	            case 1:
	                this.AttackHitboxUpP2.x = this.player.x + 130 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxUpP2.y = this.player.y - 20;
	
	                this.AttackHitboxDownP2.x = this.player.x + 130 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxDownP2.y = this.player.y + 45;
	                break;
	            case 2:
	                this.AttackHitboxUpP2.x = this.player.x + 100 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxUpP2.y = this.player.y + 78;
	
	                this.AttackHitboxDownP2.x = this.player.x + 120 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxDownP2.y = this.player.y + 95;
	                break;
	            case 3:
	                this.AttackHitboxUpP2.x = this.player.x + 170 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxUpP2.y = this.player.y - 35;
	
	                this.AttackHitboxDownP2.x = this.player.x + 170 * directionP1*this.hitboxPosScale;
	                this.AttackHitboxDownP2.y = this.player.y - 14;
	                break;
	        }
		}

        /////////////////////////////////////////////PUNTEROS PERSONAJES////////////////////////////////////////////////////////

        //Si la rana escogida es la toro, lluvia o trepadora, el puntero debe estar más arriba
        if (this.parameters.p1CharacterID == 0 || this.parameters.p1CharacterID == 3 || this.parameters.p1CharacterID == 1) {
            this.punteroP1.x = this.player.x;
            this.punteroP1.y = this.player.y - 200;
        } else {

            this.punteroP1.x = this.player.x;
            this.punteroP1.y = this.player.y - 100;
        }

        //Si la rana escogida es la toro, lluvia o trepadora, el puntero debe estar más arriba
        if (this.parameters.p2CharacterID == 0 || this.parameters.p2CharacterID == 3 ) {
            this.punteroP2.x = this.otherPlayer.x;
            this.punteroP2.y = this.otherPlayer.y - 200;
        } else if( this.parameters.p1CharacterID == 1) 
        {
            this.punteroP2.x = this.otherPlayer.x;
            this.punteroP2.y = this.otherPlayer.y - 225;
        }
        else {

            this.punteroP2.x = this.otherPlayer.x;
            this.punteroP2.y = this.otherPlayer.y - 100;
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
                if (this.player.hp >= this.otherPlayer.hp) {
                    this.roundEnd(2);
                }
                else {
                    this.roundEnd(1);
                }
            }

            this.timer = 0;
        }
        this.timer += delta / 1000;
        
        //Send de los inputs al servidor
        console.log("Enviando inputs");
        connection.send(JSON.stringify(this.inputUpdates));
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
            this.player.hp = this.player.maxhp;
            this.otherPlayer.hp = this.otherPlayer.maxhp;
            this.setValueBar1(1);
            this.setValueBar2(1);
            this.player.x = 190;
            this.player.y = 800;
            this.otherPlayer.x = 1730;
            this.otherPlayer.y = 800;
            this.player.setFlipX(false);
            this.otherPlayer.setFlipX(true);

        }
    }

    playerAttackUp() //Comprobación de los estados de cada jugador comprobando los parametros "attacking" y "blocking"
    {
        if (this.player.attacking && !this.otherPlayer.blocking && this.player.justAttack && !this.otherPlayer.receivingDamage && !this.player.crouching) {
            console.log("Ataque Alto");
            this.otherPlayer.takeDamage(10);
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
            if(logedUser.player == 1){
				this.setValueBar2(this.otherPlayer.hp/this.otherPlayer.maxhp);
			}
			else if(logedUser.player == 2){
				this.setValueBar1(this.otherPlayer.hp/this.otherPlayer.maxhp);
			}

            this.player.justAttack = false;
            console.log('player 2 received 10 damage after an UpAttack!');
        }

        if (this.player.attacking && this.otherPlayer.blocking && this.player.justAttack && !this.otherPlayer.receivingDamage && !this.player.crouching) {
            console.log("Ataque Alto");
            this.otherPlayer.takeDamage(5);
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
            if(logedUser.player == 1){
				this.setValueBar2(this.otherPlayer.hp/this.otherPlayer.maxhp);
			}
			else if(logedUser.player == 2){
				this.setValueBar1(this.otherPlayer.hp/this.otherPlayer.maxhp);
			}
            this.player.justAttack = false;
            console.log('player 2 received 5 damage after an UpAttack!');
        }
    }

    otherPlayerAttackUp() {
        if (this.otherPlayer.attacking && !this.player.blocking && this.otherPlayer.justAttack && !this.player.receivingDamage && !this.otherPlayer.crouching) {
            this.player.takeDamage(10);
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
            if(logedUser.player ==1){
				this.setValueBar1(this.player.hp/this.player.maxhp);
			}
			else if(logedUser.player ==2) {
				this.setValueBar2(this.player.hp/this.player.maxhp);
			}

            this.otherPlayer.justAttack = false;
            console.log('player 1 received 10 damage after an UpAttack!');
        }

        if (this.otherPlayer.attacking && this.player.blocking && this.otherPlayer.justAttack && !this.player.receivingDamage && !this.otherPlayer.crouching) {
            this.player.takeDamage(5);
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
            if(logedUser.player ==1){
				this.setValueBar1(this.player.hp/this.player.maxhp);
			}
			else if(logedUser.player ==2) {
				this.setValueBar2(this.player.hp/this.player.maxhp);
			}
            this.otherPlayer.justAttack = false;
            console.log('player 1 received 5 damage after an UpAttack!');
        }
    }

    playerAttackDown() //Comprobación de los estados de cada jugador comprobando los parametros "attacking" y "blocking"
    {
        if (this.player.attacking && !this.otherPlayer.blocking && this.player.justAttack && !this.otherPlayer.receivingDamage && this.player.crouching) {
            console.log("Ataque Bajo");
            this.otherPlayer.takeDamage(10);
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
            if(logedUser.player == 1){
				this.setValueBar2(this.otherPlayer.hp/this.otherPlayer.maxhp);
			}
			else if(logedUser.player == 2){
				this.setValueBar1(this.otherPlayer.hp/this.otherPlayer.maxhp);
			}
            this.player.justAttack = false;
            console.log('player 2 received 10 damage after a DownAttack!');
        }

        if (this.player.attacking && this.otherPlayer.blocking && this.player.justAttack && !this.otherPlayer.receivingDamage && this.player.crouching) {
            console.log("Ataque Bajo");
            this.otherPlayer.takeDamage(5);
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
            if(logedUser.player == 1){
				this.setValueBar2(this.otherPlayer.hp/this.otherPlayer.maxhp);
			}
			else if(logedUser.player == 2){
				this.setValueBar1(this.otherPlayer.hp/this.otherPlayer.maxhp);
			}
            this.player.justAttack = false;
            console.log('player 2 received 5 damage after a DownAttack!');
        }
    }

    otherPlayerAttackDown() {
        if (this.otherPlayer.attacking && !this.player.blocking && this.otherPlayer.justAttack && !this.player.receivingDamage && this.otherPlayer.crouching) {
            this.player.takeDamage(10);
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
            if(logedUser.player ==1){
				this.setValueBar1(this.player.hp/this.player.maxhp);
			}
			else if(logedUser.player ==2) {
				this.setValueBar2(this.player.hp/this.player.maxhp);
			}
            this.otherPlayer.justAttack = false;
            console.log('player 1 received 10 damage after a DownAttack!');
        }

        if (this.otherPlayer.attacking && this.player.blocking && this.otherPlayer.justAttack && !this.player.receivingDamage && this.otherPlayer.crouching) {
            this.player.takeDamage(5);
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
            if(logedUser.player ==1){
				this.setValueBar1(this.player.hp/this.player.maxhp);
			}
			else if(logedUser.player ==2) {
				this.setValueBar2(this.player.hp/this.player.maxhp);
			}
            this.otherPlayer.justAttack = false;
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
        this.barraVidaP1.scaleX = percentage ;
    }

    setValueBar2(percentage) {
        // Escala la barra
        this.barraVidaP2.scaleX = percentage * -1;
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