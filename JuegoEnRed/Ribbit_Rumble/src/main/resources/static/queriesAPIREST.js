$(document).ready(function(){
    console.log("El DOM está cargado")

    //Variables para el funcionamiento del chat
    var chatbox = $('#chatBox')
    var message = $('#input-message')
    var logedUserId; //ID del usuario conectado
    var access = false;

    //Metodo que controla el click sobre el boton de enviar mensaje
    $("#sendChat").click(function() {
        chatbox.val(chatbox.val() + message.val() + '\n');
        message.val(''); // Limpiar el input después de enviar el mensaje
    })

    if(!access){
        
        //Utilizamos un callback para obtener el numero de usuarios en el servidor
        GetNumberOfUsers(function(numberOfUsers){
            console.log(numberOfUsers)
        if( numberOfUsers === 0 ){
            alert("No existen usuarios en el servidor, crea uno");

            //Proceso de creación del primer usuario del servidor
            while(!access){
                var nombre
                var password

                nombre = prompt("Nombre de usuario:","")
                //Si deja el espacio vacio
                while(nombre === null || nombre === undefined){
                    nombre = prompt("Nombre de usuario:","")
                }
                pasword = prompt("Contraseña","")
                //Si deja el espacio vacio
                while(password === null|| password === undefined){
                    password = prompt("Contraseña","")
                }
                //Llamada al metodo de crear usuario
                registerUser(nombre, password)
                access = true;
            }
        }
    });
    //En el caso de que si haya usuarios creados en el servidor
    }  

    
    if(!access){
        //Si confirma que quiere entrar con un usuario existente
        if (confirm("¿Quieres entrar con un usuario existente?, sino tendrás que crearlo."))
        {
            while(!access){
                var nombre
                var password

                nombre = prompt("Nombre de usuario:","")
                while(nombre === null || nombre === undefined){
                    nombre = prompt("Nombre de usuario:","")
                }
                pasword = prompt("Contraseña","")
                while(password === null|| password === undefined){
                    password = prompt("Contraseña","")
                }
                console.log("Usuario Introducido: " + nombre + "PW Introducido: " + password)
                //Se comprueba si existe un usuario con el nombre y contraseña correctos
                GetUsers(function(Users){
                    console.log("Entré en getUsers")
                    for(var i = 0; i < Users.length; i++){
                        if(username === Users[i].username && password === Users[i].password){
                            console.log("Inicio de sesion exitoso")
                            access = true;
                            break;
                        }
                    }
                    alert("Nombre o contraseña incorrectos despues de buscar");
                });

                //COSAS RARAS
               /* if(!SearchForUser(false, nombre, password)){
                    console.log(SearchForUser(false, nombre, password))
                    alert("Nombre o contraseña incorrectos despues de buscar");
                }
                else{
                    console.log("Inicio de sesion exitoso")
                    //logedUserId=GetUserId(nombre,password);
                    access = true;
                }*/
            }
        }
        /*else
        {
            if(GetNumberOfUsers()===0){
                alert("No existen usuarios, crea uno");
            }
            while(!access)
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
                        access = true;
                    }
                }

            }
            alert("Nuevo usuario creado")
            registerUser(nombre,pasword);
            logedUserId=GetUserId(nombre,pasword);
        } */
    }

    }); //Fin del documento.ready

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

    //Funcion que busca un usuario ya creado
    function SearchForUser(onlyName, username, password, callback) {
        var found;
        console.log("Entré en searchForUser")

        //Obtenemos a todos los usuarios del servidor
        $.ajax({
            url: "http://localhost:8080/Usuarios/"
        }).done(function(data){
            for(var i = 0; i < data.length; i++){

                if(username === data[i].username && password === data[i].password)
                console.log("Usuario y contraseña correctas");
                //Retornamos true para salir del bucle
                found = true;
            }
            found = false;
        });
        return found;
        // PARA BORRAR //
        //Conseguimos todos los usuarios del servidor con un callback y comprobamos si hay una coincidencia
        /*GetUsers(function(Users){
            console.log("Usuarios devueltos por el callback" + Users)
            for(var i = 0; i < Users.length; i++){

                //Si hay una coincidencia entre nombre y contraseña
                if(username === Users[i].username && password === Users[i].password){
                    console.log(Users[i].username + "y" + Users[i].password)
                    console.log("Usuario y contraseña correctas");
                    //Retornamos true para salir del bucle
                    found = true;
                } 
            }
            //Si no hay coincidencias, se deja en falso
            found = false;
        });*/
       /* $.ajax({
            url: "http://localhost:8080/Usuarios/"
        }).done(function(data){
            for(var i = 0; i < data.items.length; i++){

                if(onlyName){
                    if(data.item[i].username === username)
                    {
                        console.log("Usuario Encontrado")
                        return true;
                    }
                }
                else{
                    if(data.item[i].username === username && data.items[i].password === password)
                    {
                        console.log("Usuario y contraseña encontrada")
                        return true;
                    }
                }
            }
            return false;
        });*/
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

    //Funcion que devuelve el número de usuarios almacenados en el servidor
    function GetNumberOfUsers(callback) {
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/Usuarios/"
        }).done(function(data) {
            // Llamamos al callback con el número de usuarios (esto soluciona la no sincronizacion del AJAX)
            console.log("Numero de usuarios devuelto exitosamente")
            callback(data.length);

        }).fail(function(){
            console.log("No se pudo conseguir el numero de usuarios")
        });
    }

    
    function GetUsers(callback2){
        $.ajax({
            url: "http://localhost:8080/Usuarios/"
        }).done(function(data) {
            // Llamamos al callback con los usuarios (esto soluciona la no sincronizacion del AJAX)
            console.log("Datos devueltos: " + data)
            callback2(data);
        }).fail(function(){
            console.log("No se pudo devolver los usuarios del servidor")
        });
    }



    

