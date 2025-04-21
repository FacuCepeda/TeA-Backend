const express = require('express');
const router = express.Router();
const { buscarAmazon } = require('../controllers/amazonController');

router.get('/productos', (req, res) => {
    res.json(require('../data/productosAmazonSimulados'));
});

router.get('/buscar', async (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Falta el parámetro "q"' });

    try {
        const resultados = await buscarAmazon(q);
        res.json(resultados);
    } catch (error) {
        console.error('❌ Error al buscar productos en Amazon (simulado):', error);
        res.status(500).json({ error: 'Error al buscar productos en Amazon' });
    }
});

module.exports = router;
