import { Inventario } from './Inventario.js';

export class Personaje {
    constructor(nombre, nivel, vidaMaxima, ataque, defensa, velocidad, dinero) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.vidaMaxima = vidaMaxima;
        this.vida = this.vidaMaxima;
        this.ataque = ataque;
        this.defensa = defensa;
        this.velocidad = velocidad;
        this.dinero = dinero; 
        this.experiencia = 0;
        this.estado = "Normal";
        this.inventario = new Inventario(); 
        this.equipo = { arma: null}; 
    }

  
    ganarDinero(cantidad) {
        this.dinero += cantidad;
        console.log(`${this.nombre} ha ganado ${cantidad} monedas. Dinero actual: ${this.dinero}`);
        localStorage.setItem('personaje', JSON.stringify(this)); 
    }

  
    recibirDaño(cantidad) {
        let dañoRecibido = cantidad - this.defensa;
        dañoRecibido = dañoRecibido > 0 ? dañoRecibido : 1; 
        this.vida -= dañoRecibido;

        if (this.vida <= 0) {
            this.vida = 0;
            console.log(`${this.nombre} ha caído en la desesperación...`);
        } else {
            console.log(`${this.nombre} ha recibido ${dañoRecibido} de daño. Vida restante: ${this.vida}/${this.vidaMaxima}`);
        }
    }


    atacar(enemigo) {
        let dañoBase = this.ataque;
        if (this.equipo.arma) {
            dañoBase += this.equipo.arma.poder; 
        }
        let dañoFinal = dañoBase - enemigo.defensa;
        dañoFinal = dañoFinal > 0 ? dañoFinal : 1;
        enemigo.recibirDaño(dañoFinal);
        console.log(`${this.nombre} ataca a ${enemigo.nombre} causando ${dañoFinal} de daño.`);
    }


    ganarExperiencia(cantidad) {
        this.experiencia += cantidad;
        console.log(`${this.nombre} ha ganado ${cantidad} puntos de experiencia.`);
        if (this.experiencia >= this.nivel * 10) {
            this.nivelar();
        }
    }


    nivelar() {
        this.nivel++;
        this.experiencia = 0;
        this.vidaMaxima += 15;
        this.vida = this.vidaMaxima;
        this.ataque += 4;
        this.defensa += 2;
        this.velocidad += 1;
        console.log(`${this.nombre} ha alcanzado el nivel ${this.nivel}. Se siente más poderoso.`);
    }


    equiparArma(arma) {
        this.equipo.arma = arma;
        console.log(`${this.nombre} ha equipado ${arma.nombre}, aumentando su ataque en ${arma.poder}.`);
    }

    static fromJSON(data) {
        const personaje = new Personaje(
            data.nombre,
            data.nivel,
            data.vidaMaxima,
            data.ataque,
            data.defensa,
            data.velocidad,
            data.dinero
        );
        personaje.vida = data.vida;
        personaje.experiencia = data.experiencia || 0;
        personaje.estado = data.estado || "Normal";
        personaje.inventario = new Inventario();
        personaje.inventario.objetos = data.inventario || [];
        personaje.equipo = data.equipo || { arma: null, armadura: null };
        return personaje;
    }
}