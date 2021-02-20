/*
Introduccion: Juego de la viborita (Snake). Consiste en una vibora que va comiendo 'manzanas' (puntos rojos) que aparecen al azar por la pantalla.
Pautas:
1. Cada vez que la vibora come una manzana, se alarga de tamaño.
2. Si la vibora colisiona con alguna parte de su cuerpo (por ejemplo su cola), esta vuelve al tamaño original.
*/

// Una vez que carga el html, se ejecuta la funcion cargarConfiguracion()
window.onload = cargarConfiguracion()

function cargarConfiguracion() {
    contenedorPuntajeHtml = document.getElementById('puntaje')
    contenedorPuntajeHtml.insertAdjacentHTML('beforeend', '<div id="puntajeActual">0</div>')
    puntajeActual = document.getElementById('puntajeActual')

    contenedorTiempoHtml = document.getElementById('tiempo')
    contenedorTiempoHtml.insertAdjacentHTML('beforeend', '<div id="tiempoTranscurrido">0</div>')
    tiempoActual = document.getElementById('tiempoTranscurrido')

    canvas = document.getElementById('canvas')
    context = canvas.getContext('2d')
    document.addEventListener("keydown", flechaPresionada)
    objetivo = 100
    // Por cada segundo, se llama a la funcion jugar() 15 veces en la cual se escucha que tecla presiona el usuario y la misma funcion se encarga de la logica del juego.
    setInterval(() => {
        if (puntos < objetivo)
            game()
        else
            terminarJuego()
    }, 1000 / 13);
}

// VARIABLES GLOBALES
let jugadorX = jugadorY = 10
let tabla = tileCount = 20
let manzanaX = manzanaY = 15
let velocidadX = velocidadY = 0
let cuerpoVibora = []
let colaVibora = 5
let puntos = 0
let milisegundo = 0
let segundo = 0
let minuto = 0
let tiempoJugado = 0

function game() {
    jugadorX += velocidadX
    jugadorY += velocidadY
    // Si el jugador se sale del canvas, aparece en el otro lado
    if (jugadorX < 0) {
        jugadorX = tileCount - 1
    }
    if (jugadorX > tileCount - 1) {
        jugadorX = 0
    }
    if (jugadorY < 0) {
        jugadorY = tileCount - 1
    }
    if (jugadorY > tileCount - 1) {
        jugadorY = 0
    }

    // Se dibuja el fondo negro en el canvas
    context.fillStyle = "black"
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Se dibuja la vibora en el canvas
    context.fillStyle = "lime"
    for (var i = 0; i < cuerpoVibora.length; i++) {
        context.fillRect(cuerpoVibora[i].x * tabla, cuerpoVibora[i].y * tabla, tabla - 2, tabla - 2)
        // Si la vibora colisiona con su propio cuerpo, vuelve a su tamaño original
        if (cuerpoVibora[i].x == jugadorX && cuerpoVibora[i].y == jugadorY) {
            colaVibora = 5
            puntos = 0
            puntajeActual.innerHTML = puntos
        }
    }

    // Guarda la ultima posicion de la vibora
    cuerpoVibora.push({ x: jugadorX, y: jugadorY })
    // Mientras la vibora ...
    while (cuerpoVibora.length > colaVibora) {
        cuerpoVibora.shift()
    }
    // Si la vibora colisiona con la manzana, se agranda y se crea una nueva manzana de forma aleatoria
    if (manzanaX == jugadorX && manzanaY == jugadorY) {
        puntos += 10
        puntajeActual.innerHTML = puntos
        colaVibora++
        manzanaX = Math.floor(Math.random() * tileCount)
        manzanaY = Math.floor(Math.random() * tileCount)
    }

    // Se dibuja la manzana en el canvas
    context.fillStyle = "red"
    context.fillRect(manzanaX * tabla, manzanaY * tabla, tabla - 2, tabla - 2)
}

// Funcion que termina la ejecucion del juego
function terminarJuego() {
    // Se corta el llamado al cronometro
    clearInterval(setIntervalID);

    // Se dibuja el mensaje en el canvas
    context.fillStyle = "white"
    context.font = "30px Roboto";
    context.fillText("FELICIDADES GANASTE!", 40, 200);
    context.fillStyle = "aqua"
    context.fillText(`TU TIEMPO FUE : ${tiempoActual.innerHTML}`, 25, 300);
}
// Depende que flecha se hmanzanaYa presionado, la vibora se movera en una direccion u otra.
function flechaPresionada(evento) {
    switch (evento.keyCode) {
        case 37:
            velocidadX = -1
            velocidadY = 0
            break
        case 38:
            velocidadX = 0
            velocidadY = -1
            break
        case 39:
            velocidadX = 1
            velocidadY = 0
            break
        case 40:
            velocidadX = 0
            velocidadY = 1
            break
    }
    if ((evento.keyCode >= 37 && evento.keyCode <= 40) && tiempoActual.innerHTML == "0")
        setIntervalID = setInterval(cronometrar, 10)
}

function cronometrar() {
    tiempoActual.innerHTML = minuto + " : " + segundo + " : " + milisegundo
    milisegundo++
    if (milisegundo == 100) {
        milisegundo = 0
        segundo++
    }
    if (segundo == 60) {
        segundo = 0
        minuto++
    }
}