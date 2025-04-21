// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
const busquedaRoutes = require('./routes/busqueda');
const mercadolibreRoutes = require('./routes/mercadolibre');
const amazonRoutes = require('./routes/amazon');
const testUserRoutes = require('./routes/testUser'); // opcional

app.use('/api/busqueda', busquedaRoutes);
app.use('/api/ml', mercadolibreRoutes);       // << 🔧 CAMBIADO
app.use('/api/amazon', amazonRoutes);
app.use('/api/testuser', testUserRoutes);     // << opcional

// Ruta raíz
app.get('/', (req, res) => {
    res.send('✅ API TeAprecios funcionando correctamente');
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
