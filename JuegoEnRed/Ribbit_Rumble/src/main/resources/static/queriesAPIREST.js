"use strict";
var logedUser;
var serverIP;
var access = false;

$(document).ready(function () {
    console.log("El DOM está cargado")
    serverIP = location.host;

    //Variables para el funcionamiento del chat
    var chatbox = $('#chatBox')
    var message = $('#input-message')
    var activeUsers = $('#active-users');
    //var actualUser = $('#actual-user');
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
//Obtenemos los usuarios existentes para comprobar si el usuario a crear ya existe
GetUsers(function (Users) {
	
     var repeated = false;
     for (var i = 0; i < Users.length; i++) {
          if (usernameP === Users[i].username) {
              repeated = true;
              }
           }	
  if(!repeated){ 
	         
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
        access = true;
        // SE LE ASIGNA EL ID DEL JUGADOR UNO SIEMPRE //
        logedUser.player = 1;
        console.log(logedUser);
    }).fail(function () {
        console.log("No ha sido posible crear el usuario")
    	});
    } else {console.log("Usuario ya existente en el servidor")}
})

}

//Funcion que devuelve la lista de usuarios almacenados en el servidor
function GetUsers(callback) {
    $.ajax({
        method: "GET",
        url: "http://"+serverIP+"/Usuarios/"
    }).done(function (data) {
        // Llamamos al callback con la lista de usuarios (esto soluciona la no sincronizacion del AJAX)
        //console.log("Lista de usuarios devuelta exitosamente")
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
        //console.log("Chat recibido ")
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