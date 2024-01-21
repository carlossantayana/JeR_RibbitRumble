"use strict";

//Variable global para el sistema de mensajes de error
var code

export default class AccountScene extends Phaser.Scene {
    constructor() {
        super('AccountScene');

        //Caja de texto para el nombre de usuario y su linea de texto
        this.usernameBox
        this.usernameLineText

        //Caja de texto para la contraseña de usuario y su linea de texto
        this.passwordBox
        this.passwordLineText

        //Etiquetas de lad cajas de texto
        this.userLabel
        this.passwordLabel

        //Variables que almacenan los datos
        this.username = ""
        this.password = ""
        this.notVisiblePassword = ""

        //Booleanos de control de escritura
        this.canWriteUsername = false;
        this.canWritePassword = false;

        //Dirty para escribir
        this.dirty = false;

        //Boton de continuar
        this.continue

        //Boton de volver
        this.return

        //Texto para mostrar avisos 
        this.warning
        this.repeatedUserCreation

        //Fondo de la caja
        this.background
    }

    create() {

        //Observador para eventos de teclado
        this.input.keyboard.on('keydown', this.handleKeyDown, this);

        //Fondo del juego
        this.add.image(940, 534.5, 'menuPrincipal').setScale(0.5);

        //Boton de crear cuenta
        const createButton = this.add.image(940, 700, 'botonCrear').setScale(0.5).setInteractive();

        //Boton de iniciar sesion
        const loginButton = this.add.image(940, 600, 'botonIniciar').setScale(0.5).setInteractive();


        //creamos EventListeners "pointerdown" (cuando se hace click con el ratón) que ejecuten la función que queremos
        createButton.on('pointerdown', () => this.showCreateBox());
        loginButton.on('pointerdown', () => this.showLoginBox());

        //Animacion de poner el raton encima
        this.buttonOver(createButton);
        this.buttonOver(loginButton);

        //Animacion de sacar el raton
        this.buttonOut(createButton);
        this.buttonOut(loginButton);


    }

    update() {
        //Si se ha podido crear el usuario o logear sin problemas
        if (access) {
            //Mostramos el usuario actual en el HMTL
            var actualUser = document.getElementById('actual-user');
            actualUser.innerHTML = ('Usuario actual: ' + this.username);

            //Cambiamos la escena
            this.scene.start('MainMenu');
            this.scene.stop('AccountScene');
        }

        //En el caso de que los datos introducidos para crear coincidan con los de una cuenta existente, pone el codigo correspondiente
        if (!access && this.repeatedUserCreation) {
            code = 2
        }

        //Sistema para mostrar mensajes de error alc rear o iniciar sesion
        switch (code) {
            case 0: //Credenciales incorrectas

                if (this.warning != null || this.warning != undefined) {
                    this.warning.destroy()
                }
                this.warning = this.add.text(this.background.x - 250, this.background.y + 180, "Credenciales incorrectas", { fontSize: '40px', color: 'black' });

                break;

            case 1: //Datos no validos

                if (this.warning != null || this.warning != undefined) {
                    this.warning.destroy()
                }
                this.warning = this.add.text(this.background.x - 240, this.background.y + 180, "Datos inválidos", { fontSize: '40px', color: 'black' });

                break;

            case 2: //Usuario ya existente

                if (this.warning != null || this.warning != undefined) {
                    this.warning.destroy()
                }

                this.warning = this.add.text(this.background.x - 250, this.background.y + 180, "Este usuario ya existe", { fontSize: '40px', color: 'black' });


                break;

            case 3: //Usuario ya logueado

                if (this.warning != null || this.warning != undefined) {
                    this.warning.destroy()
                }
                this.warning = this.add.text(this.background.x - 580, this.background.y + 180, "Ya hay una sesion iniciada con este usuario", { fontSize: '40px', color: 'black' });

                break;

            case 4: //No hay usuarios en el servidor

                if (this.warning != null || this.warning != undefined) {
                    this.warning.destroy()
                }
                this.warning = this.add.text(this.background.x - 510, this.background.y + 180, "No hay usuarios en el servidor. Crea uno", { fontSize: '40px', color: 'black' });

                break;
        }
    }


