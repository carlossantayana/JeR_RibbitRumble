"use strict";

export default class Preloader extends Phaser.Scene
{
    constructor ()
    {
        super('Preloader');
    }

    preload ()//Cargar imagenes y sonido
    {
        this.load.setPath('assets/Backgrounds'); //ruta de los assets, para que no sea necesario poner dicha ruta
        this.load.image('fondo', 'prueba.png');
        this.load.image('pruebaBoton', 'sky.png');

        this.load.setPath('assets/CharacterPortraits');
        this.load.image('retratoPrueba', 'RetratoPrueba.jpg')
    }

    create () //crear animaciones y cargar escena inicial
    {
        this.scene.start('MainMenu'); //Cargar Escena inicial
    }
}
