"use strict";


export default class MainMenu extends Phaser.Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(940, 534.5, 'menuPrincipal').setScale(0.5);

        const Button= this.add.image(400,400,'pruebaBoton'); //Objeto que queremos que sea el boton
        Button.setInteractive(); //"setInteractive()" le da la posibilidad de ser interactivo
        Button.on('pointerdown', () => this.actionOnClick()); //creamos un EventListener "pointerdown" (cuando se hace click con el ratón) que ejecute la función que queremos
    }

    actionOnClick () { //Esta es la función que hace el boton al pulsarse

        this.scene.start('PlayerSelectionMenu'); //Cargar Escena de selección de personaje
    }
}

