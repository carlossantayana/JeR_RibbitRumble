"use strict";

import Charging from './Charging.js';
import Preloader from './Preloader.js';
import AccountScene from './AccountScene.js';
import MainMenu from './MainMenu.js';
import SettingsMenu from './SettingsMenu.js';
import PlayerSelectionMenu from './PlayerSelectionMenu.js';
import Pairing from './Pairing.js';
import PlayerSelectionMenuNet from './PlayerSelectionMenuNet.js';
import AudioManager from './AudioManager.js';
import ModeSelectionMenu from './ModeSelectionMenu.js';
import MapSelectionMenu from './MapSelectionMenu.js';
import MapSelectionMenuNet from './MapSelectionMenuNet.js';
import Game from './Game.js';
import GameNet from './GameNet.js';
import Results from './Results.js';

const config = { //Configuración general
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'game-container', // Especifica el contenedor del juego
    backgroundColor: '#000000',
    scene: [Charging, Preloader, AccountScene,  MainMenu, SettingsMenu, AudioManager, ModeSelectionMenu, PlayerSelectionMenu, Pairing, PlayerSelectionMenuNet, MapSelectionMenu, MapSelectionMenuNet, Game, GameNet, Results], //Escenas, Preloader está primero, se cargara Preloader primero
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 300,
            debug: false
        }
    }
};

var game = new Phaser.Game(config); //Crear juego