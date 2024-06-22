import {finAtencion} from "../eventos/finAtencion.js"

export const liberacionPeluquero = (reloj,aprendiz,veteranoA,veteranoB,filas,clientes,eventos,dia,datosForm,recaudacion) => {
    filas.forEach(fila => {
        if(fila.control?.nombre === "FinAtencionAprendiz" && reloj >= fila.control?.finAtencion){
            aprendiz.clientesAtendidos ++;
            recaudacion.gananciasDiarias += 1800;
            recaudacion.gananciasNetas += 1800;
            if (aprendiz.cola.length === 0) {
                for(let i = 0; i < clientes.length; i++){
                    if (clientes[i].estado === "SA" && clientes[i].peluquero === "Aprendiz"){
                        clientes.splice(i, 1);
                    }
                }
                aprendiz.estado = "L";
            }else if(aprendiz.cola.length >= 1){
                for(let i = 0; i < clientes.length; i++){
                    if (clientes[i].estado === "SA" && clientes[i].peluquero === "Aprendiz"){
                        clientes.splice(i, 1);
                    }
                }
                finAtencion(fila.control.finAtencion,eventos,{peluquero: "Aprendiz"},datosForm,dia);
                fila.finAtencionPeluquero = {nombre:eventos[eventos.length-1]?.evento.constructor.name,demora:eventos[eventos.length-1]?.evento.demora,finAtencion:eventos[eventos.length-1]?.evento.finAtencion,random:eventos[eventos.length-1]?.evento.random};
                aprendiz.cola[0].estado = "SA";
                aprendiz.cola.splice(0, 1);
            }
        }
        if(fila.control?.nombre === "FinAtencionVeteranoA" && reloj >= fila.control?.finAtencion){
            veteranoA.clientesAtendidos ++;
            recaudacion.gananciasDiarias += 3500;
            recaudacion.gananciasNetas += 3500;
            if (veteranoA.cola.length === 0) {
                for(let i = 0; i < clientes.length; i++){
                    if (clientes[i].estado === "SA" && clientes[i].peluquero === "Veterano A"){
                        clientes.splice(i, 1);
                    }
                }
                veteranoA.estado = "L";
            }else if(veteranoA.cola.length >= 1){
                for(let i = 0; i < clientes.length; i++){
                    if (clientes[i].estado === "SA" && clientes[i].peluquero === "Veterano A"){
                        clientes.splice(i, 1);
                    }
                }   
                finAtencion(fila.control.finAtencion, eventos, {peluquero: "Veterano A"}, datosForm, dia);
                fila.finAtencionPeluquero = {nombre:eventos[eventos.length-1]?.evento.constructor.name,demora:eventos[eventos.length-1]?.evento.demora,finAtencion:eventos[eventos.length-1]?.evento.finAtencion,random:eventos[eventos.length-1]?.evento.random};
                //fila.finAtencionPeluquero = veteranoA.cola[0].finAtencion;
                veteranoA.cola[0].estado = "SA";
                veteranoA.cola.splice(0, 1);
            }
        }
        if(fila.control?.nombre === "FinAtencionVeteranoB" && reloj >= fila.control?.finAtencion){
            veteranoB.clientesAtendidos ++;
            recaudacion.gananciasDiarias += 3500;
            recaudacion.gananciasNetas += 3500;
            if (veteranoB.cola.length === 0) {
                for(let i = 0; i < clientes.length; i++){
                    if (clientes[i].estado === "SA" && clientes[i].peluquero === "Veterano B"){
                        clientes.splice(i, 1);
                    }
                }
                veteranoB.estado = "L";
            }else if(veteranoB.cola.length >= 1){
                for(let i = 0; i < clientes.length; i++){
                    if (clientes[i].estado === "SA" && clientes[i].peluquero === "Veterano B"){
                        clientes.splice(i, 1);
                    }
                }
                finAtencion(fila.control.finAtencion,eventos,{peluquero: "Veterano B"},datosForm,dia);
                fila.finAtencionPeluquero = {nombre:eventos[eventos.length-1]?.evento.constructor.name,demora:eventos[eventos.length-1]?.evento.demora,finAtencion:eventos[eventos.length-1]?.evento.finAtencion,random:eventos[eventos.length-1]?.evento.random};
                veteranoB.cola[0].estado = "SA";
                veteranoB.cola.splice(0, 1);
            }
        }
    });
    recaudacion.promedioRecaudacion = recaudacion.gananciasNetas / dia || 0;
}