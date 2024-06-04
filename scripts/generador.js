import { validarDatos } from "../services/validaciones.js";
import { Fila, Aprendiz, VeteranoA, VeteranoB, Cliente, Recaudacion, Esperas } from "../clases/clases.js"
import {llegadaCliente} from "../eventos/llegadaCliente.js"
import { darBebida } from "../services/darBebida.js";
import { asignacionPeluquero } from "../eventos/asignacionPeluquero.js";
import { liberacionPeluquero } from "../services/liberacionPeluquero.js";
import { generarTabla } from "../services/generarTabla.js"

export const generarDatos = (datosForm)=>{
    if (validarDatos(datosForm)){
        //variables estadisticas
        let recaudacion = new Recaudacion(0,0,0,0,);
        let esperas = new Esperas(0,0);
        //inicializar las variable para el primer dia de apertura
        let eventos = [];
        const filas = [];
        const horaCierre = 13;
        let numeroCliente = 0;
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
            console.log(clientes.length);
            if (reloj === 0) {
                numeroCliente = 0;
                peluquero = "";
                aprendiz = new Aprendiz("L",[],0);
                veteranoA = new VeteranoA("L",[],0);
                veteranoB = new VeteranoB("L",[],0);
                finAtencionP = null;
                llegadaClienteF = null;
                clientes = [];
                peluquerosList = {aprendiz,veteranoA,veteranoB}
                llegadaCliente(reloj,eventos,dia);
                filas.push(new Fila(1, "Apertura", reloj, eventos[0], null, null, aprendiz, veteranoA, veteranoB, recaudacion, esperas, clientes));
            }
            reloj = eventos[0]?.evento.llegada;
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
                eventos = [];
                llegadaCliente(reloj,eventos,dia);
                    llegadaClienteF = new Fila(filas.length+1, eventos[0], reloj, eventos[0], peluquero,eventos[1], aprendiz,veteranoA,veteranoB, recaudacion, esperas,clientes);          
                    if (filas[0]?.llegadaCliente) {
                        filas[0].llegadaCliente = eventos[0] || null;
                    }
                let cliente = "";
                numeroCliente++;
                cliente = new Cliente(numeroCliente, "EE", null, parseFloat(reloj+30), false);

                peluquero = asignacionPeluquero(datosForm, peluquerosList, cliente,reloj,eventos,dia);
                liberacionPeluquero(reloj, peluquerosList,filas,clientes,eventos,dia,datosForm,recaudacion);
                if (llegadaClienteF.relojAMostrar < horaCierre) {
                    llegadaClienteF.asignacionPeluquero = peluquero;
                    llegadaClienteF.finAtencionPeluquero = eventos[eventos.length-1].evento.finAtencion ? eventos[eventos.length-1].evento : null;
                    if(reloj <= horaCierre){
                        clientes.push(cliente);
                        filas.push(llegadaClienteF);
                    }
                }
                if (eventos[eventos.length-1]?.evento?.finAtencion ) {
                    //hacer un for para agregar todos los finAtencion
                    for(let i = 0; i < eventos.length; i++){
                        if(eventos[i].evento?.finAtencion){
                            finAtencionP = new Fila(filas.length+1, eventos[i], eventos[i].reloj, null, null, null, aprendiz, veteranoA, veteranoB, esperas, recaudacion, clientes);
                            filas.push(finAtencionP);
                        }
                    }
                }
                filas.sort((a,b)=>a.relojAMostrar - b.relojAMostrar);
                filas.forEach((fila, index) => {
                    fila.numero = index + 1;
                });
                for(let index = filas.length - 1; index >= 0; index--){
                    if(filas[index].relojAMostrar < reloj){
                    filasAgregadas.push(filas[index]);
                    filas.splice(index, 1);
                }
            };
            filasAgregadas.sort((a, b) => {
                if (a.control.dia === b.control.dia) {
                    return a.relojAMostrar - b.relojAMostrar;
                }
                return a.control.dia - b.control.dia;
            });
            filasAgregadas.forEach((fila, index) => {
                fila.numero = index + 1;
            });
        };
        generarTabla(filasAgregadas,datosForm)
    }
};