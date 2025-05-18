const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const database = require("../database"); // seu banco em memória ou real

router.post("/", async (req, res) => {
  const { nome, email, tipo, senha } = req.body;

  if (!nome || !email || !tipo || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (database.usuarios.some((u) => u.email === email)) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

  const hashedPassword = await bcrypt.hash(senha, saltRounds);

  const novoUsuario = {
    id: uuidv4(),
    nome,
    email,
    tipo,
    senha: hashedPassword,
  };

  database.usuarios.push(novoUsuario);

  res.status(201).json({ ...novoUsuario, senha: undefined });
});

module.exports = router;
