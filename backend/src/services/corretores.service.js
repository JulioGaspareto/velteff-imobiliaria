const pool = require('../config/db');

async function listar() {
  const { rows } = await pool.query(
    'SELECT id, nome, telefone FROM corretores WHERE ativo = TRUE ORDER BY nome'
  );
  return rows;
}

module.exports = { listar };
