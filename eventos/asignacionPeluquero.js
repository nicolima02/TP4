import { generarRandom } from "../services/generarRandom.js";
import {AsignacionPeluquero} from "../clases/clases.js"
import { finAtencion } from "./finAtencion.js";
// PASAR PELUQUEROS EN VEZ DE LA LISTA
//****************************************** 
//*********************************************/
export const asignacionPeluquero = (datosForm, aprendiz,veteranoA,veteranoB, cliente, reloj, eventos, dia) =>{
    let rnd = generarRandom().toFixed(2);
    let peluquero = "";
    let sa = false;
    if (rnd < datosForm.aprendiz[0]) {
        peluquero = "Aprendiz";
        peluquero = new AsignacionPeluquero(rnd,peluquero);
        if (aprendiz.estado === "L" && reloj < 60*8) {
            aprendiz.estado = "O";
            cliente.peluquero = "Aprendiz";
            cliente.estado = "SA";
            finAtencion(reloj,eventos,peluquero,datosForm,dia);
            sa = true
        }else if(reloj<60*8){
            cliente.peluquero = "Aprendiz";
            aprendiz.cola.push(cliente);
        }
    }else if (rnd >= datosForm.aprendiz[0] && rnd < (datosForm.veteranoA[0]+datosForm.aprendiz[0])){
        peluquero = "Veterano A";
        peluquero = new AsignacionPeluquero(rnd,peluquero);
        if (veteranoA.estado === "L" && reloj< 60*8) {
            veteranoA.estado = "O";
            cliente.peluquero = "Veterano A";
            cliente.estado = "SA";
            finAtencion(reloj,eventos,peluquero,datosForm,dia);
            sa = true
        }else if(reloj<60*8){
            cliente.peluquero = "Veterano A";
            veteranoA.cola.push(cliente);
        }
    }else{
        peluquero = "Veterano B";
        peluquero = new AsignacionPeluquero(rnd,peluquero);
        if (veteranoB.estado === "L" && reloj < 60*8) {
            veteranoB.estado = "O";
            cliente.peluquero = "Veterano B";
            cliente.estado = "SA";
            finAtencion(reloj,eventos,peluquero,datosForm,dia);
            sa = true
        }else if(reloj<60*8){
            cliente.peluquero = "Veterano B";
            veteranoB.cola.push(cliente);
        }
    }
    
    return {peluquero, sa};
};

