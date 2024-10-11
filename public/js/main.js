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
    const GestionDetallePastilla = document.getElementById('Gestión-Detalle-Pastilla');

    
    const crudContainer = document.getElementById('crud_container');
    const crud_container_consulta_vehiculo = document.getElementById('crud_container_consulta_vehiculo');
    


    


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
    crud_container_consulta_vehiculo.classList.add('hidden');
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
        crud_container_consulta_vehiculo.classList.add('hidden');
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
        crud_container_consulta_vehiculo.classList.add('hidden');
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
    crud_container_consulta_vehiculo.classList.add('hidden');
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

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//IMPEDIMOS QUE ESCRIBAN EN EL INPUT DE CANTIDAD PARA STOCK, ASI SOLO CON LAS FLECHAS DARAN VALOR
document.getElementById('castindadPastillaStock').addEventListener('keydown', function(e) {
    // Permitir la tecla "Tab"
    if (e.key === "Tab") {
        return;
    }
    // Bloquear cualquier otra entrada desde el teclado
    e.preventDefault();
});




document.getElementById('Id_pastilla').addEventListener('click', function() {
    // Verificar si ya se han cargado las opciones para evitar llamadas repetidas
    if (this.options.length > 1) return;

    // Hacer la solicitud al servidor para obtener los valores
    fetch('/get-pastillas')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('Id_pastilla'); // Asegúrate de que el id es correcto
            data.forEach(pastilla => {
                const option = document.createElement('option');
                option.value = pastilla.id_pastilla;
                option.textContent = pastilla.id_pastilla;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar los id_pastilla:', error);
        });
});

//MOSTRAMOS EL DIV PARA AGREGAR MF PASTILLA SI NO EXISTE EN EL DROPDOWN
document.getElementById('botonAgregarMFPastillaSiNoExiste').addEventListener('click', function() {
    const customDiv = document.getElementById('customBackgroundDiv');
    const divAgregarStock = document.getElementById('divAgregarStock');
    divAgregarStock.classList.add('hidden');
    pieAgregar.classList.add('hidden');
    customDiv.classList.remove('hidden');
});

//MOSTRAMOS EL DIV INICIAL PARA AGREGAR STOCK Y OCULTAMOS MFPASTILLA AL ABRIR EL MODAL ADD PRODUCT
document.getElementById('botonAgregarNuevaPastilla').addEventListener('click', function() {
    const customDiv = document.getElementById('customBackgroundDiv');
    const agregarStockDiv = document.getElementById('divAgregarStock');
    const pieAgregar = document.getElementById('pieAgregar');

    //Restablecemos los valores de todos los input
    document.getElementById("codigoGlobalPastilla").value = "";
    document.getElementById("ladoPastilla").selectedIndex = 0; // Restablecer al primer elemento
    document.getElementById("dimesinoPastilla").value = "";
    document.getElementById("codigoPastillaStock").value = "";
    document.getElementById("castindadPastillaStock").value = "";
    document.getElementById("costoPastilla").value = "";
    document.getElementById("ventaPastilla").value = "";
    document.getElementById("Id_pastilla").selectedIndex = 0; // Restablecer al primer elemento
    

    // Agregar la clase hidden al div customBackgroundDiv
    customDiv.classList.add('hidden');
    // Remover la clase hidden al div divAgregarStock
    agregarStockDiv.classList.remove('hidden');
    pieAgregar.classList.remove('hidden');
});


//----------------------- AGREGAMOS LOS DATOS DE MF PASTILLA

document.getElementById("AgregarCodigoGlobal").addEventListener("click", async function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores de los campos
    const codigoGlobal = document.getElementById("codigoGlobalPastilla").value;
    const ladoPastilla = document.getElementById("ladoPastilla").value;
    const dimensionPastilla = document.getElementById("dimesinoPastilla").value;

    // Validar que los campos no estén vacíos
    if (!codigoGlobal || !ladoPastilla || !dimensionPastilla) {
        alert("Por favor, llene todos los campos.");
        return;
    }

    try {
        // Verificar si el código global ya existe
        const response = await fetch('/get-pastillas');
        const pastillas = await response.json();
        const existingIds = pastillas.map(pastilla => pastilla.id_pastilla);

        if (existingIds.includes(codigoGlobal)) {
            alert("El código global ya existe. Por favor, ingrese uno diferente.");
            return;
        }

        // Enviar los datos al servidor para insertar en la base de datos
        const insertResponse = await fetch('/insertar-pastilla', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_pastilla: codigoGlobal,
                lado_pastilla: ladoPastilla,
                dimension_pastilla: dimensionPastilla
            })
        });

        if (insertResponse.ok) {
            alert("Pastilla agregada exitosamente.");
            // Aquí puedes agregar lógica para limpiar los campos o cerrar el modal
        } else {
            alert("Error al agregar la pastilla. Por favor, inténtelo de nuevo.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Se produjo un error. Por favor, inténtelo de nuevo.");
    }
});

