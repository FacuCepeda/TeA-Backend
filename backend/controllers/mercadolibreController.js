// controllers/mercadolibreController.js
const axios = require('axios');

let accessToken = null;

const setAccessToken = (token) => {
    accessToken = token;
};

const buscarEnMercadoLibre = async (query) => {
    if (!accessToken) throw new Error('Token de acceso no disponible');

    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    return response.data.results.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        currency: item.currency_id,
        thumbnail: item.thumbnail,
        permalink: item.permalink,
    }));
};

module.exports = {
    buscarEnMercadoLibre,
    setAccessToken,
};
