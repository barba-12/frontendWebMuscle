import context from "react-bootstrap/esm/AccordionContext";

export class EsercizioDoppione {
  constructor(idUnivoco, idEsercizio, giorno, completato = false, comment) {
    this.idUnivoco = idUnivoco;
    this.idEsercizio = idEsercizio;
    this.giorno = giorno;
    this.completato = completato;
    this.comment = comment;
  }

  getGiornoNum () {
    let listaGiorni = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"];
    for(let i=0; i<listaGiorni.length; i++){
      if(this.giorno == listaGiorni[i]) return i;
    }
  }

  /*
    getter e setter
  */
 
  getComment () {
    return this.comment;
  }

  setComment (comment) {
    this.comment = comment;
  }

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
}