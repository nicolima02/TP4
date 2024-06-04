
export const generarTabla = (filas, datosForm) => {
    console.log(filas);
    const tabla = document.getElementById("table-container");

    // Crear la tabla y agregar encabezados
    let tablaHTML = '<table><thead><tr>';
    for (let key in filas[0]) {
        if (typeof filas[0][key] === 'object' && filas[0][key] !== null) {
            for (let subKey in filas[0][key]) {
                tablaHTML += `<th>${key}.${subKey}</th>`;
            }
        } else {
            tablaHTML += `<th>${key}</th>`;
        }
    }
    tablaHTML += '</tr></thead><tbody>';

    // Agregar filas de datos
    for (let fila of filas) {
        tablaHTML += '<tr>';
        for (let key in fila) {
            if (typeof fila[key] === 'object' && fila[key] !== null) {
                for (let subKey in fila[key]) {
                    tablaHTML += `<td>${fila[key][subKey]}</td>`;
                }
            } else {
                tablaHTML += `<td>${fila[key]}</td>`;
            }
        }
        tablaHTML += '</tr>';
    }

    tablaHTML += '</tbody></table>';

    // Agregar la tabla al contenedor
    tabla.innerHTML = tablaHTML;
}