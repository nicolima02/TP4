import { validarDatos } from "../services/validaciones.js";
import { Fila, Aprendiz, VeteranoA, VeteranoB, Cliente, Recaudacion, Esperas } from "../clases/clases.js"
import {llegadaCliente} from "../eventos/llegadaCliente.js"
import { darBebida } from "../services/darBebida.js";
import { asignacionPeluquero } from "../eventos/asignacionPeluquero.js";
import { liberacionPeluquero } from "../services/liberacionPeluquero.js";
import { generarTabla } from "../services/generarTabla.js"
import { crearTabla } from "../services/crearTabla.js";
import { getNumeroCliente } from "../services/getNumeroCliente.js";

export const generarDatos = (datosForm)=>{
    if (validarDatos(datosForm)){
        //variables estadisticas
        let recaudacion = new Recaudacion(0,0,0,0,);
        let esperas = new Esperas(0,0);
        //inicializar las variable para el primer dia de apertura
        let eventos = [];
        const filas = [];
        let numeroCliente = 0;
        const horaCierre = 60*8;
        let reloj = 0;
        let dia = 1;
        let abierto = true;
        let peluquero = "";
        let aprendiz = new Aprendiz("L",[],0);
        let veteranoA = new VeteranoA("L",[],0);
        let veteranoB = new VeteranoB("L",[],0);
        let finAtencionP = null;
        let llegadaClienteF = null;
        let clientes = [];
        let filasAgregadas = [];
        let peluquerosList = {aprendiz,veteranoA,veteranoB}
        //llegada del primer cliente
        while(abierto) {
            if (reloj === 0) {
                peluquero = "";
                aprendiz.estado = "L"
                aprendiz.cola = [] 
                veteranoA.estado = "L"
                veteranoA.cola = []
                veteranoB.estado = "L"
                veteranoB.cola = [] 
                finAtencionP = null;
                llegadaClienteF = null;
                clientes = [];          
                
                peluquerosList = {aprendiz,veteranoA,veteranoB}
                const aprendizActual = {...peluquerosList.aprendiz};
                const veteranoAActual = {...peluquerosList.veteranoA};
                const veteranoBActual = {...peluquerosList.veteranoB};
                const esperaActual = {...esperas};
                llegadaCliente(reloj,eventos,dia);
                filas.push(new Fila(1, {nombre:"Apertura"}, reloj, {nombre:eventos[0].evento.constructor.name, demora:eventos[0].evento.demora, llegada:eventos[0].evento.llegada, random:eventos[0].evento.random}, null, null, aprendizActual, veteranoAActual, veteranoBActual, {gananciasDiarias:recaudacion.gananciasDiarias, gastosDiarios:recaudacion.gastosDiarios,gananciasNetas:recaudacion.gananciasNetas}, esperaActual, clientes, dia));
            }
            //reloj = eventos[0]?.evento.llegada
            darBebida(reloj,clientes, esperas,recaudacion);
            if (reloj >= horaCierre && clientes.length === 0){ //mejorar para que no termine en un dia, agregar un if que controle si dia > datosForm.dia
                recaudacion.gananciasDiarias = 0;
                dia++;
                reloj = 0;
                eventos = [];
                if (dia > datosForm.tiempo) {
                    abierto = false;
                    };
                    continue;
                }
                reloj = eventos[0]?.evento.llegada >= horaCierre ? filas[0].relojAMostrar : eventos[0]?.evento.llegada;
                eventos = [];
                    llegadaCliente(reloj,eventos,dia);
                    llegadaClienteF = new Fila(filas.length+1, {nombre:eventos[0].evento.constructor.name, demora:eventos[0].evento.demora, llegada:eventos[0].evento.llegada}
                            , reloj, {nombre:eventos[0].evento.constructor.name, demora:eventos[0].evento.demora, llegada:eventos[0].evento.llegada, random:eventos[0].evento.random},
                            {peluquero:peluquero.peluquero, random:peluquero.random},"finAtencionP",
                            {clientesAtendidos:aprendiz.clientesAtendidos,estado:aprendiz.estado},{clientesAtendidos:veteranoA.clientesAtendidos,estado:veteranoA.estado},
                            {clientesAtendidos:veteranoB.clientesAtendidos,estado:veteranoB.estado}, {gananciasDiarias:recaudacion.gananciasDiarias, gastosDiarios:recaudacion.gastosDiarios,gananciasNetas:recaudacion.gananciasNetas},
                            {esperaSimulataneas:esperas.esperaSimultaneas, maxEsperaSimultanea:esperas.maxEsperaSimultanea},clientes, dia);       
                    let cliente = "";
                    clientes.sort((a,b)=>a.numero - b.numero);
                    liberacionPeluquero(reloj,aprendiz,veteranoA,veteranoB,filas,clientes,eventos,dia,datosForm,recaudacion);
                    //const numeroCliente = getNumeroCliente(clientes);              
                    numeroCliente++;
                    cliente = new Cliente(numeroCliente, "EE", null, parseFloat(reloj+30), false);           
                    peluquero = asignacionPeluquero(datosForm, aprendiz,veteranoA,veteranoB, cliente,reloj,eventos,dia);
                    const clientesActualesFin = clientes.map(cliente => ({ ...cliente }));                   
                if (llegadaClienteF.relojAMostrar < horaCierre) {
                    llegadaClienteF.asignacionPeluquero = peluquero;
                    llegadaClienteF.finAtencionPeluquero = eventos[eventos.length-1].evento.finAtencion ? {nombre:eventos[1]?.evento.constructor.name,demora:eventos[1]?.evento.demora,finAtencion:eventos[1]?.evento.finAtencion,random:eventos[1]?.evento.random} : null;
                    if(reloj <= horaCierre){
                        clientes.push(cliente);
                        clientes.sort((a,b)=>a.numero - b.numero);
                        const clientesActuales = clientes.map(cliente => ({ ...cliente }));
                        llegadaClienteF.clientes = clientesActuales;
                        const aprendizActual = {...peluquerosList.aprendiz};
                        const veteranoAActual = {...peluquerosList.veteranoA};
                        const veteranoBActual = {...peluquerosList.veteranoB};
                        const recaudacionActual = {...recaudacion};
                        const esperaActual = {...esperas};
                        llegadaClienteF.recaudacion = recaudacionActual;
                        llegadaClienteF.esperas = esperaActual;
                        llegadaClienteF.aprendiz = aprendizActual;
                        llegadaClienteF.veteranoA = veteranoAActual;
                        llegadaClienteF.veteranoB = veteranoBActual;
                        filas.push(llegadaClienteF);
                    }
                }
                
                if (eventos[eventos.length-1]?.evento?.finAtencion || filas.length == 1) {
                    //hacer un for para agregar todos los finAtencion
                    const clientesActuales = clientes.length == 0 ? [] : clientes.map(cliente => ({ ...cliente }));
                    const recaudacionActual = {...recaudacion};
                    const esperaActual = {...esperas};
                    if (filas.length == 1) {
                        filas[0].esperas = esperaActual;
                        filas[0].clientes = clientesActuales;
                    }
                    for(let i = 0; i < eventos.length; i++){
                        if(eventos[i].evento?.finAtencion){
                            
                            finAtencionP = new Fila(filas.length+1, 
                                {nombre:eventos[i].evento.constructor.name, demora:eventos[i].evento.demora, finAtencion:eventos[i].evento.finAtencion, random:eventos[i].evento.random},
                                eventos[i].reloj, null, null, null, null, null, null, recaudacionActual,
                                esperaActual, null, dia);
                            filas.push(finAtencionP);
                        }
                    }
                }
                filas.sort((a,b)=>a.relojAMostrar - b.relojAMostrar);
                filas.forEach((fila, index) => {
                    fila.numero = index + 1;
                });
                for(let index = filas.length - 1; index >= 0; index--){
                    if(filas[index].relojAMostrar <= reloj){
                        if (filas[index]?.control?.nombre !== "Apertura") {
                        const aprendizActual = {...aprendiz};
                        const colaAprendiz = aprendiz.cola.length == 0 ? [] : aprendiz.cola.map(cliente => ({ ...cliente }));
                        const colaVeteranoA = veteranoA.cola.length == 0 ? [] : veteranoA.cola.map(cliente => ({ ...cliente }));
                        const colaVeteranoB = veteranoB.cola.length == 0 ? [] : veteranoB.cola.map(cliente => ({ ...cliente }));
                        const veteranoAActual = {...veteranoA};
                        const veteranoBActual = {...veteranoB};
                        const recaudacionActual = {...recaudacion};
                        const esperaActual = {...esperas};
                        filas[index].aprendiz = aprendizActual;
                        filas[index].aprendiz.cola = colaAprendiz;
                        filas[index].veteranoA = veteranoAActual;
                        filas[index].veteranoA.cola = colaVeteranoA;
                        filas[index].veteranoB = veteranoBActual;
                        filas[index].veteranoB.cola = colaVeteranoB;
                        filas[index].recaudacion = recaudacionActual;
                        filas[index].esperas = esperaActual;
                        if (filas[index].control.nombre !== "Apertura" && filas[index].control.nombre !== "LlegadaCliente") {
                            filas[index].clientes = clientesActualesFin;
                        }
                    }
                    filasAgregadas.push(filas[index]);
                    filas.splice(index, 1);
                }
            };
            filasAgregadas.sort((a, b) => {
                if (a.dia === b.dia) {
                    return a.relojAMostrar - b.relojAMostrar;
                }
                return a.dia - b.dia;
            });
            filasAgregadas.forEach((fila, index) => {
                fila.numero = index + 1;
            });
        };
        generarTabla(filasAgregadas,esperas.maxEsperaSimultanea);
        crearTabla(filasAgregadas,datosForm);
        
    }
};