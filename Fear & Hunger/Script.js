import { Personaje } from './Personaje.js';
import { Enemigo } from './Enemigos.js';
import { Tienda } from './Tienda.js';

let personaje;
let tienda = new Tienda();
let rondaActual = 0;

document.addEventListener('DOMContentLoaded', () => {
    
    const botonNuevaPartida = document.getElementById('nueva-partida');
    if (botonNuevaPartida) {
        botonNuevaPartida.addEventListener('click', () => {
            limpiarInventario();
            console.log("Nueva partida iniciada.");
            window.location.href = "CrearPersonaje.html"; 
        });
    }

    
    const botonContinuarPartida = document.getElementById('continuar-partida');
    if (botonContinuarPartida) {
        botonContinuarPartida.addEventListener('click', () => {
            console.log("Intentando continuar partida...");
            cargarPartida();
        });
    }

    
    const botonEliminarPartida = document.getElementById('eliminar-partida');
    if (botonEliminarPartida) {
        botonEliminarPartida.addEventListener('click', () => {
            console.log("Eliminando partida guardada...");
            localStorage.removeItem('personaje');
            localStorage.removeItem('rondaActual');
            alert("Partida eliminada.");
        });
    }

   
    const botonRagnvaldr = document.getElementById('comenzar-ragnvaldr');
    if (botonRagnvaldr) {
        botonRagnvaldr.addEventListener('click', () => {
            iniciarRagnvaldr();
        });
    }

    const botonDarce = document.getElementById('comenzar-darce');
    if (botonDarce) {
        botonDarce.addEventListener('click', () => {
            iniciarDarce();
        });
    }

    const botonEnki = document.getElementById('comenzar-enki');
    if (botonEnki) {
        botonEnki.addEventListener('click', () => {
            iniciarEnki();
        });
    }

    const botonCahara = document.getElementById('comenzar-cahara');
    if (botonCahara) {
        botonCahara.addEventListener('click', () => {
            iniciarCahara();
        });
    }

  
    const botonVolverSeleccion = document.getElementById('volver-seleccion');
    if (botonVolverSeleccion) {
        botonVolverSeleccion.addEventListener('click', () => {
            volverSeleccion();
        });
    }
});


function cargarPartida() {
    const personajeGuardado = localStorage.getItem('personaje');
    const rondaGuardada = localStorage.getItem('rondaActual');

    console.log("Personaje guardado:", personajeGuardado);
    console.log("Ronda guardada:", rondaGuardada);

    if (personajeGuardado && rondaGuardada !== null) {
        try {
            personaje = Personaje.fromJSON(JSON.parse(personajeGuardado));
            rondaActual = parseInt(rondaGuardada, 10);
            console.log(`Partida cargada. Personaje: ${personaje.nombre}, Ronda: ${rondaActual}`);
            alert("Partida cargada. Redirigiendo al lobby...");
            window.location.href = "Lobby.html"; 
        } catch (error) {
            console.error("Error al cargar la partida:", error);
            alert("Hubo un error al cargar la partida. Por favor, intenta de nuevo.");
        }
    } else {
        console.log("No hay partida guardada.");
        alert("No hay partida guardada.");
    }
}


function guardarPersonaje(personaje) {
    localStorage.setItem('personaje', JSON.stringify(personaje));
    localStorage.setItem('rondaActual', rondaActual);
    alert("Partida guardada correctamente.");
    window.location.href = "Lobby.html"; 
}


function volverSeleccion() {
    window.location.href = "CrearPersonaje.html"; 
}

const limpiarInventario = () => {
    localStorage.removeItem('inventario');
    localStorage.removeItem('personaje');
    localStorage.removeItem('rondaActual');
    alert("El inventario y los datos de la partida han sido limpiados.");
};


function iniciarRagnvaldr() {
    const personaje = {
        nombre: "Ragnvaldr",
        nivel: 1,
        vida: 120,
        ataque: 10,
        defensa: 8,
        velocidad: 4,
        dinero: 200 
    };
    guardarPersonaje(personaje);
}


function iniciarDarce() {
    const personaje = {
        nombre: "D'arce",
        nivel: 1,
        vida: 100,
        ataque: 8,
        defensa: 10,
        velocidad: 6,
        dinero: 200
    };
    guardarPersonaje(personaje);
}


function iniciarEnki() {
    const personaje = {
        nombre: "Enki",
        nivel: 1,
        vida: 100,
        ataque: 12,
        defensa: 6,
        velocidad: 8,
        dinero: 200
    };
    guardarPersonaje(personaje);
}


function iniciarCahara() {
    const personaje = {
        nombre: "Cahara",
        nivel: 1,
        vida: 110,
        ataque: 9,
        defensa: 7,
        velocidad: 9,
        dinero: 2000
    };
    guardarPersonaje(personaje);
}