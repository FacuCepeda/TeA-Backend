// controllers/testUserController.js
const axios = require('axios');

const crearUsuarioDePrueba = async () => {
  const ACCESS_TOKEN = process.env.ML_ACCESS_TOKEN;
  const siteId = 'MLA'; // Argentina

  try {
    const response = await axios.post(
      'https://api.mercadolibre.com/users/test_user',
      { site_id: siteId },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error('❌ Error al crear usuario de prueba:', error.response?.data || error.message);
    throw new Error('No se pudo crear el usuario de prueba');
  }
};

module.exports = { crearUsuarioDePrueba };
