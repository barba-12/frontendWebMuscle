export class Esercizio {
  /**
   * Crea un nuovo esercizio base.
   * 
   * @param {number} id - Identificativo univoco dell'esercizio
   * @param {string} nome - Nome dell'esercizio (es. "Squat")
   * @param {string} descrizione - Descrizione testuale dell'esecuzione
   * @param {string[]} muscoliAllenati - Elenco dei muscoli principali allenati
   * @param {string[]} attrezzatura - Lista dell'attrezzatura necessaria
   * @param {string} difficoltà - Livello di difficoltà (es. "facile", "media", "difficile")
   * @param {string[]} immaginiVideo - Lista di URL di immagini o video dimostrativi
   * @param {boolean} repOrTime - indicare se l'esercizio si basa sulle ripetizioni o sulla durata
   */
  constructor(id, nome, descrizione, muscoliAllenati, attrezzatura, difficoltà, immaginiVideo, repOrTime, isStreching) {
    this.id = id;
    this.nome = nome;
    this.descrizione = descrizione;
    this.muscoliAllenati = muscoliAllenati;
    this.attrezzatura = attrezzatura;
    this.difficoltà = difficoltà;
    this.immaginiVideo = immaginiVideo;
    this.repOrTime = repOrTime;
    this.isStreching = isStreching;
  }
}