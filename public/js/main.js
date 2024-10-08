document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");
    const consultaLink = document.getElementById('consulta-pastilla');
    const consultaContainer = document.getElementById('consulta-container');
    
    const stockContainer = document.getElementById('stock_container');
    
    const vehiculoLink = document.getElementById('consulta-vehiculo');
    const vehiculoContainer = document.getElementById('vehiculo-container');
    const buscarButton = document.getElementById('buscar');
    const resultTable = document.getElementById('result-table');
    const resultBody = document.getElementById('result-body');
    const inputCodigo = document.getElementById('codigo-pastilla');
    const stockLink = document.getElementById('consulta-stock');
    
    const navGestionInvetario = document.getElementById('gestion-inventario');
    const crudContainer = document.getElementById('crud_container');


    


    abrir.addEventListener('click', () => {
        nav.classList.add('visible');
    });

    cerrar.addEventListener('click', () => {
        nav.classList.remove('visible');
    });

//----------------------------------------------------------------------------------------------------------------------------------------------------------------


    




//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Cuando seleccionamos el NAV, oculta el nav y muestra el div correspondiente a ese nav
vehiculoLink.addEventListener('click', async (e) => {
    e.preventDefault();
    consultaContainer.classList.add('hidden');
    vehiculoContainer.classList.remove('hidden');
    stockContainer.classList.add('hidden');
    crudContainer.classList.add('hidden');
    nav.classList.remove('visible');
});








//obtenemos lo que tiene el input para modelo
const inputcodigomodelo = document.getElementById('codigo-modelo');
const inputcodigopastillita = document.getElementById('codigo-pastillita');

//obtenemos la tabla su body
const resultBodyVehiculo = document.getElementById('vehiculo-body');

//obtenemos toda la tabla
const resultTableVehiculo = document.getElementById('tabla_modelo');


// Función para limpiar los otros inputs cuando uno recibe caracteres
function limpiarOtrosInputs(inputActual) {
    if (inputActual !== inputcodigopastillita) inputcodigopastillita.value = '';
    if (inputActual !== inputcodigomodelo) inputcodigomodelo.value = '';
    //if (inputActual !== inputPastilla) inputPastilla.value = '';
}



//El input empieza a escuchar pra MODELO
inputcodigomodelo.addEventListener('input', async () => {
    //limpiamos los otros inputs
    limpiarOtrosInputs(inputcodigomodelo);


    const codigoPastilla = inputcodigomodelo.value.trim();

    if (codigoPastilla.length >= 2) {
        await buscarPastilla2();
    } else {
        resultBodyVehiculo.innerHTML = '';
        resultTableVehiculo.classList.add('hidden');
    }
});



