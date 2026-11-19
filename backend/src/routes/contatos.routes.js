const { Router } = require('express');
const controller = require('../controllers/contatos.controller');

const router = Router();

router.post('/', controller.criar);

module.exports = router;
