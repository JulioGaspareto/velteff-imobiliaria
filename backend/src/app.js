const express = require('express');
const cors = require('cors');
const imoveisRoutes = require('./routes/imoveis.routes');
const corretoresRoutes = require('./routes/corretores.routes');
const contatosRoutes = require('./routes/contatos.routes');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '10kb' }));

app.get('/api/saude', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/imoveis', imoveisRoutes);
app.use('/api/corretores', corretoresRoutes);
app.use('/api/contatos', contatosRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.use((erro, req, res, next) => {
  if (erro.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido' });
  }
  console.error(erro);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

module.exports = app;
