// Utente.js
export class Utente {
  /**
   * @param {number} id
   * @param {string} nome
   * @param {string} passwordHash
   */
  constructor(id, nome, passwordHash) {
    this.id = id;
    this.nome = nome;
    this.passwordHash = passwordHash;
  }
}