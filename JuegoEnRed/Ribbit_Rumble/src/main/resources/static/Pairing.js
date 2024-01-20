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
        
        //Boton para volver al menu principal
        
        var volverButton = this.add.image(1650, 150, 'botonVolver').setScale(0.5).setInteractive();//Creacion y funcionalidad del boton volver
        volverButton.on('pointerdown', () => this.returnToMenu());
        volverButton.on('pointerover', function () { volverButton.setScale(0.55) });
        volverButton.on('pointerout', function () { volverButton.setScale(0.5) });

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
		if(!paired){
	        if (connection.readyState === WebSocket.OPEN) {
				var pairRequest={
					type:"pairing"
				}
	            connection.send(JSON.stringify(pairRequest));
	        }
        }
        
        if(paired){
			this.scene.start("PlayerSelectionMenuNet");
			this.scene.stop("Pairing");
		}
    }
    
    returnToMenu()
    {
		connection.close();
		this.scene.start('MainMenu');
        this.scene.stop();
	}
}