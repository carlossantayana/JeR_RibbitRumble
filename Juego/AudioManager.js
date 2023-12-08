"use strict";


export default class AudioManager extends Phaser.Scene {
    constructor() {
        super('AudioManager');
        this.musicaMenus = null
        this.volume = 1;
    }

    create() {
            this.musicaMenus = this.sound.add('desiertoMusica', {
            volume: this.volume,
            loop: true
        });
        this.musicaMenus.play();
        this.events.on('changeVolume', (newVolume) => {
            this.volume = newVolume;
        });
    }
    update() {
        this.musicaMenus.setVolume(this.volume);
    }
    

}

