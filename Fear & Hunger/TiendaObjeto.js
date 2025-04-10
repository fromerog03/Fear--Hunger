import { Tienda } from './Tienda.js';

document.addEventListener('DOMContentLoaded', () => {
    const vendedor = localStorage.getItem('vendedorSeleccionado');
    const tituloVendedor = document.getElementById('titulo-vendedor');
    const listaObjetos = document.getElementById('lista-objetos');
    const dineroDisplay = document.getElementById('dinero-jugador');

  
    const personajeJSON = localStorage.getItem('personaje');
    let personaje;
    if (personajeJSON) {
        personaje = JSON.parse(personajeJSON);
    } else {
        alert("No se encontró un personaje guardado. Redirigiendo a la selección de personajes...");
        window.location.href = "CrearPersonaje.html";
        return;
    }

  
    const actualizarDinero = () => {
        dineroDisplay.textContent = `Dinero: ${personaje.dinero} monedas`;
    };
    actualizarDinero();

  
    if (vendedor) {
        tituloVendedor.textContent = `Tienda de ${vendedor}`;
    } else {
        tituloVendedor.textContent = "Tienda";
    }

   
    const tienda = new Tienda();

   
    const armasCompradas = JSON.parse(localStorage.getItem('armasCompradas')) || [];

    
    const guardarEstadoArmas = () => {
        localStorage.setItem('armasCompradas', JSON.stringify(armasCompradas));
    };

   
    const guardarEnInventario = (arma) => {
        const inventario = JSON.parse(localStorage.getItem('inventario')) || [];
        inventario.push(arma);
        localStorage.setItem('inventario', JSON.stringify(inventario));
    };

  
    const comprarArma = (indice) => {
        const arma = tienda.armasDisponibles[indice];

       
        if (personaje.dinero >= arma.costo) {
            personaje.dinero -= arma.costo;

            if (vendedor === "Isayah") {
                const estafa = {
                    nombre: "Basura de Isayah",
                    tipo: "Basura",
                    poder: 0,
                    costo: 0,
                    descripcion: "Un regalo de Isayah. No sirve para nada.",
                    imagen: "imagenes/Basura.png"
                };
                guardarEnInventario(estafa); 
                alert("¡Isayah te ha estafado! Has recibido Basura de Isayah.");
            } else {
                guardarEnInventario(arma);
                armasCompradas.push(arma.nombre);
                guardarEstadoArmas();
                alert(`Has comprado ${arma.nombre} por ${arma.costo} monedas.`);
            }

          
            localStorage.setItem('personaje', JSON.stringify(personaje)); 

           
            actualizarDinero();
        } else {
            alert("Dinero insuficiente.");
        }
    };

  
    tienda.armasDisponibles.forEach((arma, index) => {
        const divObjeto = document.createElement('div');
        divObjeto.classList.add('objeto');

        const botonComprar = `<button id="boton-${index}">Comprar</button>`;

        divObjeto.innerHTML = `
            <img src="${arma.imagen}" alt="${arma.nombre}">
            <h2>${arma.nombre}</h2>
            <p class="tipo">${arma.tipo}</p>
            <p><strong>Poder:</strong> ${arma.poder}</p>
            <p><strong>Precio:</strong> ${arma.costo} monedas</p>
            ${botonComprar}
        `;

        listaObjetos.appendChild(divObjeto);

      
        const boton = document.getElementById(`boton-${index}`);
        boton.addEventListener('click', () => {
            comprarArma(index);
        });
    });

   
    const botonLobby = document.getElementById('boton-lobby');
    if (botonLobby) {
        botonLobby.addEventListener('click', () => {
            window.location.href = "Lobby.html";
        });
    }

   
    const resetearTienda = () => {
        localStorage.removeItem('armasCompradas'); 
        localStorage.removeItem('inventario'); 
        console.log("La tienda y el inventario han sido reseteados.");
    };


    const botonNuevaPartida = document.getElementById('boton-nueva-partida');
    if (botonNuevaPartida) {
        botonNuevaPartida.addEventListener('click', () => {
            resetearTienda(); 
            localStorage.removeItem('personaje'); 
            localStorage.removeItem('rondaActual'); 
            window.location.href = "CrearPersonaje.html"; 
        });
    }
});