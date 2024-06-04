import {finAtencion} from "../eventos/finAtencion.js"

export const liberacionPeluquero = (reloj, peluquerosList,filas,clientes,eventos,dia,datosForm,recaudacion) => {
    filas.forEach(fila => {
        if(fila.control.evento?.constructor.name === "FinAtencionAprendiz" && reloj >= fila.control.evento?.finAtencion){
            peluquerosList.aprendiz.clientesAtendidos ++;
            recaudacion.gananciasDiarias += 1800;
            recaudacion.gananciasNetas += 1800;
            if (peluquerosList.aprendiz.cola.length === 0) {
                for(let i = 0; i < clientes.length; i++){
                    if (clientes[i].estado === "SA" && clientes[i].peluquero === "Aprendiz"){
                        clientes.splice(i, 1);
                    }
                }
                peluquerosList.aprendiz.estado = "L";
            }else{
                for(let i = 0; i < clientes.length; i++){
                    if (clientes[i].estado === "SA" && clientes[i].peluquero === "Aprendiz"){
                        clientes.splice(i, 1);
                    }
                }
                finAtencion(fila.control.evento.finAtencion,eventos,peluquerosList.aprendiz,datosForm,dia);
                fila.finAtencionPeluquero = eventos[eventos.length-1];
                peluquerosList.aprendiz.cola[0].estado = "SA";
                peluquerosList.aprendiz.cola.splice(0, 1);
            }
        }
        if(fila.control.evento?.constructor.name === "FinAtencionVeteranoA" && reloj >= fila.control.evento?.finAtencion){
            peluquerosList.veteranoA.clientesAtendidos ++;
            recaudacion.gananciasDiarias += 3500;
            recaudacion.gananciasNetas += 3500;
            if (peluquerosList.veteranoA.cola.length === 0) {
                for(let i = 0; i < clientes.length; i++){
                    if (clientes[i].estado === "SA" && clientes[i].peluquero === "Veterano A"){
                        clientes.splice(i, 1);
                    }
                }
                peluquerosList.veteranoA.estado = "L";
            }else{
                for(let i = 0; i < clientes.length; i++){
                    if (clientes[i].estado === "SA" && clientes[i].peluquero === "Veterano A"){
                        clientes.splice(i, 1);
                    }
                }   
                finAtencion(fila.control.evento.finAtencion,eventos,peluquerosList.veteranoA,datosForm,dia);
                fila.finAtencionPeluquero = eventos[eventos.length-1];
                fila.finAtencionPeluquero = peluquerosList.veteranoA.cola[0].finAtencion;
                peluquerosList.veteranoA.cola[0].estado = "SA";
                peluquerosList.veteranoA.cola.splice(0, 1);
            }
        }
        if(fila.control.evento?.constructor.name === "FinAtencionVeteranoB" && reloj >= fila.control.evento?.finAtencion){
            peluquerosList.veteranoB.clientesAtendidos ++;
            recaudacion.gananciasDiarias += 3500;
            recaudacion.gananciasNetas += 3500;
            if (peluquerosList.veteranoB.cola.length === 0) {
                for(let i = 0; i < clientes.length; i++){
                    if (clientes[i].estado === "SA" && clientes[i].peluquero === "Veterano B"){
                        clientes.splice(i, 1);
                    }
                }
                peluquerosList.veteranoB.estado = "L";
            }else{
                for(let i = 0; i < clientes.length; i++){
                    if (clientes[i].estado === "SA" && clientes[i].peluquero === "Veterano B"){
                        clientes.splice(i, 1);
                    }
                }
                finAtencion(fila.control.evento.finAtencion,eventos,peluquerosList.veteranoB,datosForm,dia);
                fila.finAtencionPeluquero = eventos[eventos.length-1];
                peluquerosList.veteranoB.cola[0].estado = "SA";
                peluquerosList.veteranoB.cola.splice(0, 1);
            }
        }
    });
    recaudacion.promedioRecaudacion = recaudacion.gananciasNetas / dia || 0;
}