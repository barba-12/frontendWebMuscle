import { Giorno } from './Giorno.js';

export class Scheda {
  /**
   * @param {Object} param0
   * @param {number} param0.id
   * @param {string} param0.tipologia
   * @param {number} param0.giorniAllenamento
   * @param {Array<{nomeGiorno: string, esercizi: Array<{esercizio: number, ripetizioni: number, serie: number, tempoRecupero: number, carico: number}>}>} param0.giorni
   */
  constructor({ id, tipologia, giorniAllenamento, giorni }) {
    this.id = id;
    this.tipologia = tipologia;
    this.giorniAllenamento = giorniAllenamento;
    this.giorni = giorni.map(g => new Giorno(g.nomeGiorno, g.esercizi));
  }

  // 🔹 Getter e Setter per id
  getId() {
    return this.id;
  }
  setId(value) {
    if (typeof value !== "number" || value <= 0) {
      throw new Error("L'id deve essere un numero positivo");
    }
    this.id = value;
  }

  // 🔹 Getter e Setter per tipologia
  getTipologia() {
    return this.tipologia;
  }
  setTipologia(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error("La tipologia deve essere una stringa non vuota");
    }
    this.tipologia = value;
  }

  // 🔹 Getter e Setter per giorniAllenamento
  getGiorniAllenamento() {
    return this.giorniAllenamento;
  }
  setGiorniAllenamento(value) {
    if (typeof value !== "number" || value <= 0) {
      throw new Error("I giorni di allenamento devono essere > 0");
    }
    this.giorniAllenamento = value;
  }

  // 🔹 Getter e Setter per giorni
  getGiorni() {
    return this.giorni;
  }
  setGiorni(value) {
    if (!Array.isArray(value) || !value.every(g => g instanceof Giorno)) {
      throw new Error("I giorni devono essere un array di istanze Giorno");
    }
    this.giorni = value;
    this.giorniAllenamento = value.length; // manteniamo coerente
  }

  // 🔹 Metodo per aggiungere un giorno
  aggiungiGiorno(giorno) {
    if (!(giorno instanceof Giorno)) {
      throw new Error("Il parametro deve essere un'istanza di Giorno");
    }
    this.giorni.push(giorno);
    this.giorniAllenamento = this.giorni.length; // aggiornamento automatico
  }

  // 🔹 Per IndexedDB (serializzazione)
  toJSON() {
    return {
      id: this.id,
      tipologia: this.tipologia,
      giorniAllenamento: this.giorniAllenamento,
      giorni: this.giorni.map(g => g.toJSON ? g.toJSON() : g)
    };
  }
}