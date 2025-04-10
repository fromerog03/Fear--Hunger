document.addEventListener('DOMContentLoaded', () => {
    const personajeGuardado = JSON.parse(localStorage.getItem('personaje'));
    if (personajeGuardado) {

        const armaEquipada = personajeGuardado.equipo?.arma;
        const ataqueBase = personajeGuardado.ataque;
        const ataqueConArma = ataqueBase + (armaEquipada?.poder || 0); 

      
        document.getElementById('nombre-personaje').textContent = personajeGuardado.nombre;

       
        const fondosPersonaje = {
            "D'arce": "url('imagenes/fondo_darce_personaje.jpg')",
            "Cahara": "url('imagenes/fondo_cahara_personaje.jpg')",
            "Enki": "url('imagenes/fondo_fear_and_hunger.jpg')",
            "Ragnvaldr": "url('imagenes/fondo_ragnvaldr_personaje.jpg')"
        };

     
        const fondoPersonaje = fondosPersonaje[personajeGuardado.nombre];
        if (fondoPersonaje) {
            document.querySelector('.personaje-container').style.backgroundImage = fondoPersonaje;
        } else {
            console.error("No se encontró un fondo para el personaje:", personajeGuardado.nombre);
        }

       
        const estadisticas = `
            <li>Nivel: ${personajeGuardado.nivel}</li>
            <li>Vida: ${personajeGuardado.vida}</li>
            <li>Ataque con Arma: ${ataqueConArma}</li> <!-- Mostrar el ataque total -->
            <li>Defensa: ${personajeGuardado.defensa}</li>
            <li>Velocidad: ${personajeGuardado.velocidad}</li>
        `;
        document.getElementById('estadisticas-personaje').innerHTML = estadisticas;

       
        const imagenesPersonajes = {
            "D'arce": "imagenes/d_arce_grande.png",
            "Cahara": "imagenes/cahara_grande.png",
            "Enki": "imagenes/enki_grande.png",
            "Ragnvaldr": "imagenes/ragnvaldr_grande.png"
        };

        const nombreImagen = imagenesPersonajes[personajeGuardado.nombre];
        if (nombreImagen) {
            document.getElementById('imagen-personaje').src = nombreImagen;
        } else {
            console.error("No se encontró una imagen para el personaje:", personajeGuardado.nombre);
        }
    } else {
        alert("No se encontró un personaje. Redirigiendo a la selección de personajes.");
        window.location.href = "CrearPersonaje.html";
    }
});


function irACombate() {
    window.location.href = "Combate.html"; 
}

function irATienda() {
    window.location.href = "Tienda.html"; 
}

function verInventario() {
    window.location.href = "Inventario.html"; 
}

function guardarPartida() {
    const personajeGuardado = JSON.parse(localStorage.getItem('personaje'));
    const rondaActual = localStorage.getItem('rondaActual') || 1;
    localStorage.setItem('personaje', JSON.stringify(personajeGuardado));
    localStorage.setItem('rondaActual', rondaActual);
    alert("Partida guardada correctamente.");
}

function salir() {
    alert("Gracias por jugar. ¡Hasta la próxima!");
    window.location.href = "Fear & Hunger.html"; 
}

document.addEventListener('DOMContentLoaded', () => {
    
    const btnCombate = document.getElementById('btn-combate');
    const btnTienda = document.getElementById('btn-tienda');
    const btnInventario = document.getElementById('btn-inventario');
    const btnGuardar = document.getElementById('btn-guardar');
    const btnSalir = document.getElementById('btn-salir');

   
    btnCombate.addEventListener('click', irACombate);
    btnTienda.addEventListener('click', irATienda);
    btnInventario.addEventListener('click', verInventario);
    btnGuardar.addEventListener('click', guardarPartida);
    btnSalir.addEventListener('click', salir);

  
});