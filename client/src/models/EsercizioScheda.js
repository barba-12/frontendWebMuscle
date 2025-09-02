import context from "react-bootstrap/esm/AccordionContext";

export class EsercizioScheda {
  constructor(idEsercizio, ripetizioni = [], serie = [], tempoRecupero = [], carico = []) {
    this.idEsercizio = idEsercizio;
    this.ripetizioni = Array.isArray(ripetizioni) ? [...ripetizioni] : [ripetizioni];
    this.serie = Array.isArray(serie) ? [...serie] : [serie];
    this.tempoRecupero = Array.isArray(tempoRecupero) ? [...tempoRecupero] : [tempoRecupero];
    this.carico = Array.isArray(carico) ? [...carico] : [carico];
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

  getLastRep () {
    let lista = [];
    let contatore = this.ripetizioni.length <= this.serie[0] ? this.ripetizioni.length : this.serie[0];
    for(let i=contatore; i>=1; i--) lista.push(this.ripetizioni[this.ripetizioni.length-i])
    return lista;
  }

  getLastCarico () {
    let lista = [];
    let contatore = this.carico.length <= this.serie[0] ? this.carico.length : this.serie[0];
    for(let i=contatore; i>=1; i--) lista.push(this.carico[this.carico.length-i])
    return lista;
  } 

  getLastTempoRecupero () {
    let lista = [];
    let contatore = this.tempoRecupero.length <= this.serie[0] ? this.tempoRecupero.length : this.serie[0];
    for(let i=contatore; i>=1; i--) lista.push(this.tempoRecupero[this.tempoRecupero.length-i])
    return lista;
  } 

  getRepSpec (numero) {
    let lista = [];
    let contatore = this.ripetizioni.length <= numero ? this.ripetizioni.length : numero;
    for(let i=contatore; i>=1; i--) lista.push(this.ripetizioni[this.ripetizioni.length-i])
    return lista;
  }

  getCaricoSpec (numero) {
    let lista = [];
    let contatore = this.carico.length <= numero ? this.carico.length : numero;
    for(let i=contatore; i>=1; i--) lista.push(this.carico[this.carico.length-i])
    return lista;
  }

  getTempoRecSpec (numero) {
    let lista = [];
    let contatore = this.tempoRecupero.length <= numero ? this.tempoRecupero.length : numero;
    for(let i=contatore; i>=1; i--) lista.push(this.tempoRecupero[this.tempoRecupero.length-i])
    return lista;
  }

  modifica (serie, ripetizione, carico, tempoRecupero) {
    this.serie[0] = serie;
    this.ripetizioni[0] = ripetizione;
    this.carico[0] = carico;
    this.tempoRecupero[0] = tempoRecupero;
  }

  /*
    getter e setter
  */

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
}