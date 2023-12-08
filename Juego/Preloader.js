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

        this.load.setPath('assets/Buttons');
        this.load.image('botonComenzar', 'Comenzar.png')
        this.load.image('botonContinuar', 'Continuar.png')
        this.load.image('botonEnRed', 'EnRed.png')
        this.load.image('botonLocal', 'Local.png')
        this.load.image('botonSalir', 'Salir.png')
        this.load.image('botonVolver', 'Volver.png')
        this.load.image('botonAjustes', 'Ajustes.png')
        this.load.image('botonCombate', 'Combate.png')

        this.load.setPath('assets/Menu/Menu principal');
        this.load.image('menuPrincipal', 'MenuRanasDEFINITIVO.png')

        this.load.setPath('assets/Menu/Menus general');
        this.load.image('menuFondo', 'FondoMenus.png');
        this.load.image('menuAjustes', 'MenuAjustes.png');
        this.load.image('sliderBoton', 'slider.png');


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
