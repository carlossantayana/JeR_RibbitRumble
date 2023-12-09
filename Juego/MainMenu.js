"use strict";


export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    create() {

        this.add.image(940, 534.5, 'menuPrincipal').setScale(0.5);

        this.audioLauncher();
        
        const playButton = this.add.image(940, 600, 'botonComenzar').setScale(0.5).setInteractive(); //Objeto que queremos que sea el boton
        const settingsButton = this.add.image(940, 700, 'botonAjustes').setScale(0.5).setInteractive(); //Objeto que queremos que sea el boton
        const exitButton = this.add.image(940, 800, 'botonSalir').setScale(0.5).setInteractive(); //Objeto que queremos que sea el boton

        //creamos EventListeners "pointerdown" (cuando se hace click con el ratón) que ejecuten la función que queremos
        playButton.on('pointerdown', () => this.playOnClick());
        settingsButton.on('pointerdown', () => this.settingsOnClick());
        exitButton.on('pointerdown', () => this.exitOnClick());

        this.buttonOver(playButton);
        this.buttonOver(settingsButton);
        this.buttonOver(exitButton);

        this.buttonOut(playButton);
        this.buttonOut(settingsButton);
        this.buttonOut(exitButton);

    }

    audioLauncher(){
        this.scene.launch('AudioManager');
    }

    playOnClick() { //Esta es la función que hace el boton de jugar al pulsarse

        this.scene.start('PlayerSelectionMenu');
    }
    settingsOnClick() { //Esta es la función que hace el boton de ajustes al pulsarse
        this.scene.run('SettingsMenu');
        this.scene.pause();
    }
    exitOnClick() { //Esta es la función que hace el boton de salir al pulsarse
        window.close();
    }

    buttonOver(button) {
        button.on('pointerover', function(){
            this.setScale(0.55);
        })
    }

    buttonOut(button) {
        button.on('pointerout', function(){
            this.setScale(0.5);
        })
    }
}

