"use strict";

export default class ResultsNet extends Phaser.Scene {
    constructor() {
        super('ResultsNet');
        this.parameters = {
            p1CharacterID: 0,
            p2CharacterID: 0,
            winnerID: 0,
            winnerLoses: 0
        }

        this.timer = 0;
    }

    init(data) //Esto se ejecuta al iniciar la escena, recibirá el personaje ganador y perdedor, además del número del jugador que haya ganado
    {
        this.parameters.p1CharacterID = data.player1CharacterID;
        this.parameters.p2CharacterID = data.player2CharacterID;
        this.parameters.winnerID = data.winnerId;
        this.parameters.winnerLoses = data.loses;

        console.log("Ha ganado el jugador: " + this.parameters.winnerID);
        console.log("Gano perdiendo " + this.parameters.winnerLoses + " rondas");

        this.timer = 0;
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
        if (this.parameters.winnerID === 1) {
            this.add.text(100, 40, "Gana el Jugador 1", { fontSize: '90px' });
            this.add.text(100, 140, "Jugador 1 : 2 rondas ganadas", { fontSize: '50px' });
            if (this.parameters.winnerLoses === 1) {
                this.add.text(100, 210, "Jugador 2 : " + 1 + " ronda ganada", { fontSize: '50px' });
            }
            else {
                this.add.text(100, 210, "Jugador 2 : " + 0 + " rondas ganadas", { fontSize: '50px' });
            }
        }
        else {
            this.add.text(100, 40, "Gana el Jugador 2", { fontSize: '90px' });
            this.add.text(100, 140, "Jugador 2 : 2 rondas ganadas", { fontSize: '50px' });
            if (this.parameters.winnerLoses === 1) {
                this.add.text(100, 210, "Jugador 1 : " + 1 + " ronda ganada", { fontSize: '50px' });
            }
            else {
                this.add.text(100, 210, "Jugador 1 : " + 0 + " rondas ganadas", { fontSize: '50px' });
            }
        }

        /////////////////////////////////////////////// Parte de API REST ///////////////////////////////////////////////

        //Si el jugador que inicio sesion (jugador 1) gana
        if (this.parameters.winnerID == logedUser.player) {
            //Aumentamos su numero de partidas ganadas
            logedUser.wins += 1;
            //Aumentamos su numero de rondas ganadas
            logedUser.roundWins += 2;
            //Aumentamos su numero de rondas perdidas
            logedUser.roundLoses += this.parameters.winnerLoses;

            //Llamamos al metodo que actualiza dicho usuario en el servidor
            updateUserData(logedUser)

            this.add.text(100, 280, "Estadisticas de: " + logedUser.username, { fontSize: '45px' });
            this.add.text(100, 340, "Partidas ganadas en total: " + logedUser.wins, { fontSize: '45px' });
            this.add.text(100, 400, "Partidas perdidas en total: " + logedUser.loses, { fontSize: '45px' });
            this.add.text(100, 460, "Rondas ganadas en total: " + logedUser.roundWins, { fontSize: '45px' });
            this.add.text(100, 510, "Rondas perdidas en total: " + logedUser.roundLoses, { fontSize: '45px' });

            //Si el jugador ha perdido
        } else {
            //Aumentamos su numero de partidas perdidas
            logedUser.loses += 1;
            //Aumentamos su numero de rondas perdidas
            logedUser.roundLoses += 2;

            //Llamamos al metodo que actualiza dicho usuario en el servidor
            updateUserData(logedUser)

            this.add.text(100, 270, "Estadisticas de: " + logedUser.username, { fontSize: '40px' });
            this.add.text(100, 330, "Partidas ganadas en total: " + logedUser.wins, { fontSize: '40px' });
            this.add.text(100, 390, "Partidas perdidas en total: " + logedUser.loses, { fontSize: '40px' });
            this.add.text(100, 450, "Rondas ganadas en total: " + logedUser.roundWins, { fontSize: '40px' });
            this.add.text(100, 500, "Rondas perdidas en total: " + logedUser.roundLoses, { fontSize: '40px' });
        }

        //this.add.text(100, 210,"Jugador 1 : "+ this.parameters.winnerLoses + " rondas ganadas", { fontSize: '50px' });

        /////////////////////////////////////////////// Parte de API REST ///////////////////////////////////////////////


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
        CreateWebSocket();
        this.scene.start("Pairing");
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

    update(time, delta) {
        if (this.timer <= 1) {
            this.timer += delta / 1000;
        } else {
            if (connection.readyState === WebSocket.OPEN) {
                connection.close();
            }
        }
    }
}