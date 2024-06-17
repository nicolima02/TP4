
export const getNumeroCliente = (clientes) => {
    let id = -1;
    for (let i = 0; i < clientes.length; i++) {
        if(clientes[i].numero !== i+1){
            id = i+1; // Devuelve el índice i en lugar de i+1
            break;
        }
    }   
    if (id===-1) {
        id = clientes.length+1;
    }
    return id;
}