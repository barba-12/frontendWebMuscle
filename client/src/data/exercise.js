import { Esercizio } from "../models/Esercizio"; // cambia percorso in base alla tua struttura

//C:\Users\riki\Desktop\programmazione\progettoPalestra\frontendWebMuscle\client\src\assets\videoEsercizi

import staccoRumenoFront from "../assets/videoEsercizi/staccoRumeno/male-Barbell-barbell-romanian-deadlift-front.mp4";
import staccoRumenoSide from "../assets/videoEsercizi/staccoRumeno/male-Barbell-barbell-romanian-deadlift-side_dnNh5UH.mp4";
import staccoRumenoActivationMuscle from "../assets/videoEsercizi/staccoRumeno/staccoRumenoMuscoliAttivati.png";

import legPressFront from "../assets/videoEsercizi/legPress/male-machine-leg-press-front.mp4";
import legPressSide from "../assets/videoEsercizi/legPress/male-machine-leg-press-side.mp4";
import legPressActivationMuscle from "../assets/videoEsercizi/legPress/legPressMuscoliAttivati.png";

import affondiBulgariFront from "../assets/videoEsercizi/affondiBulgari/male-Dumbbells-dumbbell-bulgarian-split-squat-front.mp4";
import affondiBulgariSide from "../assets/videoEsercizi/affondiBulgari/male-Dumbbells-dumbbell-bulgarian-split-squat-side.mp4";
import affondiBulgariActivationMuscle from "../assets/videoEsercizi/affondiBulgari/affondoBulgaroManubriMuscoliAttivati.png";

import slancioCavoPostFront from "../assets/videoEsercizi/slanciPostCavo/male-Cables-cable-glute-kickback-front.mp4";
import slancioCavoPostSide from "../assets/videoEsercizi/slanciPostCavo/male-Cables-cable-glute-kickback-side.mp4";
import slancioCavoPostActivationMuscle from "../assets/videoEsercizi/slanciPostCavo/slancioCavoPostMuscoliAttivati.png";

import latMachineFront from "../assets/videoEsercizi/latMachine/male-machine-pulldown-front.mp4";
import latMachineSide from "../assets/videoEsercizi/latMachine/male-machine-pulldown-side.mp4";
import latMachineActivationMuscle from "../assets/videoEsercizi/latMachine/latMachineMuscoliAttivati.png";

import latMachineStrettaFront from "../assets/videoEsercizi/latMachineStrettaInversa/male-Machine-narrow-pulldown-front.mp4";
import latMachineStrettaSide from "../assets/videoEsercizi/latMachineStrettaInversa/male-Machine-narrow-pulldown-side.mp4";
import latMachineStrettaActivationMuscle from "../assets/videoEsercizi/latMachineStrettaInversa/latMachinePresaStrettaMuscoliAttivati.png";

import pulleyFront from "../assets/videoEsercizi/pulley/male-machine-seated-cable-row-front.mp4";
import pulleySide from "../assets/videoEsercizi/pulley/male-machine-seated-cable-row-side.mp4";
import pulleyActivationMuscle from "../assets/videoEsercizi/pulley/pulleyMuscoliAttivati.png";

import lowRowFront from "../assets/videoEsercizi/lowRowMach/male-Machine-machine-plate-loaded-low-row-front.mp4";
import lowRowSide from "../assets/videoEsercizi/lowRowMach/male-Machine-machine-plate-loaded-low-row-side.mp4";
import lowRowActivationMuscle from "../assets/videoEsercizi/lowRowMach/lowRowMuscoliAttivati.png";

import rowFront from "../assets/videoEsercizi/rowMach/male-Machine-machine-neutral-row-front.mp4";
import rowSide from "../assets/videoEsercizi/rowMach/male-Machine-machine-neutral-row-side.mp4";
import rowActivationMuscle from "../assets/videoEsercizi/rowMach/rowMuscoliAttivati.png";

import tricipitiCavoFront from "../assets/videoEsercizi/tricipitiCavo/male-Cables-cable-push-down-front.mp4";
import tricipitiCavoSide from "../assets/videoEsercizi/tricipitiCavo/male-Cables-cable-push-down-side.mp4";
import tricipitiCavoActivationMuscle from "../assets/videoEsercizi/tricipitiCavo/tricipitiCavoMuscoliAttivati.png";

