export class EsercizioScheda {
  constructor(idEsercizio, ripetizioni, serie, tempoRecupero, carico, giorno, completato) {
    this.idEsercizio = idEsercizio;
    this.giorni = [];
    this.ripetizioni = [];
    this.serie = [];
    this.tempoRecupero = [];
    this.carico = [];
    this.completato = completato;
    this.giorni.push(giorno);
    this.ripetizioni.push(ripetizioni);
    this.serie.push(serie);
    this.tempoRecupero.push(tempoRecupero);
    this.carico.push(carico);
  }

  /**
 * 
 *  
 * 
 * 
 *  ESERCIZIO CON UN SOLO GIORNO, LO STESSO ESERCIZIO PUO ESSERE ALL'INTERNO DELLA STESSA SCHEDA SE IL GIORNO è DIVERSO
 * 
 * 
 * 
 * 
 */
  
  /*
    metodi add
  */

  addRipetizione(ripetizione) {
    this.ripetizioni.push(ripetizione);
  }

  addSerie(serie) {
    this.serie.push(serie);
  }

  addTempoRecupero(tempoRecupero) {
    this.tempoRecupero.push(tempoRecupero);
  }

  addCarico(carico) {
    this.carico.push(carico);
  }

  addGiorno(giorno) {
    if(!this.giorni.includes(giorno)) this.giorni.push(giorno);
  }

  /*
    getter e setter
  */

  isCompletato() {
    return this.completato;
  }

  setCompletato(completato) {
    this.completato = completato;
  }

  getGiorni() {
    return this.giorni;
  }

  getIdEsercizio() {
    return this.idEsercizio;
  }
  setIdEsercizio(value) {
    if (typeof value !== "number" || value <= 0) {
      throw new Error("idEsercizio deve essere un numero positivo");
    }
    this.idEsercizio = value;
  }

  getRipetizioni() {
    return this.ripetizioni;
  }
  setRipetizioni(value) {
    if (value <= 0) throw new Error("Le ripetizioni devono essere > 0");
    this.ripetizioni = value;
  }

  getSerie() {
    return this.serie;
  }
  setSerie(value) {
    if (value <= 0) throw new Error("Le serie devono essere > 0");
    this.serie = value;
  }

  getTempoRecupero() {
    return this.tempoRecupero;
  }
  setTempoRecupero(value) {
    if (value < 0) throw new Error("Il tempo di recupero non può essere negativo");
    this.tempoRecupero = value;
  }

  getCarico() {
    return this.carico;
  }
  setCarico(value) {
    if (value < 0) throw new Error("Il carico non può essere negativo");
    this.carico = value;
  }

  toJSON() {
    return {
      idEsercizio: this.idEsercizio,
      ripetizioni: this.ripetizioni,
      serie: this.serie,
      tempoRecupero: this.tempoRecupero,
      carico: this.carico,
    };
  }
}