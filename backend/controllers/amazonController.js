const productos = require('../data/productosAmazonSimulados');

async function buscarAmazon(query) {
    const resultados = productos.filter((producto) =>
        producto.title.toLowerCase().includes(query.toLowerCase())
    );
    return resultados;
}

module.exports = { buscarAmazon };
