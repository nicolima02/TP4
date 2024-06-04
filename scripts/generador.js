import { validarDatos } from "../services/validaciones.js";
import { Fila, Aprendiz, VeteranoA, VeteranoB, Cliente, Recaudacion, Esperas } from "../clases/clases.js"
import {llegadaCliente} from "../eventos/llegadaCliente.js"
import { darBebida } from "../services/darBebida.js";
import { asignacionPeluquero } from "../eventos/asignacionPeluquero.js";
import { liberacionPeluquero } from "../services/liberacionPeluquero.js";

export const generarDatos = (datosForm)=>{
    if (validarDatos(datosForm)){
        //variables estadisticas
        let recaudacion = new Recaudacion(0,0,0,0,);
        let esperas = new Esperas(0,0);
        //inicializar las variable para el primer dia de apertura
        let eventos = [];
        const filas = [];
        let numeroCliente = 0;
        let reloj = 0;
        let dia = 1;
        const horaCierre = 60*8;
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
        llegadaCliente(reloj,eventos,dia);
        filas.push(new Fila(1, "Apertura", reloj, eventos[0], null, null, aprendiz, veteranoA, veteranoB, recaudacion, esperas, clientes));
        while(abierto) {
            reloj = eventos[0]?.evento.llegada;
            darBebida(reloj,clientes, esperas,recaudacion);
            if (reloj >= horaCierre){ //mejorar para que no termine en un dia, agregar un if que controle si dia > datosForm.dia
                recaudacion.gananciasDiarias = 0;
                dia++;
                if (dia >= datosForm.tiempo) {
                    abierto = false;
                    break;
                };
            }else{
                eventos = [];
                llegadaCliente(reloj,eventos,dia);
                if (eventos[eventos.length-1]?.evento?.llegada) {
                    llegadaClienteF = new Fila(filas.length+1, eventos[0], reloj, eventos[0], peluquero,eventos[1], aprendiz,veteranoA,veteranoB, recaudacion, esperas,clientes);
                    filas[0].llegadaCliente = eventos[0] || null;
                }
                numeroCliente++;
                let cliente = new Cliente(numeroCliente, "EE", null, parseFloat(reloj+30), false);
                clientes.push(cliente);
                peluquero = asignacionPeluquero(datosForm, peluquerosList, cliente,reloj,eventos,dia);
                liberacionPeluquero(reloj, peluquerosList,filas,clientes,eventos,dia,datosForm,recaudacion);
                if (llegadaClienteF.relojAMostrar < horaCierre) {
                    llegadaClienteF.asignacionPeluquero = peluquero;
                    llegadaClienteF.finAtencionPeluquero = eventos[eventos.length-1].evento.finAtencion ? eventos[eventos.length-1].evento : null;
                    filas.push(llegadaClienteF);
                }
                if (eventos[eventos.length-1]?.evento?.finAtencion) {
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
}
            };
        };
        
        
    }
};