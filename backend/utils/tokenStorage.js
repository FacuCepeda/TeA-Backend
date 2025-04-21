// utils/tokenStorage.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'tokens.json');

function guardarTokens(tokens) {
  fs.writeFileSync(filePath, JSON.stringify(tokens, null, 2));
}

function obtenerTokens() {
  if (!fs.existsSync(filePath)) return null;
  const contenido = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(contenido);
}

module.exports = {
  guardarTokens,
  obtenerTokens
};
