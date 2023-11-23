export default class Boot extends Phaser.Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        this.load.setPath('assets/games/germs/'); //ruta de los assets, no está hecho
    }

    create ()
    {
        this.scene.start('Preloader'); //Cargar el preloader
    }
}