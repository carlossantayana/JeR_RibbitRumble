$(document).ready(function(){
    console.log("El DOM está cargado")

    //Variables para el funcionamiento del chat
    var chatbox = $('#chatBox')
    var message = $('#input-message')


    //Metodo que controla el click sobre el boton de enviar mensaje
    $("#sendChat").click(function() {
        chatbox.val(chatbox.val() + message.val() + '\n');
        message.val(''); // Limpiar el input después de enviar el mensaje
    })



    });

    //Funcion que se llama cuando se va a registrar un usuario y hace el POST al servidor
    function registerUser(usernameP, passwordP){

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
            headers :{
                "Content-Type": "application/json"
            }
        }).done(function(){
            console.log("Usuario creado con éxito.") });
    }

    //Funcion que se llama cuando un usuario va a hacer login y hace el GET al servidor
    function loginUser(){}

    //Funcion que se llama cuando un usuario va a hacer login y hace el GET al servidor
    function loginUser(){}



    

