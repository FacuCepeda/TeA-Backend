// controllers/amazonController.js

const productosAmazonSimulados = require('../data/productosAmazonSimulados');

const buscarAmazon = async (query) => {
    const q = query.toLowerCase();
    return productosAmazonSimulados.filter(producto =>
        producto.title.toLowerCase().includes(q)
    );
};

module.exports = { buscarAmazon };
