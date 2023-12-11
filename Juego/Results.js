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
        this.parameters.p1CharacterID = data.player1CharacterID;
        this.parameters.p2CharacterID = data.player2CharacterID;
        this.parameters.winnerID = data.winnerID;
        this.winerLoses = data.loses;
    }

    create() {
        this.add.image(940, 534.5, 'menuFondo').setScale(0.5).setTint(0x808080);
        switch (this.parameters.p1CharacterID) {
            case 0:
                if (this.winnerID === 1) {
                    this.p1Sprite = this.add.sprite(940, 500, "ToroIdle");
                }
                else {
                    this.p1Sprite = this.add.sprite(940, 500, "ToroIdle");//Hay que cambiarlo por el sprite de daño
                }
                break;
            case 1:
                if (this.winnerID === 1) {
                    this.p1Sprite = this.add.sprite(940, 500, "LluviaIdle");
                }
                else {
                    this.p1Sprite = this.add.sprite(940, 500, "LluviaIdle");//Hay que cambiarlo por el sprite de daño
                }
                break;
            case 2:
                if (this.winnerID === 1) {
                    this.p1Sprite = this.add.sprite(940, 500, "FlechaIdle");
                }
                else {
                    this.p1Sprite = this.add.sprite(940, 500, "FlechaIdle");//Hay que cambiarlo por el sprite de daño
                }
                break;
            case 3:
                if (this.winnerID === 1) {
                    this.p1Sprite = this.add.sprite(940, 500, "TrepadoraIdle");
                }
                else {
                    this.p1Sprite = this.add.sprite(940, 500, "TrepadoraIdle");//Hay que cambiarlo por el sprite de daño
                }
                break;
        }
        switch (this.parameters.p2CharacterID) {
            case 0:
                if (this.winnerID === 2) {
                    this.p2Sprite = this.add.sprite(940, 500, "ToroIdle");
                }
                else {
                    this.p2Sprite = this.add.sprite(940, 500, "ToroIdle");//Hay que cambiarlo por el sprite de daño
                }
                break;
            case 1:
                if (this.winnerID === 2) {
                    this.p2Sprite = this.add.sprite(940, 500, "LluviaIdle");
                }
                else {
                    this.p2Sprite = this.add.sprite(940, 500, "LluviaIdle");//Hay que cambiarlo por el sprite de daño
                }
                break;
            case 2:
                if (this.winnerID === 2) {
                    this.p2Sprite = this.add.sprite(940, 500, "FlechaIdle");
                }
                else {
                    this.p2Sprite = this.add.sprite(940, 500, "FlechaIdle");//Hay que cambiarlo por el sprite de daño
                }
                break;
            case 3:
                if (this.winnerID === 2) {
                    this.p2Sprite = this.add.sprite(940, 500, "TrepadoraIdle");
                }
                else {
                    this.p2Sprite = this.add.sprite(940, 500, "TrepadoraIdle");//Hay que cambiarlo por el sprite de daño
                }
                break;
        }

        this.corona = this.add.image(400, 700, "corona").setScale(0.2);
        this.foco = this.add.image(1410, 450, "foco").setScale(0.65, 1.1);
        if (this.parameters.winnerID === 1) {
            this.p1Sprite.setPosition(400, 800);
            switch (this.parameters.p1CharacterID) {
                case 0:
                    this.p1Sprite.setScale(2);
                    this.corona.setPosition(575, 560);
                    break;
                case 1:
                    this.p1Sprite.setScale(0.35);
                    this.corona.setPosition(575, 600);
                    break;
                case 2:
                    this.p1Sprite.setScale(2.5);
                    this.p1Sprite.y -= 30;
                    this.corona.setPosition(575, 810);
                    break;
                case 3:
                    this.p1Sprite.setScale(2);
                    //Queda posicionar la corona para la rana trepadora
                    break;
            }
            this.p2Sprite.setPosition(1410, 800);
            switch (this.parameters.p2CharacterID) {
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
                    this.p2Sprite.setScale(0.35);
                    this.corona.setPosition(575, 600);
                    break;
                case 2:
                    this.p2Sprite.setScale(2.5);
                    this.p1Sprite.y -= 30;
                    this.corona.setPosition(575, 810);
                    break;
                case 3:
                    this.p2Sprite.setScale(2);
                    //Queda posicionar la corona para la rana trepadora
                    break;
            }
            this.p1Sprite.setPosition(1410, 800);
            switch (this.parameters.p1CharacterID) {
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
            this.p1Sprite.flipX = true;
        }

        if (this.winnerId === 1) {
            this.add.text(100, 40, "Gana el Jugador 1", { fontSize: '90px' });
            this.add.text(100, 140, "2 victorias", { fontSize: '60px' });
            if (this.winerLoses === 1) {
                this.add.text(100, 220, this.winerLoses + " derrota", { fontSize: '60px' });
            }
            else {
                this.add.text(100, 220, this.winerLoses + " derrotas", { fontSize: '60px' });
            }
        }
        else {
            this.add.text(100, 40, "Gana el Jugador 1", { fontSize: '90px' });
            this.add.text(100, 140, "2 victorias", { fontSize: '60px' });
            if (this.winerLoses === 1) {
                this.add.text(100, 220, this.winerLoses + " derrota", { fontSize: '60px' });
            }
            else {
                this.add.text(100, 220, this.winerLoses + " derrotas", { fontSize: '60px' });
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
        this.scene.start("PlayerSelectionMenu");
    }

    backOnClick() {
        this.scene.start("MainMenu");
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
}