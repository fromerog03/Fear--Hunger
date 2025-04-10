export class Inventario {
    constructor() {
        this.objetos = [];
    }

    cargarDesdeLocalStorage() {
        const datos = JSON.parse(localStorage.getItem('inventario')) || [];
        if (Array.isArray(datos)) {
            this.objetos = datos;
        } else {
            this.objetos = []; 
        }
    }
  
    guardarEnLocalStorage() {
        localStorage.setItem('inventario', JSON.stringify(this.objetos));
    }

    
    agregarObjeto(objeto) {
        const existe = this.objetos.some(o => o.nombre === objeto.nombre);
        if (!existe) {
            this.objetos.push(objeto);
            this.guardarEnLocalStorage();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const listaInventario = document.getElementById('lista-inventario');

   
    if (!listaInventario) {
        return;
    }

    const inventario = new Inventario();
    inventario.cargarDesdeLocalStorage();

 
    const mostrarInventarioEnHTML = () => {
        listaInventario.innerHTML = ""; 
    
        if (inventario.objetos.length === 0) {
            const mensajeVacio = document.createElement('p');
            mensajeVacio.textContent = "Tu inventario está vacío.";
            mensajeVacio.classList.add('mensaje-vacio');
            listaInventario.appendChild(mensajeVacio);
        } else {
            const personaje = JSON.parse(localStorage.getItem('personaje')) || {};
            const armaEquipada = personaje.equipo?.arma;
    
            inventario.objetos.forEach((objeto, index) => {
                const divObjeto = document.createElement('div');
                divObjeto.classList.add('objeto');
    
              
                if (armaEquipada && armaEquipada.nombre === objeto.nombre) {
                    divObjeto.classList.add('equipado');
                }
    
                divObjeto.innerHTML = `
                    <img src="${objeto.imagen}" alt="${objeto.nombre}" class="imagen-objeto">
                    <h2>${objeto.nombre}</h2>
                    <p><strong>Tipo:</strong> ${objeto.tipo}</p>
                    <p><strong>Descripción:</strong> ${objeto.descripcion || "Sin descripción"}</p>
                    <p><strong>Poder:</strong> ${objeto.poder}</p>
                    <p><strong>Precio:</strong> ${objeto.costo} monedas</p>
                    <button id="equipar-${index}" class="boton-equipar">Equipar</button>
                `;
    
                listaInventario.appendChild(divObjeto);
    
                
                const botonEquipar = divObjeto.querySelector(`#equipar-${index}`);
                botonEquipar.addEventListener('click', () => {
                    equiparArma(objeto);
                });
            });
        }
    };

    const equiparArma = (arma) => {
        const personaje = JSON.parse(localStorage.getItem('personaje'));
        if (!personaje) {
            alert("No se encontró un personaje guardado.");
            return;
        }
    
        if (personaje.equipo && personaje.equipo.arma && personaje.equipo.arma.nombre === arma.nombre) {
            alert("Ya tienes este objeto equipado.");
            return;
        }
    
      
        personaje.equipo = personaje.equipo || {};
        personaje.equipo.arma = arma;
    
      
        if (!personaje.baseAtaque) {
            personaje.baseAtaque = personaje.ataque || 0; 
        }
    
  
        personaje.ataque = personaje.baseAtaque + arma.poder;
    
    
        localStorage.setItem('personaje', JSON.stringify(personaje));
    
        alert(`Has equipado ${arma.nombre}. Tu ataque ha aumentado en ${arma.poder}.`);

        const botonesEquipar = document.querySelectorAll('.boton-equipar');
        botonesEquipar.forEach(boton => boton.classList.remove('equipado')); 
        const botonEquipar = document.querySelector(`#equipar-${inventario.objetos.findIndex(o => o.nombre === arma.nombre)}`);
        if (botonEquipar) {
            botonEquipar.classList.add('equipado'); 
        }
    
       
        const contenedoresObjetos = document.querySelectorAll('.objeto');
        contenedoresObjetos.forEach(contenedor => contenedor.classList.remove('equipado')); 
        const contenedorEquipado = botonEquipar.closest('.objeto');
        if (contenedorEquipado) {
            contenedorEquipado.classList.add('equipado'); 
        }
    };
  
    mostrarInventarioEnHTML();

    const botonLobby = document.getElementById('boton-lobby');
    if (botonLobby) {
        botonLobby.addEventListener('click', () => {
            window.location.href = "Lobby.html";
        });
    } else {
       
    }
   
});
