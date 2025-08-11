// EsercizioScheda.js
import { Esercizio } from './Esercizio.js';

export class EsercizioScheda extends Esercizio {
  /**
   * @param {number} id
   * @param {string} nome
   * @param {string} descrizione
   * @param {string[]} muscoliAllenati
   * @param {string[]} attrezzatura
   * @param {string} difficoltà
   * @param {string[]} immaginiVideo
   * @param {number} ripetizioni
   * @param {number} serie
   * @param {number} tempoRecupero
   * @param {number} carico
   */
  constructor(id, nome, descrizione, muscoliAllenati, attrezzatura, difficoltà, immaginiVideo, ripetizioni, serie, tempoRecupero, carico) {
    super(id, nome, descrizione, muscoliAllenati, attrezzatura, difficoltà, immaginiVideo);
    this.ripetizioni = ripetizioni;
    this.serie = serie;
    this.tempoRecupero = tempoRecupero;
    this.carico = carico;
  }
}