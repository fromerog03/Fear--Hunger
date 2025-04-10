import { Personaje } from './Personaje.js';

export class Tienda {
    constructor() {
        const armasGuardadas = JSON.parse(localStorage.getItem('armasDisponibles'));
        this.armasDisponibles = [
            { nombre: "Hoz", poder: 10, tipo: "Hoz", costo: 100, imagen: "imagenes/hoz.png", comprado: false },
            { nombre: "Tubería oxidada", poder: 7, tipo: "Tubería", costo: 70, imagen: "imagenes/tuberia.png", comprado: false },
            { nombre: "Picadora de carne", poder: 20, tipo: "Sierra", costo: 200, imagen: "imagenes/picadora.png", comprado: false },
            { nombre: "Mazo de carne", poder: 22, tipo: "Mazo de carne", costo: 220, imagen: "imagenes/mazo.png", comprado: false },
            { nombre: "Rastrillo del segador", poder: 25, tipo: "Rastrillo del segador", costo: 250, imagen: "imagenes/rastrillo.png", comprado: false },
            { nombre: "Linterna cabeza de Guerrero", poder: 30, tipo: "Linterna cabeza de Guerrero", costo: 300, imagen: "imagenes/linterna.png", comprado: false },
            { nombre: "Espada de sangre", poder: 30, tipo: "Espada de sangre", costo: 300, imagen: "imagenes/espada_sangre.png", comprado: false }
        ];
    }
}
