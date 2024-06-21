import {LlegadaCliente, Control} from "../clases/clases.js";
import { generarRandom, generarRandomUniforme } from "../services/generarRandom.js";

export const llegadaCliente = (reloj, eventos,dia) => {
    let rnd = generarRandom();
    let demora = generarRandomUniforme(rnd,2,12);
    let llegada = parseFloat((reloj + demora).toFixed(2));
    let llegadaCliente = new LlegadaCliente(rnd,demora,llegada)
    let control =  new Control(llegadaCliente,dia,reloj);
    eventos.push(control);
}