//Mandamos los valores de los input a la tabla STOCK. Validando si los campos estan llenos

document.getElementById('btnAddStock').addEventListener('click', async function (event) {
    event.preventDefault(); // Previene el comportamiento por defecto del botón submit

    // Obtener valores de los campos
    const codigoPastillaStock = document.getElementById('codigoPastillaStock').value.trim();
    const cantidad = document.getElementById('castindadPastillaStock').value.trim();
    const costo = document.getElementById('costoPastilla').value.trim();
    const venta = document.getElementById('ventaPastilla').value.trim();
    const idPastilla = document.getElementById('Id_pastilla').value.trim();

    // Verificar si todos los campos están llenos
    if (!codigoPastillaStock || !cantidad || !costo || !venta || !idPastilla) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    try {
        // Verificar si el codigoPastillaStock ya existe en la base de datos
        const response = await fetch(`/verificar-codigo/${codigoPastillaStock}`); // Crear un endpoint para verificar el código
        const data = await response.json();

        if (data.existe) {
            alert('El código de pastilla ya existe en el stock.');
        } else {
            // Si el código no existe, hacer el insert
            const insertResponse = await fetch('/agregar-stock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_pastilla_venta: codigoPastillaStock,
                    stock: cantidad,
                    precio_costo: costo,
                    precio_venta: venta,
                    id_pastilla: idPastilla
                })
            });

            if (insertResponse.ok) {
                alert('Producto agregado al stock correctamente.');
                // Aquí puedes agregar lógica para limpiar campos o cerrar el modal
            } else {
                alert('Error al agregar el producto al stock.');
            }
        }
    } catch (error) {
        console.error('Error en la operación:', error);
        alert('Ocurrió un error. Intenta de nuevo.');
    }
});


//------------------------------------------ BUSQUEDA VEHICULO CRUD

GestionDetallePastilla.addEventListener('click', async (e) => {
    e.preventDefault();
    consultaContainer.classList.add('hidden');
    vehiculoContainer.classList.add('hidden');
    stockContainer.classList.add('hidden');
    crudContainer.classList.add('hidden');
    nav.classList.remove('visible');
    crud_container_consulta_vehiculo.classList.remove('hidden');
});


//obtenemos lo que tiene el input para modelo
const inputcodigopastillitaCrud = document.getElementById('input-pastillaCodigo-crud');

//obtenemos la tabla su body
const resultBodyVehiculoCrud = document.getElementById('vehiculo-body-crud');

//obtenemos toda la tabla
const resultTableVehiculoCrud = document.getElementById('tabla_modelo_crud');




inputcodigopastillitaCrud.addEventListener('input', async () => {
    //limpiamos los otros inputs

    const codigoPastillaCrud = inputcodigopastillitaCrud.value.trim();

    if (codigoPastillaCrud.length >= 2) {
        await buscarPastilla6();
    } else {
        resultBodyVehiculoCrud.innerHTML = '';
        resultTableVehiculoCrud.classList.add('hidden');
    }
});




//--------------- BUSCAR POR PASTILLA -----------------

//El input empieza a escuchar pra MARCA

