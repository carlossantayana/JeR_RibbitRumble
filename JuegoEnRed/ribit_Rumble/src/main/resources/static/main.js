"use strict";

import Charging from './Charging.js';
import Preloader from './Preloader.js';
import MainMenu from './MainMenu.js';
import SettingsMenu from './SettingsMenu.js';
import PlayerSelectionMenu from './PlayerSelectionMenu.js';
import AudioManager from './AudioManager.js';
import ModeSelectionMenu from './ModeSelectionMenu.js';
import MapSelectionMenu from './MapSelectionMenu.js';
import Game from './Game.js';
import Results from './Results.js';

const config = { //Configuración general
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    backgroundColor: '#000000',
    scene: [Charging, Preloader, MainMenu, SettingsMenu, AudioManager, ModeSelectionMenu, PlayerSelectionMenu, MapSelectionMenu, Game, Results], //Escenas, Preloader está primero, se cargara Preloader primero
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