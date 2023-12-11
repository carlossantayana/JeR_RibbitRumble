"use strict";


export default class AudioManager extends Phaser.Scene {
    constructor() {
        super('AudioManager');
        this.musicaMenus = null;
        this.musicaDesierto = null;
        this.musicaNenufar = null;
        this.musicaSelva = null;
        this.musicaResultados = null;
        this.volume = 1;
    }

    create() {
        this.musicaMenus = this.sound.add('menuMusic', {
            volume: this.volume,
            loop: true
        });
        this.musicaDesierto = this.sound.add('desiertoMusic', {
            volume: this.volume,
            loop: true
        });
        this.musicaSelva = this.sound.add('selvaMusic', {
            volume: this.volume,
            loop: true
        });
        this.musicaNenufar = this.sound.add('nenufarMusic', {
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

