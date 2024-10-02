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
// Ruta para buscar pastilla
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





//**-*-------------------------------------------------------------*------------------------------------------------

//STock





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









    























