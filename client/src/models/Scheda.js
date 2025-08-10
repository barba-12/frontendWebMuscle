// Scheda.js
import { Giorno } from './Giorno.js';

export class Scheda {
  /**
   * @param {number} id
   * @param {string} tipologia
   * @param {number} giorniAllenamento (quanti giorni alla settimana)
   * @param {Giorno[]} giorni (lista di giorni con esercizi)
   */
  constructor(id, tipologia, giorniAllenamento, giorni = []) {
    this.id = id;
    this.tipologia = tipologia;
    this.giorniAllenamento = giorniAllenamento;
    this.giorni = giorni;
  }

  aggiungiGiorno(giorno) {
    this.giorni.push(giorno);
  }
}