async function buscarPastilla6() {
    const codigoPastilla = inputcodigopastillitaCrud.value.trim();

    if (codigoPastilla === '') {
        return;
    }

    try {
        const response = await fetch(`/buscar-pastilla-pastillita-Crud?codigo=${codigoPastilla}`);

        if (!response.ok) {
            throw new Error('Error en la respuesta de la red.');
        }

        const data = await response.json();
        resultBodyVehiculoCrud.innerHTML = '';

        if (data.length === 0) {
            resultBodyVehiculoCrud.innerHTML = '<tr><td colspan="4">No se encontraron resultados.</td></tr>';
        } else {
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id_detalle}</td>
                    <td>${row.id_pastilla}</td>
                    <td>${row.nombre_marca || 'No disponible'}</td> <!-- Cambiado aquí para mostrar el nombre de la marca -->
                    <td>${row.detalle_serie_modelo}</td>
                    <td>
                        <a href="#editarCrudBusquedaModelo" class="edit" data-toggle="modal" data-id-detalle="${row.id_detalle}" data-id-pastilla="${row.id_pastilla}">
                            <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                        </a>

                        <a class="delete" data-toggle="modal" data-id="${row.id_detalle}">
                            <i class="material-icons" data-toggle="tooltip">&#xE872;</i>
                        </a>


   
                    </td>
                `;
                resultBodyVehiculoCrud.appendChild(tr);
            });
            
        }

        resultTableVehiculoCrud.classList.remove('hidden');
    } catch (error) {
        console.error('Error al buscar pastilla', error);
        alert('Hubo un problema al realizar la búsqueda. Verifique la consola para más detalles.');
    }
};

//Traemos los datos a la label

// Escuchar eventos en los botones de edición en la tabla
// Escuchar eventos en los botones de edición en la tabla
document.addEventListener('click', function (event) {
    if (event.target.closest('.edit')) {
        const editButton = event.target.closest('.edit');
        
        // Obtener los valores de los atributos data-id-detalle y data-id-pastilla
        const idDetalle = editButton.getAttribute('data-id-detalle');
        const idPastilla = editButton.getAttribute('data-id-pastilla');
        
        // Obtener el valor de la columna "detalle_serie_modelo" de la fila correspondiente
        const detalleSerieModelo = editButton.closest('tr').querySelector('td:nth-child(4)').textContent;

        // Colocar los valores en las etiquetas e input correspondientes en el modal
        const modal = document.querySelector('#editarCrudBusquedaModelo');
        modal.querySelector('#lableIdDetalleBusquedaCrud').textContent = idDetalle;
        modal.querySelector('#lableIdPastillaBusquedaCrud').textContent = idPastilla;
        modal.querySelector('#inputModalDetalleSerieModelo').value = detalleSerieModelo;

        // Mostrar el modal
        $('#editarCrudBusquedaModelo').modal('show');
    }
});

//Rellenamos el select con las marcas
// Función para cargar las marcas en el select
async function cargarMarcas() {
    try {
        const response = await fetch('/obtener-marcas');
        const marcas = await response.json();
        
        const selectMarca = document.querySelector('#selectMarca');
        
        selectMarca.innerHTML = '<option value="" disabled selected>Seleccione la marca</option>'; // Resetear opciones
        
        marcas.forEach(marca => {
            const option = document.createElement('option');
            option.value = marca.id;
            option.textContent = marca.nombre;
            selectMarca.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las marcas:', error);
    }
}

// Escuchar eventos en los botones de edición en la tabla
document.addEventListener('click', function (event) {
    if (event.target.closest('.edit')) {
        const editButton = event.target.closest('.edit');
        
        // Obtener los valores de los atributos data-id-detalle y data-id-pastilla
        const idDetalle = editButton.getAttribute('data-id-detalle');
        const idPastilla = editButton.getAttribute('data-id-pastilla');
        
        // Obtener el valor de la columna "detalle_serie_modelo" de la fila correspondiente
        const detalleSerieModelo = editButton.closest('tr').querySelector('td:nth-child(4)').textContent;

        // Colocar los valores en las etiquetas e input correspondientes en el modal
        const modal = document.querySelector('#editarCrudBusquedaModelo');
        modal.querySelector('#lableIdDetalleBusquedaCrud').textContent = idDetalle;
        modal.querySelector('#lableIdPastillaBusquedaCrud').textContent = idPastilla;
        modal.querySelector('#inputModalDetalleSerieModelo').value = detalleSerieModelo;

        // Cargar las marcas en el select
        cargarMarcas();

        // Mostrar el modal
        $('#editarCrudBusquedaModelo').modal('show');
    }
});

//Mandamos el update table al presionar el boton
document.getElementById('actualizarVehiculoCrud').addEventListener('click', async () => {
    const id_detalle = document.getElementById('lableIdDetalleBusquedaCrud').innerText; // Obtener ID Detalle
    const id_pastilla = document.getElementById('lableIdPastillaBusquedaCrud').innerText; // Obtener ID Pastilla
    const id_marca = document.getElementById('selectMarca').value; // Obtener ID Marca
    const detalle_serie_modelo = document.getElementById('inputModalDetalleSerieModelo').value; // Obtener Detalle Serie Modelo

    const data = {
        id_detalle,
        id_pastilla,
        id_marca,
        detalle_serie_modelo
    };

    try {
        const response = await fetch('/actualizar-pastilla', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (response.ok) {
            alert(result.message); // Muestra mensaje de éxito
            // Aquí puedes cerrar el modal o realizar cualquier otra acción necesaria
            $('#editarCrudBusquedaModelo').modal('hide');
            // También podrías recargar la tabla o realizar otra consulta para mostrar los datos actualizados
        } else {
            alert(result.message); // Muestra mensaje de error
        }
    } catch (error) {
        console.error('Error al realizar la actualización:', error);
        alert('Error al realizar la actualización.');
    }
});


// Captura el evento de clic en el botón de eliminar
// Captura el evento de clic en el botón de eliminar
// Captura el evento de clic en el botón de eliminar
// Captura el evento de clic en el botón de eliminar
// Captura el evento de clic en el botón de eliminar
// Captura el evento de clic en el botón de eliminar
// Captura el evento de clic en el botón de eliminar
document.addEventListener('click', (event) => {
    if (event.target.closest('.delete')) {
        const idDetalle = event.target.closest('.delete').dataset.id; // Obtener el ID desde el atributo data-id
        
        // Mostrar un mensaje de confirmación antes de eliminar
        const confirmation = confirm(`¿Deseas eliminar el registro ${idDetalle}?`);
        
        if (confirmation) {
            // Si el usuario acepta, procede con la eliminación
            eliminarRegistro(idDetalle);
        }
    }
});

// Función para eliminar el registro
async function eliminarRegistro(idDetalle) {
    try {
        // Aquí podrías cerrar cualquier modal que esté abierto antes de eliminar
        $('#deleteEmployeeModal').modal('hide'); // Asegúrate de que este es el modal que deseas ocultar
        
        const response = await fetch(`/eliminar-pastilla/${idDetalle}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error en la eliminación del registro.');
        }

        alert('Registro eliminado exitosamente.');
        buscarPastilla6(); // Actualiza la tabla después de eliminar
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
        alert('Hubo un problema al eliminar el registro. Verifique la consola para más detalles.');
    }
}

