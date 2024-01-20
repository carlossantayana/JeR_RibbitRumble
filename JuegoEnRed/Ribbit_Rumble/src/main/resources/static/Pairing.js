export default class Pairing extends Phaser.Scene {
    constructor() {
        super('Pairing');
    }

    preload()//Cargar imagenes y sonido
    {
        //Pantalla de Carga
        this.load.setPath('assets/Menu/Menus general');
        this.load.spritesheet('Emparejamiento', 'Emparejamiento.png', { frameWidth: 1920, frameHeight: 1080 });

    }

    create() //crear animaciones y cargar escena inicial
    {
        //Creacion del objeto
        this.pantalla2 = this.physics.add.sprite(960, 540, 'Emparejamiento');
        this.pantalla2.setCollideWorldBounds(true);
        
        //Boton para volver al menu principal
        
        var volverButton = this.add.image(1650, 150, 'botonVolver').setScale(0.5).setInteractive();//Creacion y funcionalidad del boton volver
        volverButton.on('pointerdown', () => this.returnToMenu());
        volverButton.on('pointerover', function () { volverButton.setScale(0.55) });
        volverButton.on('pointerout', function () { volverButton.setScale(0.5) });

        //Creacion de la animacion
        this.pantalla2.anims.create({
            key: 'PantallaEmparejamiento',
            frames: this.anims.generateFrameNumbers('Emparejamiento', { start: 0, end: 4 }),
            frameRate: 12,
            repeat: -1
        });

        //Reproducimos la animacion
        this.pantalla2.anims.play('PantallaEmparejamiento')
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
		
		//En caso de que el servidor le cierre la conexion
		if(connection.readyState === WebSocket.CLOSED){
			alert("Ya hay dos jugadores emparejados, volviendo al menu principal")
			this.scene.start('MainMenu');
       		this.scene.stop();
			
		}
    }
    
    returnToMenu()
    {
		connection.close();
		this.scene.start('MainMenu');
        this.scene.stop();
	}
}