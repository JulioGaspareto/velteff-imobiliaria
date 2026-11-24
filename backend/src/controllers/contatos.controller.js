const service = require('../services/contatos.service');

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function criar(req, res, next) {
  try {
    const corpo = req.body || {};
    const erros = [];

    const nome = typeof corpo.nome === 'string' ? corpo.nome.trim() : '';
    const email = typeof corpo.email === 'string' ? corpo.email.trim() : '';
    const mensagem = typeof corpo.mensagem === 'string' ? corpo.mensagem.trim() : '';
    let telefone = null;
    let imovelId = null;

    if (nome.length < 2 || nome.length > 100) {
      erros.push('nome é obrigatório e deve ter entre 2 e 100 caracteres');
    }

    if (!REGEX_EMAIL.test(email) || email.length > 150) {
      erros.push('e-mail inválido');
    }

    if (mensagem.length < 5 || mensagem.length > 1000) {
      erros.push('mensagem é obrigatória e deve ter entre 5 e 1000 caracteres');
    }

    if (corpo.telefone !== undefined && corpo.telefone !== null && corpo.telefone !== '') {
      const digitos = typeof corpo.telefone === 'string' ? corpo.telefone.replace(/\D/g, '') : '';
      if (digitos.length < 10 || digitos.length > 11) {
        erros.push('telefone deve ter 10 ou 11 dígitos');
      } else {
        telefone = corpo.telefone.trim();
      }
    }

    if (corpo.imovelId !== undefined && corpo.imovelId !== null && corpo.imovelId !== '') {
      const id = Number(corpo.imovelId);
      if (!Number.isInteger(id) || id <= 0) {
        erros.push('imovelId inválido');
      } else {
        imovelId = id;
      }
    }

    if (erros.length > 0) {
      return res.status(400).json({ erro: 'Dados inválidos', detalhes: erros });
    }

    const criado = await service.criar({ nome, email, telefone, mensagem, imovelId });

    res.status(201).json({
      mensagem: 'Mensagem enviada com sucesso',
      id: criado.id,
      criadoEm: criado.criadoEm,
    });
  } catch (erro) {
    if (erro.code === '23503') {
      return res.status(400).json({ erro: 'Imóvel informado não existe' });
    }
    next(erro);
  }
}

module.exports = { criar };
