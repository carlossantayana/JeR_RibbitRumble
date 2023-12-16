"use strict";

var volumenGeneral = 1;
var volumenMusica = 1;
var volumenSFX = 1;

export default class SettingsMenu extends Phaser.Scene {
    constructor() {
        super('SettingsMenu');
    }
    create() {

        this.add.image(940, 534.5, 'menuAjustes').setScale(0.5);    // Fondo del menu de ajustes

        var volverButton = this.add.image(1450, 825, 'botonVolver').setScale(0.5).setInteractive();//Creacion y funcionalidad del boton volver
        volverButton.on('pointerdown', () => this.returnToMenu());
        volverButton.on('pointerover', function () { volverButton.setScale(0.55) });
        volverButton.on('pointerout', function () { volverButton.setScale(0.5) });

        //Se ajusta el volumen mediante tres sliders


        this.add.rectangle(1150, 385, 564, 15, 0x808080);//Barra del slider
        //El propio slider, que utiliza .on('drag') para poder arrastrarse con el raton, calcula el volumen segun su posicion 
        var sliderGeneral = this.add.image(1432, 385, 'sliderBoton').setScale(0.035).setInteractive({ draggable: true }).on('drag', function (pointer, posX) {
            if (posX >= 868 && posX <= 1432) {//De x = 868 al x = 1432
                sliderGeneral.setPosition(posX, 385);
                volumenGeneral = (posX - 868) / 564;
                if (volumenGeneral < 0.005) {
                    volumenGeneral = 0;
                }
            }
        });

        this.add.rectangle(1150, 524, 564, 15, 0x808080);
        var sliderMusica = this.add.image(1432, 524, 'sliderBoton').setScale(0.035).setInteractive({ draggable: true }).on('drag', function (pointer, posX) {
            if (posX >= 868 && posX <= 1432) {//De x = 868 al x = 1432
                sliderMusica.setPosition(posX, 524);
                volumenMusica = (posX - 868) / 564;
                if (volumenMusica < 0.005) {
                    volumenMusica = 0;
                }
            }
        });

        this.add.rectangle(1150, 663, 564, 15, 0x808080);
        var sliderSFX = this.add.image(1432, 663, 'sliderBoton').setScale(0.035).setInteractive({ draggable: true }).on('drag', function (pointer, posX) {
            if (posX >= 868 && posX <= 1432) {//De x = 868 al x = 1432
                sliderSFX.setPosition(posX, 663);
                volumenSFX = (posX - 868) / 564;
                if (volumenSFX < 0.005) {
                    volumenSFX = 0;
                }
            }
        });




    }
    //Se actualiza el volumen constantemente
    update() {
        this.changeVolumeMusic(volumenMusica * volumenGeneral);
        this.changeVolumeSFX(volumenSFX * volumenGeneral);
    }
    //Cambio de escena
    returnToMenu() {
        this.scene.resume('MainMenu');
        this.scene.sleep();
    }
    //Cambio de volumen de la musica
    changeVolumeMusic(newVolumeMusic) {
        this.scene.get('AudioManager').events.emit('changeVolumeMusic', newVolumeMusic);
    }
    //Camvio de volumen de los efectos de sonido
    changeVolumeSFX(newVolumeSFX) {
        this.scene.get('AudioManager').events.emit('changeVolumeSFX', newVolumeSFX);
    }
}

