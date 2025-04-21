// backend/routes/testUser.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        const response = await axios.post(
            'https://api.mercadolibre.com/users/test_user',
            { site_id: 'MLA' }, // Argentina
            {
                headers: {
                    Authorization: `Bearer ${process.env.MELI_ACCESS_TOKEN}`
                }
            }
        );

        res.status(201).json({
            mensaje: '✅ Usuario de prueba creado correctamente',
            usuario: response.data
        });
    } catch (error) {
        console.error('❌ Error creando test user:', error.response?.data || error.message);
        res.status(500).json({ error: 'No se pudo crear el usuario de prueba' });
    }
});

module.exports = router;
