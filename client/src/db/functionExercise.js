import exerciseData from "../data/exercise";

export function getAllMuscle() {
    let listaMuscoli = [];

    exerciseData.forEach(es => {
        es.muscoliAllenati.forEach(muscolo => {
            if(!listaMuscoli.includes(muscolo)) listaMuscoli.push(muscolo);
        });
    });

    return listaMuscoli;
}