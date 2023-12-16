"use strict";

export default class Results extends Phaser.Scene {
    constructor() {
        super('Results');
        this.parameters = {
            p1CharacterID: 0,
            p2CharacterID: 0,
            winnerID: 0,
            winerLoses: 0
        }
    }

    init(data) //Esto se ejecuta al iniciar la escena, recibirá el personaje ganador y perdedor, además del número del jugador que haya ganado
    {
        this.parameters.p1CharacterID = data.p1CharacterID;
        this.parameters.p2CharacterID = data.p2CharacterID;
        this.parameters.winnerID = data.winnerId;
        this.parameters.winerLoses = data.loses;
        console.log(data.winnerId);
        console.log(this.parameters.winnerID);
    }

    create() {
        this.add.image(940, 534.5, 'menuFondo').setScale(0.5).setTint(0x808080);
        switch (this.parameters.p1CharacterID) {
            case 0:
                if (this.parameters.winnerID === 1) {
                    this.p1Sprite = this.add.sprite(940, 500, "ToroIdle");
                }
                else {
                    this.p1Sprite = this.add.sprite(940, 500, "ToroDaño");
                }
                break;
            case 1:
                if (this.parameters.winnerID === 1) {
                    this.p1Sprite = this.add.sprite(940, 500, "LluviaIdle");
                }
                else {
                    this.p1Sprite = this.add.sprite(940, 500, "LluviaDaño");
                }
                break;
            case 2:
                if (this.parameters.winnerID === 1) {
                    this.p1Sprite = this.add.sprite(940, 500, "FlechaIdle");
                }
                else {
                    this.p1Sprite = this.add.sprite(940, 500, "FlechaDaño");
                }
                break;
            case 3:
                if (this.parameters.winnerID === 1) {
                    this.p1Sprite = this.add.sprite(940, 500, "TrepadoraIdle");
                }
                else {
                    this.p1Sprite = this.add.sprite(940, 500, "TrepadoraDaño");
                }
                break;
        }
        switch (this.parameters.p2CharacterID) {
            case 0:
                if (this.parameters.winnerID === 2) {
                    this.p2Sprite = this.add.sprite(940, 500, "ToroIdle");
                }
                else {
                    this.p2Sprite = this.add.sprite(940, 500, "ToroDaño");
                }
                break;
            case 1:
                if (this.parameters.winnerID === 2) {
                    this.p2Sprite = this.add.sprite(940, 500, "LluviaIdle");
                }
                else {
                    this.p2Sprite = this.add.sprite(940, 500, "LluviaDaño");
                }
                break;
            case 2:
                if (this.parameters.winnerID === 2) {
                    this.p2Sprite = this.add.sprite(940, 500, "FlechaIdle");
                }
                else {
                    this.p2Sprite = this.add.sprite(940, 500, "FlechaDaño");
                }
                break;
            case 3:
                if (this.parameters.winnerID === 2) {
                    this.p2Sprite = this.add.sprite(940, 500, "TrepadoraIdle");
                }
                else {
                    this.p2Sprite = this.add.sprite(940, 500, "TrepadoraDaño");
                }
                break;
        }


        this.corona = this.add.image(400, 700, "corona").setScale(0.2);
        this.foco = this.add.image(1410, 300, "foco").setScale(0.65, 1.1);
        if (this.parameters.winnerID === 1) {
            this.p1Sprite.setPosition(400, 800);
            switch (this.parameters.p1CharacterID) {
                case 0:
                    this.p1Sprite.setScale(2);
                    this.corona.setPosition(575, 560);
                    break;
                case 1:
                    this.p1Sprite.setScale(1.4);
                    this.corona.setPosition(550, 625);
                    break;
                case 2:
                    this.p1Sprite.setScale(2.5);
                    this.p1Sprite.y -= 30;
                    this.corona.setPosition(575, 810);
                    break;
                case 3:
                    this.p1Sprite.setScale(1);
                    this.corona.setPosition(405, 645);
                    this.corona.setRotation(-0.0872665);
                    break;
            }
            this.p2Sprite.setPosition(1410, 650);
            switch (this.parameters.p2CharacterID) {
                case 0:
                    this.p2Sprite.setScale(0.75);
                    break;
                case 1:
                    this.p2Sprite.setScale(0.5);
                    break;
                case 2:
                    this.p2Sprite.setScale(0.75);
                    break;
                case 3:
                    this.p2Sprite.setScale(0.5);
                    break;
            }
            this.p2Sprite.flipX = true;
        }
        else if (this.parameters.winnerID === 2) {
            this.p2Sprite.setPosition(400, 800);
            switch (this.parameters.p2CharacterID) {
                case 0:
                    this.p2Sprite.setScale(2);
                    this.corona.setPosition(575, 560);
                    break;
                case 1:
                    this.p2Sprite.setScale(1.4);
                    this.corona.setPosition(550, 625);
                    break;
                case 2:
                    this.p2Sprite.setScale(2.5);
                    this.p2Sprite.y -= 30;
                    this.corona.setPosition(575, 810);
                    break;
                case 3:
                    this.p2Sprite.setScale(1);
                    this.corona.setPosition(405, 645);
                    this.corona.setRotation(-0.0872665);
                    break;
            }
            this.p1Sprite.setPosition(1410, 650);
            switch (this.parameters.p1CharacterID) {
                case 0:
                    this.p1Sprite.setScale(0.75);
                    break;
                case 1:
                    this.p1Sprite.setScale(0.5);
                    break;
                case 2:
                    this.p1Sprite.setScale(0.75);
                    break;
                case 3:
                    this.p1Sprite.setScale(0.5);
                    break;
            }
            this.p1Sprite.flipX = true;
        }
        console.log(this.parameters.winnerID);
        if (this.parameters.winnerID === 1) {
            this.add.text(100, 40, "Gana el Jugador 1", { fontSize: '90px' });
            this.add.text(100, 140, "Jugador 1 : 2 rondas ganadas", { fontSize: '50px' });
            if (this.parameters.winerLoses === 1) {
                this.add.text(100, 210,"Jugador 2 : "+ this.parameters.winerLoses + " ronda ganada", { fontSize: '50px' });
            }
            else {
                this.add.text(100, 210,"Jugador 2 : "+ this.parameters.winerLoses + " rondas ganadas", { fontSize: '50px' });
            }
        }
        else {
            this.add.text(100, 40, "Gana el Jugador 2", { fontSize: '90px' });
            this.add.text(100, 140, "Jugador 2 : 2 rondas ganadas", { fontSize: '50px' });
            if (this.parameters.winerLoses === 1) {
                this.add.text(100, 210,"Jugador 1 : "+ this.parameters.winerLoses + " ronda ganada", { fontSize: '50px' });
            }
            else {
                this.add.text(100, 210,"Jugador 1 : "+ this.parameters.winerLoses + " rondas ganadas", { fontSize: '50px' });
            }
        }


        const rematchButton = this.add.image(1000, 950, 'botonRevancha').setScale(0.75).setInteractive(); //Objeto que queremos que sea el boton
        const backButton = this.add.image(1500, 1000, 'botonVolver').setScale(0.5).setInteractive(); //Objeto que queremos que sea el boton

        rematchButton.on('pointerdown', () => this.rematchOnClick());
        backButton.on('pointerdown', () => this.backOnClick());

        this.rematchButtonOver(rematchButton);
        this.backButtonOver(backButton);

        this.rematchButtonOut(rematchButton);
        this.backButtonOut(backButton);
    }

    rematchOnClick() {
        this.changeTrackMenu();
        this.scene.start("PlayerSelectionMenu");
        this.scene.stop();

    }

    backOnClick() {
        this.changeTrackMenu();
        this.scene.resume("MainMenu");
        this.scene.stop();
        
    }

    rematchButtonOver(button) {
        button.on('pointerover', function () {
            button.setScale(1);
        })
    }

    rematchButtonOut(button) {
        button.on('pointerout', function () {
            button.setScale(0.75);
        })
    }

    backButtonOver(button) {
        button.on('pointerover', function () {
            button.setScale(0.75);
        })
    }

    backButtonOut(button) {
        button.on('pointerout', function () {
            button.setScale(0.5);
        })
    }
    changeTrackMenu() {
        this.scene.get('AudioManager').events.emit('changeTrackMenu');
    }
}