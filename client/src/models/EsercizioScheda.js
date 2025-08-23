export class EsercizioScheda {
  constructor(idUnivoco, idEsercizio, giorno, ripetizioni = [], serie = [], tempoRecupero = [], carico = [], completato = false) {
    this.idUnivoco = idUnivoco;
    this.idEsercizio = idEsercizio;
    this.giorno = giorno;
    this.ripetizioni = Array.isArray(ripetizioni) ? [...ripetizioni] : [ripetizioni];
    this.serie = Array.isArray(serie) ? [...serie] : [serie];
    this.tempoRecupero = Array.isArray(tempoRecupero) ? [...tempoRecupero] : [tempoRecupero];
    this.carico = Array.isArray(carico) ? [...carico] : [carico];
    this.completato = completato;
  }
  
  /*
    metodi add
  */

  addRipetizione(ripetizione) {
    if (Array.isArray(ripetizione)) {
      this.ripetizioni.push(...ripetizione); // aggiungi tutti gli elementi
    } else {
      this.ripetizioni.push(ripetizione);    // aggiungi un singolo numero
    }
  }

  addTempoRecupero(tempoRecupero) {
    if (Array.isArray(tempoRecupero)) {
      this.tempoRecupero.push(...tempoRecupero); // aggiunge tutti i valori
    } else {
      this.tempoRecupero.push(tempoRecupero);    // aggiunge un singolo valore
    }
  }

  addCarico(carico) {
    if (Array.isArray(carico)) {
      this.carico.push(...carico); // aggiunge tutti i valori
    } else {
      this.carico.push(carico);    // aggiunge un singolo valore
    }
  }

  addSerie(serie) {
    this.serie.push(serie);
  }

  /*
    getter e setter
  */

  setIdUnivoco(idUnivoco) {
    this.idUnivoco = idUnivoco;
  }

  getIdUnivoco(){
    return this.idUnivoco;
  }

  isCompletato() {
    return this.completato;
  }

  setCompletato(completato) {
    this.completato = completato;
  }

  setGiorno(giorno) {
    this.giorno = giorno;
  }

  getGiorno() {
    return this.giorno;
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