const { Router } = require('express');
const controller = require('../controllers/corretores.controller');

const router = Router();

router.get('/', controller.listar);

module.exports = router;
