export default class Preloader extends Phaser.Scene
{
    constructor ()
    {
        super('Preloader');
    }

    preload ()//Cargar imagenes y sonido
    {

    }

    create () //crear animaciones y cargar escena inicial
    {
        this.scene.start('MainMenu'); //Cargar Escena incicial
    }
}
