export class Enemigo {
    constructor(nombre, nivel, vida, ataque) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.vida = vida;
        this.ataque = ataque;
        this.defensa = 3 + (nivel);
    }

    recibirDaño(cantidad) {
        this.vida -= cantidad;
        if (this.vida <= 0) {
            console.log(`${this.nombre} ha sido derrotado.`);
        } else {
            console.log(`${this.nombre} tiene ${this.vida} de vida restante.`);
        }
    }

    atacar(objetivo) {
        let dañoFinal = this.ataque - objetivo.defensa;
        dañoFinal = dañoFinal > 0 ? dañoFinal : 1;
        objetivo.recibirDaño(dañoFinal);
        console.log(`${this.nombre} ataca a ${objetivo.nombre} causando ${dañoFinal} de daño.`);
    }
}


