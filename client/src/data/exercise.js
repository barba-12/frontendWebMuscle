import squatFront from '../assets/videoEsercizi/squatBilancere/male-Barbell-barbell-squat-front.mp4';
import squatSide from '../assets/videoEsercizi/squatBilancere/male-Barbell-barbell-squat-side.mp4';

import pancaPianaFront from '../assets/videoEsercizi/pancaPiana/male-barbell-bench-press-front.mp4';
import pancaPianaSide from '../assets/videoEsercizi/pancaPiana/male-barbell-bench-press-side_KciuhbB.mp4';

import trazioneSbarraFront from "../assets/videoEsercizi/trazioniSbarra/male-bodyweight-chinup-front.mp4";
import trazioneSbarraSide from "../assets/videoEsercizi/trazioniSbarra/male-bodyweight-chinup-side.mp4";

import affondiFront from "../assets/videoEsercizi/affondi/male-Bodyweight-forward-lunges-front.mp4";
import affondiSide from "../assets/videoEsercizi/affondi/male-Bodyweight-forward-lunges-side.mp4";

import plankSide from "../assets/videoEsercizi/plank/male-bodyweight-forearm-plank-side.mp4";

const exerciseData = [
  {
    id: 1,
    nome: "Squat",
    descrizione: "Esercizio multiarticolare per lo sviluppo della forza e della massa muscolare delle gambe e dei glutei.",
    muscoliAllenati: ["Quadricipiti", "Glutei", "Adduttori"],
    attrezzatura: ["Bilanciere", "Rack"],
    difficoltà: "Media",
    immaginiVideo: [squatFront, squatSide]
  },
  {
    id: 2,
    nome: "Panca Piana",
    descrizione: "Esercizio fondamentale per il potenziamento del petto, tricipiti e deltoidi anteriori.",
    muscoliAllenati: ["Pettorali", "Tricipiti", "Deltoidi Anteriori"],
    attrezzatura: ["Panca", "Bilanciere"],
    difficoltà: "Media",
    immaginiVideo: [pancaPianaFront, pancaPianaSide]
  },
  {
    id: 3,
    nome: "Trazioni alla Sbarra",
    descrizione: "Esercizio a corpo libero per sviluppare la muscolatura della schiena e delle braccia.",
    muscoliAllenati: ["Dorsali", "Bicipiti", "Trapezio"],
    attrezzatura: ["Sbarra per trazioni"],
    difficoltà: "Difficile",
    immaginiVideo: [trazioneSbarraFront, trazioneSbarraSide]
  },
  {
    id: 4,
    nome: "Affondi",
    descrizione: "Esercizio per gambe e glutei, ottimo per migliorare equilibrio e stabilità.",
    muscoliAllenati: ["Quadricipiti", "Glutei", "Femorali"],
    attrezzatura: ["Manubri (opzionale)"],
    difficoltà: "Facile",
    immaginiVideo: [affondiFront, affondiSide]
  },
  {
    id: 5,
    nome: "Plank",
    descrizione: "Esercizio isometrico per il rinforzo del core e della postura.",
    muscoliAllenati: ["Addominali", "Lombari", "Spalle"],
    attrezzatura: [],
    difficoltà: "Facile",
    immaginiVideo: [plankSide]
  }
];

export default exerciseData;