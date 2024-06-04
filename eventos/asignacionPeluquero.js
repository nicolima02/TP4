import { generarRandom } from "../services/generarRandom.js";
import {AsignacionPeluquero} from "../clases/clases.js"
import { finAtencion } from "./finAtencion.js";


export const asignacionPeluquero = (datosForm, peluqueros, cliente, reloj, eventos, dia) =>{
    let rnd = generarRandom().toFixed(2);
    let peluquero = "";
    if (rnd < datosForm.aprendiz[0]) {
        peluquero = "Aprendiz";
        peluquero = new AsignacionPeluquero(rnd,peluquero);
        if (peluqueros.aprendiz.estado === "L") {
            peluqueros.aprendiz.estado = "O";
            cliente.peluquero = "Aprendiz";
            cliente.estado = "SA";
            finAtencion(reloj,eventos,peluquero,datosForm,dia);
        }else{
            cliente.peluquero = "Aprendiz";
            peluqueros.aprendiz.cola.push(cliente);
        }
    }else if (rnd >= datosForm.aprendiz[0] && rnd < (datosForm.veteranoA[0]+datosForm.aprendiz[0])){
        peluquero = "Veterano A";
        peluquero = new AsignacionPeluquero(rnd,peluquero);
        if (peluqueros.veteranoA.estado === "L") {
            peluqueros.veteranoA.estado = "O";
            cliente.peluquero = "Veterano A";
            cliente.estado = "SA";
            finAtencion(reloj,eventos,peluquero,datosForm,dia);
        }else{
            cliente.peluquero = "Veterano A";
            peluqueros.veteranoA.cola.push(cliente);
        }
    }else{
        peluquero = "Veterano B";
        peluquero = new AsignacionPeluquero(rnd,peluquero);
        if (peluqueros.veteranoB.estado === "L") {
            peluqueros.veteranoB.estado = "O";
            cliente.peluquero = "Veterano B";
            cliente.estado = "SA";
            finAtencion(reloj,eventos,peluquero,datosForm,dia);
        }else{
            cliente.peluquero = "Veterano B";
            peluqueros.veteranoB.cola.push(cliente);
        }
    }
    
    return peluquero;
};

