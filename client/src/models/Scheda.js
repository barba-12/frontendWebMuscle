// Scheda.js
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
    // trasformo i dati raw in istanze di Giorno
    this.giorni = giorni.map(g => new Giorno(g.nomeGiorno, g.esercizi));
  }
}