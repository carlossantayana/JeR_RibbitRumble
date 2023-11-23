import Boot from './Boot.js';
import Preloader from './Preloader.js';
import MainMenu from './MainMenu.js';
import PlayerSelectionMenu from './PlayerSelectionMenu.js';
import MapSelectionMenu from './MapSelectionMenu.js';
import Game from './Game.js';
import Results from './Results.js';

const config = { //Configuración general
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [ Boot, Preloader, MainMenu, PlayerSelectionMenu, MapSelectionMenu, Game, Results], //Escenas, Boot está primero, se cargara Boot primero
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    }
};

let game = new Phaser.Game(config); //Crear juego