"use strict";
var logedUser;
var serverIP;

$(document).ready(function () {
    console.log("El DOM está cargado")
    serverIP = location.host;

    //Variables para el funcionamiento del chat
    var chatbox = $('#chatBox')
    var message = $('#input-message')
    var activeUsers = $('#active-users');
    var actualUser = $('#actual-user');
    var actualChatMessagesLenght = 0;
    var access = false;

    //Metodo que controla el click sobre el boton de enviar mensaje
    $("#sendChat").click(function () {
        if (message.val() != "") {  //Si el mensaje no es un espacio vacio
            createMessage(message.val(), logedUser.username, function (MessageCreated) {
                chatbox.val(chatbox.val() + logedUser.username + ": " + message.val() + " " + MessageCreated.date + '\n');
                chatbox.scrollTop(chatbox[0].scrollHeight);
                message.val(''); // Limpiar el input después de enviar el mensaje
            })
        }
    })

    if (!access) {

        //Utilizamos un callback para obtener el numero de usuarios en el servidor
        GetUsers(function (Users) {
            //Si no hay usuarios en el servidor
            if (Users.length === 0) {
                alert("No existen usuarios en el servidor.\nPulsa aceptar para crear un usuario nuevo.");

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
                    actualUser.text('Usuario actual: ' + nombre);
                }
                //Si ya hay usuarios en el servidor, se ejecuta este else
            } else {
                //Bucle de inicio de sesion
                while (!access) {
                    //Si confirma que quiere iniciar sesion
                    if (confirm("Para poder jugar necesitas un usuario.\nPulsa aceptar para iniciar sesión o cancelar para crear un nuevo usuario.")) {

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
                                alert("¡Inicio de sesion exitoso!");
                                access = true;
                                actualUser.text('Usuario actual: ' + nombre);
                                logedUser = Users[i];
                                // SE LE ASIGNA EL ID DEL JUGADOR UNO SIEMPRE //
                                logedUser.player = 1;
                                console.log(logedUser);
                                updateUserStatusEnter(logedUser);
                            }
                        }//Si tras buscar, no encontro nada, se muestra este alert y sigue el bucle
                        if (!access) { alert("Usuario o contraseñas incorrectas.") }

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

                            if (!repeated) {
                                //Llamada al metodo de crear usuario
                                registerUser(nombre, password)
                                access = true;
                                actualUser.text('Usuario actual: ' + nombre);
                            } else { alert("Usuario ya existente en el servidor.") }
                        }
                    }
                }

            }
        });  
    }


    $(window).on('beforeunload', function () {
        // Llamar a updateUserStatusExit para enviar una solicitud PUT al servidor antes de que se cierre la ventana
        updateUserStatusExit(logedUser);
    });



    GetMessages(function (Messages) {
        for (var i = 0; i < Messages.length; i++) {
            chatbox.val(chatbox.val() + Messages[i].username + ": " + Messages[i].message + " " + Messages[i].date + '\n');
            actualChatMessagesLenght = Messages.length;
        }
        chatbox.scrollTop(chatbox[0].scrollHeight);
    });

    function CheckMessages(){
        GetMessages(function (Messages){
            if(Messages.length != actualChatMessagesLenght){
                for (var i = actualChatMessagesLenght; i < Messages.length; i++) {
                    if(logedUser.username != Messages[i].username){
                        chatbox.val(chatbox.val() + Messages[i].username + ": " + Messages[i].message + " " + Messages[i].date + '\n');
                    }
                }

                actualChatMessagesLenght = Messages.length;

                chatbox.scrollTop(chatbox[0].scrollHeight);
            }
        });
    }

    setInterval(CheckMessages, 500);

    function ActiveUsers() {
        GetUsers(function (Users) {
            var num = 0;

            for (var i = 0; i < Users.length; i++) {
                if (Users[i].active == true) {
                    num++;
                }
            }
            activeUsers.text('Usuarios activos: ' + num);
        });
    }

    setInterval(ActiveUsers, 2000);

    //FIN DE USUARIOS
    $("#delete-user").click(function () {
		if(confirm("Pulsa aceptar si quieres borrar su cuenta. Tendrás que iniciar sesión con otra cuenta o crear una nueva.")){
        deleteUser(logedUser);
        location.reload();
        }
    });


}); //Fin del documento.ready

//Funcion encargada de crear mensajes y mandarlos al servidor
function createMessage(messageContent, User, callback) {

    var message = {
        username: User,
        message: messageContent
    }

    console.log("Usuario del mensaje: " + message.username)
    $.ajax({
        method: 'POST',
        url: "http://"+serverIP+"/Chat/",
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
        url: "http://"+serverIP+"/Usuarios/",
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        console.log("Usuario creado con éxito.")
        logedUser = data;
        // SE LE ASIGNA EL ID DEL JUGADOR UNO SIEMPRE //
        logedUser.player = 1;
        console.log(logedUser);
    }).fail(function () {
        console.log("No ha sido posible crear el usuario")
    });
}

//Funcion que devuelve la lista de usuarios almacenados en el servidor
function GetUsers(callback) {
    $.ajax({
        method: "GET",
        url: "http://"+serverIP+"/Usuarios/"
    }).done(function (data) {
        // Llamamos al callback con la lista de usuarios (esto soluciona la no sincronizacion del AJAX)
        console.log("Lista de usuarios devuelta exitosamente")
        callback(data);

    }).fail(function () {
        console.log("No se pudo conseguir la lista de usuarios")
    });

}

function GetMessages(callback) {
    $.ajax({
        method: "GET",
        url: "http://"+serverIP+"/Chat/"
    }).done(function (data) {
        // Llamamos al callback con el número de usuarios (esto soluciona la no sincronizacion del AJAX)
        console.log("Chat recibido ")
        callback(data);

    }).fail(function () {
        console.log("No se pudo conseguir el chat")
    });
}

function updateUserData(user) {
    $.ajax({
        method: 'PUT',
        url: 'http://'+serverIP+'/Usuarios/' + user.id,
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        console.log("Usuario actualizado: " + data)
    })

}

function updateUserStatusExit(user) {
    user.active = false;

    $.ajax({
        url: 'http://' +serverIP+'/Usuarios/' + user.id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(user)
    }).done(function () {
        console.log("Usuario actualizado")
    }).fail(function () {
        console.log("No ha sido posible actualizar el usuario")
    });
}

function updateUserStatusEnter(user) {
    user.active = true;
    $.ajax({
        url: 'http://'+serverIP+'/Usuarios/' + user.id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(user)
    }).done(function () {
        console.log("Usuario actualizado con éxito.")
    }).fail(function () {
        console.log("No ha sido posible actualizar el usuario")
    });
}

function deleteUser(user) {
    $.ajax({
        url: 'http://'+serverIP+'/Usuarios/' + user.id,
        method: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify(user)
    }).done(function () {
        console.log("Usuario borrado con éxito.")
    }).fail(function () {
        console.log("No ha sido posible borrar el usuario")
    });
}