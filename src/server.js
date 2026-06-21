const express = require('express');
const cors = require('cors');
const localizacoesRouter = require('./routes/localizacoes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', mensagem: 'API Ciclovias Recife rodando 🚲' });
});

app.use('/api/localizacoes', localizacoesRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
});
