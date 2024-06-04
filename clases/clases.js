
export class DatosFormulario {
    constructor(tiempo, aprendiz, veteranoA, veteranoB, llegadaClientes, rango) {
        this.tiempo = tiempo;
        this.aprendiz = aprendiz;
        this.veteranoA = veteranoA;
        this.veteranoB = veteranoB;
        this.llegadaClientes = llegadaClientes;
        this.rango = rango;
    }
}



export class Fila{
    constructor(numero, control, relojAMostrar, llegadaCliente, asignacionPeluquero, finAtencionPeluquero, aprendiz, veteranoA, veteranoB, recaudacion, esperas, clientes){
    this.numero = numero;
    this.control = control;
    this.relojAMostrar = relojAMostrar;
    this.llegadaCliente = llegadaCliente;
    this.asignacionPeluquero = asignacionPeluquero;
    this.finAtencionPeluquero = finAtencionPeluquero;
    this.aprendiz = aprendiz;
    this.veteranoA = veteranoA;
    this.veteranoB = veteranoB;
    this.recaudacion = recaudacion;
    this.esperas = esperas;
    this.clientes = clientes;
    }
}

export class Control{
    constructor(evento, dia, reloj){
        this.evento = evento;
        this.dia = dia;
        this.reloj = reloj;
    }
}

export class Evento{
    constructor(rnd,demora){
        this.random = rnd;
        this.demora = demora;
    }
}

export class LlegadaCliente extends Evento{
    constructor(random, demora, llegada){
        super(random, demora);
        this.llegada = llegada;
    }
}

export class AsignacionPeluquero extends Evento{
    constructor(random, peluquero){
        super(random);
        this.peluquero = peluquero;
    }
}

export class FinAtencionAprendiz extends Evento{
    constructor(random, demora, finAtencion){
        super(random, demora);
        this.finAtencion = finAtencion;
    }
}

export class FinAtencionVeteranoA extends Evento{
    constructor(random, demora, finAtencion){
        super(random, demora);
        this.finAtencion = finAtencion;
    }
}

export class FinAtencionVeteranoB extends Evento{
    constructor(random, demora, finAtencion){
        super(random, demora);
        this.finAtencion = finAtencion;
    }
}

class ObjetosPermanentes{
    constructor(estado, cola, clientesAtendidos){
        this.estado = estado;
        this.cola = cola;
        this.clientesAtendidos = clientesAtendidos;
    }
}

export class Aprendiz extends ObjetosPermanentes{
    constructor(estado, cola, clientesAtendidos){
        super (estado, cola, clientesAtendidos)
    }
}

export class VeteranoA extends ObjetosPermanentes{
    constructor(estado, cola, clientesAtendidos){
        super (estado, cola, clientesAtendidos)
    }
}

export class VeteranoB extends ObjetosPermanentes{
    constructor(estado, cola, clientesAtendidos){
        super (estado, cola, clientesAtendidos)
    }
}

export class Recaudacion{
    constructor(ganancias, gastos, gananciasNetas, promRecaudacion){
        this.gananciasDiarias = ganancias;
        this.gastosDiarios = gastos;
        this.gananciasNetas = gananciasNetas;
        this.promedioRecaudacion = promRecaudacion;
    }
}

export class Esperas{
    constructor(esperaSimultaneas, maxEsperaSimultanea){
        this.esperaSimultaneas = esperaSimultaneas;
        this.maxEsperaSimultanea = maxEsperaSimultanea;
    }
}

export class Cliente{
    constructor(numero, estado, peluquero, momentoRefresco, refresco){
        this.numero = numero;
        this.estado = estado;
        this.peluquero = peluquero;
        this.momentoRefresco = momentoRefresco;
        this.refresco = refresco;
    }
}