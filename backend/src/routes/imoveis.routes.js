const { Router } = require('express');
const controller = require('../controllers/imoveis.controller');

const router = Router();

router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);

module.exports = router;
