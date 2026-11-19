const service = require('../services/corretores.service');

async function listar(req, res, next) {
  try {
    const corretores = await service.listar();
    res.json(corretores);
  } catch (erro) {
    next(erro);
  }
}

module.exports = { listar };
