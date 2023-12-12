"use strict";


export default class AudioManager extends Phaser.Scene {
    constructor() {
        super('AudioManager');
        //Musica del juego
        this.musicaMenus = null;
        this.musicaDesierto = null;
        this.musicaNenufar = null;
        this.musicaSelva = null;
        this.musicaResultados = null;

        //Sonidos del juego

        this.sonidoAguila = null;
        this.sonidoViento = null;
        this.sonidoRio = null;
        this.sonidoRibbits = null;
        this.sonidoSelva = null;
        this.sonidoChapoteo = null;

        //Sonidos de ranas

        this.toroAt = null;
        this.toroAtB = null;
        this.trepadoraAt = null;
        this.trepadoraAtB = null;
        this.lluviaAt = null;
        this.lluviaCAt = null;
        this.lluviaAtB = null;
        this.lluviaCAtB = null;
        this.flechaAt = null;
        this.flechaCAt = null;
        this.flechaAtB = null;
        this.flechaCAtB = null;
        this.jumpSound = null;

        //Parametros para la escena AudioManager
        this.volumeMusic = 1;
        this.volumeSFX = 1;
        this.track = -1;
    }

    create() {

        //Guarda musica en las variables con sus propiedades
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
        this.musicaResultados = this.sound.add('resultsMusic', {
            volume: this.volumeMusic,
            loop: false
        });

        //Guarda sonidos de ambiente en las variables con sus propiedades

        this.sonidoAguila = this.sound.add('aguilaSound', {
            volume: this.volumeSFX,
            loop: false
        });
        this.sonidoChapoteo = this.sound.add('chapoteoSound', {
            volume: this.volumeSFX,
            loop: false
        });
        this.sonidoViento = this.sound.add('vientoSound', {
            volume: this.volumeSFX,
            loop: true
        });
        this.sonidoRio = this.sound.add('rioSound', {
            volume: this.volumeSFX,
            loop: true
        });
        this.sonidoRibbits = this.sound.add('ribbitsSound', {
            volume: this.volumeSFX,
            loop: true
        });
        this.sonidoSelva = this.sound.add('ambienteSelvaSound', {
            volume: this.volumeSFX,
            loop: true
        });
        
        //Guarda sonidos de las ranas en las variables con sus propiedades

        //Rana Toro
        this.toroAt = this.sound.add('toroAttackSound', {
            volume: this.volumeSFX,
            loop: false
        });
        this.toroAtB = this.sound.add('toroAttackBlockedSound', {
            volume: this.volumeSFX,
            loop: false
        });

        //Rana Trepadora
        this.trepadoraAt = this.sound.add('trepadoraAttackSound', {
            volume: this.volumeSFX,
            loop: false
        });
        this.trepadoraAtB = this.sound.add('trepadoraAttackBlockedSound', {
            volume: this.volumeSFX,
            loop: false
        });

        //Rana de Lluvia
        this.lluviaAt = this.sound.add('lluviaAttackSound', {
            volume: this.volumeSFX,
            loop: false
        });
        this.lluviaAtB = this.sound.add('lluviaAttackBlockedSound', {
            volume: this.volumeSFX,
            loop: false
        });
        this.lluviaCAt = this.sound.add('lluviaCrouchAttackSound', {
            volume: this.volumeSFX,
            loop: false
        });
        this.lluviaCAtB = this.sound.add('lluviaCrouchAttackBlockedSound', {
            volume: this.volumeSFX,
            loop: false
        });

        //Rana Flecha
        this.flechaAt = this.sound.add('flechaAttackSound', {
            volume: this.volumeSFX,
            loop: false
        });
        this.flechaAtB = this.sound.add('flechaAttackBlockedSound', {
            volume: this.volumeSFX,
            loop: false
        });
        this.flechaCAt = this.sound.add('flechaCrouchAttackSound', {
            volume: this.volumeSFX,
            loop: false
        });
        this.flechaCAtB = this.sound.add('flechaCrouchAttackBlockedSound', {
            volume: this.volumeSFX,
            loop: false
        });

        //Ranas en general
        this.jumpSound = this.sound.add('jumpSound', {
            volume: this.volumeSFX,
            loop: false
        });


        //GESTION DE EVENTOS PARA EL AUDIO MANAGER//

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
        if(this.track == 4){
            this.musicaSelva.play();
            this.track = 0;
        }
        this.musicaMenus.setVolume(this.volumeMusic);
        this.musicaDesierto.setVolume(this.volumeMusic);
        this.musicaNenufar.setVolume(this.volumeMusic);
        this.musicaSelva.setVolume(this.volumeMusic);
    }


}