    //Funcion llamada para eventos de la entrada por teclado
    handleKeyDown(event) {
        //Para escribir el usuario

        //Comprobamos que sean solo teclas alfanumericas o el backspace
        if (this.canWriteUsername && (/^[a-zA-Z0-9\s]$/.test(event.key) || event.key === 'Backspace')) {
            // Si es la tecla de retroceso, elimina el último carácter de 'username'
            if (event.key == 'Backspace' || event.code == 'Backspace' || event.keyCode == 127) {

                this.username = this.username.slice(0, -1);
            } else {
                // Agrega el carácter a 'username' si no supera los 20 caracteres
                if (this.username.length < 20) {
                    this.username += event.key;
                }
            }
            //Actualiza el texto de la pantalla
            this.usernameLineText.destroy()
            this.usernameLineText = this.add.text(this.usernameBox.x - 250, this.usernameBox.y - 20, this.username.toString(), { fontSize: '40px', color: 'black' });
        }

        //Para escribir la clave

        //Comprobamos que sean solo teclas alfanumericas o el backspace
        if (this.canWritePassword && (/^[a-zA-Z0-9\s]$/.test(event.key) || event.key === 'Backspace')) {
            // Si es la tecla de retroceso, elimina el último carácter de 'username'
            if (event.key == 'Backspace' || event.code == 'Backspace' || event.keyCode == 127) {
                // Si es la tecla de retroceso, elimina el último carácter de 'username'
                this.password = this.password.slice(0, -1);
                this.notVisiblePassword = this.notVisiblePassword.slice(0, -1)
            } else {
                // Agrega el carácter a 'password' y un * a 'notVisiblePassword' y si no supera lso 20 caracteres
                if (this.password.length < 20) {
                    this.password += event.key;
                    this.notVisiblePassword += "*"
                }
            }

            //Actualiza el texto de la pantalla
            this.passwordLineText.destroy()
            this.passwordLineText = this.add.text(this.passwordBox.x - 250, this.passwordBox.y - 20, this.notVisiblePassword.toString(), { fontSize: '40px', color: 'black' });
        }
    }


    //Caja de crear Cuenta
    showCreateBox() {

        this.background = this.add.image(940, 540, 'fondoLogin').setScale(0.5);

        //Creacion de la caja donde se escribe el nombre de usuario
        this.usernameBox = this.add.rectangle(960, 300, 500, 80, 0xFFFFFF).setInteractive();
        this.usernameLineText = this.add.text(this.usernameBox.x - 250, this.usernameBox.y - 20, this.username.toString(), { fontSize: '40px', color: 'black' });
        this.userLabel = this.add.text(this.usernameBox.x - 250, this.usernameBox.y - 75, "Nombre de Usuario", { fontSize: '40px', color: 'white' });

        //Creacion de la caja donde se escribe la contraseña
        this.passwordBox = this.add.rectangle(960, 430, 500, 80, 0xFFFFFF).setInteractive();
        this.passwordLineText = this.add.text(this.passwordBox.x - 250, this.passwordBox.y - 20, this.notVisiblePassword.toString(), { fontSize: '40px', color: 'black' });
        this.passwordLabel = this.add.text(this.passwordBox.x - 250, this.passwordBox.y - 75, "Contraseña", { fontSize: '40px', color: 'white' });

        //Eventos cuando se pulsa sobre ellos
        this.usernameBox.on('pointerdown', () => this.writeUsername());
        this.passwordBox.on('pointerdown', () => this.writePassword());

        //Boton de confirmar
        this.continue = this.add.image(this.background.x + 400, this.background.y + 300, 'botonContinuar').setInteractive();
        this.continue.on('pointerdown', () => this.registerAccountQuery());

        this.return = this.add.image(this.background.x - 400, this.background.y + 300, 'botonVolver').setInteractive();
        this.return.on('pointerdown', () => this.returnInterface())
    }

    //Funcion que se llama cuando pulsas sobre usernameBox
    writeUsername() {
        if (this.canWritePassword) {
            this.canWritePassword = false;
        }

        this.canWriteUsername = true
    }

    //Funcion que se llama cuando pulsas sobre passwordBox
    writePassword() {
        if (this.canWriteUsername) {
            this.canWriteUsername = false;
        }

        this.canWritePassword = true
    }


