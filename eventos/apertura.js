import { generarRandom, generarRandomUniforme } from "../services/generarRandom.js";
import {Control} from "../clases/clases.js";

export const apertura = (reloj,eventos,dia) =>{
    let rnd = generarRandom();
    let demora = generarRandomUniforme(rnd,2,12);
    let llegada = parseFloat((reloj + demora).toFixed(2));
    let control =  new Control("apertura",dia,reloj);
    eventos.push(control);
    eventos = eventos.sort((a,b)=>a.evento.reloj - b.evento.reloj);
}