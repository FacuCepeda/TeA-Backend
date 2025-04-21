const express = require('express');
const router = express.Router();
const { buscarProductos } = require('../controllers/busquedaController');

router.get('/', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Falta el parámetro de búsqueda "q"' });

    try {
        const resultados = await buscarProductos(query);
        res.json({ resultados });
    } catch (error) {
        console.error('❌ Error general en la búsqueda:', error.message);
        res.status(500).json({ error: 'Error al buscar productos' });
    }
});

module.exports = router;
