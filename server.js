const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { Client } = require('pg');
const path = require('path'); // Importa el módulo path

const app = express();
const port = 3000;

// Configura la conexión a la base de datos
const client = new Client({
    user: 'frenosdoveradmin',
    host: 'dpg-crfgalogph6c73881jm0-a.frankfurt-postgres.render.com',
    database: 'frenosdoverdb',
    password: 'UrrfE8fNkWyCo7kI3jIlwroa4JhEiPCs',
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    }
});

client.connect()
  .then(() => {
    console.log('Conexión exitosa a la base de datos.');
  })
  .catch(err => console.error('Error al conectar a la base de datos', err.stack));

// Configura el middleware de sesión
app.use(session({
    secret: 'mi_clave_secreta', // Cambia esto por una clave secreta real
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const query = 'SELECT * FROM usuariofrenosdover WHERE nombre_usuario = $1 AND password = $2';
        const result = await client.query(query, [username, password]);

        if (result.rows.length > 0) {
            req.session.authenticated = true; // Establece la sesión de autenticación
            res.json({ message: 'Usuario registrado' });
        } else {
            res.json({ message: 'El usuario no existe' });
        }
    } catch (error) {
        console.error('Error en la consulta', error.stack);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Ruta protegida
app.get('/success', (req, res) => {
    if (req.session.authenticated) {
        res.sendFile(path.join(__dirname, 'views', 'success.html'));
    } else {
        res.redirect('/'); // Redirige al inicio de sesión si no está autenticado
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Ruta para buscar pastilla
app.get('/buscar-pastilla', async (req, res) => {
    const { codigo } = req.query;

    if (!codigo) {
        return res.status(400).json({ message: 'El parámetro de búsqueda es obligatorio.' });
    }

    try {
        // Usar LIKE para buscar patrones que contengan el código ingresado
        const query = `
            SELECT * FROM mfPastilla
            WHERE id_pastilla ILIKE $1
        `;
        const result = await client.query(query, [`%${codigo}%`]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error en la consulta', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }


});


//********************************************************************************* */
// CONSULTA POR VEHICULO en el DIV // INPUT = MODELO
app.get('/buscar-pastilla-modelo', async (req, res) => {
    const { codigo } = req.query;

    if (!codigo) {
        return res.status(400).json({ message: 'El parámetro de búsqueda es obligatorio.' });
    }

    try {
        // Usar LIKE para buscar patrones que contengan el código ingresado
        const query = `
            SELECT 
                pd.ID_Detalle, 
                pd.ID_Pastilla, 
                m.nombre_marca, 
                pd.Detalle_Serie_Modelo 
            FROM 
                pastilla_detalle_serie_modelo pd
            JOIN 
                marca m ON pd.ID_Marca = m.ID_Marca
            WHERE 
                pd.Detalle_Serie_Modelo ILIKE $1
        `;
        const result = await client.query(query, [`%${codigo}%`]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error en la consulta', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


// CONSULTA POR VEHICULO en el DIV // INPUT = PASTILLA

app.get('/buscar-pastilla-pastillita', async (req, res) => {
    const { codigo } = req.query;

    if (!codigo) {
        return res.status(400).json({ message: 'El parámetro de búsqueda es obligatorio.' });
    }

    try {
        // Usar LIKE para buscar patrones que contengan el código ingresado
        const query = `
            SELECT 
                pd.ID_Detalle, 
                pd.ID_Pastilla, 
                m.nombre_marca, 
                pd.Detalle_Serie_Modelo 
            FROM 
                pastilla_detalle_serie_modelo pd
            JOIN 
                marca m ON pd.ID_Marca = m.ID_Marca
            WHERE 
                pd.ID_Pastilla ILIKE $1
        `;
        const result = await client.query(query, [`%${codigo}%`]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error en la consulta', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});



//**-*-------------------------------------------------------------*------------------------------------------------

//STocks
app.get('/buscar-stock', async (req, res) => {
    const { codigo } = req.query;

    if (!codigo) {
        return res.status(400).json({ message: 'El parámetro de búsqueda es obligatorio.' });
    }

    try {
        // Usar LIKE para buscar patrones que contengan el código ingresado
        const query = `
            SELECT * FROM stock
            WHERE id_pastilla_venta ILIKE $1
        `;
        const result = await client.query(query, [`%${codigo}%`]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error en la consulta', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

app.get('/buscar-stock2', async (req, res) => {
    const { codigo } = req.query;

    if (!codigo) {
        return res.status(400).json({ message: 'El parámetro de búsqueda es obligatorio.' });
    }

    try {
        // Usar LIKE para buscar patrones que contengan el código ingresado
        const query = `
            SELECT * FROM stock
            WHERE id_pastilla_venta ILIKE $1
        `;
        const result = await client.query(query, [`%${codigo}%`]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error en la consulta', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

//Exportar STOCK a excel haciendo un SELCT * FROM STOCK--------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const ExcelJS = require('exceljs');

app.get('/exportar-stock', async (req, res) => {
    try {
        const query = 'SELECT * FROM stock';
        const result = await client.query(query);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No hay datos disponibles.' });
        }

        // Crear un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('FrenosDoverStock');

        // Agregar las columnas
        worksheet.columns = [
            { header: 'ID Pastilla', key: 'id_pastilla_venta', width: 15, alignment: { horizontal: 'center' }  },
            { header: 'Cantidad', key: 'stock', width: 8, alignment: { horizontal: 'center' }  },
            { header: 'Precio Costo', key: 'precio_costo', width: 15, alignment: { horizontal: 'center' }  },
            { header: 'Precio Venta', key: 'precio_venta', width: 15, alignment: { horizontal: 'center' }  },
            { header: 'ID Pastilla General', key: 'id_pastilla', width: 30, alignment: { horizontal: 'center' }  },
        ];

        // Centrar los encabezados
        worksheet.columns.forEach(column => {
        column.headerStyle = { alignment: { vertical: 'middle', horizontal: 'center' } };
        });

        // Agregar las filas con los datos de la consulta
        result.rows.forEach(row => {
            worksheet.addRow({
                id_pastilla_venta: row.id_pastilla_venta,
                stock: row.stock,
                precio_costo: row.precio_costo,
                precio_venta: row.precio_venta,
                id_pastilla: row.id_pastilla
            });
        });

        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell) => {
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
            });
        });

        // Generar el archivo Excel y enviarlo como respuesta
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=stock.xlsx');

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error('Error al generar el archivo Excel', error);
        res.status(500).json({ message: 'Error al generar el archivo Excel.' });
    }
});



//*************UPDATE TABLE STOCK******* */

// Ruta para actualizar el stock
app.post('/update-stock', async (req, res) => {
    const { codigoPastilla, cantidad, costo, venta, codigoPastillaGlobal } = req.body;

    try {
        const query = `
            UPDATE stock
            SET stock = $1, precio_costo = $2, precio_venta = $3, id_pastilla = $4
            WHERE id_pastilla_venta = $5
        `;
        const values = [cantidad, costo, venta, codigoPastillaGlobal, codigoPastilla];

        const result = await client.query(query, values);

        if (result.rowCount > 0) {
            res.json({ message: 'Stock actualizado correctamente.' });
        } else {
            res.status(404).json({ message: 'No se encontró el registro para actualizar.' });
        }
    } catch (error) {
        console.error('Error al actualizar el stock', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

//METODO PARA ELIMINAR -----------------------------------  ------------------------------------------------------------------------------

//METODO PARA ELIMINAR -----------------------------------  ------------------------------------------------------------------------------

//METODO PARA ELIMINAR -----------------------------------  ------------------------------------------------------------------------------

app.delete('/delete-product/:id', async (req, res) => {
    const id_pastilla_venta = req.params.id;

    try {
        const result = await client.query('DELETE FROM stock WHERE id_pastilla_venta = $1', [id_pastilla_venta]);

        if (result.rowCount > 0) {
            console.log('Producto eliminado exitosamente'); // Agrega este log
            res.json({ message: 'Producto eliminado exitosamente.' });
        } else {
            console.log('Producto no encontrado'); // Agrega este log
            res.status(404).json({ message: 'Producto no encontrado.' });
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto.' });
    }
});

//------------------------------------------------------------------------------------
//  ---------------- INGRESAMOS UN NUEVO PRODUCTO
//Retornamos todos los valores de la columna "id_pastilla" en la tabla MFPASTILLA

app.get('/get-pastillas', async (req, res) => {
    try {
        const result = await client.query('SELECT id_pastilla FROM MFPASTILLA');
        res.json(result.rows); // Enviamos el resultado como JSON
    } catch (error) {
        console.error('Error al obtener los id_pastilla:', error);
        res.status(500).json({ message: 'Error al obtener los id_pastilla.' });
    }
});


//Agregamos MF pastilla
// Endpoint para insertar un nuevo producto
app.post('/insertar-pastilla', async (req, res) => {
    const { id_pastilla, lado_pastilla, dimension_pastilla } = req.body;

    try {
        const result = await client.query(
            'INSERT INTO mfPastilla (id_pastilla, lado_pastilla, dimension_pastilla) VALUES ($1, $2, $3)',
            [id_pastilla, lado_pastilla, dimension_pastilla]
        );
        res.status(201).json({ message: 'Pastilla agregada exitosamente.' });
    } catch (error) {
        console.error('Error al insertar la pastilla:', error);
        res.status(500).json({ message: 'Error al agregar la pastilla.' });
    }
});

//erificar si el código existe en STOCK
app.get('/verificar-codigo/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    try {
        const result = await client.query('SELECT id_pastilla_venta FROM stock WHERE id_pastilla_venta = $1', [codigo]);
        res.json({ existe: result.rowCount > 0 }); // Retorna true si existe
    } catch (error) {
        console.error('Error al verificar código:', error);
        res.status(500).json({ message: 'Error al verificar el código.' });
    }
});

//Agregar el stock:

app.post('/agregar-stock', async (req, res) => {
    const { id_pastilla_venta, stock, precio_costo, precio_venta, id_pastilla } = req.body;
    try {
        await client.query('INSERT INTO stock (id_pastilla_venta, stock, precio_costo, precio_venta, id_pastilla) VALUES ($1, $2, $3, $4, $5)', [id_pastilla_venta, stock, precio_costo, precio_venta, id_pastilla]);
        res.status(201).json({ message: 'Stock agregado correctamente.' });
    } catch (error) {
        console.error('Error al agregar stock:', error);
        res.status(500).json({ message: 'Error al agregar el stock.' });
    }
});


//-------------------------Consulta Vehiculo CRUD

app.get('/buscar-pastilla-pastillita-Crud', async (req, res) => {
    const { codigo } = req.query;

    if (!codigo) {
        return res.status(400).json({ message: 'El parámetro de búsqueda es obligatorio.' });
    }

    try {
        // Usar LIKE para buscar patrones que contengan el código ingresado
        const query = `
            SELECT 
                pd.ID_Detalle, 
                pd.ID_Pastilla, 
                m.nombre_marca, 
                pd.Detalle_Serie_Modelo 
            FROM 
                pastilla_detalle_serie_modelo pd
            JOIN 
                marca m ON pd.ID_Marca = m.ID_Marca
            WHERE 
                pd.ID_Pastilla ILIKE $1
        `;
        const result = await client.query(query, [`%${codigo}%`]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error en la consulta', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Ruta para obtener las marcas
app.get('/obtener-marcas', async (req, res) => {
    try {
        const query = 'SELECT id_marca, nombre_marca FROM marca';
        const result = await client.query(query);

        // Concatenar nombre_marca e id_marca
        const marcas = result.rows.map(row => ({
            id: row.id_marca,
            nombre: `${row.nombre_marca} - ${row.id_marca}`
        }));

        res.json(marcas);
    } catch (error) {
        console.error('Error en la consulta de marcas', error);
        res.status(500).json({ message: 'Error al obtener las marcas' });
    }
});

//Mandamos el update table a series modelo vehiculo 

// Ruta para actualizar el detalle de serie modelo
app.put('/actualizar-pastilla', async (req, res) => {
    const { id_detalle, id_pastilla, id_marca, detalle_serie_modelo } = req.body;

    if (!id_detalle || !id_pastilla || !id_marca || !detalle_serie_modelo) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const query = `
            UPDATE pastilla_detalle_serie_modelo
            SET id_pastilla = $1, id_marca = $2, detalle_serie_modelo = $3
            WHERE id_detalle = $4
        `;
        await client.query(query, [id_pastilla, id_marca, detalle_serie_modelo, id_detalle]);
        
        res.json({ message: 'Actualización exitosa.' });
    } catch (error) {
        console.error('Error al actualizar el detalle:', error);
        res.status(500).json({ message: 'Error al actualizar el detalle.' });
    }
});

//Eliminar el registro

// Ruta para eliminar un registro por ID
// Ruta para eliminar un registro por ID
app.delete('/eliminar-pastilla/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM pastilla_detalle_serie_modelo WHERE id_detalle = $1';
        const result = await client.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Registro no encontrado.' });
        }

        res.status(200).json({ message: 'Registro eliminado exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
});

//----------- INSERT INTO la tabla de modelo detalle 

app.post('/insertar-detalle-serie-modelo', async (req, res) => {
    const { id_pastilla, id_marca, detalle_serie_modelo } = req.body;

    // Comprobación de si los valores son válidos
    if (!id_pastilla || !id_marca || !detalle_serie_modelo) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try {
        const query = `
            INSERT INTO pastilla_detalle_serie_modelo (id_pastilla, id_marca, detalle_serie_modelo)
            VALUES ($1, $2, $3)
        `;
        
        // Ejecutar la consulta
        await client.query(query, [id_pastilla, id_marca, detalle_serie_modelo]);
        res.status(201).json({ message: 'Registro guardado correctamente.' });
    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).json({ message: 'Error al guardar los datos.' });
    }
});




























    





//------------------- FACTURA ----------------

// Ruta para obtener todos los clientes
app.get('/clientes', async (req, res) => {
    try {
        const query = 'SELECT nit, nombre, telefono, direccion FROM clientes';
        const result = await client.query(query);

        // Formatear los resultados en el formato requerido
        const clientes = result.rows.map(cliente => ({
            display: `${cliente.nit} - ${cliente.nombre} - ${cliente.telefono} - ${cliente.direccion}`,
            nit: cliente.nit
        }));

        res.json(clientes);
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        res.status(500).json({ message: 'Error al obtener los clientes.' });
    }
});




//Cargamos los datos a PARA AGREGAR PRODUCTO, TODOS SUS CAMPOS Y LOS SELCT
// Cargamos los datos a ID PRODUCTO
app.get('/productos', async (req, res) => {
    try {
        const result = await client.query('SELECT id_pastilla_venta, id_pastilla, precio_venta FROM stock'); // Incluye id_pastilla
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json('Error del servidor');
    }
});

// Ruta para obtener detalles de la pastilla basada en el ID de la pastilla
app.get('/detalles/:idPastilla', async (req, res) => {
    const { idPastilla } = req.params; // Obtener el ID de la pastilla de los parámetros
    try {
        const result = await client.query('SELECT detalle_serie_modelo FROM pastilla_detalle_serie_modelo WHERE id_pastilla = $1', [idPastilla]);
        res.json(result.rows); // Devuelve los detalles en formato JSON
    } catch (error) {
        console.error('Error al obtener los detalles de la pastilla:', error);
        res.status(500).json('Error del servidor');
    }
});




























    























