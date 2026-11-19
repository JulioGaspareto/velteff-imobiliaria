const service = require('../services/imoveis.service');

const FINALIDADES = ['aluguel', 'venda'];
const TIPOS = ['apartamento', 'casa', 'cobertura', 'terreno', 'comercial'];
const CAMPOS_NUMERICOS = ['precoMin', 'precoMax', 'quartos', 'banheiros', 'vagas'];

function lerTexto(valor, nome, erros) {
  if (valor === undefined || valor === '') return undefined;
  if (typeof valor !== 'string' || valor.trim().length > 80) {
    erros.push(`${nome} inválido`);
    return undefined;
  }
  return valor.trim();
}

function lerNumero(valor, nome, erros) {
  if (valor === undefined || valor === '') return undefined;
  const numero = Number(valor);
  if (typeof valor !== 'string' || !Number.isFinite(numero) || numero < 0) {
    erros.push(`${nome} deve ser um número maior ou igual a zero`);
    return undefined;
  }
  return numero;
}

async function listar(req, res, next) {
  try {
    const erros = [];
    const filtros = {};
    const { finalidade, tipo, cidade, bairro } = req.query;

    if (finalidade !== undefined && finalidade !== '') {
      if (!FINALIDADES.includes(finalidade)) erros.push('finalidade deve ser aluguel ou venda');
      else filtros.finalidade = finalidade;
    }

    if (tipo !== undefined && tipo !== '') {
      if (!TIPOS.includes(tipo)) erros.push(`tipo deve ser um destes: ${TIPOS.join(', ')}`);
      else filtros.tipo = tipo;
    }

    filtros.cidade = lerTexto(cidade, 'cidade', erros);
    filtros.bairro = lerTexto(bairro, 'bairro', erros);

    for (const campo of CAMPOS_NUMERICOS) {
      filtros[campo] = lerNumero(req.query[campo], campo, erros);
    }

    if (
      filtros.precoMin !== undefined &&
      filtros.precoMax !== undefined &&
      filtros.precoMin > filtros.precoMax
    ) {
      erros.push('precoMin não pode ser maior que precoMax');
    }

    if (erros.length > 0) {
      return res.status(400).json({ erro: 'Filtros inválidos', detalhes: erros });
    }

    const imoveis = await service.listar(filtros);
    res.json(imoveis);
  } catch (erro) {
    next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ erro: 'Identificador de imóvel inválido' });
    }

    const imovel = await service.buscarPorId(id);

    if (!imovel) {
      return res.status(404).json({ erro: 'Imóvel não encontrado' });
    }

    res.json(imovel);
  } catch (erro) {
    next(erro);
  }
}

module.exports = { listar, buscarPorId };