//--------------- BUSCAR POR MODELO -----------------
async function buscarPastilla2() {
    const codigoPastilla = inputcodigomodelo.value.trim();

    if (codigoPastilla === '') {
        return;
    }

    try {
        const response = await fetch(`/buscar-pastilla-modelo?codigo=${codigoPastilla}`);

        if (!response.ok) {
            throw new Error('Error en la respuesta de la red.');
        }

        const data = await response.json();
        resultBodyVehiculo.innerHTML = '';

        if (data.length === 0) {
            resultBodyVehiculo.innerHTML = '<tr><td colspan="4">No se encontraron resultados.</td></tr>';
        } else {
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id_detalle}</td>
                    <td>${row.id_pastilla}</td>
                    <td>${row.nombre_marca || 'No disponible'}</td> <!-- Cambiado aquí para mostrar el nombre de la marca -->
                    <td>${row.detalle_serie_modelo}</td>
                `;
                resultBodyVehiculo.appendChild(tr);
            });
            
        }

        resultTableVehiculo.classList.remove('hidden');
    } catch (error) {
        console.error('Error al buscar pastilla', error);
        alert('Hubo un problema al realizar la búsqueda. Verifique la consola para más detalles.');
    }
}


//--------------- BUSCAR POR PASTILLA -----------------

//El input empieza a escuchar pra MARCA
inputcodigopastillita.addEventListener('input', async () => {
    //limpiamos los otros inputs
    limpiarOtrosInputs(inputcodigopastillita);


    const codigoPastilla = inputcodigopastillita.value.trim();

    if (codigoPastilla.length >= 2) {
        await buscarPastillaPastillita();
    } else {
        resultBodyVehiculo.innerHTML = '';
        resultTableVehiculo.classList.add('hidden');
    }
});


async function buscarPastillaPastillita() {
    const codigoPastilla = inputcodigopastillita.value.trim();

    if (codigoPastilla === '') {
        return;
    }

    try {
        const response = await fetch(`/buscar-pastilla-pastillita?codigo=${codigoPastilla}`);

        if (!response.ok) {
            throw new Error('Error en la respuesta de la red.');
        }

        const data = await response.json();
        resultBodyVehiculo.innerHTML = '';

        if (data.length === 0) {
            resultBodyVehiculo.innerHTML = '<tr><td colspan="4">No se encontraron resultados.</td></tr>';
        } else {
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id_detalle}</td>
                    <td>${row.id_pastilla}</td>
                    <td>${row.nombre_marca || 'No disponible'}</td> <!-- Cambiado aquí para mostrar el nombre de la marca -->
                    <td>${row.detalle_serie_modelo}</td>
                `;
                resultBodyVehiculo.appendChild(tr);
            });
            
        }

        resultTableVehiculo.classList.remove('hidden');
    } catch (error) {
        console.error('Error al buscar pastilla', error);
        alert('Hubo un problema al realizar la búsqueda. Verifique la consola para más detalles.');
    }
}





    //----------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    //Cuando seleccionamos el NAV, oculta el nav y muestra el div correspondiente a ese nav
    consultaLink.addEventListener('click', (e) => {
        e.preventDefault();
        consultaContainer.classList.remove('hidden');
        vehiculoContainer.classList.add('hidden');
        stockContainer.classList.add('hidden');
        crudContainer.classList.add('hidden');
        nav.classList.remove('visible');
    });
    

    buscarButton.addEventListener('click', async () => {
        await buscarPastilla();
    });

    inputCodigo.addEventListener('input', async () => {
        const codigoPastilla = inputCodigo.value.trim();

        if (codigoPastilla.length >= 2) {
            await buscarPastilla();
        } else {
            resultBody.innerHTML = '';
            resultTable.classList.add('hidden');
        }
    });

    // Función para buscar pastilla
    async function buscarPastilla() {
        const codigoPastilla = inputCodigo.value.trim();

        if (codigoPastilla === '') {
            return;
        }

        try {
            const response = await fetch(`/buscar-pastilla?codigo=${codigoPastilla}`);

            if (!response.ok) {
                throw new Error('Error en la respuesta de la red.');
            }

            const data = await response.json();
            resultBody.innerHTML = '';

            if (data.length === 0) {
                resultBody.innerHTML = '<tr><td colspan="3">No se encontraron resultados.</td></tr>';
            } else {
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row.id_pastilla}</td>
                        <td>${row.lado_pastilla}</td>
                        <td>${row.dimension_pastilla}</td>
                    `;
                    resultBody.appendChild(tr);
                });
            }

            resultTable.classList.remove('hidden');
        } catch (error) {
            console.error('Error al buscar pastilla', error);
            alert('Hubo un problema al realizar la búsqueda. Verifique la consola para más detalles.');
        }
    }


    


    


    //-----------------------------------------------------------------------------------------------------------
    // S T O C K - CONFIGURATION

    stockLink.addEventListener('click', async (b) => {
        b.preventDefault();
        consultaContainer.classList.add('hidden');
        vehiculoContainer.classList.add('hidden');
        stockContainer.classList.remove('hidden');
        crudContainer.classList.add('hidden');
        nav.classList.remove('visible');
    });



    //Obtenemos el boton para modelo
const botonbuscarstock = document.getElementById('boton_buscar-stock');

//Evento click al boton
botonbuscarstock.addEventListener('click', async () => {
    await buscarPastilla3();
});

//obtenemos lo que tiene el input para modelo
const inputcodigostock = document.getElementById('stock-input');

//obtenemos la tabla su body
const resultBodyStock = document.getElementById('stock-body');

//obtenemos toda la tabla
const resultTableStock = document.getElementById('tabla_stock');

//***** */

inputcodigostock.addEventListener('input', async () => {
    const codigoPastilla = inputcodigostock.value.trim();

    if (codigoPastilla.length >= 1) {
        await buscarPastilla3();
    } else {
        resultBodyStock.innerHTML = '';
        resultTableStock.classList.add('hidden');
    }
});

// Función para buscar pastilla
async function buscarPastilla3() {
    const codigoPastilla = inputcodigostock.value.trim();

    if (codigoPastilla === '') {
        return;
    }

    try {
        const response = await fetch(`/buscar-stock?codigo=${codigoPastilla}`);

        if (!response.ok) {
            throw new Error('Error en la respuesta de la red.');
        }

        const data = await response.json();
        resultBodyStock.innerHTML = '';

        if (data.length === 0) {
            resultBodyStock.innerHTML = '<tr><td colspan="5">No se encontraron resultados.</td></tr>';
        } else {
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id_pastilla_venta}</td>
                    <td>${row.stock}</td>
                    <td>${row.precio_costo}</td> 
                    <td>${row.precio_venta}</td>
                    <td>${row.id_pastilla}</td>
                `;
                resultBodyStock.appendChild(tr);
            });
        }

        resultTableStock.classList.remove('hidden');
    } catch (error) {
        console.error('Error al buscar pastilla', error);
        alert('Hubo un problema al realizar la búsqueda. Verifique la consola para más detalles.');
    }
}
    
    

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.getElementById('exportar-stock').addEventListener('click', async () => {
    try {
        const response = await fetch('/exportar-stock');

        if (!response.ok) {
            throw new Error('Error al descargar el archivo Excel');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Inventario Frenos Dover.xlsx';  // Nombre del archivo
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (error) {
        console.error('Error al exportar el archivo', error);
        alert('Hubo un problema al exportar el archivo.');
    }
});


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------CRUD-----------------------------------------------------------------------------------------------------------


//mostramos su div y ocultamos los elementos del nav
navGestionInvetario.addEventListener('click', async (b) => {
    b.preventDefault();
    consultaContainer.classList.add('hidden');
    vehiculoContainer.classList.add('hidden');
    stockContainer.classList.add('hidden');
    crudContainer.classList.remove('hidden');
    nav.classList.remove('visible');
});

//obtenemos lo que tiene el input en el area de gestion de inventario
const inputCrud = document.getElementById('crud-input');
//obtenemos toda la tabla
const tablaCrud = document.getElementById('tabla-crud');
//obtenemos la tabla su body
const bodyTablaCrud = document.getElementById('crud-body');

inputCrud.addEventListener('input', async () => {
    
    const codigoPastilla = inputCrud.value.trim();

    if (codigoPastilla.length >= 1) {
        await buscarPastillaCrud();
    } else {
        bodyTablaCrud.innerHTML = '';
        tablaCrud.classList.add('hidden');
    }
});


// Función para buscar pastilla
// Función para buscar pastilla
async function buscarPastillaCrud() {
    const codigoPastilla = inputCrud.value.trim();

    if (codigoPastilla === '') {
        return;
    }

    try {
        const response = await fetch(`/buscar-stock2?codigo=${codigoPastilla}`);

        if (!response.ok) {
            throw new Error('Error en la respuesta de la red.');
        }

        const data = await response.json();
        bodyTablaCrud.innerHTML = '';

        if (data.length === 0) {
            bodyTablaCrud.innerHTML = '<tr><td colspan="6">No se encontraron resultados.</td></tr>';
        } else {
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td>
            <span class="custom-checkbox">
								<input type="checkbox" id="checkbox1" name="options[]" value="1">
								<label for="checkbox1"></label>
							</span>
          </td>
                    <td>${row.id_pastilla_venta}</td>
                    <td>${row.stock}</td>
                    <td>${row.precio_costo}</td> 
                    <td>${row.precio_venta}</td>
                    <td>${row.id_pastilla}</td>
                    <td>
    <a href="#editProductoModal" class="edit" data-toggle="modal" data-id="${row.id_pastilla_venta}">
        <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
    </a>
    <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-id="${row.id_pastilla_venta}">
        <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
    </a>
   
</td>

                `;
                bodyTablaCrud.appendChild(tr);
            });
        }

        tablaCrud.classList.remove('hidden');
    } catch (error) {
        console.error('Error al buscar pastilla', error);
        alert('Hubo un problema al realizar la búsqueda. Verifique la consola para más detalles.');
    }
}


//************* METODO PARA OBTENER LOS DATOS DE LA FILA SELECCIONADA ************************************************************

// Escuchar los eventos en los botones de edición
document.addEventListener('click', function (event) {
    if (event.target.closest('.edit')) {
        const editButton = event.target.closest('.edit');
        const row = editButton.closest('tr');  // Obtén la fila correspondiente

        // Extraer los valores de la fila
        const codigoPastilla = row.cells[1].textContent;
        const cantidad = row.cells[2].textContent;
        const costo = row.cells[3].textContent;
        const venta = row.cells[4].textContent;
        const codigoPastillaGlobal =  row.cells[5].textContent;
        
        // Colocar los valores en los inputs del modal de edición
        const modal = document.querySelector('#editProductoModal');
        // Cambiamos el input de codigo por una label
        modal.querySelector('#codigoPastillaLabel').textContent = codigoPastilla; // Actualizar la etiqueta con el código de pastilla
        modal.querySelector('input[name="cantidad"]').value = cantidad;
        modal.querySelector('input[name="costo"]').value = costo;
        modal.querySelector('input[name="venta"]').value = venta;
        modal.querySelector('#codigoPastillaLabelGlobal').textContent = codigoPastillaGlobal;
        

        // Mostrar el modal
        $('#editProductoModal').modal('show');
    }
});

//--------------- EVENTO CLICK PARA SAVE, PARA ALMACENAR LOS NUEVOS ACTUALIZADOS DATOS ----------------------------------------------------------------.
// Asegúrate de que el modal esté definido correctamente
const modal = document.getElementById('editProductoModal'); // Asegúrate de que el ID sea correcto

    modal.querySelector('.btn-info').addEventListener('click', async () => {
        event.preventDefault();

        // Obtener los valores del modal
        const codigoPastilla = modal.querySelector('#codigoPastillaLabel').textContent; // Valor de la etiqueta
        const cantidad = modal.querySelector('input[name="cantidad"]').value;
        const costo = modal.querySelector('input[name="costo"]').value;
        const venta = modal.querySelector('input[name="venta"]').value;
        const codigoPastillaGlobal = modal.querySelector('#codigoPastillaLabelGlobal').textContent;

        // Crear el objeto con los datos a enviar
        const data = {
            codigoPastilla, // id_pastilla_venta
            cantidad, // stock
            costo, // precio_costo
            venta, // precio_venta
            codigoPastillaGlobal // id_pastilla
        };

        try {
            // Hacer una solicitud POST al servidor
            const response = await fetch('/update-stock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                // Manejar el éxito
                $('#editProductoModal').modal('hide');
                alert(result.message);
            } else {
                // Manejar errores
                alert(result.message || 'Error al actualizar el stock.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor.');
        }
    });
    

    //Validamos que los input sean ENTEROS o DECIMALES, DEPENDIENDO SI ES COSTO O CANTIDAD, NO ESTEN VACIOS Y NO SEAN TEXTO"----------
   // ----------------------------------------------------------------------------------------------------------------------


   // Función para validar el input según el tipo de campo
const validarInput = (inputElement, reglas = {}) => {
    const valor = inputElement.value;

    // Validar que el campo no esté vacío
    if (valor.trim() === "") {
        inputElement.setCustomValidity("El campo no puede estar vacío.");
        inputElement.reportValidity();
        return;
    }

    // Validar si el campo debe ser un número entero no negativo (regla específica para 'cantidad')
    if (reglas.esEntero) {
        const regexEntero = /^[0-9]+$/; // Acepta solo números enteros no negativos
        if (!regexEntero.test(valor)) {
            inputElement.setCustomValidity("Debe ser un número entero positivo.");
            inputElement.reportValidity();
            return;
        }
    }

    // Validar si debe ser un número decimal (regla para 'costo' o 'venta')
    if (reglas.esDecimal) {
        const regexDecimal = /^\d+(\.\d{0,2})?$/; // Acepta números decimales con hasta dos dígitos después del punto
        if (!regexDecimal.test(valor)) {
            inputElement.setCustomValidity("Debe ser un número válido con hasta dos decimales.");
            inputElement.reportValidity();
            return;
        }
    }

    // Si no hubo errores, restablecer la validez
    inputElement.setCustomValidity("");
};

// Obtener los elementos de entrada del modal
const cantidadInput = modal.querySelector('input[name="cantidad"]');
const costoInput = modal.querySelector('input[name="costo"]');
const ventaInput = modal.querySelector('input[name="venta"]');

// Agregar eventos para validar en tiempo real
cantidadInput.addEventListener('input', () => validarInput(cantidadInput, { esEntero: true }));
costoInput.addEventListener('input', () => validarInput(costoInput, { esDecimal: true }));
ventaInput.addEventListener('input', () => validarInput(ventaInput, { esDecimal: true }));

cantidadInput.addEventListener('blur', () => validarInput(cantidadInput, { esEntero: true }));
costoInput.addEventListener('blur', () => validarInput(costoInput, { esDecimal: true }));
ventaInput.addEventListener('blur', () => validarInput(ventaInput, { esDecimal: true }));

// Validar todos los campos antes de guardar
modal.querySelector('.btn-info').addEventListener('click', async () => {
    // Valida cada campo antes de proceder
    validarInput(cantidadInput, { esEntero: true });
    validarInput(costoInput, { esDecimal: true });
    validarInput(ventaInput, { esDecimal: true });

    // Verificar si todos los inputs son válidos antes de continuar
    if (cantidadInput.checkValidity() && costoInput.checkValidity() && ventaInput.checkValidity()) {
        // Continuar con el resto de tu lógica aquí...
    }
});




    

//--------------- EVENTO CLICK PARA ELIMINAR, EL REGISTRO SELECCIONADO ----------------------------------------------------------------.

// Escuchar los eventos en los botones de eliminación
document.addEventListener('click', function (event) {
    if (event.target.closest('.delete')) { // Suponiendo que tus botones de eliminar tienen la clase .delete
        const deleteButton = event.target.closest('.delete');
        const row = deleteButton.closest('tr');  // Obtén la fila correspondiente

        // Extraer el código de la pastilla
        const codigoPastilla = row.cells[1].textContent; // Asegúrate de que este índice sea el correcto

        // Mostrar el código en el modal
        document.getElementById('deleteCodigoPastilla').textContent = codigoPastilla;
        // Guardar el ID de la pastilla en un campo oculto
        document.getElementById('deleteProductoId').value = codigoPastilla;

        // Mostrar el modal
        $('#deleteEmployeeModal').modal('show');
    }
});

// CONFIRMAMOS LA ELIMINACION DEL CODIGO EN LA TABLA, A TRAVEZ DEL MODAL
document.getElementById('confirmDelete').addEventListener('click', function () {
    // Obtener el ID de la pastilla desde el campo oculto
    const id_pastilla_venta = document.getElementById('deleteProductoId').value; 

    fetch(`/delete-product/${id_pastilla_venta}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) { // Comprobar si la respuesta es correcta
            throw new Error('Error al eliminar el producto'); // Lanzar error si la respuesta no es ok
        }
        else {

        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Verifica qué datos se están recibiendo
    
        if (data.message) {
            alert(data.message); // Muestra el mensaje de éxito o error
    
            // Eliminar la fila de la tabla si la eliminación fue exitosa
            const rows = document.querySelectorAll('tr');
            rows.forEach(row => {
                if (row.cells[1].textContent === id_pastilla_venta) {
                    row.remove(); // Eliminar la fila
                }
            });
    
            $('#deleteEmployeeModal').modal('hide'); // Ocultar el modal aquí

        }
    })
    
    .catch(error => {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto.');
    });
});
















});


