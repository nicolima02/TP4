export const  crearTabla = (filasAMostrar,datosForm,numeroCliente) =>{
    console.log(filasAMostrar);
    let tablaFilas = document.querySelector('.tbody');
    let cont = 0;
    let finAprendiz = ""
    let finVeteranoA  = ""
    let finVeteranoB = ""
    let llegada = ""
    filasAMostrar.forEach(fila => {
        if (fila.finAtencionPeluquero?.nombre == "FinAtencionAprendiz") {
            fila.finAtencionAprendiz = {random:fila.finAtencionPeluquero.random, demora:fila.finAtencionPeluquero.demora, finAtencion:fila.finAtencionPeluquero.finAtencion};
        }else if (fila.finAtencionPeluquero?.nombre == "FinAtencionVeteranoA") {
            fila.finAtencionVeteranoA = {random:fila.finAtencionPeluquero.random, demora:fila.finAtencionPeluquero.demora, finAtencion:fila.finAtencionPeluquero.finAtencion};
        }else if (fila.finAtencionPeluquero?.nombre == "FinAtencionVeteranoB") {
            fila.finAtencionVeteranoB = {random:fila.finAtencionPeluquero.random, demora:fila.finAtencionPeluquero.demora, finAtencion:fila.finAtencionPeluquero.finAtencion};
        }
        if ((fila.numero >= datosForm.rango[0] && fila.numero <= datosForm.rango[1]) || fila.numero == filasAMostrar.length) {
            
        let row = tablaFilas.insertRow();
        if (fila?.control?.nombre === "FinAtencionAprendiz") {
            finAprendiz = ""
        }
        if (fila?.control?.nombre === "FinAtencionVeteranoA") {
            finVeteranoA= ""
        }
        if (fila?.control?.nombre === "FinAtencionVeteranoB") {
            finVeteranoB = ""
        }
        if (fila.llegadaCliente?.llegada) {
            llegada = fila.llegadaCliente?.llegada
        }
        if (fila?.finAtencionPeluquero?.nombre === "FinAtencionAprendiz") {
            finAprendiz = fila.finAtencionPeluquero?.finAtencion
        }
        if (fila?.finAtencionPeluquero?.nombre === "FinAtencionVeteranoA") {
            finVeteranoA = fila.finAtencionPeluquero?.finAtencion
        }
        if (fila?.finAtencionPeluquero?.nombre === "FinAtencionVeteranoB") {
            finVeteranoB = fila.finAtencionPeluquero?.finAtencion
        }
        if (llegada >= 480) {
            llegada = "";
        }
        row.insertCell().textContent = fila.numero;
        row.cells[0].classList.add('sticky-col');
        row.insertCell().textContent = fila.control.nombre;
        row.cells[1].classList.add('sticky-col');
        row.insertCell().textContent = fila.dia;
        row.insertCell().textContent = fila.relojAMostrar;
        row.insertCell().textContent = fila.llegadaCliente?.random || '';
        row.insertCell().textContent = fila.llegadaCliente?.demora || '';
        row.insertCell().textContent = fila.llegadaCliente?.llegada || llegada;
        row.insertCell().textContent = fila.asignacionPeluquero?.random || '';
        row.insertCell().textContent = fila.asignacionPeluquero?.peluquero || '';
        row.insertCell().textContent = fila.finAtencionAprendiz?.random || '';
        row.insertCell().textContent = fila.finAtencionAprendiz?.demora || '';
        row.insertCell().textContent = fila.finAtencionAprendiz?.finAtencion || finAprendiz ;
        row.insertCell().textContent = fila.finAtencionVeteranoA?.random || '';
        row.insertCell().textContent = fila.finAtencionVeteranoA?.demora || '';
        row.insertCell().textContent = fila.finAtencionVeteranoA?.finAtencion || finVeteranoA;
        row.insertCell().textContent = fila.finAtencionVeteranoB?.random || '';
        row.insertCell().textContent = fila.finAtencionVeteranoB?.demora || '';
        row.insertCell().textContent = fila.finAtencionVeteranoB?.finAtencion || finVeteranoB;
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
        
        // Agregar columnas para cada cliente reutilizando
        // let arrAux = [];
        //     for(let i = 0; i < filasAMostrar[filasAMostrar.length-1].esperas.maxEsperaSimultanea+3;i++){
        //         arrAux.push({numero:i+1,estado:null,peluquero:'',momentoRefresco:'',refresco:null});
        //     }
        //     for (let i = 0; i < filasAMostrar[filasAMostrar.length-1].esperas.maxEsperaSimultanea+3; i++) {
        //         if (fila.clientes[i]?.estado) {
        //             arrAux[fila.clientes[i].numero-1] = fila.clientes[i];
        //     }
        // }
        // arrAux.forEach(c=>{
        //     row.insertCell().textContent = c.estado || '';
        //     row.insertCell().textContent = c.peluquero || '';
        //     row.insertCell().textContent = c.momentoRefresco || '';
        //     row.insertCell().textContent = c.refresco;
        // })
        //Agregar una columna para cada cliente
        let arrAux = [];
        for(let i = 0; i< numeroCliente;i++){
            arrAux.push({numero:i+1,estado:null,peluquero:'',momentoRefresco:'',refresco:null});
        }
        for (let i = 0; i < arrAux.length; i++) {
            if (fila.clientes[i]?.estado) {
                arrAux[fila.clientes[i].numero-1] = fila.clientes[i];
            }
        }
        arrAux.forEach(c=>{
            row.insertCell().textContent = c.estado || '';
            row.insertCell().textContent = c.peluquero || '';
            row.insertCell().textContent = c.momentoRefresco || '';
            row.insertCell().textContent = c.refresco;
        })
    }
    cont++
    })
}