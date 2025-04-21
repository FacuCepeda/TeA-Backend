const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const tokenPath = path.join(__dirname, '../tokens.json');

function leerTokens() {
  if (!fs.existsSync(tokenPath)) {
    return {
      access_token: '',
      refresh_token: '',
      expires_in: 0,
      obtained_at: 0
    };
  }
  return JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
}

function guardarTokens(tokens) {
  fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));
}

function tokenExpirado(tokens) {
  const ahora = Math.floor(Date.now() / 1000); // en segundos
  return (ahora > (tokens.obtained_at + tokens.expires_in - 60)); // 1 minuto de margen
}

async function obtenerTokenValido() {
  let tokens = leerTokens();

  if (!tokens.access_token || tokenExpirado(tokens)) {
    if (!tokens.refresh_token) {
      throw new Error("No hay refresh_token disponible para renovar el access_token.");
    }

    console.log("🔄 Token expirado. Renovando...");

    try {
      const response = await axios.post('https://api.mercadolibre.com/oauth/token', null, {
        params: {
          grant_type: 'refresh_token',
          client_id: process.env.ML_CLIENT_ID,
          client_secret: process.env.ML_CLIENT_SECRET,
          refresh_token: tokens.refresh_token
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const { access_token, refresh_token, expires_in } = response.data;

      const nuevosTokens = {
        access_token,
        refresh_token,
        expires_in,
        obtained_at: Math.floor(Date.now() / 1000)
      };

      guardarTokens(nuevosTokens);
      tokens = nuevosTokens;

    } catch (err) {
      console.error("❌ Error al renovar token:", err.response?.data || err.message);
      throw new Error("Fallo la renovación del token.");
    }
  }

  return tokens.access_token;
}

module.exports = {
  obtenerTokenValido,
  guardarTokens
};
