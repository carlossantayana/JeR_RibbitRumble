"use strict";


export default class AudioManager extends Phaser.Scene {
    constructor() {
        super('AudioManager');
        //Musica del juego
        this.musicaMenus = null;        // Track -1
        this.musicaDesierto = null;     // Track 1
        this.musicaNenufar = null;      // Track 2
        this.musicaSelva = null;        // Track 3
        this.musicaResultados = null;   // Track 4

        //Sonidos del juego

        this.sonidoAguila = null;       // MapTrack 1
        this.sonidoViento = null;       // Track 1
        this.sonidoRio = null;          // Track 3
        this.sonidoRibbits = null;      // Track 2
        this.sonidoSelva = null;        // Track 3
        this.sonidoChapoteo = null;     // MapTrack 2

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
        this.sound = 0;
        this.mapTrack = 0;
        this.soundTimer;
        this.ranNum= Math.random() * (26 - 10) + 10;
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
        //Evento para controlar volumen de musica
        this.events.on('changeVolumeMusic', (newVolumeMusic) => {

            this.musicaMenus.setVolume(newVolumeMusic);
            this.musicaDesierto.setVolume(newVolumeMusic);
            this.musicaNenufar.setVolume(newVolumeMusic);
            this.musicaSelva.setVolume(newVolumeMusic);
            this.musicaResultados.setVolume(newVolumeMusic);
        });
        //Evento para controlar volumen de sonido
        this.events.on('changeVolumeSFX', (newVolumeSFX) => {

            this.sonidoAguila.setVolume(newVolumeMusic);
            this.sonidoViento.setVolume(newVolumeSFX);
            this.sonidoRio.setVolume(newVolumeSFX);
            this.sonidoRibbits.setVolume(newVolumeSFX);
            this.sonidoSelva.setVolume(newVolumeSFX);
            this.sonidoChapoteo.setVolume(newVolumeSFX);

            this.toroAt.setVolume(newVolumeSFX);
            this.toroAtB.setVolume(newVolumeSFX);
            this.trepadoraAt.setVolume(newVolumeSFX);
            this.trepadoraAtB.setVolume(newVolumeSFX);
            this.lluviaAt.setVolume(newVolumeSFX);
            this.lluviaCAt.setVolume(newVolumeSFX);
            this.lluviaAtB.setVolume(newVolumeSFX);
            this.lluviaCAtB.setVolume(newVolumeSFX);
            this.flechaAt.setVolume(newVolumeSFX);
            this.flechaCAt.setVolume(newVolumeSFX);
            this.flechaAtB.setVolume(newVolumeSFX);
            this.flechaCAtB.setVolume(newVolumeSFX);
            this.jumpSound.setVolume(newVolumeSFX);
        });

        //Eventos para cambiar musica
        this.events.on('changeTrackMaps', (newTrack) => {
            this.track = newTrack;
            this.mapTrack = newTrack;
        });
        this.events.on('changeTrackResults', () => {
            this.track = 4;
        });
        /*
        //////////////////////////GAME.JS////////////////////////////////
        //Antes del cambio de escena a Results-> this.changeTrackResults();
        //Abajo del todo
        changeTrackResults()
        {
            this.scene.get('AudioManager').events.emit('changeTrackResults')
        }
        */
        this.events.on('changeTrackMenu', () => {
            this.track = -1;
        });
        /*
        //////////////////////////RESULTS.JS////////////////////////////////
        //Antes del cambio de escena a MainMenu-> this.changeTrackMenu();
        changeTrackMenu()
        {
            this.scene.get('AudioManager').events.emit('changeTrackMenu')
        }
        */

        //Eventos para generar SFX
        this.events.on('selectSound', (soundNumber)=>{
            switch(soundNumber){
                case 0:
                    this.jumpSound.play();
                    break;
                case 1:
                    this.trepadoraAt.play();
                    break;
                case 2:
                    this.trepadoraAtB.play();
                    break;
                case 3:
                    this.toroAt.play();
                    break;
                case 4:
                    this.toroAtB.play();
                    break;
                case 5:
                    this.lluviaAt.play();
                    break;
                case 6:
                    this.lluviaAtB.play();
                    break;
                case 7:
                    this.lluviaCAt.play();
                    break;
                case 8:
                    this.lluviaCAtB.play();
                    break;
                case 9:
                    this.flechaAt.play();
                    break;
                case 10:
                    this.flechaAtB.play();
                    break;
                case 11:
                    this.flechaCAt.play();
                    break;
                case 12:
                    this.flechaCAtB.play();
                    break;
                default:
                    console.log("Error de SFX de las ranas");
            }
        });
        /*
        //////////////////////////RESULTS.JS////////////////////////////////
        //Donde quieras un sonido-> this.selectSound(el numero del sonido);
        selectSound(soundNum)
        {
            this.scene.get('AudioManager').events.emit('selectSound', soundNum)
        }
        */

    }
    update(time,delta) {
        //En funcion de la variable track se cambia la musica y se para la que sonaba antes

        //MUSICA
        //PLAY DE LA MUSICA DE LOS MENUS
        if (this.track == -1) {
            if (this.mapTrack == -1) {
                this.musicaResultados.stop();
            }
            this.musicaMenus.play();
            this.track = 0;
        }

        //PLAY DE LA MUSICA DE LOS MAPAS
        if (this.track > 0) {
            this.musicaMenus.stop();
        }
        if (this.track == 1) {
            this.musicaDesierto.play();
            this.sonidoViento.play();
            this.track = 0;
        }
        if (this.track == 2) {
            this.musicaNenufar.play();
            this.sonidoRibbits.play();
            this.track = 0;
        }
        if (this.track == 3) {
            this.musicaSelva.play();
            this.sonidoSelva.play();
            this.sonidoRio.play();
            this.track = 0;
        }
        if (this.mapTrack > 0) {

            this.soundTimer+=delta/1000;
            
            if(this.mapTrack ==1 && this.soundTimer > this.ranNum){
                this.sonidoAguila.play();
                this.soundTimer=0;
                this.ranNum= Math.random() * (26 - 10) + 10;
                
            }
            if(this.mapTrack ==2 && this.soundTimer > this.ranNum){
                this.sonidoChapoteo.play();
                this.soundTimer=0;
                this.ranNum= Math.random() * (26 - 10) + 10;
            }
        }

        //PLAY DE LA MUSICA DE RESULTADOS
        if (this.track == 4) {
            switch (this.mapTrack) {
                case 1:
                    this.musicaDesierto.stop();
                    break;
                case 2:
                    this.musicaNenufar.stop();
                    break;
                case 3:
                    this.musicaSelva.stop();
                    break;
                default:
                    console.log("Error");
            }
            this.musicaResultados.play();
            this.mapTrack = -1;
            this.track = 0;
        }



    }


}

