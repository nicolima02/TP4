
export const generarTabla = (filas, maxEsperaSimultanea) => {
    console.log(maxEsperaSimultanea);
    const table = document.createElement('table');
    table.classList.add('table-data');
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    tbody.classList.add('tbody');
    
    const fila1 = document.createElement('tr');
    const fila2 = document.createElement('tr');
    const fila3 = document.createElement('tr')
    // Control
    fila1.appendChild(crearEncabezado('Control', 5));
    fila2.appendChild(crearSubEncabezado(['Numero', 'Evento', 'Dia', 'Reloj(Segundos)', 'Reloj']));

    // Proxima Llegada
    fila1.appendChild(crearEncabezado('Proxima Llegada', 3));
    fila2.appendChild(crearSubEncabezado(['Random', 'Demora', 'Llegada']));

    // Asignacion Peluquero
    fila1.appendChild(crearEncabezado('Asignacion Peluquero', 2));
    fila2.appendChild(crearSubEncabezado(['Random', 'Peluquero']));

    // Fin Atencion Aprendiz
    fila1.appendChild(crearEncabezado('Fin Atencion Aprendiz', 3));
    fila2.appendChild(crearSubEncabezado(['Random', 'Demora', 'Fin Atencion']));

    // Fin Atencion Veterano A
    fila1.appendChild(crearEncabezado('Fin Atencion Veterano A', 3));
    fila2.appendChild(crearSubEncabezado(['Random', 'Demora', 'Fin Atencion']));

    // Fin Atencion Veterano B
    fila1.appendChild(crearEncabezado('Fin Atencion Veterano B', 3));
    fila2.appendChild(crearSubEncabezado(['Random', 'Demora', 'Fin Atencion']));

    // Aprendiz
    fila1.appendChild(crearEncabezado('Aprendiz', 3));
    fila2.appendChild(crearSubEncabezado(['Estado', 'Cola', 'Clientes Atendidos']));

    // Veterano A
    fila1.appendChild(crearEncabezado('Veterano A', 3));
    fila2.appendChild(crearSubEncabezado(['Estado', 'Cola', 'Clientes Atendidos']));

    // Veterano B
    fila1.appendChild(crearEncabezado('Veterano B', 3));
    fila2.appendChild(crearSubEncabezado(['Estado', 'Cola', 'Clientes Atendidos']));

    // Recaudacion
    fila1.appendChild(crearEncabezado('Recaudacion', 4));
    fila2.appendChild(crearSubEncabezado(['Ganancias Diarias', 'Gastos Diarios', 'Ganancias Netas', 'Ganancias Promedio']));

    // Esperas
    fila1.appendChild(crearEncabezado('Esperas', 2));
    fila2.appendChild(crearSubEncabezado(['Esperas Simultaneas', 'Maximo de Esperas Simultaneas']));

    // Clientes
    for (let i = 1; i <= maxEsperaSimultanea+3; i++) {
        fila1.appendChild(crearEncabezado(`Cliente ${i}`, 4));
        fila2.appendChild(crearSubEncabezado(['Estado', 'Peluquero', 'Momento de Refresco', 'Refresco']));
    }

    thead.appendChild(fila1);
    thead.appendChild(fila2);
    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('table-container').appendChild(table);
}

// Función auxiliar para crear encabezados
function crearEncabezado(texto, colspan) {
    const th = document.createElement('th');
    th.colSpan = colspan;
    th.textContent = texto;
    return th;
}

// Función auxiliar para crear sub-encabezados
function crearSubEncabezado(textos) {
    const fragment = document.createDocumentFragment();
    textos.forEach(texto => {
        const th = document.createElement('th');
        th.textContent = texto;
        fragment.appendChild(th);
    });
    return fragment;
}