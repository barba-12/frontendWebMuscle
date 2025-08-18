export class EsercizioScheda {
  constructor(idEsercizio, ripetizioni, serie, tempoRecupero, carico) {
    this.idEsercizio = idEsercizio;
    this.ripetizioni = ripetizioni;
    this.serie = serie;
    this.tempoRecupero = tempoRecupero;
    this.carico = carico;
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