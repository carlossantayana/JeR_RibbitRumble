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

        this.load.setPath('assets/Menu/Menu principal');
        this.load.image('menuPrincipal', 'MenuRanasDEFINITIVO.png')

        this.load.setPath('assets/Menu/Menus general');
        this.load.image('menuFondo', 'FondoMenus.png')


        this.load.setPath('assets/CharacterPortraits');
        this.load.image('retratoPrueba', 'RetratoPrueba.jpg')
        this.load.image('ranaFlechaSelect', 'ranaFlechaSelect.png')
        this.load.image('ranaToroSelect', 'ranaToroSelect.png')
        this.load.image('ranaTrepadoraSelect', 'ranaTrepadoraSelect.png')
        this.load.image('ranaLLuviaSelect', 'ranaLLuviaSelect.png')

    }

    create () //crear animaciones y cargar escena inicial
    {
        this.scene.start('MainMenu'); //Cargar Escena inicial
    }
}
