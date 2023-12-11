"use strict";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload()//Cargar imagenes y sonido
    {
        //ASSETS ANIMACIONES//
        this.load.setPath('assets/Characters');
        this.load.spritesheet('ToroIdle', 'RanaToro/ToroIdleV1.1.png', { frameWidth: 600, frameHeight: 293 });
        this.load.spritesheet('ToroCaminar', 'RanaToro/ToroCaminandoV1.1.png', { frameWidth: 600, frameHeight: 293 });
        this.load.spritesheet('ToroBasico', 'RanaToro/ToroAtaqueBasicoV1.1.png', { frameWidth: 600, frameHeight: 293 });
        this.load.spritesheet('ToroBloqueo', 'RanaToro/ToroBloqueoV1.1.png', { frameWidth: 600, frameHeight: 293 });
        this.load.spritesheet('ToroAgachado', 'RanaToro/ToroAgachadoV1.1.png', { frameWidth: 600, frameHeight: 293 });
        this.load.spritesheet('ToroBajo', 'RanaToro/ToroAtaqueBajoV1.1.png', { frameWidth: 600, frameHeight: 293 });
        this.load.spritesheet('ToroSalto', 'RanaToro/ToroSaltoV1.1.png', { frameWidth: 600, frameHeight: 293 });
        this.load.spritesheet('ToroDaño', 'RanaToro/ToroDaño.png', { frameWidth: 600, frameHeight: 293 });

        this.load.spritesheet('LluviaIdle', 'RanaDeLluvia/Idle_Spritesheet.png', { frameWidth: 702, frameHeight: 496 });
        this.load.spritesheet('LluviaCaminar', 'RanaDeLluvia/Walk_Spritesheet.png', { frameWidth: 702, frameHeight: 496 });
        this.load.spritesheet('LluviaBasico', 'RanaDeLluvia/BasicAttack_Spritesheet.png', { frameWidth: 702, frameHeight: 496 });
        this.load.spritesheet('LluviaBloqueo', 'RanaDeLluvia/Block_Spritesheet.png', { frameWidth: 702, frameHeight: 496 });
        this.load.spritesheet('LluviaAgachado', 'RanaDeLluvia/Crouch_Spritesheet.png', { frameWidth: 702, frameHeight: 496 });
        this.load.spritesheet('LluviaBajo', 'RanaDeLluvia/DownAttack_Spritesheet.png', { frameWidth: 702, frameHeight: 496 });
        this.load.spritesheet('LluviaSalto', 'RanaDeLluvia/Jump_Spritesheet.png', { frameWidth: 702, frameHeight: 496 });
        this.load.spritesheet('LluviaDaño', 'RanaDeLluvia/Hurt_Sprite.png', { frameWidth: 702, frameHeight: 496 });

        this.load.spritesheet('FlechaIdle', 'RanaFlecha/FlechaIdle.png', { frameWidth: 301, frameHeight: 252 });
        this.load.spritesheet('FlechaCaminar', 'RanaFlecha/FlechaAndar.png', { frameWidth: 301, frameHeight: 252 });
        this.load.spritesheet('FlechaBasico', 'RanaFlecha/FlechaAtaqueBasico.png', { frameWidth: 301, frameHeight: 252 });
        this.load.spritesheet('FlechaBloqueo', 'RanaFlecha/FlechaBloqueo.png', { frameWidth: 301, frameHeight: 252 });
        this.load.spritesheet('FlechaAgachado', 'RanaFlecha/FlechaAgachar.png', { frameWidth: 301, frameHeight: 252 });
        this.load.spritesheet('FlechaBajo', 'RanaFlecha/FlechaAtaqueBajo.png', { frameWidth: 301, frameHeight: 252 });
        this.load.spritesheet('FlechaSalto', 'RanaFlecha/FlechaSalto.png', { frameWidth: 301, frameHeight: 252 });
        this.load.spritesheet('FlechaDaño', 'RanaFlecha/FlechaDaño.png', { frameWidth: 300, frameHeight: 250 });

        this.load.spritesheet('TrepadoraIdle', 'RanaTrepadora/spritesheet_Idle.png', { frameWidth: 1145, frameHeight: 827 });
        this.load.spritesheet('TrepadoraCaminar', 'RanaTrepadora/spritesheet_Walk.png', { frameWidth: 1145, frameHeight: 827 });
        this.load.spritesheet('TrepadoraBasico', 'RanaTrepadora/spritesheet_Attack.png', { frameWidth: 1145, frameHeight: 827 });
        this.load.spritesheet('TrepadoraBloqueo', 'RanaTrepadora/spritesheet_Block.png', { frameWidth: 1145, frameHeight: 827 });
        this.load.spritesheet('TrepadoraAgachado', 'RanaTrepadora/spritesheet_Crouch.png', { frameWidth: 1145, frameHeight: 827 });
        this.load.spritesheet('TrepadoraBajo', 'RanaTrepadora/spritesheet_CrouchAttack.png', { frameWidth: 1145, frameHeight: 827 });
        this.load.spritesheet('TrepadoraSalto', 'RanaTrepadora/spritesheet_Jump.png', { frameWidth: 1145, frameHeight: 827 });
        this.load.spritesheet('TrepadoraDaño', 'RanaTrepadora/RanaTrepadoraDamaged.png', { frameWidth: 1145, frameHeight: 827 });

        //ASSETS FONDOS//
        this.load.setPath('assets/Backgrounds'); //ruta de los assets, para que no sea necesario poner dicha ruta
        this.load.image('junglaFondo', 'Jungla.png');
        this.load.image('desiertoFondo', 'Desierto.png');
        this.load.image('nenufarFondo', 'Nenufar.png');
        this.load.image('randomFondo', 'Random.png');

        //ASSETS UI BOTONES//
        this.load.setPath('assets/Buttons');
        this.load.image('botonComenzar', 'Comenzar.png')
        this.load.image('botonContinuar', 'Continuar.png')
        this.load.image('botonEnRed', 'EnRed.png')
        this.load.image('botonLocal', 'Local.png')
        this.load.image('botonSalir', 'Salir.png')
        this.load.image('botonVolver', 'Volver.png')
        this.load.image('botonAjustes', 'Ajustes.png')
        this.load.image('botonCombate', 'Combate.png')
        this.load.image('botonRevancha', 'Revancha.png')

        //ASSETS MENUS//
        this.load.setPath('assets/Menu/Menu principal');
        this.load.image('menuPrincipal', 'MenuRanasDEFINITIVO.png')


        this.load.setPath('assets/Menu/Menus general');
        this.load.image('menuFondo', 'FondoMenus.png');
        this.load.image('menuAjustes', 'MenuAjustes.png');
        this.load.image('sliderBoton', 'slider.png');

        this.load.setPath('assets/Menu/Menu resultados');
        this.load.image('corona', 'Corona.png');
        this.load.image('foco', 'Foco.png');


        //ASSETS RETRATOS Y LOGOS PERSONAJES//
        this.load.setPath('assets/CharacterPortraits');
        this.load.image('ranaFlechaSelect', 'ranaFlechaSelect.png')
        this.load.image('ranaToroSelect', 'ranaToroSelect.png')
        this.load.image('ranaTrepadoraSelect', 'ranaTrepadoraSelect.png')
        this.load.image('ranaLLuviaSelect', 'ranaLLuviaSelect.png')
        this.load.image('logoRanaDeLluvia', 'LogoRanaDeLluvia.png');
        this.load.image('logoRanaPuntaDeFlecha', 'LogoRanaPuntaDeFlecha.png');
        this.load.image('logoRanaToro', 'LogoRanaToro.png');
        this.load.image('logoRanaTrepadora', 'LogoRanaTrepadora.png');

        //ASSETS AUDIO//
        this.load.setPath('assets/Music');
        this.load.audio('desiertoMusic', 'Desierto.mp3');
        this.load.audio('menuMusic', 'rockMainMenu.mp3');
        this.load.audio('nenufarMusic', 'Nenufar.mp3');
        this.load.audio('selvaMusic', 'Selva.mp3');

        //ASSETS TEXTOS//
        this.load.setPath('assets/TextInterface');
        this.load.image('Player1Text', 'Player1.png');
        this.load.image('Player2Text', 'Player2.png');

        //ASSETS GAME UI//
        this.load.setPath('assets/InGame');
        this.load.image('UIGamePieza1', 'InterfazJugadorPieza1.png');
        this.load.image('UIGamePieza2', 'InterfazJugadorPieza2.png');
        this.load.image('Rondas', 'FichaRonda.png');
        this.load.image('PunteroP1', 'Puntero1.png');
        this.load.image('PunteroP2', 'Puntero2.png');
        this.load.image('0', '0.png');
        this.load.image('1', '1.png');
        this.load.image('2', '2.png');
        this.load.image('3', '3.png');
        this.load.image('4', '4.png');
        this.load.image('5', '5.png');
        this.load.image('6', '6.png');
        this.load.image('7', '7.png');
        this.load.image('8', '8.png');
        this.load.image('9', '9.png');

        this.load.setPath('assets/CharacterPortraits');
        this.load.image('ranaToroUI', 'RanaToroUI.png');
        this.load.image('ranaLluviaUI', 'RanaLluviaUI.png');
        this.load.image('ranaTrepadoraUI', 'RanaTrepadoraUI.png');
        this.load.image('ranaFlechaUI', 'RanaFlechaUI.png');
    }

    create() //crear animaciones y cargar escena inicial
    {
        //////////////////////////////////////////////RANA TORO ANIMACIONES////////////////////////////////////////////////////

        //Animacion Idle
        this.anims.create({
            key: 'ToroIdleAnim',
            frames: this.anims.generateFrameNumbers('ToroIdle', { start: 0, end: 9 }),
            frameRate: 12,
            repeat: -1
        });

        //Animacion de caminar
        this.anims.create({
            key: 'ToroWalkAnim',
            frames: this.anims.generateFrameNumbers('ToroCaminar', { start: 0, end: 6 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion de ataque basico
        this.anims.create({
            key: 'ToroBasicAttackAnim',
            frames: this.anims.generateFrameNumbers('ToroBasico', { start: 0, end: 6 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion de ataque bajo
        this.anims.create({
            key: 'ToroDownAttackAnim',
            frames: this.anims.generateFrameNumbers('ToroBajo', { start: 0, end: 6 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion de empezar bloqueo
        this.anims.create({
            key: 'ToroBeginBlockAnim',
            frames: this.anims.generateFrameNumbers('ToroBloqueo', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion bloqueo fijo
        this.anims.create({
            key: 'ToroBlockAnim',
            frames: this.anims.generateFrameNumbers('ToroBloqueo', { start: 3, end: 3 }),
        });

        //Animacion de terminar bloqueo
        this.anims.create({
            key: 'ToroEndBlockAnim',
            frames: this.anims.generateFrameNumbers('ToroBloqueo', { start: 4, end: 8 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion comenzar agachado
        this.anims.create({
            key: 'ToroBeginCrouchAnim',
            frames: this.anims.generateFrameNumbers('ToroAgachado', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion agachado fijo
        this.anims.create({
            key: 'ToroCrouchAnim',
            frames: this.anims.generateFrameNumbers('ToroAgachado', { start: 3, end: 3 }),
        });

        //Animacion de terminar agachado
        this.anims.create({
            key: 'ToroEndCrouchAnim',
            frames: this.anims.generateFrameNumbers('ToroAgachado', { start: 3, end: 6 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion comenzar salto
        this.anims.create({
            key: 'ToroBeginJumpAnim',
            frames: this.anims.generateFrameNumbers('ToroSalto', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion salto fijo
        this.anims.create({
            key: 'ToroJumpAnim',
            frames: this.anims.generateFrameNumbers('ToroSalto', { start: 3, end: 3 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion terminar salto
        this.anims.create({
            key: 'ToroEndJumpAnim',
            frames: this.anims.generateFrameNumbers('ToroSalto', { start: 3, end: 5 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion daño
        this.anims.create({
            key: 'ToroHurtAnim',
            frames: this.anims.generateFrameNumbers('ToroDaño', { start: 0, end: 0 }),
            frameRate: 12,
            repeat: 12
        });

        //////////////////////////////////////////////RANA DE LLUVIA ANIMACIONES////////////////////////////////////////////////////

        //Animacion Idle
        this.anims.create({
            key: 'LluviaIdleAnim',
            frames: this.anims.generateFrameNumbers('LluviaIdle', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: -1
        });

        //Animacion de caminar
        this.anims.create({
            key: 'LluviaWalkAnim',
            frames: this.anims.generateFrameNumbers('LluviaCaminar', { start: 0, end: 6 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion de ataque basico
        this.anims.create({
            key: 'LluviaBasicAttackAnim',
            frames: this.anims.generateFrameNumbers('LluviaBasico', { start: 0, end: 6 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion de ataque bajo
        this.anims.create({
            key: 'LluviaDownAttackAnim',
            frames: this.anims.generateFrameNumbers('LluviaBajo', { start: 0, end: 12 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion de empezar bloqueo
        this.anims.create({
            key: 'LluviaBeginBlockAnim',
            frames: this.anims.generateFrameNumbers('LluviaBloqueo', { start: 0, end: 2 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion bloqueo fijo
        this.anims.create({
            key: 'LluviaBlockAnim',
            frames: this.anims.generateFrameNumbers('LluviaBloqueo', { start: 2, end: 2 }),
        });

        //Animacion de terminar bloqueo
        this.anims.create({
            key: 'LluviaEndBlockAnim',
            frames: this.anims.generateFrameNumbers('LluviaBloqueo', { start: 2, end: 4 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion comenzar agachado
        this.anims.create({
            key: 'LluviaBeginCrouchAnim',
            frames: this.anims.generateFrameNumbers('LluviaAgachado', { start: 0, end: 2 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion agachado fijo
        this.anims.create({
            key: 'LluviaCrouchAnim',
            frames: this.anims.generateFrameNumbers('LluviaAgachado', { start: 2, end: 2 }),
        });

        //Animacion de terminar agachado
        this.anims.create({
            key: 'LluviaEndCrouchAnim',
            frames: this.anims.generateFrameNumbers('LluviaAgachado', { start: 2, end: 4 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion comenzar salto
        this.anims.create({
            key: 'LluviaBeginJumpAnim',
            frames: this.anims.generateFrameNumbers('LluviaSalto', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion salto fijo
        this.anims.create({
            key: 'LluviaJumpAnim',
            frames: this.anims.generateFrameNumbers('LluviaSalto', { start: 3, end: 3 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion terminar salto
        this.anims.create({
            key: 'LluviaEndJumpAnim',
            frames: this.anims.generateFrameNumbers('LluviaSalto', { start: 3, end: 6 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion daño
        this.anims.create({
            key: 'LluviaHurtAnim',
            frames: this.anims.generateFrameNumbers('LluviaDaño', { start: 0, end: 0 }),
            frameRate: 12,
            repeat: 12
        });

        //////////////////////////////////////////////RANA FLECHA ANIMACIONES////////////////////////////////////////////////////

        //Animacion Idle
        this.anims.create({
            key: 'FlechaIdleAnim',
            frames: this.anims.generateFrameNumbers('FlechaIdle', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        });

        //Animacion de caminar
        this.anims.create({
            key: 'FlechaWalkAnim',
            frames: this.anims.generateFrameNumbers('FlechaCaminar', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion de ataque basico
        this.anims.create({
            key: 'FlechaBasicAttackAnim',
            frames: this.anims.generateFrameNumbers('FlechaBasico', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion de ataque bajo
        this.anims.create({
            key: 'FlechaDownAttackAnim',
            frames: this.anims.generateFrameNumbers('FlechaBajo', { start: 0, end: 6 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion de empezar bloqueo
        this.anims.create({
            key: 'FlechaBeginBlockAnim',
            frames: this.anims.generateFrameNumbers('FlechaBloqueo', { start: 0, end: 4 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion bloqueo fijo
        this.anims.create({
            key: 'FlechaBlockAnim',
            frames: this.anims.generateFrameNumbers('FlechaBloqueo', { start: 4, end: 4 }),
        });

        //Animacion de terminar bloqueo
        this.anims.create({
            key: 'FlechaEndBlockAnim',
            frames: this.anims.generateFrameNumbers('FlechaBloqueo', { start: 4, end: 0 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion comenzar agachado
        this.anims.create({
            key: 'FlechaBeginCrouchAnim',
            frames: this.anims.generateFrameNumbers('FlechaAgachado', { start: 0, end: 2 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion agachado fijo
        this.anims.create({
            key: 'FlechaCrouchAnim',
            frames: this.anims.generateFrameNumbers('FlechaAgachado', { start: 2, end: 2 }),
        });

        //Animacion de terminar agachado
        this.anims.create({
            key: 'FlechaEndCrouchAnim',
            frames: this.anims.generateFrameNumbers('FlechaAgachado', { start: 2, end: 0 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion comenzar salto
        this.anims.create({
            key: 'FlechaBeginJumpAnim',
            frames: this.anims.generateFrameNumbers('FlechaSalto', { start: 0, end: 5 }),
            frameRate: 18,
            repeat: 0
        });

        //Animacion salto fijo
        this.anims.create({
            key: 'FlechaJumpAnim',
            frames: this.anims.generateFrameNumbers('FlechaSalto', { start: 5, end: 5 }),
            frameRate: 18,
            repeat: 0
        });

        //Animacion terminar salto
        this.anims.create({
            key: 'FlechaEndJumpAnim',
            frames: this.anims.generateFrameNumbers('FlechaSalto', { start: 5, end: 1 }),
            frameRate: 18,
            repeat: 0
        });

        //Animacion daño
        this.anims.create({
            key: 'FlechaHurtAnim',
            frames: this.anims.generateFrameNumbers('FlechaDaño', { start: 0, end: 0 }),
            frameRate: 12,
            repeat: 12
        });

        //////////////////////////////////////////////RANA TREPADORA ANIMACIONES////////////////////////////////////////////////////

        //Animacion Idle
        this.anims.create({
            key: 'TrepadoraIdleAnim',
            frames: this.anims.generateFrameNumbers('TrepadoraIdle', { start: 0, end: 7 }),
            frameRate: 12,
            repeat: -1
        });

        //Animacion de caminar
        this.anims.create({
            key: 'TrepadoraWalkAnim',
            frames: this.anims.generateFrameNumbers('TrepadoraCaminar', { start: 0, end: 8 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion de ataque basico
        this.anims.create({
            key: 'TrepadoraBasicAttackAnim',
            frames: this.anims.generateFrameNumbers('TrepadoraBasico', { start: 0, end: 9 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion de ataque bajo
        this.anims.create({
            key: 'TrepadoraDownAttackAnim',
            frames: this.anims.generateFrameNumbers('TrepadoraBajo', { start: 0, end: 9 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion de empezar bloqueo
        this.anims.create({
            key: 'TrepadoraBeginBlockAnim',
            frames: this.anims.generateFrameNumbers('TrepadoraBloqueo', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion bloqueo fijo
        this.anims.create({
            key: 'TrepadoraBlockAnim',
            frames: this.anims.generateFrameNumbers('TrepadoraBloqueo', { start: 3, end: 3 }),
        });

        //Animacion de terminar bloqueo
        this.anims.create({
            key: 'TrepadoraEndBlockAnim',
            frames: this.anims.generateFrameNumbers('TrepadoraBloqueo', { start: 3, end: 0 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion comenzar agachado
        this.anims.create({
            key: 'TrepadoraBeginCrouchAnim',
            frames: this.anims.generateFrameNumbers('TrepadoraAgachado', { start: 0, end: 4 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion agachado fijo
        this.anims.create({
            key: 'TrepadoraCrouchAnim',
            frames: this.anims.generateFrameNumbers('TrepadoraAgachado', { start: 4, end: 4 }),
        });

        //Animacion de terminar agachado
        this.anims.create({
            key: 'TrepadoraEndCrouchAnim',
            frames: this.anims.generateFrameNumbers('TrepadoraAgachado', { start: 4, end: 0 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion comenzar salto
        this.anims.create({
            key: 'TrepadoraBeginJumpAnim',
            frames: this.anims.generateFrameNumbers('TrepadoraSalto', { start: 0, end: 6 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion salto fijo
        this.anims.create({
            key: 'TrepadoraJumpAnim',
            frames: this.anims.generateFrameNumbers('TrepadoraSalto', { start: 6, end: 6 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion terminar salto
        this.anims.create({
            key: 'TrepadoraEndJumpAnim',
            frames: this.anims.generateFrameNumbers('TrepadoraSalto', { start: 6, end: 0 }),
            frameRate: 12,
            repeat: 0
        });

        //Animacion daño
        this.anims.create({
            key: 'TrepadoraHurtAnim',
            frames: this.anims.generateFrameNumbers('TrepadoraDaño', { start: 0, end: 0 }),
            frameRate: 12,
            repeat: 12
        });

        this.scene.start('MainMenu'); //Cargar Escena inicial
    }
}
