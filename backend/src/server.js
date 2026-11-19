require('dotenv').config();
const app = require('./app');
const pool = require('./config/db');

const porta = process.env.PORT || 3000;

pool
  .query('SELECT 1')
  .then(() => {
    app.listen(porta, () => {
      console.log(`API rodando em http://localhost:${porta}`);
    });
  })
  .catch((erro) => {
    console.error('Falha ao conectar no banco de dados:', erro.message);
    process.exit(1);
  });
