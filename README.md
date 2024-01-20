**Nombre del Juego: Ribbit Rumble**

**Temática: Juego de Lucha 2D de ranas estilo Cartoon**


**Miembros del equipo de Desarrollo:**

Carlos Santayana Vicente                  

* *Correo institucional: c.santayana.2021@alumnos.urjc.es*

* *Usuario de GitHub: carlossantayana*


Alejandro Pérez Carretero         

* *Correo institucional: a.perezc.2021@alumnos.urjc.es*

* *Usuario de GitHub: AlexPC03*


Sebastián Loges de Faria

* *Correo institucional: s.loges.2021@alumnos.urjc.es*

* *Usuario de GitHub: Sebastian02L*


Marcos De Ozaeta Cabadas

* *Correo institucional: m.deozaeta.2021@alumnos.ujrc.es*

* *Usuario de GitHub: Mdoc14*

**Documento de Diseño del Juego “Ribbit Rumble”**

![](ImagenesMD/RibbitRumbleLogo.png)















# Índice
[1.	Introducción	](#_toc148190696)

[2.	Personajes	](#_toc148190697)

[3.	Mecánicas	](#_toc148190698)

[4.	Estados del Juego	](#_toc148190699)

[5.	Interfaces	](#_toc148190700)

[6.	Niveles	](#_toc148190701)

[7.	Música y Sonidos	](#_toc148190702)

[8.	Desarrollo	](#_toc148190703)

[9. Implementación con una API REST ](#_toc148190704)

[10. Implementación con Web Sockets ](#_toc148190705)

[10. Mejoras para el Futuro ](#_toc148190706)

[11. Referencias ](#_toc148190707)




 # <a name="_toc148190696"></a>Introducción
**Ribbit Rumble** es un juego en red multijugador perteneciente al género de lucha, donde dos jugadores lucharán entre ellos en cada partida. Los personajes del juego están tematizados con ranas cuyas habilidades en combate dependerán de su especie.

El videojuego tiene una calificación PEGI 12, ya que es apto para todos los públicos, pero puede contener escenas que podrían afectar a algunos jugadores. Se busca atraer la atención de un público casual, que disfrute de los juegos de lucha donde puedan emplear diversas estrategias para vencer a su contrincante.

El estilo artístico del videojuego es “cartoon 2D”. Este estilo ayudará a transmitir a los jugadores un ambiente divertido y gracioso dentro del juego.

**Ribbit Rumble** será el primer juego de la saga, con el que buscamos conseguir la mayor cantidad de jugadores posible, que estén interesados en los enfrentamientos uno contra uno. El videojuego estará disponible para PC a través de diversas tiendas digitales. De esta manera, al ser una de las plataformas con más usuarios actualmente, el juego estará al alcance de un alto porcentaje de jugadores. El videojuego tendrá un modelo de negocio gratuito con donaciones opcionales, similar al conocido “Buy me a Coffe”.

La jugabilidad en red se conseguirá con una arquitectura cliente/servidor, con una comunicación sustentada por una API REST y WebSockets. Un ordenador actuará como servidor mientras que otros dos actuarán como clientes. 
 # <a name="_toc148190697"></a>Personajes
Los jugadores podrán escoger entre 4 personajes distintos, basados en ranas de diferentes especies, como se mencionó anteriormente:

- **La Rana de Lluvia**, científicamente conocida como “***Breviceps gibbosus”,*** es una rana africana cuyas principales características son la forma esférica de su cuerpo y sus ojos oscuros, que le dan un aspecto de caricatura. En el juego tiene el nombre de Furu.

![](ImagenesMD/LluviaReal.png)

 ***“Rana de Lluvia”***     

![](ImagenesMD/LluviaConcept.png)

***“Concept Rana de Lluvia”***

- **Rana Punta de Flecha**, con “***Dendrobatidae*”** como su nombre científico, originaria de América del Sur, es una rana venenosa que llama la atención de sus depredadoras con sus patrones y colores brillantes, cuanto más llamativos son, más tóxico es el contacto con estas. En el juego tiene el nombre de Klein.

![](ImagenesMD/FlechaReal.png)

***“Rana Punta de Flecha”***

![](ImagenesMD/FlechaConcept.png)

***“Boceto de personaje Punta de Flecha”***

- **Rana Toro**, conocida también por su nombre científico “***Lithobates catesbeianus”***, presente en muchos continentes, es una especie que puede llegar a medir 20 cm de largo y llegar a pesar casi un kilo. Se caracteriza por comerse a otras ranas. En el juego tiene el nombre de Bull.

![](ImagenesMD/ToroReal.png)

***“Rana Toro”***

![](ImagenesMD/ToroConcept.png)

***“Boceto de personaje Rana Toro”***

- **Rana Trepadora,** cuyo nombre científico es “***Boana pulchella***”, se distribuye por la mayor parte de América de Sur, en arroyos y lagunas. Se caracteriza por su piel de color verde o amarillo uniforme, su pequeño tamaño y el volumen de su saco vocal al hincharse. En el juego tiene el nombre de Juan.

![](ImagenesMD/TrepadoraReal.png)

***“Rana Trepadora”***

![](ImagenesMD/TrepadoraConcept.png)

***“Boceto de personaje Rana Trepadora”***

 # <a name="_toc148190698"></a>Mecánicas
La perspectiva del juego será una cámara lateral fija que mostrará todo el escenario donde se desarrollará el combate.

El juego compartirá muchas mecánicas presentes en otros videojuegos del género de lucha. Empezando por el movimiento básico de los personajes. Los jugadores podrán moverse a la izquierda y a la derecha, así como saltar y agacharse. Las teclas que permitirán esto son la “A”, “D”, “W” y la “S”.  

Cada jugador tendrá una barra de vida, una barra de habilidad especial y un contador de rondas ganadas, que se podrán consultar en la interfaz que estará sobre la pantalla en la zona superior.

Los jugadores podrán atacar al pulsar la tecla “F”, siendo este un ataque distinto dependiendo del estado en el que esté (agachado, en el aire…), asimismo, se podrán bloquear los golpes presionando la tecla “G”, que reducirá en parte el daño producido por el golpe. El medidor de la habilidad especial se va llenando conforme se aciertan golpes y se bloquean ataques, cuando este está lleno, el jugador podrá realizar un ataque especial al pulsar a la vez las teclas “F” y “G”. Este ataque también podrá ser bloqueado.






En la siguiente tabla se muestran los controles para ambos jugadores en función del modo de juego seleccionado:

![](ImagenesMD/ControlesTabla.png)

A continuación, se detallan los ataques de cada personaje, así como sus estadísticas:

La mayoría de los ataques variarán en la velocidad y la animación para cada personaje. Todos los ataques tienen el mismo alcance a excepción del ataque especial:

**Rana de Lluvia:** Sus ataques tienen una velocidad normal, un daño moderado, y se basan en el movimiento del cuerpo completo del personaje (aprovechando así su forma esférica):

-Ataque básico: Embiste hacia delante con su cuerpo.

-Ataque bajo: Rueda hacía la rana rival, causando daño y empujándolo.

-Ataque ascendente: Salta y hace un “backflip”, con las patas delanteras estiradas.

-Ataque aéreo: Da una vuelta sobre sí misma con ambas patas estiradas.

-Bloqueo: Se da la vuelta para enseñar la parte trasera de su cuerpo.

-Ataque especial: Bosteza mientras hace un sonido que adormece al enemigo por unos segundos. Aunque se le golpee, este no despierta hasta que se acabe el efecto de la habilidad.




**Rana Punta de Flecha:** Sus ataques tienen una alta velocidad, daño por debajo de la media y utiliza sus patas delanteras y su lengua para atacar:

-Ataque básico: Realiza una “bofetada” con una de sus patas delanteras.

-Ataque bajo: Mientras está agachada, saca la lengua para atacar a lo que tiene enfrente.

-Ataque ascendente: Salta mientras mueve las patas delanteras hacia arriba.

-Ataque aéreo: Se inclina ligeramente mientras mueve las patas delanteras hacia abajo.

-Bloqueo: Se agacha y se cubre los ojos con las patas delanteras.

-Ataque especial: Salta hacia la posición del enemigo y lo envenena, bajándole la vida de manera periódica por unos segundos. 

**Rana Toro:** Sus ataques son lentos, pero bastante fuertes y utiliza su cabeza y su gran cuerpo para atacar:

-Ataque básico: Da un cabezazo hacia delante.

-Ataque bajo: Apoyada sobre su propio cuerpo, hace un aplauso con las patas delanteras.

-Ataque ascendente: Salta con la cabeza por delante para dar un cabezazo hacia arriba.

-Ataque aéreo: Extiende sus patas haciendo daño a todo lo que esté alrededor de esta.

-Bloqueo: Llena su saco vocal protegiéndola por delante.

-Ataque especial: Saca la lengua e introduce al rival en su boca, manteniéndolo encerrado dos segundos hasta que lo escupe. En ese proceso el rival pierda la mitad de su vida actual.

**Rana Trepadora:** Sus ataques tienen una velocidad estándar con daño moderado y utiliza principalmente su lengua para atacar:

-Ataque básico: Saca la lengua para atacar justo enfrente suya.

-Ataque bajo: Mientras está agachada, saca la lengua para atacar por debajo.

-Ataque ascendente: Saca la lengua con un ángulo de 45º respecto al suelo.

-Ataque aéreo: Hincha su saco vocal mientras está en el aire, haciendo un poco de daño a lo que esté cerca.

-Bloqueo: Levanta la cabeza e hincha su saco vocal.

-Ataque especial: Pega un latigazo delante de él con su lengua, causando un golpe poderoso en el rival.

 # <a name="_toc148190699"></a>Estados del Juego
En este apartado se muestra de forma gráfica los estados por los que se va a mover el juego. Se empieza en el “Menú Principal” desde el cual se puede acceder al “Menú de selección de Modo”, “Menú de Ajustes” y a la opción “Salir del Juego”. Siguiendo el flujo, después de elegir el modo de juego y los personajes, los jugadores escogerán el escenario donde lucharán en “Selección de Mapa”, luego pasan al estado de “Juego” donde el primer jugador en ganar dos rondas será el ganador.

Al acabar la partida se mostrará una “Pantalla de Resultados” con una serie de estadísticas. Desde este estado se puede seguir el flujo hacia el “Menú Principal” o a la “Selección de Personajes” en caso de querer empezar rápidamente una nueva partida. Desde ciertos estados se permite un flujo de ida y vuelta, como por ejemplo entre el “Menú Principal” y el “Menú de Ajustes”.

![](ImagenesMD/EstadoJuego.png)

***” Diagrama de Estados del Juego”***

 # <a name="_toc148190700"></a>Interfaces
En cuanto a las interfaces del juego, estas se detallan a continuación:

- **Menú Principal:** Con el título del juego en la parte superior y dos ranas haciendo un pulso, el menú principal es la primera pantalla que verán los jugadores. En ella el jugador podrá pulsar tres botones:

- **Combate:** Con este botón se le dará a elegir al jugador entre juego en local o en red.
- **Ajustes:** Con este botón se abrirá el menú de ajustes.
- **Salir del juego:** Con este botón se cerrará el juego.

![](ImagenesMD/PPrincipal.png)

***“Concept de la Interfaz del menú principal”***

- **Menú de Ajustes:** En este menú se podrán cambiar diferentes parámetros.

- **Volumen general:** Controla el volumen general del juego, en el que se incluyen la música y los efectos de sonido.
- **Volumen de la música:** Controla el volumen de la música de forma independiente al resto de sonidos.
- **Volumen de efectos de sonido:** Controla el volumen de los efectos de sonido del juego (golpes, acciones, …).
- **Brillo:** Controla el brillo de la pantalla.

![](ImagenesMD/PAjustes.png)

***“Concept de la Interfaz de menú de ajustes”***

- **Menú de Selección de Personajes:** En el centro de la pantalla se encuentran los “logos” de los cuatro personajes jugables, a los lados de la pantalla se mostrará un dibujo a cuerpo completo de la rana escogida por el jugador 1 y 2 respectivamente. Ambos jugadores podrán elegir la misma rana.

![](ImagenesMD/PPersonajes.png)

***“Concept del Menú de selección de Personajes”***

![](ImagenesMD/TrepadoraPersonaje.png)  ![](ImagenesMD/FlechaPersonaje.png)

![](ImagenesMD/LluviaPersonaje.png)  ![](ImagenesMD/ToroPersonaje.png)

**”Dibujo de los personajes a cuerpo completo”**

- **Menú de Selección de Mapa:** En el centro de la pantalla se dispondrán tres mapas y una cuarta opción, que consiste en elegir uno de los tres mapas anteriores de forma aleatoria. Sobre el mapa que elija cada jugador saldrá J1 o J2, para aclarar cuál ha elegido cada uno. Además, a ambos lados de la pantalla saldrá en grande el mapa escogido por estos, y cuando se seleccione el mapa final en el que jugar, se decidirá a través de un parpadeo aleatorio entre ambos mapas y el elegido se iluminará.

![](ImagenesMD/PMapas.png)

**“Concept de la Interfaz de selección de mapas”**

- **Interfaz en Partida:** Dentro de la partida la interfaz estará situada en la zona superior de la pantalla, mostrando el icono del personaje de ambos jugadores, sus barras de vida y habilidades especiales. En el centro de esta interfaz se encuentra el temporizador de la partida y el contador de rondas ganadas, simbolizadas con unas fichas con un dibujo de la cabeza de una mosca. En el paso a la siguiente ronda, la barra de vida es reestablecida.



![](ImagenesMD/InterfazIG.png)

**“Concept de la Interfaz InGame”**


- **Pantalla de Resultados:** En la pantalla de resultados se mostrarán los personajes utilizados en pose de victoria o derrota según el jugador que haya ganado o perdido. Además, también se mostrarán el número de rondas ganadas por cada jugador en la partida y la duración total de esta.

![](ImagenesMD/PResultados.png)

***“Concept de la Pantalla de Resultados con Rana Toro (Izquierda) como ganador y Rana Punta de Flecha (Derecha) como perdedor”***

 # <a name="_toc148190701"></a>Niveles
**Jungla:**

En este escenario la pelea se desarrolla en un tronco de madera que flota en un río en la selva. La base del escenario (el propio tronco) ocupa la pantalla de un lado a otro, y en el fondo se van viendo la espesa vegetación y los árboles de la selva, que se desplazan hacia la derecha, simulando que el tronco va río abajo. Entre el tronco y la vegetación, se ve el agua del rio que va cambiando y formando ondulaciones, simulando la corriente.

![](ImagenesMD/JunglaConcept.png)

***“Boceto del escenario Jungla”***

**Desierto:** 

La pelea toma lugar encima de unos ladrillos que formaban parte de una vieja pirámide. Alrededor se puede ver una barrera de cactus y entre esta y el suelo hay un montículo de arena que tapa parte de los ladrillos. Detrás de los cactus se puede ver una explanada de arena y rocas pequeñas. A lo lejos se puede apreciar una enorme pirámide en contraste con el cielo, y en el lado contrario a este hay un oasis con palmeras que se reflejan sobre el agua cristalina. A lo largo de la batalla las nubes del cielo se van desplazando desde la izquierda hasta la derecha, así como rayos del sol que van apareciendo y desapareciendo sobre el escenario.

![](ImagenesMD/DesiertoConcept.png)

***“Boceto del escenario del Desierto”***

**Nenúfar:**

En este escenario los jugadores pelearan encima de un nenúfar situado en un lago en mitad del bosque. En el fondo se verán dos árboles frondosos. El nenúfar donde batallarán las ranas está flotando, por lo que se apreciará un suave movimiento arriba y abajo.

![](ImagenesMD/NenufarConcept.png)

***“Boceto del Nenúfar”***

 # <a name="_toc148190702"></a>Música y Sonidos
En el menú principal sonará una canción de rock para acompañar a la imagen de las ranas musculadas, esta misma seguirá sonando en bucle hasta que se entre en una partida.

Durante la partida, comenzará a sonar una canción concreta en función del mapa, pero con la diferencia de que estas tendrán un tono más gracioso que la del menú, acompañando a la apariencia “cartoon” de los personajes jugables que, como ya se vio en apartados anteriores, no es la misma que tienen en los menús previos a la partida. Además de la música de fondo, durante el gameplay, también se escucharán efectos sonoros tanto de la batalla como del escenario. 

En el escenario de la jungla, entre los efectos de sonido, se escuchará como el agua del mapa sigue la corriente y sonidos de ambiente de insectos y animales comunes de la selva.

En el mapa del desierto, los efectos sonoros que se escucharán en este mapa serán ventiscas y graznidos de buitres.

Por último, en el mapa del Nenúfar se escucharán “ribbits” de ranas y chapoteos en el agua.

En cuanto a los efectos de sonido de los personajes, cada ataque tendrá un sonido acompañando a la animación, el cual sonará distinto en el caso de ser bloqueado por el rival. 

Cada vez que se gane una ronda, la rana ganadora hará un “ribbit” mientras se prepara para la siguiente ronda. 

En la pantalla de resultados, sonarán aplausos mientras que de fondo se escuchan “ribbits” de la rana ganadora.  

Tanto en la pantalla de selección de personajes como de mapas, a la hora de seleccionar el personaje/mapa se escucharán diversos sonidos. En el caso de los personajes, su “ribbit” correspondiente, y para los mapas, alguno de los efectos mencionados anteriormente.

# <a name="_toc148190703"></a>Desarrollo
Los colores de los personajes del videojuego son planos y con pocos detalles, para asemejarse más a el estilo cartoon buscado por el equipo. 

![](ImagenesMD/RanasColor.png)
**“Colores finales de los personajes”**

Las animaciones de los personajes se implementan en el juego mediante una hoja de sprites hechos a mano, habiendo una hoja por cada animación con una cantidad de frames variable. En total, cada personaje tiene asociadas 8 hojas de sprites. 

Los colores de los escenarios siguen la misma tendencia de estilo cartoon.

![](ImagenesMD/Desierto.png)
***“Mapa del desierto final”***

![](ImagenesMD/Nenufar.png)
***“Mapa del nenufar final”***

![](ImagenesMD/Jungla.png)
***“Mapa de la jungla final”***

El diseño artístico de las interfaces del juego, a excepción de la interfaz dentro de la partida, poseen un estilo más realista, teniendo colores más oscuros, sombras y detalles marcados. De esta manera se consigue hacer un intenso contraste con el diseño de las ranas dentro de las partidas y así causar una pequeña sorpresa en los jugadores que prueben el juego por primera vez.

![](ImagenesMD/InterfazPrincipal.png)
***“Interfaz de la pantalla principal”***

![](ImagenesMD/InterfazAjustes.png)
***“Interfaz del menú de ajustes”***

![](ImagenesMD/PantallaPersonaje.png)
***“Interfaz del menú de selección de personaje”***

![](ImagenesMD/InterfazMapa.png)
***“Interfaz del menú de selección de mapa”***

![](ImagenesMD/PantallaResultados.png)
***“Interfaz de la pantalla de resultados”***

Dentro de la interfaz de selección de personaje, los jugadores escogen haciendo click en el retrato de los personajes y posteriormente se muestra una versión musculada de la rana en los laterales. El estilo de estas ilustraciones sigue la tendencia realista de las interfaces.

![](ImagenesMD/RanasDetalle.png)
***“Personajes detallados en la selección de personaje”***

Los botones del juego siguen el estilo de la portada, teniendo efectos de óxido y letras rojas con detalles blancos y rojos carmesí intensos.

![](ImagenesMD/Botones.png)
***“Botones finales del juego”***

El flujo del juego presenta pequeños cambios respecto de la idea inicial. La pantalla de selección de modo se diseñó desde cero y la pantalla de resultados se cambió ligeramente en respecto a su boceto inicial, ocurriendo lo mismo con la interfaz de selección de personajes y mapas. También se agregó una pantalla de carga con una pequeña animación que se muestra mientras el juego carga los recursos. Adicionalmente, se eliminó la opción de volver atrás en la interfaz de selección de personajes y selección de mapas.

![](ImagenesMD/PantallaModo.png)
***“Pantalla de selección de modo”***

![](ImagenesMD/PantallaCarga.png)
***“Pantalla de carga del videojuego”***

Se dió a los personajes diferentes estadísticas para ofrecer más variedad dentro del juego. De forma más concreta:
1. La rana toro tiene la vida máxima más alta de todas pero tiene menos velocidad de movimiento.
2. La rana de lluvia tiene un poco más de vida de lo normal pero es ligeramente más lenta que las demás.
3. La rana punta de flecha es más rápida que las demás pero es la que menor vida máxima tiene de todas.
4. La rana trepadora tiene las estádisticas estándar, estando entre medias de todas las demás ranas.

En lo que respecta a cambios en los ataques, el ataque bajo de la rana toro fue sustitudo por un nuevo ataque, en lugar de realizar un aplauso delante de su cuerpo, saca la lengua hacia la dirección en la que mira, haciendo daño a la rana rival si está a su alcance.

En cuanto a los sonidos, al entrar en cualquiera de los tres escenarios, se reproduce una canción característica junto con sonidos de ambiente. Asimismo, todos los menús reproducen una canción de rock para acompañar al estilo artístico realista mencionado antes.

# <a name="_toc148190704"></a>Implementación con una API REST
Para la fase 3 del juego, se han implementado una serie de funcionalidades haciendo uso de una API REST y utilizando el framework de Spring.

Aquí se puede observar el diagrama UML de clases de la API REST:
![](ImagenesMD/UML.png)
***“Diagrama UML de la API REST”***

En este diagrama se puede observar que hay una clase Usuario y una clase Mensaje, y ambas tienen su respectivo controlador en los que se guardan dichos usuarios y mensajes. También están implementados en ambas clases los distintos métodos HTTP y la lectura y escritura de ficheros.

Cabe destacar que la clase Usuario Controller también tiene un método que, al cerrarse el servidor, pone a los usuarios en modo desconectado; lo que permite que las sesiones de los usuarios no queden activas al volver a abrir el servidor.

En cuanto a la parte del cliente, al acceder a la página se le solicita obligatoriamente que se registre como usuario.
Para ello pueden ocurrir dos situaciones: 

1. Si el servidor no tiene usuarios en memoria.

![](ImagenesMD/noUsers.png)

2. Si el servidor tiene usuarios en memoria.

![](ImagenesMD/register_log_users.png)

Si crea un usuario le saldrán dos campos de texto en los que deberá escribir su nombre y su contraseña.

![](ImagenesMD/createUsername.png) 

![](ImagenesMD/createPassword.png)

Por el contrario, si decide iniciar sesión, le saldrán dos campos de texto parecidos y, dependiendo de si el usuario es correcto o no, aparecerán estos mensajes:

![](ImagenesMD/successLog.png) 

![](ImagenesMD/failedLog.png) 

Los usuarios se guardarán con los siguientes atributos:

![](ImagenesMD/getUsers.png) 

Tras tener un usuario, ya se podrá acceder al juego y al chat de la parte inferior de la pantalla. También será capaz de ver el número de usuarios conectados simultaneamente.

El usuario podrá borrar su cuenta pulsando el botón "Borrar usuario actual", y dicha cuenta estará representada por el nombre de su usuario a la derecha del botón.

Al pulsar el botón de borrar la cuenta, le saldrá un mensaje de confirmación.

![](ImagenesMD/deleteUser.png) 

***“Confirmación de borrado de cuenta”***

Respecto al chat, el usuario podrá escribir un mensaje en un campo de texto y, al enviarlo pulsando el botón "Enviar", dicho mensaje aparecerá en el campo superior con formato <Usuario: mensaje (fecha y hora)>.

Además está implementado de forma que se actualiza en tiempo real para todos los usuarios cada vez que alguien manda un mensaje.

Aquí se puede observar la interfaz de la pagina principal:
![](ImagenesMD/localhostTotal.png) 
***“Interfaz de la página”***

Como última parte de la implementación en el cliente, tambien se guardan las estadísticas del usuario tras cada partida, en la que se muestran el número de partidas ganadas y el número de rondas ganadas y perdidas en total.

![](ImagenesMD/resultsApiRest.png) 
***“Pantalla de resultados”***

# <a name="_toc148190705"></a>Implementación con Web Sockets
Para la fase 4, se han implementado una serie de funcionalidades haciendo uso de Web Sockets y utilizando, al igual que con la API REST, el framework de Spring.

Aquí se puede observar el diagrama UML de clases de la parte del servidor relacionada con Web Sockets.
![](ImagenesMD/UML_Fase4.jpg)
***“Diagrama UML del servidor relacionado con Web Sockets”***

En el diagrama se muestra como se relacionan las distintas clases que se encargan de la parte de gestionar los Web Sockets. 
Los mensajes que mandan los usuarios se gestionan y procesan en la clase WebSocketHandler. Todos los mensajes que se envían al servidor contienen un string que los envía a su gestión del mensaje correspondiente. Así pues, estos mensajes se utilizan para las siguientes funcionalidades en red:
- **Emparejamiento entre ambos jugadores.** Cuando se pulsa el botón de selección de modo "En red", se abre una conexión al servidor por medio de un Web Socket, que en el instante que se crea comienza a mandar un string, "pairing", al servidor para conectarse con el otro cliente. el servidor devuelve un JSON con un booleano que indica si se han conectado 2 clientes o no, y ambos clientes lo reciben hasta que dicho booleano es true.
  
- **Selección de personajes y mapas.** Una vez emparejados, se asigna el jugador 1 al cliente que creó primero el Web Socket y, por tanto, el segundo cliente es el jugador 2. A la hora de elegir personaje, esto se hace por turnos. Primero elige el jugador 1, que en el momento en el que selecciona un personaje, este se envía al servidor como un número entero dentro de un JSON, que a su vez contiene un string, "characterSelection", para que se gestione en su correspondiente función. El servidor le mandará al otro cliente cual es el personaje que eligió el jugador 1. Se repiten los mismos pasos para el jugador 2, y tras elegir se hace una cuenta atrás para continuar con la selección de mapas.
En la selección de mapas se hace de forma similar a la de personajes, pero cambiando el string por "mapSelection". La diferencia es al momento de elegir un mapa de entre los dos seleccionados. Como se realiza de forma aleatoria con números aleatorios, es el jugador 2 el que genera ese numero aleatorio y se lo envía al servidor en un JSON con el string "finalMapSelection" para que el jugador 1 pueda recibir desde el servidor el mapa en el van a jugar ambos.

- **Gameplay.**
  
- **Pantalla de resultados.** 

En cuanto al flujo del juego, este ha sido modificado para poder implementar el uso de WebSockets:

![](ImagenesMD/Flujograma_Fase4.jpg)
 ***“Flujograma del juego con WebSockets”***
 
 Las escenas de selección de personajes, de selección de mapas, del gameplay y de la pantalla de resultados se han duplicado para que el juego pueda seguir siendo jugable en local.
 También se ha añadido la escena de emparejamiento.
 
# <a name="_toc148190706"></a>Mejoras para el Futuro
Algunos aspectos comentados anteriormente en este documento no fueron implementados durante la fase de desarrollo inicial. Siendo entonces contenido que se ha recortado del juego, pero que son posibles implementaciones futuras. Dichos aspectos son:

1. Ataque ascendente, aéreo y especial de los personajes.
2. Animaciones de los escenarios.
3. Control del brillo de la pantalla.

# <a name="_toc148190707"></a>Referencias

Se ha tomado como referencia juegos como Mortal Kombat y Street Fighter a la hora de diseñar las mecánicas y diseño de los niveles. La estructura del GDD ha sido extraída de la teoría enseñada en la asignatura "Fundamentos del diseño y la Jugabilidad" de primero de Diseño y Desarrollo de Videojuegos.

Adicionalmente, en este apartado están las referencias a las imágenes de terceros utilizadas que no son de uso libre. El resto de las imágenes que no son de elaboración propia son de libre uso.

[* foto de la rana Trepadora](https://calphotos.berkeley.edu/cgi/img_query?enlarge=0000+0000+1008+1676)

La música del juego, así como los efectos de sonido, fueron sacadas de la página Pixabay y Splice, cumpliendo con las características de sus licencias correspondientes.

[* Página de Pixabay](https://pixabay.com/)

[* Página de Splice](https://splice.com/)