//Funcion para agregar un nuevo record

// Rellenamos el select con las marcas
async function cargarMarcas2() {
    try {
        const response = await fetch('/obtener-marcas');
        const marcas = await response.json();
        
        const selectMarca = document.querySelector('#selectMarcaModelo'); // Cambiado a 'selectMarcaModelo'
        
        selectMarca.innerHTML = '<option value="" disabled selected>Seleccione la marca</option>'; // Resetear opciones
        
        marcas.forEach(marca => {
            const option = document.createElement('option');
            option.value = marca.id; // Asegúrate de que 'marca.id' y 'marca.nombre' sean correctos
            option.textContent = marca.nombre;
            selectMarca.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las marcas:', error);
    }
}

// Escuchar el evento de mostrar el modal
$('#modalAddpastilla_detalle_serie_modelo').on('show.bs.modal', function (e) {
    cargarMarcas2(); // Llamar a la función para cargar marcas
});

//Rellenamos el select de MFpastillas global
// Función para cargar las pastillas en el select
async function cargarPastillas() {
    try {
        const response = await fetch('/get-pastillas');
        const pastillas = await response.json();
        
        const selectPastilla = document.querySelector('#GlobalPastillaModelo'); // ID del select

        selectPastilla.innerHTML = '<option value="" disabled selected>Seleccione el código</option>'; // Resetear opciones
        
        pastillas.forEach(pastilla => {
            const option = document.createElement('option');
            option.value = pastilla.id_pastilla; // Asegúrate de que 'pastilla.id_pastilla' sea el campo correcto
            option.textContent = pastilla.id_pastilla; // Puedes cambiar esto si deseas mostrar otro texto
            selectPastilla.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las pastillas:', error);
    }
}

// Escuchar el evento de mostrar el modal
$('#modalAddpastilla_detalle_serie_modelo').on('show.bs.modal', function (e) {
    cargarPastillas(); // Llamar a la función para cargar pastillas
});

//----------- acemos el insert into a la tabla en la base de datos

document.getElementById('btnAddModeloMarcarecord').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del botón

    // Obtener los valores de los campos
    const idPastilla = document.getElementById('GlobalPastillaModelo').value.trim();
    const idMarca = document.getElementById('selectMarcaModelo').value.trim();
    const detalleSerieModelo = document.getElementById('inputAddModelo').value.trim();

    // Imprimir valores en la consola para verificar
    console.log('ID Pastilla:', idPastilla);
    console.log('ID Marca:', idMarca);
    console.log('Detalle Serie Modelo:', detalleSerieModelo); // Asegúrate de que este campo no esté vacío

    // Verificar que todos los campos estén llenos
    if (!idPastilla || !idMarca || !detalleSerieModelo) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Crear el objeto con los datos a enviar
    const data = {
        id_pastilla: idPastilla,
        id_marca: idMarca,
        detalle_serie_modelo: detalleSerieModelo
    };

    try {
        const response = await fetch('/insertar-detalle-serie-modelo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Verificar la respuesta del servidor
        if (response.ok) {
            alert("Los datos se guardaron correctamente.");
            $('#modalAddpastilla_detalle_serie_modelo').modal('hide'); // Cerrar el modal
            document.getElementById('formAddModeloMarca').reset(); // Limpiar el formulario
        } else {
            const errorData = await response.json();
            alert("Error al guardar los datos: " + errorData.message);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        alert("Ocurrió un error al guardar los datos.");
    }
});









































//-------------------------------------------------------------------------------------------------------------
//-********************* FACTURAS ***/*/***********************************************- */

const addProductButton = document.getElementById('add-product');
const invoiceTableBody = document.querySelector('#invoice-table tbody');
const totalElement = document.getElementById('total');

addProductButton.addEventListener('click', () => {
    const idProducto = document.getElementById('id_producto_factura').value;
    const descripcion = document.getElementById('descripcion_factura').value;
    const precio = parseFloat(document.getElementById('precio_factura').value);
    const cantidad = parseInt(document.getElementById('cantidad_factura').value);

    // Validar que todos los campos estén llenos
    if (idProducto && descripcion && !isNaN(precio) && precio > 0 && !isNaN(cantidad) && cantidad > 0) {
        const subtotal = precio * cantidad;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${idProducto}</td>
            <td>${descripcion}</td>
            <td>${precio.toFixed(2)}</td>
            <td>${cantidad}</td>
            <td class="subtotal">${subtotal.toFixed(2)}</td>
            <td><button class="delete-product">-</button></td>
        `;
        
        invoiceTableBody.appendChild(newRow);
        
        updateTotal();
        
        // Limpiar campos después de agregar el producto
        document.getElementById('id_producto_factura').value = '';
        document.getElementById('descripcion_factura').value = '';
        document.getElementById('precio_factura').value = '';
        document.getElementById('cantidad_factura').value = '';

        

    } else {
        alert('Por favor, complete todos los campos correctamente.');
    }
});


// Función para cargar los clientes en el select
async function loadClientes() {
    try {
        const response = await fetch('/clientes'); // Asegúrate de que esta ruta sea correcta
        const clientes = await response.json();

        const clienteSelect = document.getElementById('cliente_factura');

        // Limpiar opciones previas
        clienteSelect.innerHTML = '<option value="">Seleccione un cliente</option>';

        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.nit; // Almacena el NIT como valor del option
            option.textContent = cliente.display; // Utiliza el valor de display
            option.dataset.display = cliente.display; // Almacena el display en un atributo de datos
            clienteSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los clientes:', error);
    }
}

// Escuchar el cambio en el select
document.getElementById('cliente_factura').addEventListener('change', (event) => {
    const selectedOption = event.target.selectedOptions[0]; // Obtiene la opción seleccionada

    if (selectedOption) {
        // Dividir el display en partes
        const displayParts = selectedOption.dataset.display.split(' - ');

        // Asegúrate de que la longitud sea correcta antes de asignar
        if (displayParts.length === 4) {
            document.getElementById('cliente_input_factura').value = displayParts[1]; // Nombre
            document.getElementById('nit_factura').value = displayParts[0]; // NIT
            document.getElementById('direccion_factura').value = displayParts[3]; // Dirección
            document.getElementById('telefono_factura').value = displayParts[2]; // Teléfono
        }
    }
});



// Escuchar el evento de clic en el select
document.getElementById('cliente_factura').addEventListener('click', loadClientes);


//----------------------- Cargamos los datos al select de IDPRODUCTO --------------------------- PRUEBAS ABAJO

// Función para cargar los productos en el select
document.getElementById('id_producto_factura').addEventListener('click', function() {
    // Verificar si ya se han cargado las opciones para evitar llamadas repetidas
    if (this.options.length > 1) return;

    // Hacer la solicitud al servidor para obtener los valores
    fetch('/productos')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('id_producto_factura'); // Asegúrate de que el id es correcto
            data.forEach(pastilla => {
                const option = document.createElement('option');
                option.value = pastilla.id_pastilla_venta; // ID del producto
                option.textContent = pastilla.id_pastilla_venta; // Texto del option
                option.dataset.precio = pastilla.precio_venta; // Almacena el precio en un atributo de datos
                option.dataset.idPastilla = pastilla.id_pastilla; // Almacena el id_pastilla en un atributo de datos
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar los id_producto_factura:', error);
        });
});

// Escuchar el cambio en el select para auto-rellenar el precio y cargar descripciones
document.getElementById('id_producto_factura').addEventListener('change', function(event) {
    const selectedOption = event.target.selectedOptions[0]; // Obtener la opción seleccionada
    const precioInput = document.getElementById('precio_factura'); // Input del precio
    const descripcionSelect = document.getElementById('descripcion_factura'); // Select de descripción

    // Limpiar descripciones anteriores
    descripcionSelect.innerHTML = '<option value="">Seleccione una descripción</option>'; // Limpiar opciones anteriores

    if (selectedOption) {
        const precioVenta = selectedOption.dataset.precio; // Obtener el precio almacenado
        const idPastilla = selectedOption.dataset.idPastilla; // Obtener el ID de la pastilla

        precioInput.value = precioVenta; // Rellenar el input de precio

        // Obtener las descripciones de la pastilla seleccionada
        fetch(`/detalles/${idPastilla}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(detalle => {
                    const option = document.createElement('option');
                    option.value = detalle.detalle_serie_modelo; // Asigna el detalle como valor del option
                    option.textContent = detalle.detalle_serie_modelo; // Asigna el detalle como texto visible
                    descripcionSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error al cargar los detalles de la pastilla:', error);
            });
    } else {
        precioInput.value = ''; // Limpiar si no hay opción seleccionada
    }
});

//TOTALIZAMOS

document.getElementById('add-product').addEventListener('click', function() {
    // Obtener valores de los campos
    const idProducto = document.getElementById('id_producto_factura').value;
    const descripcion = document.getElementById('descripcion_factura').value;
    const precio = parseFloat(document.getElementById('precio_factura').value);
    const cantidad = parseInt(document.getElementById('cantidad_factura').value);

    // Validar que todos los campos estén llenos
    if (idProducto && descripcion && !isNaN(precio) && !isNaN(cantidad) && cantidad > 0) {
        // Calcular subtotal
        const subtotal = precio * cantidad;

        // Crear una nueva fila en la tabla de la factura
        const tableBody = document.querySelector('#invoice-table tbody');
        const newRow = document.createElement('tr');

        // Llenar la fila con los datos
        newRow.innerHTML = `
            <td>${idProducto}</td>
            <td>${descripcion}</td>
            <td>${precio.toFixed(2)}</td>
            <td>${cantidad}</td>
            <td>${subtotal.toFixed(2)}</td>
            <td><button class="remove-product">Eliminar</button></td>
        `;

        // Agregar la nueva fila al cuerpo de la tabla
        tableBody.appendChild(newRow);

        // Actualizar el total
        updateTotal();

        // Limpiar los campos después de agregar el producto
        document.getElementById('id_producto_factura').value = '';
        document.getElementById('descripcion_factura').value = '';
        document.getElementById('precio_factura').value = '';
        document.getElementById('cantidad_factura').value = '';

        // Agregar evento para eliminar producto
        const removeButton = newRow.querySelector('.remove-product');
        removeButton.addEventListener('click', function() {
            tableBody.removeChild(newRow);
            updateTotal(); // Actualizar total después de eliminar un producto
        });
    } 
});

// Función para actualizar el total
function updateTotal() {
    const tableBody = document.querySelector('#invoice-table tbody');
    const rows = tableBody.querySelectorAll('tr');
    let total = 0;

    rows.forEach(row => {
        const subtotalCell = row.cells[4].textContent; // Obtiene el subtotal de la columna correspondiente
        total += parseFloat(subtotalCell); // Sumar al total
    });

    document.getElementById('total').textContent = total.toFixed(2); // Actualizar el total en el HTML
}

// Función para eliminar un producto de la tabla
function deleteProduct(event) {
    if (event.target.classList.contains('delete-product')) {
        const row = event.target.closest('tr'); // Obtiene la fila del botón presionado
        row.remove(); // Elimina la fila de la tabla
        updateTotal(); // Actualiza el total después de eliminar
    }
}

// Agregar evento para eliminar productos
invoiceTableBody.addEventListener('click', deleteProduct);









































});


