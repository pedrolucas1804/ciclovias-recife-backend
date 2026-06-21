const express = require('express');
const db = require('../db/database');

const router = express.Router();

router.post('/', (req, res) => {
  const { latitude, longitude, ciclovia_nome, ciclovia_tipo, distancia_metros } = req.body;

  if (
    typeof latitude !== 'number' ||
    typeof longitude !== 'number' ||
    !ciclovia_nome ||
    typeof distancia_metros !== 'number'
  ) {
    return res.status(400).json({
      erro: 'Campos obrigatórios: latitude (number), longitude (number), ciclovia_nome (string), distancia_metros (number).',
    });
  }

  const stmt = db.prepare(`
    INSERT INTO localizacoes (latitude, longitude, ciclovia_nome, ciclovia_tipo, distancia_metros)
    VALUES (?, ?, ?, ?, ?)
  `);
  const resultado = stmt.run(latitude, longitude, ciclovia_nome, ciclovia_tipo || null, distancia_metros);

  const registroCriado = db
    .prepare('SELECT * FROM localizacoes WHERE id = ?')
    .get(resultado.lastInsertRowid);

  res.status(201).json(registroCriado);
});

router.get('/', (req, res) => {
  const registros = db
    .prepare('SELECT * FROM localizacoes ORDER BY id DESC')
    .all();

  res.json(registros);
});

module.exports = router;
