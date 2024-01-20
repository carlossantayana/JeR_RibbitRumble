"use strict";


export default class AccountScene extends Phaser.Scene {
    constructor() {
        super('AccountScene');
        this.usernameBox
        this.usernameLineText
        this.passwordBox
        this.passwordLineText
        
        this.username = ""
        this.password = ""
        
        this.canWriteUsername = false;
        this.canWritePassword = false;
        
        this.dirty = false;
        
        this.continue
        //this.actualUser = $('#actual-user');
        
        
    }

    create() {

		//Observador para eventos de teclado
 		this.input.keyboard.on('keydown', this.handleKeyDown, this);

        this.add.image(940, 534.5, 'menuPrincipal').setScale(0.5);

        //this.audioLauncher();

		//Boton de crear cuenta
        const createButton = this.add.image(940, 600, 'botonComenzar').setScale(0.5).setInteractive(); //Objeto que queremos que sea el boton
       
        //Boton de iniciar sesion
        const settingsButton = this.add.image(940, 700, 'botonAjustes').setScale(0.5).setInteractive(); //Objeto que queremos que sea el boton
        

        //creamos EventListeners "pointerdown" (cuando se hace click con el ratón) que ejecuten la función que queremos
        createButton.on('pointerdown', () => this.showCreateBox());
        settingsButton.on('pointerdown', () => this.showLoginBox());
        

        this.buttonOver(createButton);
        this.buttonOver(settingsButton);
       

        this.buttonOut(createButton);
        this.buttonOut(settingsButton);
        

    }
    
    update(){
    
    if(access){
		var actualUser = document.getElementById('actual-user');
        actualUser.innerHTML = ('Usuario actual: ' + this.username);
        
		this.scene.start('MainMenu');
		this.scene.stop('AccountScene');
	}
	
	}
    
    //Evento que capta la entrada por teclado
    handleKeyDown(event) {
		//Para la entrada del usuario en CREAR CUENTRA
    if (this.canWriteUsername && (/^[a-zA-Z0-9\s]$/.test(event.key)|| event.key === 'Backspace')) {
        // Asegúrate de que el evento de teclado esté activo y la tecla sea alfanumérica o un espacio
        if (event.key == 'Backspace' || event.code == 'Backspace' || event.keyCode == 127 || event.keyCode == 127) {
            // Si es la tecla de retroceso, elimina el último carácter de 'username'
            this.username = this.username.slice(0, -1);
        } else {
            // Agrega el carácter a 'username'
            this.username += event.key;
        }
        
        this.usernameLineText.destroy()
		this.usernameLineText = this.add.text(this.usernameBox.x, this.usernameBox.y, this.username.toString(), { fontSize: '40px', color: 'black' });
    }
    
    //Para la entrada de la contraseña en CREAR CUENTA
    if (this.canWritePassword && (/^[a-zA-Z0-9\s]$/.test(event.key)|| event.key === 'Backspace')) {
        // Asegúrate de que el evento de teclado esté activo y la tecla sea alfanumérica o un espacio
        if (event.key == 'Backspace' || event.code == 'Backspace' || event.keyCode == 127 || event.keyCode == 127) {
            // Si es la tecla de retroceso, elimina el último carácter de 'username'
            this.password = this.password.slice(0, -1);
        } else {
            // Agrega el carácter a 'username'
            this.password += event.key;
        }
        
        this.passwordLineText.destroy()
		this.passwordLineText = this.add.text(this.passwordBox.x, this.passwordBox.y, this.password.toString(), { fontSize: '40px', color: 'black' });
    }
}