import squatFront from "../assets/videoEsercizi/squat/male-Barbell-barbell-squat-front.mp4";
import squatSide from "../assets/videoEsercizi/squat/male-Barbell-barbell-squat-side.mp4";
import squatActivationMuscle from "../assets/videoEsercizi/squat/squatMuscoliAttivati.png";

import pressaMonopodalicaFront from "../assets/videoEsercizi/pressaMonopodalica/male-Machine-machine-single-leg-leg-press-front.mp4";
import pressaMonopodalicaSide from "../assets/videoEsercizi/pressaMonopodalica/male-Machine-machine-single-leg-leg-press-side.mp4";
import pressaMonopodalicaActivationMuscle from "../assets/videoEsercizi/pressaMonopodalica/pressaMonopodalicaMuscoliAttivati.png";

import legCurlFront from "../assets/videoEsercizi/legCurl/male-Machine-machine-seated-leg-curl-front.mp4";
import legCurlSide from "../assets/videoEsercizi/legCurl/male-Machine-machine-seated-leg-curl-side.mp4";
import legCurlActivationMuscle from "../assets/videoEsercizi/legCurl/legCurlMuscoliAttivati.png";

import abduzioniCavoFront from "../assets/videoEsercizi/abduzioniCavo/male-Cables-cable-hip-abduction-front.mp4";
import abduzioniCavoSide from "../assets/videoEsercizi/abduzioniCavo/male-Cables-cable-hip-abduction-side.mp4";
import abduzioniCavoActivationMuscle from "../assets/videoEsercizi/abduzioniCavo/abduzioniCavoMuscoliAttivati.png";

import frenchPressActivationMuscle from "../assets/videoEsercizi/frenchPressB/frenchPressMuscoliAllenati.png";

import frenchPressMFront from "../assets/videoEsercizi/frenchPressM/male-dumbbell-skullcrusher-front_hgKANkM.mp4";
import frenchPressMSide from "../assets/videoEsercizi/frenchPressM/male-dumbbell-skullcrusher-side_bgn7Uzz.mp4";

import frenchPressBFront from "../assets/videoEsercizi/frenchPressB/male-barbell-laying-tricep-extensions-front.mp4";
import frenchPressBSide from "../assets/videoEsercizi/frenchPressB/male-barbell-laying-tricep-extensions-side.mp4";

import pecFlyFront from "../assets/videoEsercizi/pecFly/male-Machine-machine-bent-arm-pec-fly-front.mp4";
import pecFlySide from "../assets/videoEsercizi/pecFly/male-Machine-machine-bent-arm-pec-fly-side.mp4";
import pecFlyActivationMuscle from "../assets/videoEsercizi/pecFly/pecFlyMuscoliAttivati.png";

import lentoAvantiFront from "../assets/videoEsercizi/lentoAvanti/male-dumbbell-seated-overhead-press-front.mp4";
import lentoAvantiSide from "../assets/videoEsercizi/lentoAvanti/male-dumbbell-seated-overhead-press-side.mp4";
import lentoAvantiActivationMuscle from "../assets/videoEsercizi/lentoAvanti/lentoAvantiMuscoliAttivati.png";

import alzateLateraliFront from "../assets/videoEsercizi/alzateLaterali/male-Dumbbells-dumbbell-lateral-raise-front.mp4";
import alzateLateraliSide from "../assets/videoEsercizi/alzateLaterali/male-Dumbbells-dumbbell-lateral-raise-side.mp4";
import alzateLateraliActivationMuscle from "../assets/videoEsercizi/alzateLaterali/alzateLateraliMuscoliAttivati.png";

import alzateFrontaliFront from "../assets/videoEsercizi/alzateFrontali/male-Dumbbells-dumbbell-front-raise-front.mp4";
import alzateFrontaliSide from "../assets/videoEsercizi/alzateFrontali/male-Dumbbells-dumbbell-front-raise-side.mp4";

import curlFront from "../assets/videoEsercizi/curl/male-Dumbbells-dumbbell-curl-front.mp4";
import curlSide from "../assets/videoEsercizi/curl/male-Dumbbells-dumbbell-curl-side.mp4";
import curlActivationMuscle from "../assets/videoEsercizi/curl/curlMuscoliAttivati.png";

