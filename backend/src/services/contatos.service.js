const pool = require('../config/db');

async function criar({ nome, email, telefone, mensagem, imovelId }) {
  const { rows } = await pool.query(
    `
    INSERT INTO mensagens_contato (nome, email, telefone, mensagem, imovel_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, criado_em
    `,
    [nome, email, telefone, mensagem, imovelId]
  );

  return { id: rows[0].id, criadoEm: rows[0].criado_em };
}

module.exports = { criar };
