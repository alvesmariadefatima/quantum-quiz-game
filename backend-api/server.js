const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let ranking = [];

// Salvar score
app.post("/api/ranking", (req, res) => {
  const { name, score } = req.body;
  if (!name || typeof score !== "number") return res.status(400).json({ error: "Nome e pontuação obrigatórios." });

  ranking.push({ name, score });
  ranking.sort((a, b) => b.score - a.score);
  ranking = ranking.slice(0, 10);
  res.json(ranking);
});

// Obter ranking
app.get("/api/ranking", (req, res) => {
  res.json(ranking);
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));