import { FinAtencionAprendiz, FinAtencionVeteranoB, FinAtencionVeteranoA, Control } from "../clases/clases.js";
import {generarRandom, generarRandomUniforme} from "../services/generarRandom.js";

export  const finAtencion = (reloj, eventos, peluquero,datosForm, dia) =>{
    if (peluquero.peluquero === "Aprendiz"){
        let rnd = generarRandom();
        let demora = generarRandomUniforme(rnd, datosForm.aprendiz[1], datosForm.aprendiz[2]);
        let finAtencion = reloj + demora;
        let finAtencionAprendiz = new FinAtencionAprendiz(rnd, demora, finAtencion);
        let control =  new Control(finAtencionAprendiz,dia,finAtencion);
        eventos.push(control);
    }else if (peluquero.peluquero === "Veterano A"){
        let rnd = generarRandom();
        let demora = generarRandomUniforme(rnd, datosForm.veteranoA[1], datosForm.veteranoA[2]);
        let finAtencion = reloj + demora;
        let finAtencionVeteranoA = new FinAtencionVeteranoA(rnd, demora, finAtencion);
        let control =  new Control(finAtencionVeteranoA,dia,finAtencion);
        eventos.push(control);
        
    }else{
        let rnd = generarRandom();
        let demora = generarRandomUniforme(rnd, datosForm.veteranoB[1], datosForm.veteranoB[2]);
        let finAtencion = reloj + demora;
        let finAtencionVeteranoB = new FinAtencionVeteranoB(rnd, demora, finAtencion);
        let control =  new Control(finAtencionVeteranoB,dia,finAtencion);
        eventos.push(control);
        
    }
}