    audioLauncher() {
        this.scene.launch('AudioManager');
    }

//CREAR CUENTA. TODAVIA NO COMPRUEBA REPETIDOS
    showCreateBox() { 

       // this.scene.run('ModeSelectionMenu');
       // this.scene.pause();
       
       //Creacion de la caja donde se escribe el nombre de usuario
       this.usernameBox = this.add.rectangle(960, 540, 500, 80, 0xFFFFFF).setInteractive();
       this.usernameLineText = this.add.text(this.usernameBox.x, this.usernameBox.y, this.username.toString(), { fontSize: '40px', color: 'black' });
       
       //Creacion de la caja donde se escribe la contraseña
       this.passwordBox = this.add.rectangle(960, 640, 500, 80, 0xFFFFFF).setInteractive();
       this.passwordLineText = this.add.text(this.passwordBox.x, this.passwordBox.y, this.password.toString(), { fontSize: '40px', color: 'black' });
       
       //Eventos cuando se pulsa sobre ellos
       this.usernameBox.on('pointerdown', () => this.writeUsername());
       this.passwordBox.on('pointerdown', () => this.writePassword());
       
       //Boton de confirmar
       this.continue = this.add.rectangle(1010, 900, 500, 80, 0xFFFFFF).setInteractive();
       this.continue.on('pointerdown', () => this.registerAccountQuery());
    }
    
    writeUsername(){
		if(this.canWritePassword){
			this.canWritePassword = false;
		}
		
		this.canWriteUsername = true	
	}
	
	writePassword(){
				if(this.canWriteUsername){
			this.canWriteUsername = false;
		}
		
		this.canWritePassword = true
	}
    
    
    //INICIAR SESION
    showLoginBox() { 
    
        //Creacion de la caja donde se escribe el nombre de usuario
       this.usernameBox = this.add.rectangle(960, 540, 500, 80, 0xFFFFFF).setInteractive();
       this.usernameLineText = this.add.text(this.usernameBox.x, this.usernameBox.y, this.username.toString(), { fontSize: '40px', color: 'black' });
       
       //Creacion de la caja donde se escribe la contraseña
       this.passwordBox = this.add.rectangle(960, 640, 500, 80, 0xFFFFFF).setInteractive();
       this.passwordLineText = this.add.text(this.passwordBox.x, this.passwordBox.y, this.password.toString(), { fontSize: '40px', color: 'black' });
       
       //Eventos cuando se pulsa sobre ellos
       this.usernameBox.on('pointerdown', () => this.writeUsername());
       this.passwordBox.on('pointerdown', () => this.writePassword());
       
       //Boton de confirmar
       this.continue = this.add.rectangle(1010, 900, 500, 80, 0xFFFFFF).setInteractive();
       this.continue.on('pointerdown', () => this.loginAccountQuery());
    }

	registerAccountQuery(){
		//Si todo está bien, registra al usuario en el servidor
		if(this.username === null || this.username === undefined || this.username === "" || this.password == null || this.password == undefined || this.password == ""){
			console.log("Usuario o contraseña invalida")
		} else {
		registerUser(this.username, this.password)
		}
	}
	
		loginAccountQuery(){
		//Si todo está bien, registra al usuario en el servidor
		if(this.username === null || this.username === undefined || this.username === "" || this.password == null || this.password == undefined || this.password == ""){
			console.log("Usuario o contraseña invalida")
		} else {
		loginUser(this.username, this.password)
		}
	}

//Cosas extra
    buttonOver(button) {
        button.on('pointerover', function () {
            this.setScale(0.55);
        })
    }

    buttonOut(button) {
        button.on('pointerout', function () {
            this.setScale(0.5);
        })
    }
}

function loginUser(username, password){ 
		GetUsers(function (Users) {            
              //Buscamos el usuario entre los datos que ha devuelto el servidor
                  for (var i = 0; i < Users.length; i++) {

                        if (username === Users[i].username && password === Users[i].password) {
                                if(!Users[i].active){
                                access = true;
                                 // this.actualUser.text('Usuario actual: ' + username);
                                logedUser = Users[i];
                                // SE LE ASIGNA EL ID DEL JUGADOR UNO SIEMPRE //
                                logedUser.player = 1;
                                console.log(logedUser);
                                updateUserStatusEnter(logedUser);
                                } else {console.log("Usuario ya logeado")}
                            }
                   }
		});
	}

