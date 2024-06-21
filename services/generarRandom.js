
export const generarRandom = () =>{
    let numeroAleatorio = Math.random()
    numeroAleatorio = parseFloat(numeroAleatorio.toFixed(2))
    if(numeroAleatorio == 1){
        numeroAleatorio = numeroAleatorio - 0.01
    }
    return numeroAleatorio // Convierte el número en una cadena con dos decimales
}

export const generarRandomUniforme = (rnd, min, max) => {
    let numeroUniforme = parseFloat((rnd* (max - min) + min).toFixed(2)); 
    return numeroUniforme
}