
export const darBebida = (reloj,clientes, esperas,recaudacion) =>{
    let esperaAnterior = esperas.esperaSimultaneas;
    esperas.esperaSimultaneas = 0;
    clientes.forEach(c=>{
        if (c.estado === "EE" && reloj >= c.momentoRefresco){
            c.refresco = true;
            recaudacion.gastosDiarios += 1500;
            recaudacion.gananciasNetas -= 1500;
        }
        if (c.estado === "EE"){
            esperas.esperaSimultaneas++;
        }
        if(esperas.esperaSimultaneas > esperaAnterior && esperas.esperaSimultaneas > esperas.maxEsperaSimultanea){
            esperas.maxEsperaSimultanea = esperas.esperaSimultaneas;
        }
    })
}