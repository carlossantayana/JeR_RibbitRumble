var logedUser;

$(document).ready(function () {
    console.log("El DOM está cargado")

    //Variables para el funcionamiento del chat
    var chatbox = $('#chatBox')
    var message = $('#input-message')
    var logedUserName; //nombre del usuario conectado
    var access = false;

    //Metodo que controla el click sobre el boton de enviar mensaje
    $("#sendChat").click(function () {
        createMessage(message.val(), logedUserName, function(MessageCreated){
            chatbox.val(chatbox.val()+"<"+logedUserName+">: "+ message.val() + MessageCreated.date + '\n');
        })
        message.val(''); // Limpiar el input después de enviar el mensaje
    })

    if (!access) {

        //Utilizamos un callback para obtener el numero de usuarios en el servidor
        GetUsers(function (Users) {
            //CONTROL PARA SABER SI FUNCIONA CORRECTAMENTE
            console.log(Users.length)

            //Si no hay usuarios en el servidor
            if (Users.length === 0) {
                alert("No existen usuarios en el servidor, crea uno para poder jugar");

                //Primer bucle donde se crea el primer usuario
                while (!access) {
                    var nombre
                    var password

                    nombre = prompt("Nombre de usuario a crear:", "")
                    //Si deja el espacio vacio
                    while (nombre === null || nombre === undefined) {
                        nombre = prompt("Nombre de usuario a crear:", "")
                    }
                    password = prompt("Contraseña:", "")
                    //Si deja el espacio vacio
                    while (password === null || password === undefined) {
                        password = prompt("Contraseña:", "")
                    }
                    //Llamada al metodo de crear usuario
                    registerUser(nombre, password)
                    access = true;
                }
                logedUserName = nombre;
                //Si ya hay usuarios en el servidor, se ejecuta este else
            } else {
                //Bucle de inicio de sesion
                while (!access) {
                    //Si confirma que quiere iniciar sesion
                    if (confirm("Para poder jugar necesitas un usuario, quieres iniciar sesión?")) {

                        var nombre
                        var password

                        nombre = prompt("Nombre de usuario para iniciar sesion:", "")
                        //Si deja el espacio vacio
                        while (nombre === null || nombre === undefined) {
                            nombre = prompt("Nombre de usuario para iniciar sesion:", "")
                        }
                        password = prompt("Contraseña del usuario:", "")
                        //Si deja el espacio vacio
                        while (password === null || password === undefined) {
                            password = prompt("Contraseña del usuario:", "")
                        }

                        //Buscamos el usuario entre los datos que ha devuelto el servidor
                        for (var i = 0; i < Users.length; i++) {

                            if (nombre === Users[i].username && password === Users[i].password) {
                                alert("¡Inicio de sesion exitoso!")
                                logedUserName = nombre;
                                access = true;
                                logedUser = Users[i];
                                // SE LE ASIGNA EL ID DEL JUGADOR UNO SIEMPRE //
                                logedUser.player = 1;
                            }
                        }//Si tras buscar, no encontro nada, se muestra este alert y sigue el bucle
                        if (!access) { alert("Usuario o contraseñas incorrectas") }

                    } else { //Si no quiere iniciar sesion y quiere crear un nuevo usuario, entra en el bucle de crear cuenta
                        while (!access) {
                            var nombre
                            var password

                            nombre = prompt("Nombre de usuario a crear:", "")
                            //Si deja el espacio vacio
                            while (nombre === null || nombre === undefined) {
                                nombre = prompt("Nombre de usuario a crear:", "")
                            }
                            password = prompt("Contraseña:", "")
                            //Si deja el espacio vacio
                            while (password === null || password === undefined) {
                                password = prompt("Contraseña:", "")
                            }

                            //Comprobamos que el usuario que quiere crear no es repetido
                            var repeated = false;
                            for (var i = 0; i < Users.length; i++) {
                                if (nombre === Users[i].username) {
                                    repeated = true;
                                }
                            }

                            if(!repeated){
                            //Llamada al metodo de crear usuario
                            registerUser(nombre, password)
                            access = true;
                            logedUserName = nombre;
                            } else {alert("Usuario ya existente en el servidor")}
                        }
                    }
                }
                
            }
        });

    }
    
    //FIN DE USUARIOS
    
    GetMessages(function(Messages){
        for(var i = 0; i < Messages.length; i++){
            chatbox.val(chatbox.val()+"<"+ Messages[i].username +">: "+ Messages[i].message + " " + Messages[i].date + '\n');
        }
    });

}); //Fin del documento.ready

//Funcion encargada de crear mensajes y mandarlos al servidor
function createMessage(messageContent, User, callback){

    var message = {
        user: User,
        message: messageContent
    }

    console.log("nombre del json: " + message.username)
    $.ajax({
        method: 'POST',
        url: "http://localhost:8080/Chat/",
        data: JSON.stringify(message),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        console.log("Mensaje enviado");
        callback(data);
    }).fail(function () {
        console.log("Falló el envio de mensaje");
    });
}

//Funcion que se llama cuando se va a registrar un usuario y hace el POST al servidor
function registerUser(usernameP, passwordP) {

    //Creamos el usuario con los parametros pasados
    var user = {
        username: usernameP,
        password: passwordP
    }
    
    //Se hace la peticion con AJAX
    $.ajax({
        method: 'POST',
        url: "http://localhost:8080/Usuarios/",
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        alert("Usuario creado con éxito.")
        logedUser = data
        // SE LE ASIGNA EL ID DEL JUGADOR UNO SIEMPRE //
        logedUser.player = 1;
    }).fail(function () {
        alert("No ha sido posible crear el usuario")
    });
}

//Funcion que devuelve el número de usuarios almacenados en el servidor
function GetUsers(callback) {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/Usuarios/"
    }).done(function (data) {
        // Llamamos al callback con el número de usuarios (esto soluciona la no sincronizacion del AJAX)
        console.log("Numero de usuarios devuelto exitosamente")
        callback(data);

    }).fail(function () {
        console.log("No se pudo conseguir el numero de usuarios")
    });
}

function GetMessages(callback) {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/Chat/"
    }).done(function (data) {
        // Llamamos al callback con el número de usuarios (esto soluciona la no sincronizacion del AJAX)
        console.log("Chat recibido ")
        callback(data);

    }).fail(function () {
        console.log("No se pudo conseguir el chat")
    });
}

function updateUserData(user){
        $.ajax({
            method: 'PUT',
            url: 'http://localhost:8080/Usuarios/' + user.id,
            data: JSON.stringify(user),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (data) {
            console.log("Usuario actualizado: " + data)
        })
    
}


