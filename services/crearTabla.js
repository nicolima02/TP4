export const  crearTabla = (filasAMostrar,datosForm) =>{
    console.log(filasAMostrar);
    let tablaFilas = document.querySelector('.tbody');
    filasAMostrar.forEach(fila => {
        if (fila.finAtencionPeluquero?.nombre == "FinAtencionAprendiz") {
            fila.finAtencionAprendiz = {random:fila.finAtencionPeluquero.random, demora:fila.finAtencionPeluquero.demora, finAtencion:fila.finAtencionPeluquero.finAtencion};
        }else if (fila.finAtencionPeluquero?.nombre == "FinAtencionVeteranoA") {
            fila.finAtencionVeteranoA = {random:fila.finAtencionPeluquero.random, demora:fila.finAtencionPeluquero.demora, finAtencion:fila.finAtencionPeluquero.finAtencion};
        }else if (fila.finAtencionPeluquero?.nombre == "FinAtencionVeteranoB") {
            fila.finAtencionVeteranoB = {random:fila.finAtencionPeluquero.random, demora:fila.finAtencionPeluquero.demora, finAtencion:fila.finAtencionPeluquero.finAtencion};
        }
        if (fila.numero >= datosForm.rango[0] && fila.numero <= datosForm.rango[1]) {
            
        let row = tablaFilas.insertRow();
        
        row.insertCell().textContent = fila.numero;
        row.insertCell().textContent = fila.control.nombre;
        row.insertCell().textContent = fila.dia;
        row.insertCell().textContent = fila.reloj;
        row.insertCell().textContent = fila.relojAMostrar;
        row.insertCell().textContent = fila.llegadaCliente?.random || '';
        row.insertCell().textContent = fila.llegadaCliente?.demora || '';
        row.insertCell().textContent = fila.llegadaCliente?.llegada || '';
        row.insertCell().textContent = fila.asignacionPeluquero?.random || '';
        row.insertCell().textContent = fila.asignacionPeluquero?.peluquero || '';
        row.insertCell().textContent = fila.finAtencionAprendiz?.random || '';
        row.insertCell().textContent = fila.finAtencionAprendiz?.demora || '';
        row.insertCell().textContent = fila.finAtencionAprendiz?.finAtencion || '' ;
        row.insertCell().textContent = fila.finAtencionVeteranoA?.random || '';
        row.insertCell().textContent = fila.finAtencionVeteranoA?.demora || '';
        row.insertCell().textContent = fila.finAtencionVeteranoA?.finAtencion || '';
        row.insertCell().textContent = fila.finAtencionVeteranoB?.random || '';
        row.insertCell().textContent = fila.finAtencionVeteranoB?.demora || '';
        row.insertCell().textContent = fila.finAtencionVeteranoB?.finAtencion || '';
        row.insertCell().textContent = fila.aprendiz.estado;
        row.insertCell().textContent = fila.aprendiz.cola.length;
        row.insertCell().textContent = fila.aprendiz.clientesAtendidos;
        row.insertCell().textContent = fila.veteranoA.estado;
        row.insertCell().textContent = fila.veteranoA.cola.length;
        row.insertCell().textContent = fila.veteranoA.clientesAtendidos;
        row.insertCell().textContent = fila.veteranoB.estado;
        row.insertCell().textContent = fila.veteranoB.cola.length;
        row.insertCell().textContent = fila.veteranoB.clientesAtendidos;
        row.insertCell().textContent = fila.recaudacion.gananciasDiarias;
        row.insertCell().textContent = fila.recaudacion.gastosDiarios;
        row.insertCell().textContent = fila.recaudacion.gananciasNetas;
        row.insertCell().textContent = fila.recaudacion.promedioRecaudacion;
        row.insertCell().textContent = fila.esperas.esperaSimultaneas;
        row.insertCell().textContent = fila.esperas.maxEsperaSimultanea;
        
        // Agregar columnas para cada cliente
        let arrAux = [];
            for(let i = 0; i < filasAMostrar[filasAMostrar.length-1].esperas.maxEsperaSimultanea+3;i++){
                arrAux.push({numero:i+1,estado:null,peluquero:'',momentoRefresco:'',refresco:null});
            }
            for (let i = 0; i < filasAMostrar[filasAMostrar.length-1].esperas.maxEsperaSimultanea+3; i++) {
                if (fila.clientes[i]?.estado) {
                    arrAux[fila.clientes[i].numero-1] = fila.clientes[i];
            }
        }
        //     while (recorrido < filasAMostrar[filasAMostrar.length-1].esperas.maxEsperaSimultanea+3 || flag === true) {
        //         recorrido++; 
        //         if(fila.clientes[i]?.numero === recorrido){
        //             row.insertCell().textContent = fila.clientes[i].estado;
        //             row.insertCell().textContent = fila.clientes[i].peluquero;
        //             row.insertCell().textContent = fila.clientes[i].momentoRefresco;
        //             row.insertCell().textContent = fila.clientes[i].refresco;
        //         }else{
        //             row.insertCell().textContent = '';
        //             row.insertCell().textContent = '';
        //             row.insertCell().textContent = '';
        //             row.insertCell().textContent = '';
        //         }
        // }
        arrAux.forEach(c=>{
            row.insertCell().textContent = c.estado || '';
            row.insertCell().textContent = c.peluquero || '';
            row.insertCell().textContent = c.momentoRefresco || '';
            row.insertCell().textContent = c.refresco;
        })
    }
})
}