    //Caja de iniciar sesion
    showLoginBox() {

        this.background = this.add.image(940, 540, 'fondoLogin').setScale(0.5);

        //Creacion de la caja donde se escribe el nombre de usuario
        this.usernameBox = this.add.rectangle(960, 300, 500, 80, 0xFFFFFF).setInteractive();
        this.usernameLineText = this.add.text(this.usernameBox.x - 250, this.usernameBox.y - 20, this.username.toString(), { fontSize: '40px', color: 'black' });
        this.userLabel = this.add.text(this.usernameBox.x - 250, this.usernameBox.y - 75, "Nombre de Usuario", { fontSize: '40px', color: 'white' });

        //Creacion de la caja donde se escribe la contraseña
        this.passwordBox = this.add.rectangle(960, 430, 500, 80, 0xFFFFFF).setInteractive();
        this.passwordLineText = this.add.text(this.passwordBox.x - 250, this.passwordBox.y - 20, this.notVisiblePassword.toString(), { fontSize: '40px', color: 'black' });
        this.passwordLabel = this.add.text(this.passwordBox.x - 250, this.passwordBox.y - 75, "Contraseña", { fontSize: '40px', color: 'white' });

        //Eventos cuando se pulsa sobre ellos
        this.usernameBox.on('pointerdown', () => this.writeUsername());
        this.passwordBox.on('pointerdown', () => this.writePassword());

        //Boton de confirmar
        this.continue = this.add.image(this.background.x + 400, this.background.y + 300, 'botonContinuar').setInteractive();
        this.continue.on('pointerdown', () => this.loginAccountQuery());

        this.return = this.add.image(this.background.x - 400, this.background.y + 300, 'botonVolver').setInteractive();
        this.return.on('pointerdown', () => this.returnInterface())
    }

    //Metodo que llama a registerUser de queriesAPIREST
    registerAccountQuery() {
        //Si los campos son validos, llama a la funcion
        if (this.username === null || this.username === undefined || this.username === "" || this.password == null || this.password == undefined || this.password == "") {
            console.log("Usuario o contraseña invalida")
            code = 1
        } else {

            if (!registerUser(this.username, this.password)) {
                this.repeatedUserCreation = true
            }

        }
    }

    //Metodo que llama a loginUser de queriesAPIREST
    loginAccountQuery() {
        //Si los campos son validos, llama a la funcion
        if (this.username === null || this.username === undefined || this.username === "" || this.password == null || this.password == undefined || this.password == "") {
            console.log("Usuario o contraseña invalida")
            code = 1
        } else {
            loginUser(this.username, this.password)
        }
    }

    //Funciones para animaciones
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

    //Para destruir todo y reiniciar el estado anterior
    returnInterface() {
        this.background.destroy()
        this.passwordBox.destroy()
        this.usernameBox.destroy()
        this.usernameLineText.destroy()
        this.passwordLineText.destroy()
        this.continue.destroy()
        this.return.destroy()
        this.username = ""
        this.password = ""
        this.notVisiblePassword = ""
        this.canWriteUsername = false;
        this.canWritePassword = false;
        this.dirty = false
        this.userLabel.destroy()
        this.passwordLabel.destroy()
        code = null
        this.repeatedUserCreation = false
        if (this.warning != null || this.warning != undefined) {
            this.warning.destroy()
        }
    }
}


//Login para usuarios
function loginUser(username, password) {
    GetUsers(function (Users) {
        //Buscamos el usuario entre los datos que ha devuelto el servidor
        if (Users.length > 0) {
            for (var i = 0; i < Users.length; i++) {
                if (username === Users[i].username && password === Users[i].password) {
                    if (!Users[i].active) {
                        access = true;
                        // this.actualUser.text('Usuario actual: ' + username);
                        logedUser = Users[i];
                        // SE LE ASIGNA EL ID DEL JUGADOR UNO SIEMPRE //
                        logedUser.player = 1;
                        console.log(logedUser);
                        updateUserStatusEnter(logedUser);
                    }
                    else {
                        console.log("Usuario ya logueado")
                    }
                    code = 3
                }
                //Texto de que la clave o el usuario es incorrecto
                if (!access && code != 3) {
                    console.log("Credenciales incorrectas")
                    code = 0

                }
            }
        } else {
            console.log("No hay usuarios en el servidor")
            code = 4
        }
    });
}

