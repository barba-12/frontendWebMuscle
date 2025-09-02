import { Esercizio } from "../models/Esercizio"; // cambia percorso in base alla tua struttura

import squatBilancereFront from '../assets/videoEsercizi/squatBilancere/male-Barbell-barbell-squat-front.mp4';
import squatBilancereSide from '../assets/videoEsercizi/squatBilancere/male-Barbell-barbell-squat-side.mp4';
import squatBilancereActivationMuscle from '../assets/videoEsercizi/squatBilancere/squatBilancereMuscoliAttivati.png';

import pancaPianaFront from '../assets/videoEsercizi/pancaPiana/male-barbell-bench-press-front.mp4';
import pancaPianaSide from '../assets/videoEsercizi/pancaPiana/male-barbell-bench-press-side_KciuhbB.mp4';
import pancaPianaActivationMuscle from "../assets/videoEsercizi/pancaPiana/pancaPianaMuscoliAttivati.png";

import trazioneSbarraFront from "../assets/videoEsercizi/trazioniSbarra/male-bodyweight-chinup-front.mp4";
import trazioneSbarraSide from "../assets/videoEsercizi/trazioniSbarra/male-bodyweight-chinup-side.mp4";
import trazioneSbarraActivationMuscle from "../assets/videoEsercizi/trazioniSbarra/trazioniSbarraMuscoliAttivati.png";

import affondiFront from "../assets/videoEsercizi/affondi/male-Bodyweight-forward-lunges-front.mp4";
import affondiSide from "../assets/videoEsercizi/affondi/male-Bodyweight-forward-lunges-side.mp4";
import affondiActivationMuscle from "../assets/videoEsercizi/affondi/affondiMuscoliAttivati.png";

import plankSide from "../assets/videoEsercizi/plank/male-bodyweight-forearm-plank-side.mp4";
import plankActivationMuscle from "../assets/videoEsercizi/plank/plankMuscoliAttivati.png";

const exerciseData = [
  new Esercizio(
    1,
    "Squat",
    "Esercizio multiarticolare per lo sviluppo della forza e della massa muscolare delle gambe e dei glutei.",
    ["Quadricipiti", "Glutei", "Adduttori"],
    ["Bilanciere", "Rack"],
    "Media",
    [squatBilancereFront, squatBilancereSide, squatBilancereActivationMuscle],
    false,
    false
  ),
  new Esercizio(
    2,
    "Panca Piana",
    "Esercizio fondamentale per il potenziamento del petto, tricipiti e deltoidi anteriori.",
    ["Pettorali", "Tricipiti", "Deltoidi Anteriori"],
    ["Panca", "Bilanciere"],
    "Media",
    [pancaPianaFront, pancaPianaSide, pancaPianaActivationMuscle],
    false,
    false
  ),
  new Esercizio(
    3,
    "Trazioni alla Sbarra",
    "Esercizio a corpo libero per sviluppare la muscolatura della schiena e delle braccia.",
    ["Dorsali", "Bicipiti", "Trapezio"],
    ["Sbarra per trazioni"],
    "Difficile",
    [trazioneSbarraFront, trazioneSbarraSide, trazioneSbarraActivationMuscle],
    false,
    false
  ),
  new Esercizio(
    4,
    "Affondi",
    "Fai un passo in avanti con una gamba§Abbassa il corpo fino a quando il ginocchio posteriore sfiora quasi il suolo§Assicurati di rimanere in posizione eretta e che il ginocchio anteriore rimanga sopra il piede anteriore§Spingi dal pavimento con il piede anteriore fino a tornare alla posizione iniziale. Cambia gamba| Come Fare la Camminata in Avanti con Affondo Preparazione Inizia con i piedi alla larghezza delle spalle e le dita dei piedi rivolte in avanti. Utilizza l'indicazione torace superman durante l'intero set. Cioè, immagina di avere il logo di Superman sul tuo petto e mostra quel logo per tutta la durata del set. Questo ti aiuterà a mantenere l'alto il petto e le scapole retratte. Inoltre, questa indicazione ti aiuterà a mantenere il busto verticale. Esecuzione Inizia la prima ripetizione facendo un passo avanti. Dovresti regolare la lunghezza del tuo passo a seconda del muscolo che vuoi lavorare di più. Usa un passo più corto se vuoi coinvolgere maggiormente i quadricipiti. La lunghezza del passo più corta aumenterà l'escursione del movimento delle tue ginocchia. Se vuoi lavorare un po' più glutei, fai un passo più lungo. Un passo più lungo aumenterà l'escursione del movimento dei fianchi. Puoi lasciare le braccia ai lati del corpo, mettere le mani sui fianchi (come puoi vedere nel nostro video dimostrativo) o puoi mettere le mani a preghiera. Lascia che il ginocchio dietro tocchi leggermente il pavimento. Spingi in maniera esplosiva con il tallone davanti per tornare alla posizione di partenza. Puoi fare tutte le ripetizioni da un singolo lato o alternarle. Man mano che ti stanchi, fai attenzione a non lasciare che il tuo petto cominci a cadere in avanti, o che la tua colonna lombare si incurvi. Se l'affondo in avanti è troppo difficile, prova l'affondo indietro. È una variante più semplice.",
    ["Quadricipiti", "Glutei", "Femorali"],
    ["Nessuna attrezzatura richiesta", "Manubri (opzionale)"],
    "Facile",
    [affondiFront, affondiSide, affondiActivationMuscle],
    false,
    false
  ),
  new Esercizio(
    5,
    "Plank",
    "Esercizio isometrico per il rinforzo del core e della postura.",
    ["Addominali", "Lombari", "Spalle"],
    ["Nessuna attrezzatura richiesta"],
    "Facile",
    [plankSide, plankActivationMuscle],
    true,
    true
  )
];

export default exerciseData;