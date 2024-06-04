
// Función para validar los datos del formulario
export function validarDatos(datosFormulario) {
    // Verificar si algún campo está vacío
    if (!datosFormulario.tiempo || !datosFormulario.aprendiz[0] || !datosFormulario.aprendiz[1] || !datosFormulario.aprendiz[2] || !datosFormulario.veteranoA[0] || !datosFormulario.veteranoA[1] || !datosFormulario.veteranoA[2] || !datosFormulario.veteranoB[0] || !datosFormulario.veteranoB[1] || !datosFormulario.veteranoB[2] || !datosFormulario.llegadaClientes[0] || !datosFormulario.llegadaClientes[1] || !datosFormulario.rango[0] || !datosFormulario.rango[1]) {
        alert('Por favor, complete todos los campos.');
        return false; // La validación no pasó
    }

    // Verificar si algún valor es negativo
    if (datosFormulario.tiempo <= 0) {
        alert('El tamaño de la muestra debe ser un numero positivo.');
        return false; // La validación no pasó
    }

    if (datosFormulario.aprendiz[0] <= 0 || datosFormulario.aprendiz[0] >= 1 || datosFormulario.veteranoA[0] <= 0 || datosFormulario.veteranoA[0] >= 1 || datosFormulario.veteranoB[0] <= 0 || datosFormulario.veteranoB[0] >= 1) {
        alert('Los valores de las probabilidades deben ser positivos entre 0,01 y 0,99.');
        return false; // La validación no pasó
    }

    if (datosFormulario.rango[0] > datosFormulario.rango[1]){
        alert('El rango de filas es incorrecto. El valor desde debe ser menor al valor hasta.');
        return false;
    }

    if (datosFormulario.rango[0] <= 0){
        alert('El rango de filas es incorrecto. El valor desde debe ser positivo.');
        return false;
    }

    if ((datosFormulario.aprendiz[0] + datosFormulario.veteranoA[0] + datosFormulario.veteranoB[0]) != 1){
        alert('La suma de las probabilidades de los tipos de destinatarios debe dar 1.');
        return false;
    }
    // Si la validación pasa, retornar true
    return true;
}