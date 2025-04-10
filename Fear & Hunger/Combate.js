document.addEventListener('DOMContentLoaded', () => {
    const botonAtacar = document.getElementById('boton-atacar');
    const botonDefender = document.getElementById('boton-defender');
    const botonHuir = document.getElementById('boton-huir');
    const vidaJugadorBarra = document.getElementById('vida-jugador');
    const vidaEnemigoBarra = document.getElementById('vida-enemigo');
    const vidaJugadorTexto = document.getElementById('vida-jugador-texto');
    const vidaEnemigoTexto = document.getElementById('vida-enemigo-texto');
    const imagenJugador = document.getElementById('imagen-jugador');
    const imagenEnemigo = document.getElementById('imagen-enemigo');

    if (!botonAtacar || !botonDefender || !botonHuir || !vidaJugadorBarra || !vidaEnemigoBarra || !imagenJugador || !imagenEnemigo) {
        console.error("Uno o más elementos del DOM no se encontraron.");
        return;
    }

    const personajeGuardado = JSON.parse(localStorage.getItem('personaje'));
    if (!personajeGuardado) {
        alert("No se encontró un personaje guardado. Redirigiendo a la selección de personajes...");
        window.location.href = "CrearPersonaje.html";
        return;
    }

    const imagenesPersonajes = {
        "D'arce": "imagenes/d_arce_grande.png",
        "Cahara": "imagenes/cahara_grande.png",
        "Enki": "imagenes/enki_grande.png",
        "Ragnvaldr": "imagenes/ragnvaldr_grande.png"
    };

    let jugador = {
        nombre: personajeGuardado.nombre,
        nivel: personajeGuardado.nivel || 1,
        experiencia: personajeGuardado.experiencia || 0,
        vida: personajeGuardado.vida,
        maxVida: personajeGuardado.vida,
        ataque: personajeGuardado.ataque,
        defensa: personajeGuardado.defensa || 0,
        imagen: imagenesPersonajes,
        dinero: personajeGuardado.dinero || 0
    };

    const enemigos = [
        { nombre: "La Niña", vida: 30, maxVida: 30, ataque: 5, defensa: 2, imagen: "imagenes/la_nina.png" },
        { nombre: "Guarda", vida: 50, maxVida: 50, ataque: 10, defensa: 5, imagen: "imagenes/guarda.png" },
        { nombre: "Manuba", vida: 70, maxVida: 70, ataque: 15, defensa: 8, imagen: "imagenes/manuba.png" },
        { nombre: "Guardia de Elite", vida: 150, maxVida: 150, ataque: 12, defensa: 10, imagen: "imagenes/guardia_elite.png" },
        { nombre: "Guarda sin Mandíbula", vida: 110, maxVida: 110, ataque: 20, defensa: 8, imagen: "imagenes/guarda_sin_mandibula.png" },
        { nombre: "Prisionero Negro", vida: 80, maxVida: 80, ataque: 20, defensa: 5, imagen: "imagenes/prisionero_negro.png" },
        { nombre: "Hombre Lagarto", vida: 150, maxVida: 150, ataque: 25, defensa: 15, imagen: "imagenes/hombre_lagarto.png" },
        { nombre: "Estacada Nocturna", vida: 90, maxVida: 90, ataque: 25, defensa: 12, imagen: "imagenes/estacada_nocturna.png" },
        { nombre: "Ladrón de Cuerpos", vida: 100, maxVida: 100, ataque: 20, defensa: 10, imagen: "imagenes/ladron_de_cuerpos.png" },
        { nombre: "Señor de las Moscas", vida: 200, maxVida: 200, ataque: 15, defensa: 20, imagen: "imagenes/senor_de_las_moscas.png" },
        { nombre: "El Cuervo", vida: 250, maxVida: 250, ataque: 33, defensa: 25, imagen: "imagenes/el_cuervo.png" }
    ];

    const rondaActual = parseInt(localStorage.getItem('rondaActual')) || 0;
    let enemigo = enemigos[rondaActual];
    if (!enemigo) {
        alert("¡Has derrotado a todos los enemigos! Redirigiendo al lobby...");
        window.location.href = "Lobby.html";
        return;
    }

    const actualizarEstadisticas = () => {
        vidaJugadorBarra.style.width = `${(jugador.vida / jugador.maxVida) * 100}%`;
        vidaEnemigoBarra.style.width = `${(enemigo.vida / enemigo.maxVida) * 100}%`;
        vidaJugadorTexto.textContent = jugador.vida;
        vidaEnemigoTexto.textContent = enemigo.vida;
        imagenJugador.src = jugador.imagen;
        imagenEnemigo.src = enemigo.imagen;
    };

    const atacar = () => {
        enemigo.vida -= Math.max(jugador.ataque - enemigo.defensa, 1);
        if (enemigo.vida <= 0) {
            enemigo.vida = 0;
            alert(`¡Has derrotado a ${enemigo.nombre}!`);
            avanzarRonda();
            return;
        }

        jugador.vida -= Math.max(enemigo.ataque - jugador.defensa, 1);
        if (jugador.vida <= 0) {
            jugador.vida = 0;
            manejarDerrota();
            return;
        }

        actualizarEstadisticas();
    };

    const defender = () => {
        alert("Te has defendido. Recibes menos daño en el próximo ataque.");
        jugador.vida -= Math.max(enemigo.ataque - (jugador.defensa + 5), 0);
        if (jugador.vida <= 0) {
            jugador.vida = 0;
            manejarDerrota();
            return;
        }
        actualizarEstadisticas();
    };

    const huir = () => {
        alert("¡Has huido del combate!");
        window.location.href = "Lobby.html";
    };

    const subirNivel = () => {
        jugador.nivel += 1;
        jugador.maxVida += 10;
        jugador.vida = jugador.maxVida;
        jugador.ataque += 2;
        jugador.defensa += 1;
        jugador.velocidad += 1;
        alert(`¡Has subido al nivel ${jugador.nivel}! Tus estadísticas han mejorado.`);
    };

    const avanzarRonda = () => {
        const recompensa = 50;
        jugador.dinero += recompensa;
        jugador.experiencia += 100;

        if (jugador.experiencia >= jugador.nivel * 100) {
            jugador.experiencia = 0;
            subirNivel();
        }

        localStorage.setItem('personaje', JSON.stringify(jugador));
        alert(`¡Has ganado ${recompensa} monedas por derrotar a ${enemigo.nombre}!`);

        localStorage.setItem('rondaActual', rondaActual + 1);
        window.location.reload();
    };

    const manejarDerrota = () => {
        alert("¡Has sido derrotado! Redirigiendo a la pantalla principal...");
        localStorage.removeItem('personaje');
        localStorage.removeItem('rondaActual');
        localStorage.removeItem('inventario');
        localStorage.removeItem('armasCompradas');
        window.location.href = "Fear & Hunger.html";
    };

    const deshabilitarBotones = () => {
        botonAtacar.disabled = true;
        botonDefender.disabled = true;
        botonHuir.disabled = true;
    };

    botonAtacar.addEventListener('click', atacar);
    botonDefender.addEventListener('click', defender);
    botonHuir.addEventListener('click', huir);

    actualizarEstadisticas();
});