/**
 * 
 *   se c'è lo stesso esericio ripetuto durante la settimana:
 *   modificare stuttura classi. rimuovere classe giorno
 *   mettere attributo giorni in esercizio del tipo --> giorni = ["lunedi", "mercoledi"]
 *   quando aggiungo un esercizio devo verificare se è gia presente nella cheda e verificare che il giono non sia uno di quelli gia inseriti nell'attributo dell'esercizio
 *   qunado cerco esercizio, cerco in tutta la scheda e modifico l'esercizi in modo "globale" per tutti i giorni della settimana
 *   es. lunedi: carico = 2     ,    mercoledi: carico = 3       lista carico deve essere: [2, 3] delle'esercizio
 * 
 */

export class Scheda {
  /**
   * @param {Object} param0
   * @param {number} param0.id
   * @param {string} param0.tipologia
   * @param {number} param0.giorniAllenamento
   * @param {Array<{nomeGiorno: string, esercizi: Array<{esercizio: number, ripetizioni: number, serie: number, tempoRecupero: number, carico: number}>}>} param0.giorni
   */
  constructor({ id, tipologia, giorniAllenamento}) {
    this.id = id;
    this.tipologia = tipologia;
    this.giorniAllenamento = giorniAllenamento;
    this.esercizi = [];
    this.giorni = [];
  }

  addEsercizio(esercizio) {
    //controllo se l'esercizio è gia presente all'interno della cheda se si allora verifico il giorno se è lo stesso giono do errore
    //altrimenti aggiungo il giono delle'esercizi passato come parametro a questo metodo all'esercizio trovato uguale

    if(this.getListaID().includes(esercizio.getIdEsercizio())){
      for (let i=0; i<this.esercizi.length; i++){
        let giorni = this.esercizi[i].getGiorni();
        let id = this.esercizi[i].getIdEsercizio();

        if(id == esercizio.getIdEsercizio()){
         if(!giorni.includes(esercizio.getGiorni()[0])) {
            if(!this.giorni.includes(esercizio.getGiorni()[0])) this.giorni.push(esercizio.getGiorni()[0]);
            this.esercizi[i].addGiorno(esercizio.getGiorni()[0]);
         }
        }
      }
    }
    else {
      this.esercizi.push(esercizio);
      if(!this.giorni.includes(esercizio.getGiorni()[0])) this.giorni.push(esercizio.getGiorni()[0]);
    }
  }

  getListaID() {
    let lista = []

    this.esercizi.forEach(es => {
      lista.push(es.getIdEsercizio());
    });

    return lista;
  }

  getNumEsXGiorno(giorno){
    let numero = 0;
    this.esercizi.forEach(es => {
      es.giorni.forEach(giornoEs => {
        if(giornoEs == giorno) numero++;        
      });
    });
    return numero;
  }

  // 🔹 Getter e Setter per id

  getGiorni(){
    return this.giorni;
  }

  setGiorni(giorni) {
    this.giorni = giorni;
  }

  setEsercizi(esercizi){
    this.esercizi = esercizi;
  }

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

  // 🔹 Per IndexedDB (serializzazione)
  toJSON() {
    return {
      id: this.id,
      tipologia: this.tipologia,
      giorniAllenamento: this.giorniAllenamento,
    };
  }
}