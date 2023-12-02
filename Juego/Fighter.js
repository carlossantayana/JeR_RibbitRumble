export default class Fighter extends Phaser.Physics.Arcade.Image
{
    constructor (scene, x, y, characterIdx, alt, playerId)
    {
        super(scene, x, y, 'Imagen', 'Fighter');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.hp = 100;
        this.character=characterIdx;
        this.altSkin=alt;
        this.player=playerId;

        this.asignAnimations();
    }

    playerUpdate(){ //Este será el update de cada jugador, donde se comprobarán los inputs correspodientes y se ejecutarán las animaciones. Se deberá llamar en el update de la escena
        if(this.player===1){//player1 comprobará inputs WASD y player2 los de las flechas

        }
        else{

        }
    }

    asignAnimations(){
        //Animaciones asignadas:
        if(!this.alt){
            switch(this.character){
                case 0: //Se asigna el nombre de las animaciones dependiendo del personaje;
                    this.idleAnim="";
                    this.walkAnim="";
                    this.blockAnim="";
                    this.jumpAnim="";
                    this.duckAnim="";
                    this.attackAnim="";
                    this.downAttackAnim="";
                    this.airAttackAnim="";
                    break;
                case 1:
                    this.idleAnim="";
                    this.walkAnim="";
                    this.blockAnim="";
                    this.jumpAnim="";
                    this.duckAnim="";
                    this.attackAnim="";
                    this.downAttackAnim="";
                    this.airAttackAnim="";
                    break;
                case 2:
                    this.idleAnim="";
                    this.walkAnim="";
                    this.blockAnim="";
                    this.jumpAnim="";
                    this.duckAnim="";
                    this.attackAnim="";
                    this.downAttackAnim="";
                    this.airAttackAnim="";
                    break;
                case 3:
                    this.idleAnim="";
                    this.walkAnim="";
                    this.blockAnim="";
                    this.jumpAnim="";
                    this.duckAnim="";
                    this.attackAnim="";
                    this.downAttackAnim="";
                    this.airAttackAnim="";
                    break;
            }

        }
        else{
            switch(this.character){
                case 0: //Se asigna el nombre de las animaciones dependiendo del personaje con skin alternativa;
                    this.idleAnim="";
                    this.walkAnim="";
                    this.blockAnim="";
                    this.jumpAnim="";
                    this.duckAnim="";
                    this.attackAnim="";
                    this.downAttackAnim="";
                    this.airAttackAnim="";
                    break;
                case 1:
                    this.idleAnim="";
                    this.walkAnim="";
                    this.blockAnim="";
                    this.jumpAnim="";
                    this.duckAnim="";
                    this.attackAnim="";
                    this.downAttackAnim="";
                    this.airAttackAnim="";
                    break;
                case 2:
                    this.idleAnim="";
                    this.walkAnim="";
                    this.blockAnim="";
                    this.jumpAnim="";
                    this.duckAnim="";
                    this.attackAnim="";
                    this.downAttackAnim="";
                    this.airAttackAnim="";
                    break;
                case 3:
                    this.idleAnim="";
                    this.walkAnim="";
                    this.blockAnim="";
                    this.jumpAnim="";
                    this.duckAnim="";
                    this.attackAnim="";
                    this.downAttackAnim="";
                    this.airAttackAnim="";
                    break;
            }
        }
    }
}