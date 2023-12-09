"use strict";


export default class ModeSelectionMenu extends Phaser.Scene {
    constructor() {
        super('ModeSelectionMenu');
    }

    create() {
        this.rect = this.add.rectangle(960, 540, 1000, 600, 0x000000);
        this.rect.alpha = 0.8

        var volverButton = this.add.image(1300, 790, 'botonVolver').setScale(0.5).setInteractive();//Creacion y funcionalidad del boton volver
        volverButton.on('pointerdown', () => this.returnToMenu());
        volverButton.on('pointerover', function () { volverButton.setScale(0.52) });
        volverButton.on('pointerout', function () { volverButton.setScale(0.5) });

        var localButton = this.add.image(750, 540, 'botonLocal').setInteractive();//Creacion y funcionalidad del boton Local
        localButton.on('pointerdown', () => this.startLocal());
        localButton.on('pointerover', function () { localButton.setScale(1.1) });
        localButton.on('pointerout', function () { localButton.setScale(1) });

        var netButton = this.add.image(1170, 540, 'botonEnRed').setInteractive();//Creacion y funcionalidad del boton En Red
        netButton.on('pointerdown', () => this.startNet());
        netButton.on('pointerover', function () { netButton.setScale(1.1) });
        netButton.on('pointerout', function () { netButton.setScale(1) });
    }
    returnToMenu() {
        this.scene.resume('MainMenu');
        this.scene.sleep();
    }
    startLocal() {
        this.scene.start('PlayerSelectionMenu');
    }
    startNet() {
        //Para cuando se haga
    }


}

