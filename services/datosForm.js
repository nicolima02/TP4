import {DatosFormulario} from "../clases/clases.js"
// Obtener los valores de los inputs y crear un objeto de la clase DatosFormulario
export const obtenerDatosFormulario = () => {
    const tiempo = parseInt(document.getElementById('tiempo').value);
    const aprendiz = [
        parseFloat(document.getElementById('probabilidadAprendiz').value),
        parseFloat(document.getElementById('UniformeAAprendiz').value),
        parseFloat(document.getElementById('UniformeBAprendiz').value)
    ];
    const veteranoA = [
        parseFloat(document.getElementById('probabilidadVeteranoA').value),
        parseFloat(document.getElementById('UniformeAVeteranoA').value),
        parseFloat(document.getElementById('UniformeBVeteranoA').value),
    ];
    const veteranoB = [
        parseFloat(document.getElementById('probabilidadVeteranoB').value),
        parseFloat(document.getElementById('UniformeAVeteranoB').value),
        parseFloat(document.getElementById('UniformeBVeteranoB').value),
    ];
    const llegadaClientes = [
        parseInt(document.getElementById('UniformeALlegadaClientes').value),
        parseInt(document.getElementById('UniformeBLlegadaClientes').value)
    ]
    const rango = [
        parseInt(document.getElementById('rangoDesde').value),
        parseInt(document.getElementById('rangoHasta').value)
    ]

    // Crear un objeto de la clase DatosFormulario con los valores obtenidos
    const datosFormulario = new DatosFormulario(tiempo, aprendiz, veteranoA, veteranoB, llegadaClientes, rango);

    return datosFormulario;
}

export const limpiarFormulario = () => {
    // Obtén todos los elementos de input del formulario
    const inputs = document.querySelectorAll('input');

    // Recorre cada elemento de input y establece su valor como cadena vacía
    inputs.forEach(input => {
        input.value = '';
    });
};