import hammerCurlFront from "../assets/videoEsercizi/bicipitiMartello/male-Dumbbells-dumbbell-hammer-curl-front.mp4";
import hammerCurlSide from "../assets/videoEsercizi/bicipitiMartello/male-Dumbbells-dumbbell-hammer-curl-side.mp4";
import hammerCurlActivationMuscle from "../assets/videoEsercizi/bicipitiMartello/hammerCurlMuscoliAttivati.png";

const exerciseData = [
  new Esercizio(
    1,
    "Stacco Rumeno con Bilanciere",
    "1. Assumi una presa alla larghezza delle spalle, doppia in pronazione o mista.§" +
    "2. Porta i fianchi indietro mantenendo le ginocchia quasi estese. Cerca l'allungamento nei muscoli posteriori della coscia.§" +
    "3. Quando senti l'allungamento, spingi i fianchi in avanti finché torni in posizione eretta.|" +
    "§Come Eseguire il Rumeno Deadlift§" +
    "§Configurazione§" +
    "Il Rumeno Deadlift (RDL), a differenza di altre varianti di deadlift, inizia e finisce in posizione eretta. " +
    "Quindi devi iniziare l'esercizio in modo un po' diverso rispetto ad altre varianti di deadlift.§" +
    "Ci sono alcuni modi per configurare il Rumeno Deadlift.§" +
    "Imposta le barre di sicurezza o i ganci in un rack per squat appena sotto l'altezza del ginocchio. " +
    "Da qui, solleverai la barra fuori dalle sicurezze. Fai un paio di passi indietro e poi inizia il set.§" +
    "Inizia dal pavimento. Esegui un deadlift convenzionale standard per portare il peso nella posizione di partenza.§" +
    "Una volta scelto uno di questi due modi e raggiunta la posizione iniziale eretta, possiamo continuare il resto dell'allestimento.§" +
    "Utilizza una posizione larga come le spalle con le dita dei piedi rivolte in avanti. Sia un doppio grip normale o misto è OK. " +
    "Fai attenzione al grip misto, può stressare il bicipite in rare occasioni.§" +
    "Evita qualsiasi movimento di spinta del bilanciere. Questo è un movimento della catena posteriore.§" +
    "§Esecuzione§" +
    "Inizia il set spingendo i fianchi dritti indietro. Le ginocchia dovrebbero rimanere per lo più estese, con leggera flessione se necessaria.§" +
    "Immagina di spingere i fianchi verso l'alto verso il soffitto per mantenere le ginocchia estese.§" +
    "Il RDL allunga gli ischiocrurali sotto carico. La tensione è massima quando gli ischiocrurali sono nella posizione più allungata.§" +
    "Puoi usare questo esercizio per determinare il tuo range di movimento. Alcuni arriveranno fino al pavimento, altri solo a 90° di flessione dell’anca.§" +
    "Mantieni sempre la schiena piatta per non stressare la colonna lombare.§" +
    "La parte concentrica consiste nel tornare in posizione eretta senza iperestendere la schiena.§" +
    "§Consigli pratici§" +
    "Mantieni il petto alto e le scapole retratte. La pompa nella parte bassa della schiena è normale.§" +
    "Non forzare i fianchi fino in fondo per evitare iperestensione.",
    ["Femorali", "Glutei"],
    ["Bilanciere"],
    "Medio",
    [staccoRumenoFront, staccoRumenoSide, staccoRumenoActivationMuscle],
    false,
    false
  ), new Esercizio(
    2,
    "Leg Press",
    "1. Posiziona le gambe sulla piattaforma con i piedi alla larghezza delle spalle.§" +
    "2. Rilascia il peso ed estendi completamente le gambe, senza bloccare le ginocchia.§" +
    "3. Abbassa il peso fino a quando le gambe formano un angolo di 90° (ma NON permettere che i glutei e la parte bassa della schiena si sollevino dal supporto. Questo porta la zona lombare in una posizione arrotondata, che è molto pericolosa.)§" +
    "4. Riporta il peso alla posizione di partenza.",
    ["Quadricipiti", "Femorali", "Glutei"],
    ["Macchina Leg Press"],
    "Facile",
    [legPressFront, legPressSide, legPressActivationMuscle],
    false,
    false
  ), new Esercizio(
    3,
    "Affondo Bulgaro con Manubri",
    "1. Trova un box o una panca all'altezza approssimativa del ginocchio o alcuni inches più basso. (Più il box è basso, minore è il requisito di mobilità).§" +
    "2. Puoi appoggiare la punta o il dorso del piede sulla box. Posiziona il piede anteriore rivolto in avanti o leggermente ruotato verso l'esterno e piega contemporaneamente ginocchia e anche.§" +
    "3. Cerca di portare la gamba anteriore alla profondità parallela (con il femorale parallelo al suolo) o più in basso.§" +
    "4. Più il piede anteriore è avanti, maggiore è l'ampiezza di movimento alle anche. Più il piede anteriore è indietro, maggiore è il ROM alle ginocchia.",
    ["Quadricipiti", "Femorali", "Glutei", "Adduttori"],
    ["Panca o Supporto", "Manubri"],
    "Medio",
    [affondiBulgariFront, affondiBulgariSide, affondiBulgariActivationMuscle],
    false,
    false
  ), new Esercizio(
    4,
    "Slancio posteriore al cavo",
    "1. Usa una cavigliera. Imposta il cavo nella parte bassa della macchina crossover.§" +
    "2. Spingi la caviglia direttamente indietro, estendendo l'anca. Tieni per un conteggio di uno quando senti la contrazione nei glutei.§" +
    "3. Poi fletti i fianchi fino a tornare alla posizione iniziale.|",
    ["Glutei", "Femorali"],
    ["Macchina a cavo basso"],
    "Facile",
    [slancioCavoPostFront, slancioCavoPostSide, slancioCavoPostActivationMuscle],
    false,
    false
  ), new Esercizio(
    5,
    "Lat Machine",
    "1. Impugna la barra con i palmi rivolti in avanti, con le mani posizionate più larghe delle spalle.§" +
    "2. Con entrambe le braccia estese davanti a te e la barra in mano, inclina il busto indietro di circa 30 degrees, spingendo il petto in fuori.§" +
    "3. Abbassa la barra fino all'altezza del mento, o poco sotto, con un movimento fluido mentre stringi le scapole.§" + 
    "4. Dopo aver contratto per un secondo, solleva lentamente la barra fino alla posizione di partenza con le braccia completamente estese.|" +
    "§Come Eseguire La Lat Machine§" +
    "§Preparazione§" +
    "Regola il cuscinetto del cosciotto in modo che le gambe siano ferme ma comode.§" +
    "Afferra la barra con la presa scelta. Siediti dritto, con le spalle basse e il petto alto.§" +
    "Evita qualsiasi slancio e mantieni il corpo stabile durante l'esercizio.§" +
    "§Esecuzione§" +
    "Inizia con i gomiti estesi e le orecchie tra i bicipiti.§" +
    "Inclina leggermente il busto all’indietro, tira la barra verso il petto concentrandoti sui dorsali.§" +
    "Controlla il ritorno del peso durante la fase eccentrica fino a estendere completamente le braccia.§" +
    "Evita di usare lo slancio o il corpo per spostare il peso.§" +
    "§Consigli pratici§" +
    "Mantieni il petto alto e le scapole retratte.§" +
    "Non iperestendere la schiena; concentrati sul lavoro dei dorsali e dei bicipiti.",
    ["Dorsale", "Trapezio Medio", "Trapezio Inferiore", "Bicipiti"],
    ["Macchina Lat Pulldown", "Lat Machine"],
    "Facile",
    [latMachineFront, latMachineSide, latMachineActivationMuscle],
    false,
    false
  ), new Esercizio(
    6,
    "Lat Machine Presa Stretta",
    "1. Usa la maniglia a barra dritta.§" +
    "2. Afferra l'impugnatura mentre ti siedi sulla macchina e posiziona le gambe sotto i cuscinetti per le gambe.§" +
    "3. Tira la barra fino all'altezza della clavicola, poi risollevala finché le braccia sono completamente estese.§",
    ["Dorsale", "Trapezio Medio", "Trapezio Inferiore", "Bicipiti"],
    ["Macchina Lat Pulldown", "Lat Machine"],
    "Facile",
    [latMachineStrettaFront, latMachineStrettaSide, latMachineStrettaActivationMuscle],
    false,
    false
  ), new Esercizio(
    7,
    "Pulley",
    "1. Siediti con la schiena dritta sulla macchina e afferra le maniglie.§" +
    "2. Tira le maniglie indietro con le braccia. Gambe e busto devono formare un angolo di 90°. Spingi il petto in avanti.§" +
    "3. Tira le maniglie verso il corpo finché le mani sono accanto all'addome.§",
    ["Dorsale", "Trapezio Medio", "Trapezio Inferiore", "Romboidi"],
    ["Macchina Pulley"],
    "Facile",
    [pulleyFront, pulleySide, pulleyActivationMuscle],
    false,
    false
  ), new Esercizio(
    8,
    "Low Row",
    "1. Premi il petto contro il cuscinetto e afferra le maniglie orizzontali con una presa prona.§" +
    "2. Tira le maniglie verso di te, mantenendo i gomiti larghi.§", 
    ["Dorsale", "Trapezio Medio", "Trapezio Inferiore", "Romboidi", "Deltoide posteriore"],
    ["Macchina Low Row", "Rematore al cavo basso"],
    "Facile",
    [lowRowFront, lowRowSide, lowRowActivationMuscle],
    false,
    false
  ), new Esercizio(
    9,
    "Row",
    "1. Siediti sulla macchina con i piedi ben appoggiati, afferra le maniglie con i palmi rivolti l'uno verso l'altro e mantieni la schiena dritta.§" +
    "2. Tira le maniglie verso la parte bassa dell'addome, avvicinando le scapole. Mantieni i gomiti vicino al corpo.§" + 
    "3. Torna lentamente alla posizione di partenza, estendi completamente le braccia senza bloccare i gomiti. Ripeti per le ripetizioni desiderate.", 
    ["Dorsale", "Trapezio Medio", "Trapezio Inferiore", "Romboidi", "Deltoide posteriore", "Bicipiti"],
    ["Macchina Row"],
    "Facile",
    [rowFront, rowSide, rowActivationMuscle],
    false,
    false
  ), new Esercizio(
    10,
    "Tricipiti Al Cavo",
    "1. Il cavo deve essere posizionato fino in cima alla macchina.§" +
    "2. Tieni la parte superiore del braccio aderente al fianco. Estendi i gomiti finché senti i tricipiti contrarsi.|" +
    "§Come Eseguire la Spinta Verso il Basso con Cavo§" +
    "§Preparazione§" +
    "Posiziona la ghiera del cavo tutta in alto. Puoi usare un attacco a corda o a barra dritta per questo esercizio. Nel nostro video dimostrativo, stiamo usando una corda, quindi le nostre istruzioni saranno specifiche per questa.§" +
    "Afferra la corda e fai qualche passo indietro. Puoi iniziare con i gomiti in posizione estesa o flessa.§" +
    "Spingi leggermente indietro il sedere. Questo farà spostare i fianchi, dando alle tue braccia spazio sufficiente per estendersi completamente.§" +
    "§Esecuzione§" +
    "Il mio suggerimento preferito per il Tricep Push Down è: braccia da T-Rex. È estremamente importante che tu mantenga il braccio superiore ed i gomiti incollati al tuo fianco.§" +
    "Il movimento dovrebbe essere causato dall'articolazione del gomito e l'avambraccio dovrebbe essere l'unica parte del corpo in movimento. Questo manterrà lo stress e la tensione esclusivamente sui tuoi tricipiti.§" +
    "Assicurati di estendere e flettere completamente i gomiti ad ogni ripetizione.§" +
    "Fai attenzione a non oscillare e rimbalzare durante questo esercizio. È molto comune utilizzare troppo peso in questo esercizio.§" +
    "Se le spalle iniziano a rotolare in avanti nella fase concentrica, il peso è troppo pesante. Il tuo sistema nervoso centrale cercherà di aiutarti reclutando i muscoli sbagliati.§",
    ["Tricipiti"],
    ["Cavo con puleggia alta"],
    "Facile",
    [tricipitiCavoFront, tricipitiCavoSide, tricipitiCavoActivationMuscle],
    false,
    false
  ), new Esercizio(
    11,
    "Squat",
    "1. Stai in piedi con i piedi alla larghezza delle spalle. Mantieni la naturale curvatura della schiena, stringi le scapole e solleva il petto.§" +
    "2. Impugna il bilanciere appoggiandolo sulle spalle e sostenendolo sulla parte superiore della schiena. Togli il bilanciere dai supporti raddrizzando le gambe e fai un passo indietro.§" +
    "3. Piega le ginocchia mentre abbassi il peso, mantenendo la schiena invariata, finché le anche sono sotto le ginocchia.§" + 
    "4. Riporta la barra alla posizione di partenza, spingi con le gambe ed espira in cima.|" +
    "§Come Eseguire lo Squat con Bilanciere§" +
    "§Preparazione§" +
    "Scegli il peso giusto: inizia leggero e aumenta gradualmente.§" +
    "Raccogli l'equipaggiamento: bilanciere, dischi di pesi, power rack.§" +
    "Regola la power rack: posiziona il bilanciere ad un'altezza comoda sui trapezi.§" +
    "Carica il bilanciere: aggiungi i dischi e fissali con le chiusure.§" +
    "Posiziona i piedi: alla larghezza delle spalle, rivolti in avanti.§" +
    "Afferra il bilanciere: presa leggermente più larga delle spalle.§" +
    "§Esecuzione§" +
    "Mantieni la schiena dritta e la testa in avanti.§" +
    "Abbassati lentamente, piegando le ginocchia, fino a quando le cosce sono parallele al pavimento.§" +
    "Fai una breve pausa in fondo e risali spingendo con i talloni.§" +
    "Ripeti per il numero di ripetizioni desiderato.§" +
    "§Tecnica corretta§" +
    "Mantieni la schiena dritta per prevenire infortuni.§" +
    "Spingi con i talloni durante la risalita.§" +
    "Non lasciare che le ginocchia crollino verso l'interno.§" +
    "Respira correttamente: inspira in discesa, espira in salita.§" +
    "Mantieni le spalle indietro e non arricciarle.§" +
    "§Cose da evitare§" +
    "Non usare troppo peso.§" +
    "Non permettere alle ginocchia di crollare verso l'interno.§" +
    "Non inarcare la parte bassa della schiena.§" +
    "Non arricciare le spalle.§" +
    "Non rimbalzare in basso.§" +
    "Non sollevare talloni o punte dei piedi.",
    ["Quadricipiti", "Glutei", "Femorali"],
    ["Nessuna attrezzatura richiesta", "Bilancere", "Manubri"],
    "Medio",
    [squatFront, squatSide, squatActivationMuscle],
    false,
    false
  ), new Esercizio(
    12,
    "Pressa Monopodalica",
    "1. Questa particolare pressa per le gambe ha due pedane separate. Ci sono perni di bloccaggio su entrambi i lati. Inserisci il perno su un lato.§" +
    "2. Abbassa il peso; fermati prima che la zona lombare si arrotondi.§" +
    "3. Spingi indietro fino alla posizione di partenza.",
    ["Quadricipiti", "Glutei", "Femorali"],
    ["Pressa orizzontale", "Pressa inclinata"],
    "Facile",
    [pressaMonopodalicaFront, pressaMonopodalicaSide, pressaMonopodalicaActivationMuscle],
    false,
    false
  ), new Esercizio(
    13,
    "Leg Curl",
    "1. Appoggia la schiena allo schienale. Usa entrambe le maniglie per spingerti contro lo schienale.§" +
    "2. Fletti le caviglie e punta le dita dei piedi verso l'alto.§" +
    "3. Fletti il ginocchio portando il cuscinetto indietro, poi estendilo senza permettere che il peso tocchi di nuovo.",
    ["Femorali"],
    ["Macchinario per leg curl"],
    "Facile",
    [legCurlFront, legCurlSide, legCurlActivationMuscle],
    false,
    false
  ), new Esercizio(
    14,
    "Abduzioni Al Cavo",
    "1. Usa una cavigliera. Imposta il cavo alla posizione più bassa.§" +
    "2. Posizionati di lato con la cavigliera sulla gamba esterna. Allontanati di qualche passo.§" +
    "3. Esegui l'abduzione dell'anca e solleva la gamba lateralmente.§" +
    "4. Ritorna alla posizione di partenza e fermati poco prima che il piede tocchi di nuovo il pavimento (per mantenere la tensione sul muscolo).",
    ["Glutei"],
    ["Macchinario con cavo"],
    "Facile",
    [abduzioniCavoFront, abduzioniCavoSide, abduzioniCavoActivationMuscle],
    false,
    false
  ), new Esercizio(
    15,
    "French Press Manubri",
    "1. Sdraiati supino sul pavimento o su una panca con i pugni estesi verso il soffitto e con una presa neutra.§" +
    "2. Piega i gomiti fino a portare i pugni vicino alle tempie. Poi estendi i gomiti e contrai i tricipiti nella posizione di massima estensione.§" +
    "3. Esegui l'abduzione dell'anca e solleva la gamba lateralmente.§" +
    "4. Ritorna alla posizione di partenza e fermati poco prima che il piede tocchi di nuovo il pavimento (per mantenere la tensione sul muscolo).",
    ["Tricipiti"],
    ["Manubri"],
    "Facile",
    [frenchPressMFront, frenchPressMSide, frenchPressActivationMuscle],
    false,
    false
  ),  new Esercizio(
    16,
    "French Press Bilancere",
    "1. Sdraiati su una panca piana tenendo il bilanciere con una presa alla larghezza delle spalle.§" +
    "2. Estendi completamente i gomiti fino a portare il bilanciere direttamente sopra il petto.§" +
    "3. Inizia a flettere i gomiti e porta il bilanciere fino a sfiorare la fronte.§" +
    "4. Estendi i gomiti indietro fino alla posizione iniziale e ripeti.|" +
    "§Estensioni dei Tricipiti con Bilanciere Sdraiato: una guida completa§" +
    "§Impostazione§" +
    "Sdraiati su una panchina con i piedi ben piantati a terra e la testa e le scapole saldamente appoggiate sulla panchina.§" +
    "Afferra un bilanciere e sollevalo sopra la tua testa con le braccia completamente estese e i palmi rivolti verso l'alto.§" +
    "Assicurati che il bilanciere sia bilanciato sopra il tuo petto e non penda da un lato o dall'altro.§" +
    "§Come eseguire§" +
    "Piega lentamente le braccia e abbassa il bilanciere verso la fronte, mantenendo i gomiti vicini alla testa.§" +
    "Fai una breve pausa e poi estendi le braccia per tornare alla posizione di partenza, contraendo i tricipiti.§" +
    "Ripeti per il numero desiderato di ripetizioni, mantenendo la forma corretta per tutto il movimento.§" +
    "§Tecnica§" +
    "Mantieni le spalle rilassate ed evita di alzarle verso le orecchie.§" +
    "Mantieni una leggera curvatura nella parte bassa della schiena per stabilità.§" +
    "Espira mentre estendi le braccia e inspira mentre abbassi il bilanciere.§" +
    "Concentrati nel coinvolgere i tricipiti per tutta l’escursione del movimento.§" +
    "§Cose da evitare§" +
    "Non rimbalzare il bilanciere sulla fronte o usare il momentum.§" +
    "Non permettere ai gomiti di divaricarsi ai lati, per proteggere le spalle.§" +
    "Evita di inarcare troppo la schiena: mantienila stabile.§" +
    "Non usare troppo peso, altrimenti comprometti la tecnica.",
    ["Tricipiti"],
    ["Bilancere"],
    "Facile",
    [frenchPressBFront, frenchPressBSide, frenchPressActivationMuscle],
    false,
    false
  ), new Esercizio(
    17,
    "Pec Fly",
    "1. Regola l'altezza del sedile in modo che le maniglie siano allineate con il petto. Appoggia i gomiti sui supporti.§" +
    "2. Avvicina lentamente le imbottiture davanti, mantenendo la tensione. Concentrati sulla contrazione dei pettorali.§" +
    "3. Riporta i pad nella posizione iniziale con un movimento controllato. Mantieni il petto alto per tutta l'esecuzione. Ripeti per il numero di ripetizioni.",
    ["Pettorali"],
    ["Macchinario Pec Deck", "chest fly machine"],
    "Facile",
    [pecFlyFront, pecFlySide, pecFlyActivationMuscle],
    false,
    false
  ), new Esercizio(
    18,
    "Lento Avanti",
    "1. Siediti su una panca con schienale. Solleva i manubri all'altezza delle spalle con i palmi rivolti in avanti.§" +
    "2. Solleva i manubri verso l'alto e trattieni la posizione contratta.§" +
    "3. Riporta i pesi alla posizione di partenza.|" +
    "§Come Eseguire la Spinta con Manubri Seduto§" +
    "§Preparazione§" +
    "Prendi due manubri e posizionati su una panca inclinata o seduta. " +
    "Assicurati che la tua schiena sia premuta completamente contro il cuscinetto verticale.§" +
    "Spalanca i gomiti con il volto rivolto verso il soffitto e le palme verso l'esterno. " +
    "Assicurati che il manubrio sia ben posizionato nella tua mano in modo che il polso rimanga in una posizione stabile.§" +
    "§Esecuzione§" +
    "Spingi i manubri verso il soffitto estendendo completamente i gomiti. " +
    "Non superestendere o bloccare i gomiti: i manubri devono muoversi in una curva ad arco, " +
    "convergendo nella parte alta. Non è necessario che si tocchino.§" +
    "Durante la fase eccentrica, abbassa i manubri fino a portare il braccio superiore almeno parallelo al suolo. " +
    "Se hai buona mobilità, puoi scendere fino a sfiorare le spalle, a patto che non provochi dolore.§" +
    "Assicurati che la schiena rimanga sempre aderente allo schienale. Evita di iperestendere la colonna lombare " +
    "quando sei affaticato: questo sposterebbe il carico sui pettorali e potrebbe stressare la zona lombare.",
    ["Spalle", "Tricipiti", "Deltoidi"],
    ["Bilancere", "Manubri", "Panca (opzionale)"],
    "Facile",
    [lentoAvantiFront, lentoAvantiSide, lentoAvantiActivationMuscle],
    false,
    false
  ), new Esercizio(
    19,
    "Alzate Laterali",
    "1. Regola l'altezza del sedile in modo che le maniglie siano allineate con il petto. Appoggia i gomiti sui supporti.§" +
    "2. Avvicina lentamente le imbottiture davanti, mantenendo la tensione. Concentrati sulla contrazione dei pettorali.§" +
    "3. Riporta i pad nella posizione iniziale con un movimento controllato. Mantieni il petto alto per tutta l'esecuzione. Ripeti per il numero di ripetizioni.",
    ["Spalle"],
    ["Manubri"],
    "Facile",
    [alzateLateraliFront, alzateLateraliSide, alzateLateraliActivationMuscle],
    false,
    false
  ), new Esercizio(
    20,
    "Alzate Frontali",
    "1. Impugna due manubri stando in piedi, con le braccia lungo i fianchi.§" +
    "2. Solleva i due manubri con i gomiti completamente estesi fino a portarli all'altezza degli occhi.§" +
    "3. Abbassa i pesi in modo controllato fino alla posizione di partenza e ripeti.",
    ["Spalle"],
    ["Manubri"],
    "Facile",
    [alzateFrontaliFront, alzateFrontaliSide, alzateLateraliActivationMuscle],
    false,
    false
  ), new Esercizio(
    21,
    "Curl Con Manubri",
    "1. Stai in piedi con la schiena dritta, un manubrio in ogni mano e le braccia distese.§" +
    "2. Solleva un manubrio e ruota l'avambraccio finché non è verticale, con il palmo rivolto verso la spalla.§" +
    "3. Riporta alla posizione iniziale e ripeti con il braccio opposto",
    ["Bicipiti"],
    ["Manubri"],
    "Facile",
    [curlFront, curlSide, curlActivationMuscle],
    false,
    false
  ), new Esercizio(
    22,
    "Hammer Curl Con Manubri",
    "1. Tieni i manubri con una presa neutra (pollici rivolti verso l'alto).§" +
    "2. Solleva lentamente il manubrio fino all'altezza del petto§" +
    "3. Torna alla posizione iniziale e ripeti.",
    ["Bicipiti"],
    ["Manubri"],
    "Facile",
    [hammerCurlFront, hammerCurlSide, hammerCurlActivationMuscle],
    false,
    false
  ),
];

export default exerciseData;