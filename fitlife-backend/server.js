const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3001;
const SALT_ROUNDS = 10;

// Middlewares
app.use(cors());
app.use(express.json());

// Banco de dados em memória consolidado
const database = {
  usuarios: [
    {
      id: uuidv4(),
      nome: "Admin",
      email: "admin@fitlife.com",
      tipo: "instrutor",
      senha: "",
    },
  ],
  treinos: [],
  progresso: [],
};

// Atualiza o admin com senha hash (senha original: 123456)
(async () => {
  database.usuarios[0].senha = await bcrypt.hash("123456", SALT_ROUNDS);
})();

// Rotas de Usuário
app.post("/api/usuarios", async (req, res) => {
  const { nome, email, tipo, senha } = req.body;

  if (!nome || !email || !tipo || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (database.usuarios.some((u) => u.email === email)) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

    const novoUsuario = {
      id: uuidv4(),
      nome,
      email,
      tipo,
      senha: senhaHash,
    };

    database.usuarios.push(novoUsuario);
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.get("/api/usuarios", (req, res) => {
  res.json(database.usuarios.map((u) => ({ ...u, senha: undefined })));
});

app.get("/api/usuarios/:id", (req, res) => {
  const usuario = database.usuarios.find((u) => u.id === req.params.id);
  if (!usuario)
    return res.status(404).json({ error: "Usuário não encontrado" });
  res.json({ ...usuario, senha: undefined });
});

// Autenticação
app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;
  const usuario = database.usuarios.find((u) => u.email === email);

  if (!usuario) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  res.json({
    usuario: { ...usuario, senha: undefined },
    token: "token-simulado-" + usuario.id,
  });
});

// Rotas de Treino (exemplo)
app.post("/api/treinos", (req, res) => {
  const { usuarioId, exercicio, repeticoes } = req.body;

  if (!usuarioId || !exercicio) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  const novoTreino = {
    id: uuidv4(),
    usuarioId,
    exercicio,
    repeticoes: repeticoes || 12,
    concluido: false,
    data: new Date().toISOString(),
  };

  database.treinos.push(novoTreino);
  res.status(201).json(novoTreino);
});

app.get("/api/treinos/:usuarioId", (req, res) => {
  const treinos = database.treinos.filter(
    (t) => t.usuarioId === req.params.usuarioId
  );
  res.json(treinos);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log("Usuário demo: admin@fitlife.com | senha: 123456");
});
