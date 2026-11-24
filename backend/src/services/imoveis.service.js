const pool = require('../config/db');

function escaparCuringas(texto) {
  return texto.replace(/[\\%_]/g, '\\$&');
}

async function listar(filtros) {
  const condicoes = ["i.status = 'disponivel'"];
  const valores = [];

  const adicionar = (trecho, valor) => {
    valores.push(valor);
    condicoes.push(trecho.replace('?', `$${valores.length}`));
  };

  if (filtros.finalidade) adicionar('i.finalidade = ?', filtros.finalidade);
  if (filtros.tipo) adicionar('i.tipo = ?', filtros.tipo);
  if (filtros.cidade) adicionar('i.cidade ILIKE ?', `%${escaparCuringas(filtros.cidade)}%`);
  if (filtros.bairro) adicionar('i.bairro ILIKE ?', `%${escaparCuringas(filtros.bairro)}%`);
  if (filtros.precoMin !== undefined) adicionar('i.preco >= ?', filtros.precoMin);
  if (filtros.precoMax !== undefined) adicionar('i.preco <= ?', filtros.precoMax);
  if (filtros.quartos !== undefined) adicionar('i.quartos >= ?', filtros.quartos);
  if (filtros.banheiros !== undefined) adicionar('i.banheiros >= ?', filtros.banheiros);
  if (filtros.vagas !== undefined) adicionar('i.vagas >= ?', filtros.vagas);

  const sql = `
    SELECT
      i.id, i.titulo, i.finalidade, i.tipo, i.preco, i.bairro, i.cidade,
      i.quartos, i.banheiros, i.vagas, i.area,
      (
        SELECT f.url
        FROM fotos_imovel f
        WHERE f.imovel_id = i.id
        ORDER BY f.principal DESC, f.ordem ASC
        LIMIT 1
      ) AS foto_principal
    FROM imoveis i
    WHERE ${condicoes.join(' AND ')}
    ORDER BY i.criado_em DESC, i.id DESC
  `;

  const { rows } = await pool.query(sql, valores);
  return rows;
}

async function buscarPorId(id) {
  const { rows } = await pool.query(
    `
    SELECT
      i.id, i.titulo, i.finalidade, i.tipo, i.preco, i.bairro, i.cidade,
      i.quartos, i.banheiros, i.vagas, i.area, i.descricao, i.criado_em,
      c.nome AS corretor_nome, c.telefone AS corretor_telefone
    FROM imoveis i
    LEFT JOIN corretores c ON c.id = i.corretor_id
    WHERE i.id = $1 AND i.status = 'disponivel'
    `,
    [id]
  );

  if (rows.length === 0) return null;

  const fotos = await pool.query(
    `
    SELECT id, url, principal, ordem
    FROM fotos_imovel
    WHERE imovel_id = $1
    ORDER BY principal DESC, ordem ASC
    `,
    [id]
  );

  return { ...rows[0], fotos: fotos.rows };
}

module.exports = { listar, buscarPorId };
