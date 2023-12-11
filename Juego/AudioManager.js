"use strict";


export default class AudioManager extends Phaser.Scene {
    constructor() {
        super('AudioManager');
        this.musicaMenus = null;
        this.musicaDesierto = null;
        this.musicaNenufar = null;
        this.musicaSelva = null;
        this.musicaResultados = null;
        this.volumeMusic = 1;
        this.volumeSFX = 1;
        this.track = -1;
    }

    create() {
        this.musicaMenus = this.sound.add('menuMusic', {
            volume: this.volumeMusic,
            loop: true
        });
        this.musicaDesierto = this.sound.add('desiertoMusic', {
            volume: this.volumeMusic,
            loop: true
        });
        this.musicaNenufar = this.sound.add('nenufarMusic', {
            volume: this.volumeMusic,
            loop: true
        });
        this.musicaSelva = this.sound.add('selvaMusic', {
            volume: this.volumeMusic,
            loop: true
        });
        
        this.events.on('changeVolumeMusic', (newVolumeMusic) => {
            this.volumeMusic = newVolumeMusic;
        });
        this.events.on('changeVolumeSFX', (newVolumeSFX) => {
            this.volumeSFX = newVolumeSFX;
        });
        this.events.on('changeTrackMaps', (newTrack) => {
            this.track = newTrack;
        });
        /*this.events.on('changeTrackResults', (newTrack) => {
            this.track = newTrack;
        });
        this.events.on('changeTrackMenu', (newTrack) => {
            this.track = newTrack;
        });*/

    }
    update() {
        
        if(this.track == -1){
            this.musicaMenus.play();
            this.track = 0;
        }
        if(this.track>0){
            this.musicaMenus.stop();
        }
        if(this.track == 1){
            this.musicaDesierto.play();
            this.track = 0;
        }
        if(this.track == 2){
            this.musicaNenufar.play();
            this.track = 0;
        }
        if(this.track == 3){
            this.musicaSelva.play();
            this.track = 0;
        }
        this.musicaMenus.setVolume(this.volumeMusic);
        this.musicaDesierto.setVolume(this.volumeMusic);
        this.musicaNenufar.setVolume(this.volumeMusic);
        this.musicaSelva.setVolume(this.volumeMusic);
    }


}

