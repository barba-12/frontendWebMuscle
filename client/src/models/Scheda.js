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

  /**
   * 
   * controllare se giono è presente nella lista gioni del scheda altrimenti aggiungere
   * 
   */


  addEsercizio(esercizio) {
    //controllo se l'esercizio è gia presente all'interno della cheda se si allora verifico il giorno se è lo stesso giono do errore
    //altrimenti aggiungo il giono delle'esercizi passato come parametro a questo metodo all'esercizio trovato uguale

    this.esercizi.push(esercizio);
    if(!this.giorni.includes(esercizio.getGiorno())) this.giorni.push(esercizio.getGiorno());

    console.log(this.giorni);
    this.controllaGiorniVuoti();
    this.ordinaGiorni();
    /*if(this.getListaID().includes(esercizio.getIdEsercizio())){
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
    }*/
  }

  modificaEsercizio (idUnivoco, serie, ripetizioni, carico, tempoRecupero, giorno) {
    this.esercizi.forEach(es => {
      if(es.idUnivoco == idUnivoco) es.modifica(serie, ripetizioni, carico, tempoRecupero, giorno);
    });
    if(!this.giorni.includes(giorno)) this.giorni.push(giorno);

    this.controllaGiorniVuoti();
    this.ordinaGiorni();
  }

  controllaGiorniVuoti() {
    this.giorni = this.giorni.filter(g => this.getNumEsXGiorno(g) > 0);
    this.giorniAllenamento = this.giorni.length;
  }

  ordinaGiorni() {
    let listaGiorni = ["Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"];
    let giorniOrdinati = [];
    listaGiorni.forEach(g => {
      if(this.giorni.includes(g)) giorniOrdinati.push(g);
    });
    this.giorni = giorniOrdinati;
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
      if(es.giorno == giorno) numero++;
    });
    return numero;
  }

  getNumEsXGiornoDaCompletare (giorno) {
    let numero = 0;
    this.esercizi.forEach(es => {
      if(es.giorno == giorno && !es.completato) numero++;
    });
    return numero;
  }

  getEsXGiornoENonCompletato(giorno) {
    let listaEs = [];
    this.esercizi.forEach(es => {
      if(es.giorno == giorno && !es.completato) listaEs.push(es);
    });
    return listaEs;
  }

  resetCompletatoEs() {
    this.esercizi.forEach(esercizio => {
      esercizio.setCompletato(false);
    })
  }

  getEsByIdUnivoco(idUnivoco) {
    return this.esercizi.find(es => es.idUnivoco == idUnivoco);
  }

  eliminaEsercizio (idEsercizio) {
    this.esercizi = this.esercizi.filter(es => es.idUnivoco != idEsercizio);
    this.controllaGiorniVuoti();
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