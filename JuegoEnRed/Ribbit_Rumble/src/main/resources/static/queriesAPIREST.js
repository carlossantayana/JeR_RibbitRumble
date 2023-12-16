$(document).ready(function(){
    console.log("El DOM está cargado")

    //Variables para el funcionamiento del chat
    var chatbox = $('#chatBox')
    var message = $('#input-message')
    var logedUserId; //ID del usuario conectado

    //Metodo que controla el click sobre el boton de enviar mensaje
    $("#sendChat").click(function() {
        chatbox.val(chatbox.val() + message.val() + '\n');
        message.val(''); // Limpiar el input después de enviar el mensaje
    })

    var acces=false;
    while(!acces){
        if(GetNumberOfUsers()==0){
            alert("No existen usuarios, crea uno");
        }
        if (GetNumberOfUsers()>1 && confirm("¿Quieres entrar con un usuario existente?, sino tendrás que crearlo."))
        {
            while(!acces){
                var nombre
                var pasword

                while(nombre===null || nombre===undefined){
                    nombre = prompt("Nombre de usuario:","")
                }
                while(pasword===null|| pasword===undefined){
                    pasword = prompt("Contraseña","")
                }
                //Se comprueba si existe un usuario con el nombre y contraseña correctos
                if(!SearchForUser(false,nombre,pasword)){
                    alert("Nombre o contraseña incorrectos");
                }
                else{
                    logedUserId=GetUserId(nombre,pasword);
                    acces=true;
                }
            }
        }
        else
        {
            if(GetNumberOfUsers()===0){
                alert("No existen usuarios, crea uno");
            }
            while(!acces)
            {
                var pasword;
                var nombre
                while(nombre===null || nombre===undefined){
                    nombre = prompt("Nombre de nuevo usuario:","")
                }
                if(SearchForUser(true,nombre)){
                    alert("Este usuario ya existe");
                }
                else{
                    while(pasword===null || pasword===undefined){
                        pasword = prompt("Contraseña","")
                    }
                    var pasword2 = prompt("Confirma tu contraseña:","")
                    if(pasword!==pasword2)
                    {
                        alert("Confirmación de contraseña incorrecta")
                    }
                    else
                    {
                        acces=true;
                    }
                }

            }
            alert("Nuevo usuario creado")
            registerUser(nombre,pasword);
            logedUserId=GetUserId(nombre,pasword);
        }  
    }

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
            if(!SearchForUser(true,usernameP)){
                console.log("Usuario creado con éxito.") 
                return true;
            }
            else{
                alert("Ya existe este usuario")
                return false;
            }
        });
    }

    function SearchForUser(onlyName,username,password) {
        $.ajax({
            url: "http://localhost:8080/Usuarios/"
        }).done(function(data){
            for(var i = 0; i < data.items.length; i++){
                if(onlyName){
                    if(data.item[i].username===username)
                    {
                        return true;
                    }
                }
                else{
                    if(data.item[i].username===username && data.items[i].password===password)
                    {
                        return true;
                    }
                }
            }
            return false;
        });
    };

    function GetUserId(username,password) {
        $.ajax({
            url: "http://localhost:8080/Usuarios/"
        }).done(function(data){
            for(var i = 0; i < data.items.length; i++){
                if(data.item[i].username===username && data.items[i].password===password)
                {
                    return data.item[i].id;
                }
            }
            return -1;
        });
    };

    function GetNumberOfUsers() {
        $.ajax({
            url: "http://localhost:8080/Usuarios/"
        }).done(function(data){
            return data.items.length;
        });
    };



    

