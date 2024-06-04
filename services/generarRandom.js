
export const generarRandom = () =>{
    let numeroAleatorio = Math.random()
    if(numeroAleatorio == 1){
        numeroAleatorio = numeroAleatorio - 0.01
    }
    return numeroAleatorio // Convierte el número en una cadena con dos decimales
}

export const generarRandomUniforme = (rnd, min, max) => {
    return parseFloat((rnd* (max - min) + min).toFixed(2));
}