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

        this.load.spritesheet('LluviaIdle', 'RanaDeLluvia/Idle_Spritesheet.png', { frameWidth: 3508, frameHeight: 2480 });
        this.load.spritesheet('LluviaCaminar', 'RanaDeLluvia/Walk_Spritesheet.png', { frameWidth: 3508, frameHeight: 2480 });
        this.load.spritesheet('LluviaBasico', 'RanaDeLluvia/BasicAttack_Spritesheet.png', { frameWidth: 3508, frameHeight: 2480 });
        this.load.spritesheet('LluviaBloqueo', 'RanaDeLluvia/BlockAttack_Spritesheet.png', { frameWidth: 3508, frameHeight: 2480 });
        this.load.spritesheet('LluviaAgachado', 'RanaDeLluvia/Crouch_Spritesheet.png', { frameWidth: 3508, frameHeight: 2480 });
        this.load.spritesheet('LluviaBajo', 'RanaDeLluvia/DownAttack_Spritesheet.png', { frameWidth: 3508, frameHeight: 2480 });
        this.load.spritesheet('LluviaSalto', 'RanaDeLluvia/Jump_Spritesheet.png', { frameWidth: 3508, frameHeight: 2480 });

        this.load.spritesheet('FlechaIdle', 'RanaFlecha/FlechaIdle.png', { frameWidth: 301, frameHeight: 252 });
        this.load.spritesheet('FlechaCaminar', 'RanaFlecha/FlechaAndar.png', { frameWidth: 301, frameHeight: 252 });
        this.load.spritesheet('FlechaBasico', 'RanaFlecha/FlechaAtaqueBasico.png', { frameWidth: 301, frameHeight: 252 });
        this.load.spritesheet('FlechaBloqueo', 'RanaFlecha/FlechaBloqueo.png', { frameWidth: 301, frameHeight: 252 });
        this.load.spritesheet('FlechaAgachado', 'RanaFlecha/FlechaAgachar.png', { frameWidth: 301, frameHeight: 252 });
        this.load.spritesheet('FlechaBajo', 'RanaFlecha/FlechaAtaqueBajo.png', { frameWidth: 301, frameHeight: 252 });
        this.load.spritesheet('FlechaSalto', 'RanaFlecha/FlechaSalto.png', { frameWidth: 301, frameHeight: 252 });

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

        //ASSETS MENUS//
        this.load.setPath('assets/Menu/Menu principal');
        this.load.image('menuPrincipal', 'MenuRanasDEFINITIVO.png')


        this.load.setPath('assets/Menu/Menus general');
        this.load.image('menuFondo', 'FondoMenus.png');
        this.load.image('menuAjustes', 'MenuAjustes.png');
        this.load.image('sliderBoton', 'slider.png');

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
        this.load.audio('desiertoMusica', 'Desierto1.mp3');
        this.load.audio('menuMusic', 'rockMainMenu.mp3');

        //ASSETS TEXTOS//
        this.load.setPath('assets/TextInterface');
        this.load.image('Player1Text', 'Player1.png');
        this.load.image('Player2Text', 'Player2.png');
    }

    create() //crear animaciones y cargar escena inicial
    {
        //////////////////////////////////////////////RANA TORO ANIMACIONES////////////////////////////////////////////////////

        //Animacion Idle
        this.anims.create({
            key: 'ToroIdleAnim',
            frames: this.anims.generateFrameNumbers('ToroIdle', {start: 0, end: 9}),
            frameRate: 12,
            repeat: -1
        });

        //Animacion de caminar
        this.anims.create({
            key: 'ToroWalkAnim',
            frames: this.anims.generateFrameNumbers('ToroCaminar', { start: 0, end: 6 }),
            frameRate: 12,
            repeat: 1
        });

        //Animacion de ataque basico
        this.anims.create({
            key: 'ToroBasicAttackAnim',
            frames: this.anims.generateFrameNumbers('ToroBasico', { start: 0, end: 9 }),
            frameRate: 12,
            repeat: 0
        });

        //Animación de ataque bajo
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

        //Aniamcion bloqueo fijo
        this.anims.create({
            key: 'ToroBlockAnim',
            frames: this.anims.generateFrameNumbers('ToroBloqueo', { start: 3, end: 3 }),
        });

        //Aniamcion de terminar bloqueo
        this.anims.create({
            key: 'ToroEndBlockAnim',
            frames: this.anims.generateFrameNumbers('ToroBloqueo', { start: 4, end: 8 }),
            frameRate: 12,
            repeat: 0
        });

        //Animación comenzar agachado
        this.anims.create({
            key: 'ToroBeginCrouchAnim',
            frames: this.anims.generateFrameNumbers('ToroAgachado', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 0
        });

        //Aniamcion agachado fijo
        this.anims.create({
            key: 'ToroCrouchAnim',
            frames: this.anims.generateFrameNumbers('ToroAgachado', { start: 3, end: 3 }),
        });

        //Aniamcion de terminar agachado
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

        this.anims.create({
            key: 'ToroJumpAnim',
            frames: this.anims.generateFrameNumbers('ToroSalto', { start: 3, end: 3 }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: 'ToroEndJumpAnim',
            frames: this.anims.generateFrameNumbers('ToroSalto', { start: 3, end: 5 }),
            frameRate: 12,
            repeat: 0
        });

        //////////////////////////////////////////////RANA DE LLUVIA ANIMACIONES////////////////////////////////////////////////////

        //////////////////////////////////////////////RANA FLECHA ANIMACIONES////////////////////////////////////////////////////

        //Animacion Idle
        this.anims.create({
            key: 'FlechaIdleAnim',
            frames: this.anims.generateFrameNumbers('FlechaIdle', {start: 0, end: 3}),
            frameRate: 12,
            repeat: -1
        });

        //Animacion de caminar
        this.anims.create({
            key: 'FlechaWalkAnim',
            frames: this.anims.generateFrameNumbers('FlechaCaminar', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 1
        });

        //Animacion de ataque basico
        this.anims.create({
            key: 'FlechaBasicAttackAnim',
            frames: this.anims.generateFrameNumbers('FlechaBasico', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: 0
        });

        //Animación de ataque bajo
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

        //Aniamcion bloqueo fijo
        this.anims.create({
            key: 'FlechaBlockAnim',
            frames: this.anims.generateFrameNumbers('FlechaBloqueo', { start: 4, end: 4 }),
        });

        //Aniamcion de terminar bloqueo
        this.anims.create({
            key: 'FlechaEndBlockAnim',
            frames: this.anims.generateFrameNumbers('FlechaBloqueo', { start: 4, end: 0 }),
            frameRate: 12,
            repeat: 0
        });

        //Animación comenzar agachado
        this.anims.create({
            key: 'FlechaBeginCrouchAnim',
            frames: this.anims.generateFrameNumbers('FlechaAgachado', { start: 0, end: 2 }),
            frameRate: 12,
            repeat: 0
        });

        //Aniamcion agachado fijo
        this.anims.create({
            key: 'FlechaCrouchAnim',
            frames: this.anims.generateFrameNumbers('FlechaAgachado', { start: 2, end: 2 }),
        });

        //Aniamcion de terminar agachado
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

        this.anims.create({
            key: 'FlechaJumpAnim',
            frames: this.anims.generateFrameNumbers('FlechaSalto', { start: 5, end: 5 }),
            frameRate: 18,
            repeat: 0
        });

        this.anims.create({
            key: 'FlechaEndJumpAnim',
            frames: this.anims.generateFrameNumbers('FlechaSalto', { start: 5, end: 1 }),
            frameRate: 18,
            repeat: 0
        });
        //////////////////////////////////////////////RANA TREPADORA ANIMACIONES////////////////////////////////////////////////////



        this.scene.start('MainMenu'); //Cargar Escena inicial
    }
}
