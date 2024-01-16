export default class Pairing extends Phaser.Scene {
    constructor() {
        super('Pairing');
    }

    preload()//Cargar imagenes y sonido
    {
        //Pantalla de Carga
        this.load.setPath('assets');
        this.load.spritesheet('Cargando', 'Cargando.png', { frameWidth: 1920, frameHeight: 1080 });

    }

    create() //crear animaciones y cargar escena inicial
    {
        //Creacion del objeto
        this.pantalla = this.physics.add.sprite(960, 540, 'Cargando');
        this.pantalla.setCollideWorldBounds(true);

        //Creacion de la animacion
        this.pantalla.anims.create({
            key: 'PantallaCarga',
            frames: this.anims.generateFrameNumbers('Cargando', { start: 0, end: 4 }),
            frameRate: 12,
            repeat: -1
        });

        //Reproducimos la animacion
        this.pantalla.anims.play('PantallaCarga')
    }

    update()
    {
        if (connection.readyState === WebSocket.OPEN) {
            connection.send("pairing");
        }
    }
}