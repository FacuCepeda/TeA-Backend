const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const busquedaRoutes = require('./routes/busqueda');
const mercadolibreRoutes = require('./routes/mercadolibre');
const amazonRoutes = require('./routes/amazon');
// const testUserRoutes = require('./routes/testUser'); // habilitar si lo necesitás

app.use('/buscar', busquedaRoutes);
app.use('/mercadolibre', mercadolibreRoutes);
app.use('/amazon', amazonRoutes);
// app.use('/testuser', testUserRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.send('✅ API TeAprecios funcionando correctamente');
});

// Inicialización
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
