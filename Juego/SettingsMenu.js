"use strict";


export default class SettingsMenu extends Phaser.Scene {
    constructor() {
        super('SettingsMenu');
    }

    create() {
        var fondo = this.add.image(940, 534.5, 'pruebaBoton').setScale(1.75,1.25 );
        fondo.setTint(0x000000).setInteractive();
        fondo.on('pointerdown', () => this.returnToMenu());


    }
    returnToMenu() { 

        this.scene.resume('MainMenu');
        this.scene.stop();
    }
}

